import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import IUserLogin from '../interfaces/IUserLogin';

class JsonWebToken {
  private secret: string;

  constructor() {
    this.secret = process.env.JWT_SECRET!;
  }

  public generateToken(user:IUserLogin):string {
    return jwt.sign(user.role, this.secret);
  }

  public async authenticateToken(token:string):Promise<string | JwtPayload> {
    try {
      if (!token) {
        throw Object.assign(
          new Error('Token not found'),
          { status: 401 },
        );
      }
      const decriptedData = await jwt.verify(token, this.secret);
      return decriptedData;
    } catch (error) {
      throw Object.assign(
        new Error('Expired or invalid token'),
        { status: 401 },
      );
    }
  }
}

export default JsonWebToken;
