import { Router } from 'express';
import {
  decryptPayload,
  encryptPayload,
} from '../controllers/payload.controller';
import { notAllowedError, notFoundError } from '../error/error';

const router = Router();

/**
 * @swagger
 * /payload/encrypt:
 *   post:
 *     summary: Encrypt a message
 *     tags:
 *       - Payload
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Message encrypted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 encryptedMessage:
 *                   type: string
 */
router.post('/encrypt', encryptPayload);

/**
 * @swagger
 * /payload/decrypt:
 *   post:
 *     summary: Decrypt an encrypted message
 *     tags:
 *       - Payload
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - encryptedMessage
 *             properties:
 *               encryptedMessage:
 *                 type: string
 *     responses:
 *       200:
 *         description: Message decrypted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 decryptedMessage:
 *                   type: string
 */
router.post('/decrypt', decryptPayload);

// Handle unsupported methods for /send
router.all('/encrypt', (_req, _res, next) => {
  next(notAllowedError());
});

// Handle unsupported methods for /receive
router.all('/decrypt', (_req, _res, next) => {
  next(notAllowedError());
});

router.use((_req, _res, next) => {
  next(notFoundError());
});

export default router;
