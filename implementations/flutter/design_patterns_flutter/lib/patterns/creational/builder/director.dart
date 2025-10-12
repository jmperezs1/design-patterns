import 'package:flutter/widgets.dart';
import 'builder.dart';
import 'product/card.dart';

class CardDirector {
  CardProduct construct(
    CardBuilder builder, {
    String? title,
    String? subtitle,
    String? mediaUrl,
    Widget? body,
    Widget? footer,
  }) {
    if (title != null && title.isNotEmpty) builder.setTitle(title);
    if (subtitle != null && subtitle.isNotEmpty) builder.setSubtitle(subtitle);
    if (mediaUrl != null && mediaUrl.isNotEmpty) builder.setMedia(mediaUrl);
    if (body != null) builder.setBody(body);
    if (footer != null) builder.setFooter(footer);
    return builder.build();
  }
}
