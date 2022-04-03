import { Router } from 'express';
import { uploadFile } from '../controllers';

const router = Router();

router.post('/', uploadFile );

export default router;