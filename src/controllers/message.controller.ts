import { NextFunction, Request, Response } from 'express';
import { messageRepository } from '../repositories/message.repository';

/**
 * Sends an encrypted message from one user to another.
 *
 * Expects the following fields in the request body:
 *  - to: Recipient username
 *  - from: Sender username
 *  - encrypted: Encrypted message content
 *  - encryptedKey: Encrypted key for the message
 *
 * Responds with a success message and the sent data.
 *
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {NextFunction} next Express next middleware function
 */
export function sendMessage(req: Request, res: Response, next: NextFunction) {
  try {
    const { to, from, encrypted, encryptedKey } = req.body;

    messageRepository.create({
      to,
      from,
      encrypted,
      encryptedKey,
    });

    res.status(200).json({
      message: 'Message sent successfully',
      data: {
        to,
        from,
        encrypted,
        encryptedKey,
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Retrieves all messages sent to a specific user.
 *
 * Expects the following parameter in the request URL:
 *  - username: The recipient's username
 *
 * Responds with a list of messages addressed to the user.
 *
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {NextFunction} next Express next middleware function
 */
export function getMessages(req: Request, res: Response, next: NextFunction) {
  try {
    const { username } = req.params;

    const messages = messageRepository.readByField('to', username);

    res.status(200).json({
      message: 'Messages retrieved successfully',
      data: messages,
    });
  } catch (error) {
    next(error);
  }
}
