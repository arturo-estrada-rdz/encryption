import { Router } from 'express';
import { getMessages, sendMessage } from '../controllers/message.controller';
import { notAllowedError, notFoundError } from '../error/error';

const router = Router();

/**
 * @swagger
 * /message/send:
 *   post:
 *     summary: Send an encrypted message from one user to another
 *     tags:
 *       - Message
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - to
 *               - from
 *               - encrypted
 *               - encryptedKey
 *             properties:
 *               to:
 *                 type: string
 *                 description: Recipient username
 *               from:
 *                 type: string
 *                 description: Sender username
 *               encrypted:
 *                 type: string
 *                 description: Encrypted message content
 *               encryptedKey:
 *                 type: string
 *                 description: Encrypted key for the message
 *     responses:
 *       200:
 *         description: Message sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     to:
 *                       type: string
 *                     from:
 *                       type: string
 *                     encrypted:
 *                       type: string
 *                     encryptedKey:
 *                       type: string
 */
router.post('/send', sendMessage);

/**
 * @swagger
 * /message/{username}:
 *   get:
 *     summary: Retrieve all messages sent to a specific user
 *     tags:
 *       - Message
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: The recipient's username
 *     responses:
 *       200:
 *         description: Messages retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       to:
 *                         type: string
 *                       from:
 *                         type: string
 *                       encrypted:
 *                         type: string
 *                       encryptedKey:
 *                         type: string
 */
router.get('/:username', getMessages);

router.all('/send', (_req, _res, next) => {
  next(notAllowedError('Method Not Allowed'));
});

router.all('/:username', (_req, _res, next) => {
  next(notAllowedError('Method Not Allowed'));
});

router.use((_req, _res, next) => {
  next(notFoundError('Route Not Found'));
});

export default router;
