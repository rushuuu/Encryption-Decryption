const crypto = require('crypto');
const NodeRSA = require('node-rsa');

// Generate RSA key pair for three people
const keys = [new NodeRSA({ b: 2048 }), new NodeRSA({ b: 2048 }), new NodeRSA({ b: 2048 })];

// Function to encrypt data for multiple recipients
function encryptData(data, recipientPublicKeys) {
  // Generate a random session key
  const sessionKey = crypto.randomBytes(32); // 256 bits

  // Encrypt the data with the session key using AES-256
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', sessionKey, iv);
  let encryptedData = cipher.update(data, 'utf8', 'base64');
  encryptedData += cipher.final('base64');

  // Encrypt the session key with each recipient's public key
  const encryptedSessionKeys = recipientPublicKeys.map(publicKey =>
    crypto.publicEncrypt(publicKey, sessionKey).toString('base64')
  );

  // Return the encrypted data, encrypted session keys for each recipient, and IV
  return {
    encryptedData,
    encryptedSessionKeys,
    iv: iv.toString('base64'),
  };
}

// Function to decrypt data for a specific recipient
function decryptData(encryptedData, encryptedSessionKey, iv, privateKey) {
  // Decrypt the session key with the recipient's private key
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
const data = 'This is a secret message.';

// Export public keys of all three recipients
const recipientPublicKeys = keys.map(key => key.exportKey('pkcs8-public-pem'));

// Print all keys
keys.forEach((key, index) => {
  console.log(`Recipient ${index + 1} Public Key:\n${key.exportKey('pkcs8-public-pem')}`);
  console.log(`Recipient ${index + 1} Private Key:\n${key.exportKey('pkcs8-private-pem')}`);
});

// Encrypt the data for all three recipients
const { encryptedData, encryptedSessionKeys, iv } = encryptData(data, recipientPublicKeys);

// Decrypt the data for each recipient
const decryptedDataForRecipient1 = decryptData(encryptedData, encryptedSessionKeys[0], iv, keys[0].exportKey('pkcs8-private-pem'));
const decryptedDataForRecipient2 = decryptData(encryptedData, encryptedSessionKeys[1], iv, keys[1].exportKey('pkcs8-private-pem'));
const decryptedDataForRecipient3 = decryptData(encryptedData, encryptedSessionKeys[2], iv, keys[2].exportKey('pkcs8-private-pem'));

console.log('Original data:', data);
console.log('Encrypted data:', encryptedData);
console.log('Decrypted data for recipient 1:', decryptedDataForRecipient1);
console.log('Decrypted data for recipient 2:', decryptedDataForRecipient2);
console.log('Decrypted data for recipient 3:', decryptedDataForRecipient3);
