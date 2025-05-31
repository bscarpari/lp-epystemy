import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-epystemy-black z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
        className="relative w-24 h-24"
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M50 10 L90 50 L50 90 L10 50 Z"
            fill="none"
            stroke="white"
            strokeWidth="2"
            initial={{ pathLength: 0, rotate: 0 }}
            animate={{ pathLength: 1, rotate: 360 }}
            transition={{
              pathLength: { duration: 2, repeat: Infinity, ease: "linear" },
              rotate: { duration: 2, repeat: Infinity, ease: "linear" }
            }}
          />
          <motion.circle
            cx="50"
            cy="50"
            r="30"
            fill="none"
            stroke="white"
            strokeWidth="2"
            initial={{ pathLength: 0, rotate: 0 }}
            animate={{ pathLength: 1, rotate: -360 }}
            transition={{
              pathLength: { duration: 2, repeat: Infinity, ease: "linear" },
              rotate: { duration: 2, repeat: Infinity, ease: "linear" }
            }}
          />
          <motion.circle
            cx="50"
            cy="50"
            r="15"
            fill="none"
            stroke="white"
            strokeWidth="2"
            initial={{ pathLength: 0, rotate: 0 }}
            animate={{ pathLength: 1, rotate: 360 }}
            transition={{
              pathLength: { duration: 2, repeat: Infinity, ease: "linear" },
              rotate: { duration: 2, repeat: Infinity, ease: "linear" }
            }}
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default LoadingSpinner; 