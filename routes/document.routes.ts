import {Router} from 'express'
import { authRequired } from '../middlewares/validateToken';

import { getDocument, createDocument, updateDocument, deleteDocument } from '../controllers/documents';
import { validateSchema } from "../middlewares/validator.middleware";
import { documentSchema } from "../schemas/auth.schema";


const router = Router();

//router.get('/documents',        authRequired, getDocuments);
router.post('/documents',       authRequired, validateSchema(documentSchema), createDocument);
router.get('/documents/:id',    authRequired, getDocument);
router.delete('/documents/:id', authRequired, deleteDocument);
router.put('/documents/:id',    authRequired, updateDocument);


export default router;