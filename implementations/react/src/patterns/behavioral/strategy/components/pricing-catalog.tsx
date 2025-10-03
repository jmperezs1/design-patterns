import { useMemo, useState } from "react";
import { PRODUCTS } from "../data/products";

import {
	Box,
	Text,
	Separator,
	Flex,
    Select,
    Card,
    Badge,
    Grid,
    Inset,
} from '@radix-ui/themes';
import type { PricingStrategy } from "../strategy-interface";
import type { ClientType } from "../types/client";
import { StandardClientPriceStrategy } from '../standard-client-strategy';
import { GoldClientPriceStrategy } from '../gold-client-strategy';
import { PlatinumClientPriceStrategy } from '../platinum-client-strategy';
import { VIPClientPriceStrategy } from '../vip-client-strategy';

// Shared helpers (currency + selector of strategy)
const currency = new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' });

function getStrategy(client: ClientType): PricingStrategy {
	switch (client) {
		case 'gold': return new GoldClientPriceStrategy();
		case 'platinum': return new PlatinumClientPriceStrategy();
		case 'vip': return new VIPClientPriceStrategy();
		default: return new StandardClientPriceStrategy();
	}
}

export function PricingCatalog() {
	const [clientType, setClientType] = useState<ClientType>('standard');
	const strategy = useMemo(() => getStrategy(clientType), [clientType]);
	return (
		<Box p="2" style={{ maxWidth: 1100, margin: '0 auto' }}>
			<Flex align="center" justify="between" mb="4" wrap="wrap" gap="3">
				<Flex direction="column">
					<Text size="5" weight="bold">Catalog</Text>
					<Text color="gray">Selecciona un tipo de cliente para aplicar la estrategia</Text>
				</Flex>

				<Flex align="center" gap="3">
					<Text size="2" color="gray">Tipo de cliente</Text>
					<Select.Root value={clientType} onValueChange={(v) => setClientType(v as ClientType)}>
						<Select.Trigger />
						<Select.Content>
							<Select.Item value="standard">Standard</Select.Item>
							<Select.Item value="gold">Gold (10% off)</Select.Item>
							<Select.Item value="platinum">Platinum (5% off)</Select.Item>
							<Select.Item value="vip">VIP (20% off)</Select.Item>
						</Select.Content>
					</Select.Root>
				</Flex>
			</Flex>

			<Separator size="4" my="3" />

			<Grid columns={{ initial: '1', md: '3' }} gap="4">
				{PRODUCTS.map((p) => (
					<Card key={p.id} variant="surface" size="3">
						<Inset clip="padding-box" side="top" pb="current">
							<img
								src={p.imageUrl}
								alt={p.name}
								style={{ display: 'block', width: '100%', height: 160, objectFit: 'cover' }}
							/>
						</Inset>
						<Flex align="start" justify="between" mt="2">
							<Text weight="bold">{p.name}</Text>
							<Badge variant="soft">Base {currency.format(p.baseUnitPrice)}</Badge>
						</Flex>
						{p.description && (
							<Text color="gray" size="2" mt="1">
								{p.description}
							</Text>
						)}
						<Separator my="3" />
						<PriceBlock base={p.baseUnitPrice} strategy={strategy} />
					</Card>
				))}
			</Grid>
		</Box>
	);
}

function PriceBlock({ base, strategy }: { base: number; strategy: PricingStrategy }) {
	const [qty, setQty] = useState(1);
	const unitPrice = strategy.getPrice(base, 1);
	const total = strategy.getPrice(base, qty);
	return (
		<Flex direction="column" gap="2">
			<Flex align="center" justify="between">
				<Text color="gray">Unit price</Text>
				<Text weight="medium">{currency.format(unitPrice)}</Text>
			</Flex>
			<Flex align="center" justify="between">
				<Flex align="center" gap="2">
					<Text color="gray">Qty</Text>
					<input
						value={qty}
						min={1}
						type="number"
						onChange={(e) => setQty(Math.max(1, Number(e.target.value || 1)))}
						style={{
							width: 80,
							padding: '6px 10px',
							borderRadius: 8,
							border: '1px solid var(--gray-a6)',
							background: 'var(--color-panel)',
						}}
					/>
				</Flex>
				<Text weight="bold">{currency.format(total)}</Text>
			</Flex>
		</Flex>
	);
}

