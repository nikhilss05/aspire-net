import 'package:flutter/material.dart';
import '../shared/ui.dart';
import '../theme.dart';

/// Feed: timeline for goal updates, events, collaborator requests.
/// - Emoji reactions
/// - Short comment input
class FeedScreen extends StatelessWidget {
  const FeedScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const AspirenetAppBar(),
      body: ListView(
        padding: const EdgeInsets.all(12),
        children: const [
          _FeedCard(
            avatar: '🧑‍🎤',
            name: 'Nova Park',
            content: 'Hit day 7 streak on the “Ship demo” goal! 🚀',
          ),
          _FeedCard(
            avatar: '🧑‍💻',
            name: 'Kai',
            content: 'Looking for a designer for Friday hack night. DM me! 🎨',
          ),
          _FeedCard(
            avatar: '🧑‍🎨',
            name: 'Ava',
            content: 'Hosting a branding crit circle this weekend, join via map pin!',
          ),
        ],
      ),
    );
  }
}

class _FeedCard extends StatelessWidget {
  const _FeedCard({required this.avatar, required this.name, required this.content});
  final String avatar;
  final String name;
  final String content;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                CircleAvatar(
                  backgroundColor: AppTheme.lemon,
                  child: Text(avatar),
                ),
                const SizedBox(width: 12),
                Text(name, style: const TextStyle(fontWeight: FontWeight.w800)),
                const Spacer(),
                const Icon(Icons.more_horiz),
              ],
            ),
            const SizedBox(height: 12),
            Text(content),
            const SizedBox(height: 12),
            const ReactionBar(),
            const SizedBox(height: 12),
            Row(
              children: [
                Expanded(
                  child: TextField(
                    decoration: InputDecoration(
                      hintText: 'Add a short comment…',
                      filled: true,
                      fillColor: AppTheme.sky.withOpacity(0.4),
                      border: OutlineInputBorder(
                        borderSide: BorderSide.none,
                        borderRadius: BorderRadius.circular(16),
                      ),
                      contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                ElevatedButton(
                  style: ElevatedButton.styleFrom(backgroundColor: AppTheme.coral),
                  onPressed: () {},
                  child: const Text('Post'),
                ),
              ],
            )
          ],
        ),
      ),
    );
  }
}