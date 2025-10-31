export function makeData(count = 2500) {
  const variants = ["pill", "rounded-outline", "chip"] as const;
  const colors = ["#10b981", "#3b82f6", "#ef4444", "#a855f7", "#111827"];
  const data: Array<{ text: string; x: number; y: number; color: string; variant: string }> = [];
  let x = 12, y = 12;

  for (let i = 0; i < count; i++) {
    const variant = variants[i % variants.length];
    const color = colors[i % colors.length];
    data.push({ text: `#${i}`, x, y, color, variant });
    x += 64;
    if (x > 960) { x = 12; y += 28; } // wrap to next "row"
  }
  return data;
}