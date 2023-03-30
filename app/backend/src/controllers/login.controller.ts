import { Request, Response } from 'express';
import LoginServices from '../services/login.services';

class LoginController {
  constructor(private loginServices = new LoginServices()) {}

  public loginUser = async (req: Request, res: Response) => {
    try {
      const loginInfo = req.body;
      const result = await this.loginServices.loginUser(loginInfo);
      res.status(200).send(result);
    } catch (error:any) {
      res.status(404).json({ message: error.message });
    }
  };
}

export default LoginController;
