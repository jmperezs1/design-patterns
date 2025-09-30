import type { CardBuilder } from './builder';
import type { ReactNode } from 'react';

export class CardDirector {
  construct(
    builder: CardBuilder,
    opts: {
      title?: string;
      subtitle?: string;
      mediaUrl?: string;
      body?: ReactNode;
      footer?: ReactNode;
    }
  ) {
    if (opts.title) builder.setTitle(opts.title);
    if (opts.subtitle) builder.setSubtitle(opts.subtitle);
    if (opts.mediaUrl) builder.setMedia(opts.mediaUrl);
    if (opts.body) builder.setBody(opts.body);
    if (opts.footer) builder.setFooter(opts.footer);
    return builder.build();
  }
}