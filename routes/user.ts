import { Router } from 'express';
import { usersGet, usersPost, usersPut, usersDelete } from '../controllers/userController';

const router = Router();

router.get('/', usersGet );

router.put('/', usersPut );

router.post('/', usersPost );

router.delete('/', usersDelete );


export default router;