import React from 'react';
import Svg, { Path, Circle, Defs, Filter, FeGaussianBlur, FeMerge, FeMergeNode } from 'react-native-svg';

export interface IconProps {
  size?: number;
  color?: string;
}

export const GhostIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#00FFFF',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Defs>
        <Filter id="ghost-glow">
          <FeGaussianBlur stdDeviation="1" result="coloredBlur"/>
          <FeMerge>
            <FeMergeNode in="coloredBlur"/>
            <FeMergeNode in="SourceGraphic"/>
          </FeMerge>
        </Filter>
      </Defs>
      <Path
        d="M12 3 C8 3 5 6 5 10 L5 19 L7 17 L9 19 L12 17 L15 19 L17 17 L19 19 L19 10 C19 6 16 3 12 3 Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        filter="url(#ghost-glow)"
      />
      <Circle cx="9" cy="10" r="1.5" fill={color} filter="url(#ghost-glow)"/>
      <Circle cx="15" cy="10" r="1.5" fill={color} filter="url(#ghost-glow)"/>
    </Svg>
  );
};
