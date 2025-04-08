import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 minutes
	limit: 50, // Limit each IP to 50 requests per `window` (here, per 10 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

export default limiter;
