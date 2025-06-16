const rateLimit = require("express-rate-limit");

// Create a rate limiter for login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login attempts per 15 minutes
  message: {
    success: false,
    msg: "Too many login attempts. Please try again later.",
  },
  keyGenerator: (req) => req.deviceFingerprint,
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const apiRateLimiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 minutes
  max: 1000, // Limit each user to 1000 requests per hour
  message: {
    success: false,
    msg: "Too many requests, please try again later",
  },
  keyGenerator: (req) => req.deviceFingerprint,
});

module.exports = { loginLimiter, apiRateLimiter };
