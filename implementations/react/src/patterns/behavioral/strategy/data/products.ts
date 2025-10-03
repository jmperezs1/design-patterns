interface Product {
	id: string;
	name: string;
	baseUnitPrice: number;
	imageUrl: string;
	description?: string;
}

export const PRODUCTS: Product[] = [
	{
		id: 'p1',
		name: 'Wireless Headphones',
		baseUnitPrice: 120,
		imageUrl: 'https://picsum.photos/seed/headphones/640/360',
		description: 'Bluetooth 5.3, 30h battery',
	},
	{
		id: 'p2',
		name: '4K Monitor 27”',
		baseUnitPrice: 399,
		imageUrl: 'https://picsum.photos/seed/monitor/640/360',
		description: 'IPS, 144Hz, HDR',
	},
	{
		id: 'p3',
		name: 'Mechanical Keyboard',
		baseUnitPrice: 89,
		imageUrl: 'https://picsum.photos/seed/keyboard/640/360',
		description: 'Hot-swappable switches',
	},
];