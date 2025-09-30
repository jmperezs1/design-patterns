import '../src/index.css';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import React from 'react';

// NOTE: File kept as .ts; add explicit React.createElement usage to avoid TS JSX parsing issues if config disallows JSX in .ts
const withRadixTheme = (Story: any) => React.createElement(
	Theme,
	{ appearance: 'light', accentColor: 'indigo', grayColor: 'slate', radius: 'large', scaling: '100%' },
	React.createElement('div', { style: { padding: 16 } }, React.createElement(Story, null))
);

const preview = {
	decorators: [withRadixTheme],
	parameters: {
		options: {
			storySort: {
				order: ['Home', 'Design Patterns', ['Creational', 'Behavioral', 'Structural']],
			},
		},
		docs: { toc: true },
	},
};

export default preview;