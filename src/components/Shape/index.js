import React from 'react';

import { motion } from 'framer-motion';
import { SQUARE } from '../../config';

const Shape = React.memo(
  ({
    type = SQUARE,
    control,
    transition,
    serialize = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      active: false,
      placeholder: false
    }
  }) => {
    const { x = 0, y = 0, width = 0, height = 0, active = false, placeholder = false } = serialize;

    const strokeProps = {
      stroke: 'rgba(0, 0, 0, .15)',
      strokeDasharray: width && height ? '0 0' : '8 8',
      strokeWidth: '2',
      fill: placeholder ? 'rgba(0, 0, 0, 0.05)' : 'rgba(0, 0, 0, 0)'
    };
    
    return type == SQUARE ? (
      <motion.rect
        initial={{ x, y, width, height, ...strokeProps }}
        animate={control}
        transition={transition}
      />
    ) : (
      <motion.ellipse animate={control} transition={transition} initial={strokeProps} />
    );
  }
);

export { Shape };
