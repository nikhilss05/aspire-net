import 'package:flutter/material.dart';
import '../shared/ui.dart';
import '../mock_data.dart';
import '../theme.dart';

/// Map Dashboard: Central interaction surface.
/// - Light yellow background, pastel accents
/// - Prototype regional map with clusters
/// - Event pins open bottom sheet with details and Join/Interested
/// - Floating Filter button and AppBar with filter icon
class MapDashboardScreen extends StatelessWidget {
  const MapDashboardScreen({super.key});

  void _openFilter(BuildContext context) {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (_) {
        return Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Text('Discover Filters', style: TextStyle(fontWeight: FontWeight.w800, fontSize: 18)),
              const SizedBox(height: 12),
              Wrap(
                spacing: 8,
                runSpacing: 8,
                children: const [
                  Chip(label: Text('Event Type')),
                  Chip(label: Text('Time')),
                  Chip(label: Text('Interests')),
                  Chip(label: Text('Proximity')),
                  Chip(label: Text('Trending')),
                ],
              ),
              const SizedBox(height: 12),
              Row(
                children: [
                  Expanded(
                    child: ElevatedButton(
                      onPressed: () => Navigator.pop(context),
                      child: const Text('Apply'),
                    ),
                  ),
                ],
              ),
            ],
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AspirenetAppBar(showFilter: true, onFilter: () => _openFilter(context)),
      floatingActionButton: FilterFAB(onPressed: () => _openFilter(context)),
      body: Center(
        child: AspectRatio(
          aspectRatio: 1,
          child: Container(
            margin: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(24),
              boxShadow: [
                BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 20),
              ],
            ),
            child: Stack(
              children: [
                // Prototype map background: segmented regions
                Positioned.fill(
                  child: CustomPaint(
                    painter: _RegionMapPainter(),
                  ),
                ),
                // Event markers
                ...MockData.events.map((e) {
                  return Positioned(
                    left: e.relativeX * MediaQuery.of(context).size.width * 0.9,
                    top: e.relativeY * MediaQuery.of(context).size.width * 0.9,
                    child: EventMarker(
                      event: e,
                      onTap: () => showEventSheet(context, e),
                    ),
                  );
                }),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _RegionMapPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()..style = PaintingStyle.fill;
    // Soft regions
    paint.color = AppTheme.sky.withOpacity(0.6);
    canvas.drawRRect(RRect.fromRectAndRadius(
      Rect.fromLTWH(16, 20, size.width * 0.45, size.height * 0.4),
      const Radius.circular(30),
    ), paint);

    paint.color = AppTheme.lilac.withOpacity(0.6);
    canvas.drawRRect(RRect.fromRectAndRadius(
      Rect.fromLTWH(size.width * 0.4, size.height * 0.05, size.width * 0.5, size.height * 0.35),
      const Radius.circular(30),
    ), paint);

    paint.color = AppTheme.mint.withOpacity(0.6);
    canvas.drawRRect(RRect.fromRectAndRadius(
      Rect.fromLTWH(size.width * 0.15, size.height * 0.5, size.width * 0.7, size.height * 0.4),
      const Radius.circular(30),
    ), paint);

    // Dots indicating clusters
    final dotPaint = Paint()..color = AppTheme.coral;
    for (final offset in [
      Offset(size.width * 0.25, size.height * 0.35),
      Offset(size.width * 0.7, size.height * 0.25),
      Offset(size.width * 0.8, size.height * 0.6),
      Offset(size.width * 0.4, size.height * 0.7),
    ]) {
      canvas.drawCircle(offset, 5, dotPaint);
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}