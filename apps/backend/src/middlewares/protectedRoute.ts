import { Request, Response, NextFunction } from "express";

const protectedRoute = (req: Request, res: Response, next: NextFunction) => {
	if (req.headers.authorization) {
		const token = req.headers.authorization.split(" ")[1];
		if (token) {
			next();
		} else {
			res.status(401).json({ message: "Unauthorized" });
		}
	} else {
		res.status(401).json({ message: "Unauthorized" });
	}
};

export default protectedRoute;
