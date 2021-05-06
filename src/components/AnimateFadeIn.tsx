import React, { FC, ReactNode } from 'react';
import { motion, Transition } from 'framer-motion';

interface AnimateFadeInProps {
  children: ReactNode | ReactNode[];
  delay?: number;
  initial?: Transition;
  animate?: Transition;
}

const AnimateFadeIn: FC<AnimateFadeInProps> = ({
  children = [],
  delay = 0,
  initial = {},
  animate = {},
}) => {
  return (
    <>
      {React.Children.map(children, (child, index) => (
        <motion.div
          initial={{ opacity: 0, ...initial }}
          animate={{ opacity: 1, ...animate }}
          transition={{ type: 'tween', delay: delay + (index + 1) * 0.07 }}
        >
          {child}
        </motion.div>
      ))}
    </>
  );
};

export default AnimateFadeIn;
