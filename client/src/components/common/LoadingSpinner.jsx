import React from "react";
import { motion } from "framer-motion";

export const LoadingSpinner = () => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full"
  />
);
