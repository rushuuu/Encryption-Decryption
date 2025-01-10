const crypto = require('crypto');
const NodeRSA = require('node-rsa');

// Function to generate a random RSA key pair
function generateKeyPair() {
  const key = new NodeRSA({ b: 2048 });
  return {
    publicKey: key.exportKey('pkcs8-public-pem'),
    privateKey: key.exportKey('pkcs8-private-pem'),
  };
}

// Function to encrypt data for a single recipient
function encryptDataForUser(data) {
  // Generate a random RSA key pair
  const { publicKey, privateKey } = generateKeyPair();

  // Generate a random session key
  const sessionKey = crypto.randomBytes(32); // 256 bits

  // Encrypt the data with the session key using AES-256
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', sessionKey, iv);
  let encryptedData = cipher.update(data, 'utf8', 'base64');
  encryptedData += cipher.final('base64');

  // Encrypt the session key with the generated public key
  const encryptedSessionKey = crypto.publicEncrypt(
    publicKey,
    sessionKey
  ).toString('base64');

  // Return the encrypted data, encrypted session key, IV, and private key
  return {
    encryptedData,
    encryptedSessionKey,
    iv: iv.toString('base64'),
    privateKey, // Only the recipient with this private key can decrypt
  };
}

// Function to decrypt data using the private key
function decryptDataForUser(encryptedData, encryptedSessionKey, iv, privateKey) {
  // Decrypt the session key with the private key
  const sessionKey = crypto.privateDecrypt(
    privateKey,
    Buffer.from(encryptedSessionKey, 'base64')
  );

  // Decrypt the data with the session key using AES-256
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    sessionKey,
    Buffer.from(iv, 'base64')
  );
  let decryptedData = decipher.update(encryptedData, 'base64', 'utf8');
  decryptedData += decipher.final('utf8');

  return decryptedData;
}

// Example usage
const data = 'This is a confidential message.';

// Encrypt the data
const { encryptedData, encryptedSessionKey, iv, privateKey } = encryptDataForUser(data);

// Decrypt the data
const decryptedData = decryptDataForUser(
  encryptedData,
  encryptedSessionKey,
  iv,
  privateKey
);

console.log('Original data:', data);
console.log('Encrypted data:', encryptedData);
console.log('Decrypted data:', decryptedData);
console.log('Private Key for decryption:\n', privateKey);
