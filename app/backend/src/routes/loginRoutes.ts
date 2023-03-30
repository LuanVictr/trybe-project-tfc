import { Router } from 'express';
import LoginController from '../controllers/login.controller';

const router = Router();
const loginController = new LoginController();

router.post('/login', loginController.loginUser);

export default router;
