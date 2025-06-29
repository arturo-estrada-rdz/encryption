import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

/**
 * Encrypts a plain text message using the RSA public key stored in 'secrets/public.pem'.
 *
 * @param {string} message - The plain text message to encrypt.
 * @returns {string} The encrypted message, encoded in base64.
 * @throws Will throw an error if encryption fails or the public key cannot be read.
 */
export function encryptMessage(message: string): string {
  try {
    const publicKeyPath = path.join(process.cwd(), 'secrets', 'public.pem');
    const publicKey = fs.readFileSync(publicKeyPath, 'utf8');

    // ----- 🔐 ENCRYPT with public key -----
    const encrypted = crypto.publicEncrypt(
      {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256',
      },
      Buffer.from(message)
    );

    return encrypted.toString('base64');
  } catch (error) {
    throw new Error(`Encryption failed: ${(error as Error).message}`);
  }
}
