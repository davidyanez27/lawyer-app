import {Router} from 'express'
import { authRequired } from '../middlewares/validateToken';

import { getDocuments, getDocument, createDocument, updateDocument, deleteDocument } from '../controllers/documents';
const router = Router()

router.get('/documents',        authRequired, getDocuments);
router.get('/documents/:id',    authRequired, getDocument);
router.post('/documents',       authRequired, createDocument);
router.delete('/documents/:id', authRequired, deleteDocument);
router.put('/documents/:id',    authRequired, updateDocument);


export default router;