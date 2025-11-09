import React from 'react';
import { View, Text } from 'react-native';
import type { FlyweightBadge } from './flyweight-interface';

export class BadgeFlyweight implements FlyweightBadge {
  private intrinsic: {
    borderRadius: number;
    paddingHorizontal: number;
    paddingVertical: number;
    borderWidth?: number;
    borderColor?: string;
    background?: string;
    fontSize: number;
    fontWeight: '400' | '500' | '600' | '700';
  };

  constructor(intrinsic: {
    borderRadius: number;
    paddingHorizontal: number;
    paddingVertical: number;
    borderWidth?: number;
    borderColor?: string;
    background?: string;
    fontSize: number;
    fontWeight: '400' | '500' | '600' | '700';
  }) {
    this.intrinsic = intrinsic;
  }

  operation({ text, x, y, color }: { text: string; x: number; y: number; color: string }) {
    const style: any = {
      position: 'absolute',
      left: x,
      top: y,
      backgroundColor: this.intrinsic.background ?? 'transparent',
      borderRadius: this.intrinsic.borderRadius,
      paddingHorizontal: this.intrinsic.paddingHorizontal,
      paddingVertical: this.intrinsic.paddingVertical,
      borderWidth: this.intrinsic.borderWidth ?? 0,
      borderColor: this.intrinsic.borderColor ?? 'transparent',
    };
    const textStyle: any = {
      color,
      fontSize: this.intrinsic.fontSize,
      fontWeight: this.intrinsic.fontWeight as any,
    };

    return (
      <View key={`${text}-${x}-${y}`} style={style} pointerEvents="none">
        <Text style={textStyle}>{text}</Text>
      </View>
    );
  }
}
