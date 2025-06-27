/* eslint-disable */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Where to save the keys
const keyDir = __dirname;
const privateKeyPath = path.join(keyDir, 'private.pem');
const publicKeyPath = path.join(keyDir, 'public.pem');

// Generate RSA key pair (2048-bit)
crypto.generateKeyPair(
  'rsa',
  {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    },
  },
  (err, publicKey, privateKey) => {
    if (err) {
      console.error('❌ Key generation failed:', err);
      process.exit(1);
    }

    fs.writeFileSync(privateKeyPath, privateKey);
    fs.writeFileSync(publicKeyPath, publicKey);

    console.log('✅ Keys generated successfully:');
    console.log(' - Private key:', privateKeyPath);
    console.log(' - Public key: ', publicKeyPath);
  }
);
