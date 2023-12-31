import { Router } from 'express';
import { putUsuario, deleteUsuario } from '../controllers/usuarios';
import { register } from '../controllers/register';
import { login, logout, verifyToken } from '../controllers/login';
import { profile } from '../controllers/profile';
import { authRequired } from '../middlewares/validateToken';
import { validateSchema } from "../middlewares/validator.middleware";
import { registerSchema, loginSchema } from "../schemas/auth.schema";


const router = Router();

router.post('/register',validateSchema(registerSchema), register);
router.post('/login'   ,validateSchema(loginSchema), login);
router.post('/logout'  , logout);
router.get('/verify'  , verifyToken);
router.get('/profile'  , profile);
router.put('/:id',       putUsuario);
router.delete('/:id',    deleteUsuario);





export default router;
