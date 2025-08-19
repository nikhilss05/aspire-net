import 'package:flutter/material.dart';
import '../shared/ui.dart';
import '../mock_data.dart';
import '../models.dart';
import '../theme.dart';

/// Messaging: modern DM style for individuals and groups.
/// Supports inline polls and quick tasks.
class MessagingScreen extends StatefulWidget {
  const MessagingScreen({super.key});

  @override
  State<MessagingScreen> createState() => _MessagingScreenState();
}

class _MessagingScreenState extends State<MessagingScreen> {
  final TextEditingController controller = TextEditingController();
  final List<ChatMessage> messages = List.of(MockData.chat);

  void _send() {
    if (controller.text.trim().isEmpty) return;
    setState(() {
      messages.add(ChatMessage(
        id: DateTime.now().millisecondsSinceEpoch.toString(),
        senderName: 'Me',
        text: controller.text.trim(),
        timestamp: DateTime.now(),
        isMe: true,
      ));
      controller.clear();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const AspirenetAppBar(),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(12),
              itemCount: messages.length,
              itemBuilder: (_, i) => _MessageBubble(msg: messages[i]),
            ),
          ),
          SafeArea(
            top: false,
            child: Padding(
              padding: const EdgeInsets.fromLTRB(12, 8, 12, 12),
              child: Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: controller,
                      decoration: InputDecoration(
                        hintText: 'Send a message…',
                        filled: true,
                        fillColor: AppTheme.sky.withOpacity(0.4),
                        border: OutlineInputBorder(
                          borderSide: BorderSide.none,
                          borderRadius: BorderRadius.circular(20),
                        ),
                        contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),
                  IconButton(
                    onPressed: () {
                      setState(() {
                        messages.add(ChatMessage(
                          id: DateTime.now().toString(),
                          senderName: 'Me',
                          text: '',
                          timestamp: DateTime.now(),
                          isMe: true,
                          poll: InlinePoll(
                            question: 'Quick poll: meet at 6?',
                            options: ['Yes', 'No', 'Maybe'],
                          ),
                        ));
                      });
                    },
                    icon: const Icon(Icons.poll_outlined),
                  ),
                  const SizedBox(width: 4),
                  ElevatedButton(
                    style: ElevatedButton.styleFrom(backgroundColor: AppTheme.coral),
                    onPressed: _send,
                    child: const Text('Send'),
                  ),
                ],
              ),
            ),
          )
        ],
      ),
    );
  }
}

class _MessageBubble extends StatelessWidget {
  const _MessageBubble({required this.msg});
  final ChatMessage msg;

  @override
  Widget build(BuildContext context) {
    final align = msg.isMe ? CrossAxisAlignment.end : CrossAxisAlignment.start;
    final color = msg.isMe ? AppTheme.peach : Colors.white;
    return Column(
      crossAxisAlignment: align,
      children: [
        Container(
          margin: const EdgeInsets.symmetric(vertical: 6),
          padding: const EdgeInsets.all(12),
          decoration: BoxDecoration(
            color: color,
            borderRadius: BorderRadius.circular(16),
            boxShadow: [
              BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 8),
            ],
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              if (msg.text.isNotEmpty) Text(msg.text),
              if (msg.poll != null) ...[
                Text('📊 ${msg.poll!.question}', style: const TextStyle(fontWeight: FontWeight.w700)),
                const SizedBox(height: 8),
                Wrap(
                  spacing: 8,
                  children: msg.poll!.options
                      .map((o) => ChoiceChip(label: Text(o), selected: false))
                      .toList(),
                )
              ]
            ],
          ),
        )
      ],
    );
  }
}