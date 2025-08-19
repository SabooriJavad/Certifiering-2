import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';

export interface IAuthReq extends Request{
    userId?: String;
}


export const authMiddleware = (req: IAuthReq, res: Response, next: NextFunction): void => {
    
    const autHeader = req.headers.authorization;
    

    if (!autHeader) {
        res.status(401).send('Missing authorization  header');
        return;
    }

    const tokenParts = autHeader.split('');
    const token = tokenParts[1];

    if (!token) {
        res.status(401).send('Missing token');
        return;
    }
    try {
        const jwtSecret = process.env.JWT_SECRET as string;
        
        const decoded = jwt.verify(token, jwtSecret) as { userId: String };

        req.userId = decoded.userId;
        next();
    } catch {
        res.status(401).send('Invalid token');
    }
};