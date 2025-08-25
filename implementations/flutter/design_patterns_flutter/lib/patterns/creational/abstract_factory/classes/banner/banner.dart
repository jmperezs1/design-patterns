import 'package:flutter/material.dart';

class BannerProps {
  final String? title;
  final String? description;
  final List<Widget>? actions;
  const BannerProps({this.title, this.description, this.actions});
}
