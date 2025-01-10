// utils/encryption.js
const crypto = require('crypto');
const fs = require('fs');

// Load your public and private keys
const publicKey = fs.readFileSync('public_key.pem', 'utf8');
const privateKey = fs.readFileSync('private_key.pem', 'utf8');

// Encrypt data using the public key
function encryptData(data) {
    const buffer = Buffer.from(data, 'utf8');
    const encrypted = crypto.publicEncrypt(publicKey, buffer);
    return encrypted.toString('base64'); // Store in base64 format
}

// Decrypt data using the private key
function decryptData(encryptedData) {
    const buffer = Buffer.from(encryptedData, 'base64');
    const decrypted = crypto.privateDecrypt(privateKey, buffer);
    return decrypted.toString('utf8');
}

module.exports = { encryptData, decryptData };
