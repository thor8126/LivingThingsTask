import React from "react";
import { motion } from "framer-motion";

export const Button = ({ children, loading, ...props }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center justify-center"
    disabled={loading}
    {...props}
  >
    {children}
  </motion.button>
);
