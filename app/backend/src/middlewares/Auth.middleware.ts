import { Request, Response, NextFunction } from 'express';
import JsonWebToken from '../utils/jsonwebtoken';

const Jwt = new JsonWebToken();

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const user = await Jwt.authenticateToken(token);
    res.locals.user = user;
    next();
  } catch (error:any) {
    return res.status(error.status).json({ message: error.message });
  }
};

export default authenticate;
