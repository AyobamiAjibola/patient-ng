import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Box } from '@mui/material';
import { forwardRef } from 'react';

const MotionBox = motion(
  forwardRef(function BoxWithRef(props, ref) {
    return <Box ref={ref} {...props} />;
  })
);

const FramerMotion = ({ children, sx, threshold = 0.3, ...props }: any) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        threshold: threshold, // Adjust threshold as needed
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <MotionBox
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      transition={{ duration: 0.7 }}
      sx={sx}
      {...props}
    >
      {children}
    </MotionBox>
  );
};

export const FramerMotion2 = ({ children, sx, direction=false, delay=0, ...props }: any) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    setInView(true);
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, x: '100vw' },
    visible: { opacity: 1, x: 0 },
  };

  const variants2 = {
    hidden: { opacity: 0, x: '-100vw' },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <MotionBox
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={direction ? variants2 : variants}
      transition={{ type: 'spring', stiffness: 120, delay: delay }}
      sx={sx}
      {...props}
    >
      {children}
    </MotionBox>
  );
};

export const FramerMotion3 = ({ children, sx, ...props }: any) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    setInView(true);
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <MotionBox
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      transition={{ duration: 1 }}
      sx={sx}
      {...props}
    >
      {children}
    </MotionBox>
  );
};

export default FramerMotion;
