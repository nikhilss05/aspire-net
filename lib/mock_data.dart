import 'models.dart';

/// Mock data used across the prototype. Replace with real APIs later.
class MockData {
  static final List<Event> events = [
    Event(
      id: 'e1',
      name: 'Campus Jam + Co-work',
      photoUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=60',
      description: 'Chill co-work with lo-fi beats, resume tips, and pizza.',
      city: 'Austin',
      dateTime: DateTime.now().add(const Duration(hours: 5)),
      tags: ['co-work', 'career', 'music'],
      relativeX: 0.25,
      relativeY: 0.45,
      trendingScore: 92,
    ),
    Event(
      id: 'e2',
      name: 'Design Sprint Night',
      photoUrl: 'https://images.unsplash.com/photo-1529336953121-ad0d5e5f7f5b?auto=format&fit=crop&w=1200&q=60',
      description: 'Rapid prototyping, crit circles, and snack bar.',
      city: 'Seattle',
      dateTime: DateTime.now().add(const Duration(days: 1, hours: 2)),
      tags: ['design', 'ux', 'hack'],
      relativeX: 0.65,
      relativeY: 0.28,
      trendingScore: 76,
    ),
    Event(
      id: 'e3',
      name: 'Startup Mixer + Open Mic',
      photoUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=60',
      description: 'Pitch swaps and vibes. 90-second open mic intros.',
      city: 'NYC',
      dateTime: DateTime.now().add(const Duration(days: 2, hours: 4)),
      tags: ['startup', 'network', 'open-mic'],
      relativeX: 0.82,
      relativeY: 0.33,
      trendingScore: 88,
    ),
  ];

  static final UserProfile me = UserProfile(
    id: 'u1',
    name: 'Nova Park',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=40',
    skills: ['Flutter', 'Figma', 'Community'],
    interests: ['AI ethics', 'Design', 'Climbing', 'Indie dev'],
    streak: 7,
    achievements: ['Trend Setter', 'Campus Connector', 'Early Adopter'],
    activeGoals: ['Ship demo', 'Host maker night', 'Grow design circle'],
    compliments: ['Creative', 'Reliable', 'Hype friend', 'Detail wizard'],
  );

  static final List<ChatMessage> chat = [
    ChatMessage(
      id: 'm1',
      senderName: 'Ava',
      text: 'Team sync at 6? I can run a quick poll.',
      timestamp: DateTime.now().subtract(const Duration(minutes: 35)),
    ),
    ChatMessage(
      id: 'm2',
      senderName: 'Nova',
      text: 'Yes, and let’s lock a theme for Friday.',
      timestamp: DateTime.now().subtract(const Duration(minutes: 32)),
      isMe: true,
    ),
    ChatMessage(
      id: 'm3',
      senderName: 'Ava',
      text: 'Poll incoming!',
      timestamp: DateTime.now().subtract(const Duration(minutes: 30)),
      poll: InlinePoll(
        question: 'Theme for Friday?',
        options: ['Retro arcade', 'Cottagecore', 'Cyber neon'],
      ),
    ),
  ];
}