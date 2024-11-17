import React from "react";
import { motion } from "framer-motion";

export const Card = ({ title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-lg shadow-md p-6"
  >
    {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
    {children}
  </motion.div>
);
