import {Router} from 'express'
import { authRequired } from '../middlewares/validateToken';

const router = Router()

router.get('/documents', authRequired, (req, res)=> res.send('task'));

export default router;