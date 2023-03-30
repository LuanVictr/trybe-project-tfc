import * as bcrypt from 'bcryptjs';
import * as Joi from 'joi';
import { JwtPayload } from 'jsonwebtoken';
import ILogin from '../interfaces/ILogin';
import Users from '../database/models/Users';
import JsonWebToken from '../utils/jsonwebtoken';

class LoginServices {
  private jtoken:JsonWebToken;
  constructor(private userModel = Users) {
    this.jtoken = new JsonWebToken();
  }

  static validateInputs(loginInfo:ILogin) {
    const loginSchemma = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });
    return loginSchemma.validate(loginInfo);
  }

  public async loginUser(loginInfo:ILogin):Promise<string> {
    const { error } = LoginServices.validateInputs(loginInfo);
    if (!loginInfo.email || !loginInfo.password) {
      throw Object.assign(new Error('All fields must be filled'), { status: 400 });
    }
    if (error) {
      throw Object.assign(
        new Error(error.details[0].type === 'any.required'
          ? 'All fields must be filled' : 'Invalid email or password'),
        { status: error.details[0].type === 'any.required' ? 400 : 401 },
      );
    }
    const user = await this.userModel.findOne({ where: { email: loginInfo.email } });
    if (!user || bcrypt.compareSync(loginInfo.password, user.password) === false) {
      throw Object.assign(new Error('Invalid email or password'), { status: 401 });
    }
    const token = this.jtoken.generateToken(user);
    return token;
  }

  public async returnUserRole(token:string):Promise<string | JwtPayload> {
    const userRole = this.jtoken.authenticateToken(token);
    return userRole;
  }
}

export default LoginServices;
