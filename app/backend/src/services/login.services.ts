import * as bcrypt from 'bcryptjs';
import Users from '../database/models/Users';
import JsonWebToken from '../utils/jsonwebtoken';

class LoginServices {
  private jtoken:JsonWebToken;
  constructor(private userModel = Users) {
    this.jtoken = new JsonWebToken();
  }

  public async loginUser(loginInfo:ILogin):Promise<string> {
    if (!loginInfo.email || !loginInfo.password) {
      throw Object.assign(new Error('All fields must be filled'), { status: 400 });
    }
    const user = await this.userModel.findOne(
      { where: { email: loginInfo.email, password: loginInfo.password } },
    );
    if (!user) {
      throw Object.assign(new Error('User not found'), { status: 404 });
    }
    if (bcrypt.compareSync(loginInfo.password, user.password) === false) {
      throw Object.assign(new Error('Invalid email or password'), { status: 404 });
    }
    const token = this.jtoken.generateToken(user);
    return token;
  }
}

export default LoginServices;
