/// Models for events, users, messages; kept minimal for prototype.

class Event {
  Event({
    required this.id,
    required this.name,
    required this.photoUrl,
    required this.description,
    required this.city,
    required this.dateTime,
    required this.tags,
    required this.relativeX,
    required this.relativeY,
    this.trendingScore = 0,
  });

  final String id;
  final String name;
  final String photoUrl;
  final String description;
  final String city;
  final DateTime dateTime;
  final List<String> tags;
  final double relativeX; // 0..1 horizontal position on prototype map
  final double relativeY; // 0..1 vertical position on prototype map
  final int trendingScore;
}

class UserProfile {
  UserProfile({
    required this.id,
    required this.name,
    required this.avatarUrl,
    required this.skills,
    required this.interests,
    this.streak = 3,
    this.achievements = const [],
    this.activeGoals = const [],
    this.compliments = const [],
  });

  final String id;
  final String name;
  final String avatarUrl;
  final List<String> skills;
  final List<String> interests;
  final int streak;
  final List<String> achievements;
  final List<String> activeGoals;
  final List<String> compliments;
}

class ChatMessage {
  ChatMessage({
    required this.id,
    required this.senderName,
    required this.text,
    required this.timestamp,
    this.isMe = false,
    this.poll,
  });

  final String id;
  final String senderName;
  final String text;
  final DateTime timestamp;
  final bool isMe;
  final InlinePoll? poll;
}

class InlinePoll {
  InlinePoll({required this.question, required this.options});
  final String question;
  final List<String> options;
}