import { Router } from 'express';
import { getUsuario, getUsuarios, putUsuario, deleteUsuario } from '../controllers/usuarios';
import { postUsuario } from '../controllers/register';


const router = Router();

router.get('/',       getUsuarios);
router.get('/:id',    getUsuario);
router.post('/',      postUsuario);
router.put('/:id',    putUsuario);
router.delete('/:id', deleteUsuario);





export default router;
