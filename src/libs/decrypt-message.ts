import fs from 'fs';
import crypto from 'crypto';
import path from 'path';

/**
 * Decrypts an encrypted message using the RSA private key stored in 'secrets/private.pem'.
 *
 * @param {string} encryptedMessage - The encrypted message to decrypt (as a Buffer or base64 string).
 * @returns {string} The decrypted plain text message.
 * @throws Will throw an error if decryption fails or the private key cannot be read.
 */
export function decryptMessage(encryptedMessage: string): string {
  try {
    const privateKeyPath = path.join(process.cwd(), 'secrets', 'private.pem');
    const privateKey = fs.readFileSync(privateKeyPath, 'utf8');

    // Convert base64 string to Buffer
    const encryptedBuffer = Buffer.from(encryptedMessage, 'base64');

    // ----- 🔓 DECRYPT with private key -----
    const decrypted = crypto.privateDecrypt(
      {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256',
      },
      encryptedBuffer
    );

    return decrypted.toString('utf8');
  } catch (error) {
    throw new Error(`Decryption failed: ${(error as Error).message}`);
  }
}
