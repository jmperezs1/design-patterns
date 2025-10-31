import type { FlyweightBadge } from "./flyweight-interface";

export class BadgeFlyweight implements FlyweightBadge {

  private intrinsic: {
    borderRadius: number;
    padding: string;
    border?: string;
    background?: string;
    fontSize: number;
    fontFamily: string;
    fontWeight: number;
  };

  constructor(intrinsic: {
    borderRadius: number;
    padding: string;
    border?: string;
    background?: string;
    fontSize: number;
    fontFamily: string;
    fontWeight: number;
  }) {
    this.intrinsic = intrinsic;
  }

  operation({ text, x, y, color }: { text: string; x: number; y: number; color: string }) {
    const style: React.CSSProperties = {
      position: "absolute",
      transform: `translate(${x}px, ${y}px)`,
      color,
      ...this.intrinsic,
    };
    return <span style={style}>{text}</span>;
  }
}
