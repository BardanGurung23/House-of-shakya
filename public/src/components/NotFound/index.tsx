"use client";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import "./NotFound.css";

const NotFound = ({ message = "Page not found!" }) => {
  return (
    <div className="not-found-container">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="not-found-card"
      >
        <AlertCircle className="not-found-icon" />
        <h1 className="not-found-title">Oops!</h1>
        <p className="not-found-message">{message}</p>
        <Link href="/" className="not-found-button">
          Go Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
