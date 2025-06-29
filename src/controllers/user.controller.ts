import { NextFunction, Request, Response } from 'express';
import { notFoundError } from '../error/error';
import { userRepository } from '../repositories/user.repository';

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username, publicKey } = req.body;
    const user = await userRepository.create({ username, publicKey });
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    next(error);
  }
}

export async function getPublicKey(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username } = req.params;
    const user = await userRepository.readByUsername(username);
    if (!user) {
      throw notFoundError(`User with username ${username} not found`);
    }
    res.status(200).json({ publicKey: user.publicKey });
  } catch (error) {
    next(error);
  }
}
