import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Lock, LogIn, UserPlus, Loader } from "lucide-react";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:5000/api/${isLoginForm ? "login" : "register"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Invalid credentials or registration failed");
      }

      const data = await response.json();
      onLogin(data.token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formVariants = {
    initial: (isLoginForm) => ({
      x: isLoginForm ? -500 : 500,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      },
    },
    exit: (isLoginForm) => ({
      x: isLoginForm ? 500 : -500,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    }),
  };

  const inputVariants = {
    focused: { scale: 1.02, transition: { duration: 0.2 } },
    unfocused: { scale: 1, transition: { duration: 0.2 } },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <motion.div
        className="p-8 bg-white rounded-2xl shadow-xl w-full max-w-md relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence mode="wait" initial={false} custom={isLoginForm}>
          <motion.div
            key={isLoginForm ? "login" : "register"}
            variants={formVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            custom={isLoginForm}
            className="space-y-6"
          >
            <div className="text-center">
              <motion.div
                className="inline-block p-3 rounded-full bg-blue-100 mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {isLoginForm ? (
                  <LogIn className="w-6 h-6 text-blue-600" />
                ) : (
                  <UserPlus className="w-6 h-6 text-blue-600" />
                )}
              </motion.div>
              <h1 className="text-3xl font-bold text-gray-800">
                {isLoginForm ? "Welcome Back" : "Create Account"}
              </h1>
              <p className="text-gray-600 mt-2">
                {isLoginForm
                  ? "Please enter your details"
                  : "Fill in your information"}
              </p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-100 text-red-600 rounded-lg text-sm"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-4">
                <motion.div
                  variants={inputVariants}
                  whileFocus="focused"
                  className="relative"
                >
                  <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="Username"
                    required
                  />
                </motion.div>

                <motion.div
                  variants={inputVariants}
                  whileFocus="focused"
                  className="relative"
                >
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="Password"
                    required
                  />
                </motion.div>
              </div>

              <motion.button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: "linear",
                    }}
                  >
                    <Loader className="w-5 h-5 mx-auto" />
                  </motion.div>
                ) : isLoginForm ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </motion.button>
            </form>

            <div className="text-center">
              <motion.button
                onClick={() => setIsLoginForm(!isLoginForm)}
                className="text-blue-600 hover:text-blue-700 text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLoginForm
                  ? "Don't have an account? Register"
                  : "Already have an account? Login"}
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Login;
