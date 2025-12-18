import { Router } from 'express';

const router = Router();

router.get('/', (req: any, res: any) => {
  res.json({ message: 'Classes endpoint' });
});

export default router;
