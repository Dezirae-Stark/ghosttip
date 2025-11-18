import React from 'react';
import Svg, { Path, Defs, Filter, FeGaussianBlur, FeMerge, FeMergeNode } from 'react-native-svg';

export interface IconProps {
  size?: number;
  color?: string;
}

export const ShieldIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#00FFFF',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Defs>
        <Filter id="shield-glow">
          <FeGaussianBlur stdDeviation="1" result="coloredBlur"/>
          <FeMerge>
            <FeMergeNode in="coloredBlur"/>
            <FeMergeNode in="SourceGraphic"/>
          </FeMerge>
        </Filter>
      </Defs>
      <Path
        d="M12 2 L4 6 L4 12 C4 16.5 7 20 12 22 C17 20 20 16.5 20 12 L20 6 Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        filter="url(#shield-glow)"
      />
      <Path
        d="M9 12 L11 14 L15 9"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        filter="url(#shield-glow)"
      />
    </Svg>
  );
};
