import 'package:flutter/material.dart';
import '../shared/ui.dart';
import '../mock_data.dart';
import '../theme.dart';

/// Profile: bold, structured menu with playful visuals.
/// Sections: Active Goals (cards + streak), Skills (tags + endorsements + compliment carousel),
/// Achievements (badges with micro-animations). Strengths/needs visual contrast.
class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final me = MockData.me;
    return Scaffold(
      appBar: const AspirenetAppBar(),
      body: ListView(
        padding: const EdgeInsets.all(12),
        children: [
          Card(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Row(
                children: [
                  CircleAvatar(radius: 28, backgroundColor: AppTheme.lilac, backgroundImage: NetworkImage(me.avatarUrl)),
                  const SizedBox(width: 12),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(me.name, style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 18)),
                      const SizedBox(height: 6),
                      Row(children: [
                        const Text('Streak: ', style: TextStyle(fontWeight: FontWeight.w700)),
                        Text('${me.streak} days 🔥'),
                      ])
                    ],
                  )
                ],
              ),
            ),
          ),

          // Active Goals
          const _SectionTitle('Active Goals'),
          SizedBox(
            height: 140,
            child: ListView.separated(
              scrollDirection: Axis.horizontal,
              itemBuilder: (_, i) {
                final goal = me.activeGoals[i % me.activeGoals.length];
                return SizedBox(
                  width: 220,
                  child: Card(
                    child: Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(goal, style: const TextStyle(fontWeight: FontWeight.w800)),
                          const Spacer(),
                          Row(
                            children: const [
                              Icon(Icons.local_fire_department, color: Colors.orange),
                              SizedBox(width: 6),
                              Text('Streak +1 today'),
                            ],
                          )
                        ],
                      ),
                    ),
                  ),
                );
              },
              separatorBuilder: (_, __) => const SizedBox(width: 8),
              itemCount: me.activeGoals.length,
            ),
          ),

          // Skills & Endorsements
          const _SectionTitle('Skills & Interests'),
          Card(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Wrap(spacing: 8, children: me.skills.map((s) => Chip(label: Text(s))).toList()),
                  const SizedBox(height: 8),
                  Wrap(spacing: 8, children: me.interests.map((s) => Chip(label: Text('#$s'))).toList()),
                  const SizedBox(height: 12),
                  SizedBox(
                    height: 40,
                    child: ListView.separated(
                      scrollDirection: Axis.horizontal,
                      itemBuilder: (_, i) => Chip(label: Text('"${me.compliments[i % me.compliments.length]}"')),
                      separatorBuilder: (_, __) => const SizedBox(width: 8),
                      itemCount: me.compliments.length,
                    ),
                  )
                ],
              ),
            ),
          ),

          // Achievements
          const _SectionTitle('Achievements'),
          Card(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Wrap(
                spacing: 8,
                children: me.achievements.map((a) => GamificationBadge(label: a)).toList(),
              ),
            ),
          ),

          // Strengths vs Needs
          const _SectionTitle('Strengths & Needs'),
          Row(
            children: [
              Expanded(
                child: Card(
                  color: AppTheme.mint,
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: const [
                        Text('Strengths', style: TextStyle(fontWeight: FontWeight.w800)),
                        SizedBox(height: 6),
                        Text('Community, prototyping, facilitation')
                      ],
                    ),
                  ),
                ),
              ),
              Expanded(
                child: Card(
                  color: AppTheme.lilac,
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: const [
                        Text('Needs', style: TextStyle(fontWeight: FontWeight.w800)),
                        SizedBox(height: 6),
                        Text('Brand design, motion, partnerships')
                      ],
                    ),
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _SectionTitle extends StatelessWidget {
  const _SectionTitle(this.title);
  final String title;
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(8, 16, 8, 8),
      child: Text(title, style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 16)),
    );
  }
}