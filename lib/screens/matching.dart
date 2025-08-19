import 'package:flutter/material.dart';
import '../shared/ui.dart';
import '../theme.dart';

/// Matching: choose flow between similar or complementary.
/// Visually distinct paths: “Find my vibe” vs “Find my balance”.
class MatchingScreen extends StatefulWidget {
  const MatchingScreen({super.key});

  @override
  State<MatchingScreen> createState() => _MatchingScreenState();
}

class _MatchingScreenState extends State<MatchingScreen> {
  bool showResults = false;
  bool vibeMode = true; // true => similar, false => complementary

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const AspirenetAppBar(),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Expanded(
                  child: GestureDetector(
                    onTap: () => setState(() { vibeMode = true; showResults = true; }),
                    child: AnimatedContainer(
                      duration: const Duration(milliseconds: 200),
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: vibeMode ? AppTheme.peach : Colors.white,
                        borderRadius: BorderRadius.circular(22),
                        boxShadow: [
                          BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 10),
                        ],
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: const [
                          Text('Find my vibe', style: TextStyle(fontWeight: FontWeight.w800, fontSize: 18)),
                          SizedBox(height: 6),
                          Text('People like me: interests, energy, style'),
                        ],
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: GestureDetector(
                    onTap: () => setState(() { vibeMode = false; showResults = true; }),
                    child: AnimatedContainer(
                      duration: const Duration(milliseconds: 200),
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: !vibeMode ? AppTheme.mint : Colors.white,
                        borderRadius: BorderRadius.circular(22),
                        boxShadow: [
                          BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 10),
                        ],
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: const [
                          Text('Find my balance', style: TextStyle(fontWeight: FontWeight.w800, fontSize: 18)),
                          SizedBox(height: 6),
                          Text('Complements: skills I need, skills I offer'),
                        ],
                      ),
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            if (showResults) Expanded(child: _MatchesGrid(vibeMode: vibeMode)) else _HintCard(),
          ],
        ),
      ),
    );
  }
}

class _HintCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: const [
            Text('Tap a path to generate matches ✨', style: TextStyle(fontWeight: FontWeight.w700)),
            SizedBox(height: 6),
            Text('We’ll show profiles nearby with your vibe or your balance.'),
          ],
        ),
      ),
    );
  }
}

class _MatchesGrid extends StatelessWidget {
  const _MatchesGrid({required this.vibeMode});
  final bool vibeMode;

  @override
  Widget build(BuildContext context) {
    final items = List.generate(8, (i) => i);
    return GridView.builder(
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        childAspectRatio: 0.8,
        crossAxisSpacing: 12,
        mainAxisSpacing: 12,
      ),
      itemCount: items.length,
      itemBuilder: (_, i) {
        final color = vibeMode ? AppTheme.peach : AppTheme.mint;
        return Card(
          child: Padding(
            padding: const EdgeInsets.all(12.0),
            child: Column(
              children: [
                CircleAvatar(radius: 28, backgroundColor: color, child: Text('🙂')),
                const SizedBox(height: 8),
                Text(vibeMode ? 'Vibe Match #$i' : 'Balance Match #$i',
                    style: const TextStyle(fontWeight: FontWeight.w800)),
                const SizedBox(height: 4),
                Text(
                  vibeMode ? 'Shared: design, lo-fi, cafe work' : 'You: dev • Them: design',
                  textAlign: TextAlign.center,
                ),
                const Spacer(),
                ElevatedButton(
                  style: ElevatedButton.styleFrom(backgroundColor: AppTheme.coral),
                  onPressed: () {},
                  child: const Text('Say hi'),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}