import { Request, Response, NextFunction } from 'express';

const resJson = { message: 'Unauthorized' };

const protectedRoute = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        res.status(401).json(resJson);
        return;
    }

    const [, token] = req.headers.authorization.split(' ');

    if (!token) {
        res.status(401).json(resJson);
        return;
    }

    next();
};

export default protectedRoute;
