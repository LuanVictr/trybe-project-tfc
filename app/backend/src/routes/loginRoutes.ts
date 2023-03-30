import { Router } from 'express';
import authenticate from '../middlewares/Auth.middleware';
import LoginController from '../controllers/login.controller';

const router = Router();
const loginController = new LoginController();

router.post('/login', loginController.loginUser);

router.get('/login/role', authenticate, loginController.returnUserRole);

export default router;
