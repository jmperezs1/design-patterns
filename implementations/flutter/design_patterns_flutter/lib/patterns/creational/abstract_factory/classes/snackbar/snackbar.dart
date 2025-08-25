class SnackbarProps {
  final String? title;
  final String? message;
  final Duration duration;
  const SnackbarProps({
    this.title,
    this.message,
    this.duration = const Duration(milliseconds: 2400),
  });
}
