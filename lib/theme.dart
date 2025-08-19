import 'package:flutter/material.dart';

/// Theme definitions: light, pastel-forward, high contrast on text.
/// Centralizes colors, typography, and shapes for Gen-Z friendly feel.
class AppTheme {
  static const Color canvas = Color(0xFFFFF9E5);
  static const Color mint = Color(0xFFB8F2E6);
  static const Color peach = Color(0xFFFFD6BA);
  static const Color lilac = Color(0xFFE5D4FF);
  static const Color sky = Color(0xFFCAF0F8);
  static const Color lemon = Color(0xFFFFF3B0);
  static const Color coral = Color(0xFFFFA69E);
  static const Color ink = Color(0xFF1C1C1E);

  static ThemeData theme = ThemeData(
    brightness: Brightness.light,
    useMaterial3: true,
    scaffoldBackgroundColor: canvas,
    colorScheme: ColorScheme.fromSeed(
      seedColor: coral,
      brightness: Brightness.light,
      background: canvas,
      surface: Colors.white,
      primary: coral,
      secondary: lilac,
      tertiary: mint,
      onPrimary: Colors.white,
      onSecondary: ink,
      onTertiary: ink,
    ),
    textTheme: _textTheme,
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(18),
        ),
        foregroundColor: Colors.white,
      ),
    ),
    chipTheme: ChipThemeData(
      backgroundColor: lemon,
      selectedColor: peach,
      disabledColor: lemon.withOpacity(0.5),
      labelStyle: const TextStyle(fontWeight: FontWeight.w600),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
    ),
    cardTheme: CardTheme(
      color: Colors.white,
      margin: const EdgeInsets.all(12),
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20),
        side: BorderSide(color: Colors.black.withOpacity(0.05)),
      ),
    ),
    appBarTheme: const AppBarTheme(
      backgroundColor: Colors.transparent,
      elevation: 0,
      centerTitle: true,
      foregroundColor: ink,
      titleTextStyle: TextStyle(
        color: ink,
        fontWeight: FontWeight.w800,
        fontSize: 20,
      ),
    ),
  );

  static const TextTheme _textTheme = TextTheme(
    displayLarge: TextStyle(fontWeight: FontWeight.w800, color: ink),
    displayMedium: TextStyle(fontWeight: FontWeight.w800, color: ink),
    displaySmall: TextStyle(fontWeight: FontWeight.w800, color: ink),
    headlineMedium: TextStyle(fontWeight: FontWeight.w800, color: ink),
    headlineSmall: TextStyle(fontWeight: FontWeight.w800, color: ink),
    titleLarge: TextStyle(fontWeight: FontWeight.w700, color: ink),
    titleMedium: TextStyle(fontWeight: FontWeight.w700, color: ink),
    titleSmall: TextStyle(fontWeight: FontWeight.w700, color: ink),
    bodyLarge: TextStyle(fontWeight: FontWeight.w500, color: ink),
    bodyMedium: TextStyle(fontWeight: FontWeight.w500, color: ink),
    labelLarge: TextStyle(fontWeight: FontWeight.w700, color: ink),
  );
}