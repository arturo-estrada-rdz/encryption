import { Router } from 'express';
import { createUser, getPublicKey } from '../controllers/user.controller';
import { notAllowedError, notFoundError } from '../error/error';

const router = Router();

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - publicKey
 *             properties:
 *               username:
 *                 type: string
 *               publicKey:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 */
router.post('/register', createUser);

/**
 * @swagger
 * /user/{username}/public-key:
 *   get:
 *     summary: Get a user's public key by username
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: Username of the user
 *     responses:
 *       200:
 *         description: Public key retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 publicKey:
 *                   type: string
 *       404:
 *         description: User not found
 */
router.get('/:username/public-key', getPublicKey);

// Handle unsupported methods for /register
router.all('/register', (_req, _res, next) => {
  next(notAllowedError());
});

router.all('/:username/public-key', (_req, _res, next) => {
  next(notAllowedError());
});

router.use((_req, _res, next) => {
  next(notFoundError());
});

export default router;
