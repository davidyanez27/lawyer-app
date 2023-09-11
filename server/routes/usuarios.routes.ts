import { Router } from 'express';
import { putUsuario, deleteUsuario } from '../controllers/usuarios';
import { register } from '../controllers/register';
import { login, logout } from '../controllers/login';
import { profile } from '../controllers/profile';
import { authRequired } from '../middlewares/validateToken';


const router = Router();

router.post('/register', register);
router.post('/login'   , login);
router.post('/logout'  , logout);
router.get('/profile'  , authRequired , profile);
router.put('/:id',       putUsuario);
router.delete('/:id',    deleteUsuario);





export default router;
