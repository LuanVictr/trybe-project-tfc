import { Request, Response } from 'express';
import LoginServices from '../services/login.services';

class LoginController {
  constructor(private loginServices = new LoginServices()) {}

  public loginUser = async (req: Request, res: Response) => {
    try {
      const loginInfo = req.body;
      const result = await this.loginServices.loginUser(loginInfo);
      res.status(200).json({ token: result });
    } catch (error:any) {
      res.status(error.status).json({ message: error.message });
    }
  };

  public returnUserRole = async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    if (token) {
      const userToken = await this.loginServices.returnUserRole(token);
      res.status(200).json({ role: userToken });
    }
  };
}

export default LoginController;
