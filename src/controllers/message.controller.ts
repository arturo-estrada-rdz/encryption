import { Request, Response, NextFunction } from 'express';
import { encryptMessage } from '../libs/encrypt-message';
import { decryptMessage } from '../libs/decrypt-message';

/**
 * Handles sending a message by encrypting the provided message in the request body.
 * Responds with a success message and the encrypted message.
 *
 * @param {Request} req - Express request object, expects `message` in the body.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Response} JSON response with encrypted message.
 */
export const sendMessage = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const message = req.body.message;
    const encrypted = encryptMessage(message);

    res.status(200).json({
      message: 'Message sent successfully',
      encryptedMessage: encrypted,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Handles receiving a message by decrypting the provided encrypted message in the request body.
 * Responds with a success message and the decrypted message.
 *
 * @param {Request} req - Express request object, expects `encryptedMessage` in the body.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Response} JSON response with decrypted message.
 */
export const receiveMessage = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const encrypted = req.body.encryptedMessage;
    const decrypted = decryptMessage(encrypted);

    res.status(200).json({
      message: 'Message received successfully',
      decryptedMessage: decrypted,
    });
  } catch (error) {
    next(error);
  }
};
