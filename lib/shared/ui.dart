import 'package:flutter/material.dart';
import '../theme.dart';
import '../models.dart';

/// AppBar with profile (left), centered logo, notifications + optional filter (right)
class AspirenetAppBar extends StatelessWidget implements PreferredSizeWidget {
  const AspirenetAppBar({super.key, this.showFilter = false, this.onFilter});

  final bool showFilter;
  final VoidCallback? onFilter;

  @override
  Size get preferredSize() => const Size.fromHeight(64);

  @override
  Widget build(BuildContext context) {
    return AppBar(
      titleSpacing: 0,
      leadingWidth: 64,
      leading: Padding(
        padding: const EdgeInsets.only(left: 16),
        child: CircleAvatar(
          radius: 18,
          backgroundColor: AppTheme.lilac,
          child: const Icon(Icons.person, color: AppTheme.ink),
        ),
      ),
      title: const Text('Aspirenet'),
      actions: [
        IconButton(
          tooltip: 'Notifications',
          icon: const Icon(Icons.notifications_outlined),
          onPressed: () {},
        ),
        if (showFilter)
          IconButton(
            tooltip: 'Filter',
            icon: const Icon(Icons.tune_rounded),
            onPressed: onFilter,
          ),
        const SizedBox(width: 8),
      ],
    );
  }
}

/// Floating filter button for map/discover screens
class FilterFAB extends StatelessWidget {
  const FilterFAB({super.key, required this.onPressed});
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    return FloatingActionButton.extended(
      backgroundColor: AppTheme.peach,
      foregroundColor: AppTheme.ink,
      onPressed: onPressed,
      icon: const Icon(Icons.filter_alt_rounded),
      label: const Text('Filter'),
    );
  }
}

/// Stylish event marker showing clustering vibes via subtle shadows.
class EventMarker extends StatelessWidget {
  const EventMarker({super.key, required this.event, required this.onTap});

  final Event event;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(14),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.08),
                  blurRadius: 8,
                  offset: const Offset(0, 4),
                ),
              ],
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                const Icon(Icons.location_pin, color: AppTheme.coral, size: 18),
                const SizedBox(width: 6),
                Text(
                  event.name,
                  style: const TextStyle(fontWeight: FontWeight.w700),
                ),
              ],
            ),
          ),
          const SizedBox(height: 4),
          Container(
            width: 10,
            height: 10,
            decoration: const BoxDecoration(
              color: AppTheme.coral,
              shape: BoxShape.circle,
            ),
          ),
        ],
      ),
    );
  }
}

/// Bottom sheet for event details with image, info, and CTA buttons.
Future<void> showEventSheet(BuildContext context, Event event) async {
  return showModalBottomSheet(
    context: context,
    isScrollControlled: true,
    backgroundColor: Colors.transparent,
    builder: (context) {
      return DraggableScrollableSheet(
        initialChildSize: 0.42,
        maxChildSize: 0.9,
        minChildSize: 0.3,
        expand: false,
        builder: (_, controller) {
          return Container(
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: const BorderRadius.vertical(top: Radius.circular(28)),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.12),
                  blurRadius: 20,
                ),
              ],
            ),
            child: SingleChildScrollView(
              controller: controller,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  ClipRRect(
                    borderRadius: const BorderRadius.vertical(top: Radius.circular(28)),
                    child: AspectRatio(
                      aspectRatio: 16 / 9,
                      child: Image.network(event.photoUrl, fit: BoxFit.cover),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(event.name, style: Theme.of(context).textTheme.titleLarge),
                        const SizedBox(height: 6),
                        Row(
                          children: [
                            const Icon(Icons.schedule, size: 18),
                            const SizedBox(width: 6),
                            Text(
                              '${event.city} • ${_formatDate(event.dateTime)}',
                              style: Theme.of(context).textTheme.bodyMedium,
                            ),
                          ],
                        ),
                        const SizedBox(height: 12),
                        Wrap(
                          spacing: 8,
                          children: event.tags
                              .map((t) => Chip(label: Text(t)))
                              .toList(),
                        ),
                        const SizedBox(height: 12),
                        Text(event.description),
                        const SizedBox(height: 16),
                        Row(
                          children: [
                            Expanded(
                              child: ElevatedButton(
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: AppTheme.coral,
                                ),
                                onPressed: () => Navigator.pop(context),
                                child: const Text('Join'),
                              ),
                            ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: ElevatedButton(
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: AppTheme.mint,
                                  foregroundColor: AppTheme.ink,
                                ),
                                onPressed: () => Navigator.pop(context),
                                child: const Text('Interested'),
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      );
    },
  );
}

String _formatDate(DateTime dt) {
  final now = DateTime.now();
  final isToday = now.year == dt.year && now.month == dt.month && now.day == dt.day;
  final two = (int n) => n.toString().padLeft(2, '0');
  final time = '${two(dt.hour % 12 == 0 ? 12 : dt.hour % 12)}:${two(dt.minute)} ${dt.hour >= 12 ? 'PM' : 'AM'}';
  return isToday ? 'Today, $time' : '${dt.month}/${dt.day}, $time';
}

/// Gamification badge with subtle pop animation on unlock
class GamificationBadge extends StatefulWidget {
  const GamificationBadge({super.key, required this.label, this.color});
  final String label;
  final Color? color;

  @override
  State<GamificationBadge> createState() => _GamificationBadgeState();
}

class _GamificationBadgeState extends State<GamificationBadge>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller = AnimationController(
    vsync: this,
    duration: const Duration(milliseconds: 500),
  )..forward();

  @override
  Widget build(BuildContext context) {
    return ScaleTransition(
      scale: Tween(begin: 0.8, end: 1.0).animate(
        CurvedAnimation(parent: _controller, curve: Curves.elasticOut),
      ),
      child: Chip(
        backgroundColor: widget.color ?? AppTheme.sky,
        label: Text('🏆 ${widget.label}'),
      ),
    );
  }
}

/// Reaction bar for feed items (emoji taps)
class ReactionBar extends StatefulWidget {
  const ReactionBar({super.key});

  @override
  State<ReactionBar> createState() => _ReactionBarState();
}

class _ReactionBarState extends State<ReactionBar> {
  final Map<String, int> counts = {'🔥': 2, '👏': 1, '💡': 1};

  @override
  Widget build(BuildContext context) {
    return Row(
      children: counts.keys.map((e) {
        return Padding(
          padding: const EdgeInsets.only(right: 10),
          child: GestureDetector(
            onTap: () => setState(() => counts[e] = (counts[e] ?? 0) + 1),
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
              decoration: BoxDecoration(
                color: AppTheme.lemon,
                borderRadius: BorderRadius.circular(16),
              ),
              child: Text('$e ${counts[e]}'),
            ),
          ),
        );
      }).toList(),
    );
  }
}