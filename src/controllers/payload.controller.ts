import { NextFunction, Request, Response } from 'express';
import { decryptMessage } from '../libs/payload-decrypt';
import { encryptMessage } from '../libs/payload-encrypt';

/**
 * Encrypts a message provided in the request body.
 *
 * Expects a JSON body with a `message` property.
 * Responds with a JSON object containing the encrypted message.
 *
 * @function encryptPayload
 * @param {Request} req - Express request object. Expects `message` in `req.body`.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {void}
 */
export const encryptPayload = (
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
 * Decrypts an encrypted message provided in the request body.
 *
 * Expects a JSON body with an `encryptedMessage` property (base64 string).
 * Responds with a JSON object containing the decrypted message.
 *
 * @function decryptPayload
 * @param {Request} req - Express request object. Expects `encryptedMessage` in `req.body`.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {void}
 */
export const decryptPayload = (
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
