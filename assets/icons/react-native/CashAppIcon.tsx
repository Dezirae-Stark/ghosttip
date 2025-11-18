import React from 'react';
import Svg, { Rect, Path, Line, Defs, Filter, FeGaussianBlur, FeMerge, FeMergeNode } from 'react-native-svg';

export interface IconProps {
  size?: number;
  color?: string;
}

export const CashAppIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#00FFFF',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Defs>
        <Filter id="cashapp-glow">
          <FeGaussianBlur stdDeviation="1" result="coloredBlur"/>
          <FeMerge>
            <FeMergeNode in="coloredBlur"/>
            <FeMergeNode in="SourceGraphic"/>
          </FeMerge>
        </Filter>
      </Defs>
      <Rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="4"
        stroke={color}
        strokeWidth="2"
        fill="none"
        filter="url(#cashapp-glow)"
      />
      <Path
        d="M10 8 L10 16 M10 8 L14 8 C15.5 8 16.5 9 16.5 10.5 C16.5 12 15.5 13 14 13 L10 13"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        filter="url(#cashapp-glow)"
      />
      <Line
        x1="8"
        y1="6"
        x2="12"
        y2="6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        filter="url(#cashapp-glow)"
      />
      <Line
        x1="8"
        y1="18"
        x2="12"
        y2="18"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        filter="url(#cashapp-glow)"
      />
    </Svg>
  );
};
