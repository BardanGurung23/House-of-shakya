// const Redis = require("ioredis");

// if (process.env.REDIS_DISABLED === "true") {
//   console.warn("Redis disabled; using no-op Redis client.");

//   module.exports = {
//     get: async () => null,
//     set: async () => "OK",
//     del: async () => 0,
//     ping: async () => "PONG",
//   };
//   return;
// }

// const redis = process.env.REDIS_URL
//   ? new Redis(process.env.REDIS_URL)
//   : new Redis({
//       host: process.env.REDIS_HOST || "localhost",
//       port: process.env.REDIS_PORT || 6379,
//       password: process.env.REDIS_PASSWORD || undefined,
//       tls: process.env.REDIS_TLS === "true" ? {} : undefined,
//     });

// redis.on("connect", () => console.log("Connected to Redis ✅"));
// redis.on("error", (err) => console.error("Redis Error ❌", err));

// module.exports = redis;
