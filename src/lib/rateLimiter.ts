import rateLimit from "express-rate-limit";

/**
 * The rateLimiter function limits the number of requests within a specified time interval.
 * @param {number} interval - The interval parameter represents the time window in seconds during which
 * the rate limiting will be applied. It determines how often the rate limiter will reset and allow a
 * new set of requests.
 * @param {number} maxRequest - The `maxRequest` parameter represents the maximum number of requests
 * allowed within the specified time interval.
 */
const rateLimiter = (interval: number, maxRequest: number) => rateLimit({
    windowMs: interval * 1000,
    max: maxRequest,
    message: "Too many requests. Please try again later.",
    standardHeaders: true,
    legacyHeaders: false
});

export default rateLimiter;