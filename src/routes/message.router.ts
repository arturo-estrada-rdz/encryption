import { Router } from 'express';
import { receiveMessage, sendMessage } from '../controllers/message.controller';
import { notAllowedError, notFoundError } from '../error/error';

const router = Router();

router.post('/send', sendMessage);
router.post('/receive', receiveMessage);

// Handle unsupported methods for /send
router.all('/send', (_req, _res, next) => {
  next(notAllowedError());
});

// Handle unsupported methods for /receive
router.all('/receive', (_req, _res, next) => {
  next(notAllowedError());
});

router.use((_req, _res, next) => {
  next(notFoundError());
});

export default router;
