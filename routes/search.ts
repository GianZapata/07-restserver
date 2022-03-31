import { Router } from 'express';
import { search } from '../controllers';

const router = Router();

router.get('/:collection/:term', search);


export default router;