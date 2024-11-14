const rateLimit = require('express-rate-limit');

// Rate Limiter Setup
const otpLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 2, // Limit each IP to 5 requests per `window` (here, per 1 minutes)
    message: 'Too many requests from this IP, please try again after 1 minutes.',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });

module.exports=otpLimiter;