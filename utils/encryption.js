const crypto = require('crypto');
const fs = require('fs');
// const { getSecret } = require('@infisical/sdk');

// Load your public and private keys from Infisical
async function getKeys() {
    const publicKey = process.env.PUBLIC_KEY;
    const privateKey = process.env.PRIVATE_KEY;
    return { publicKey, privateKey };
}

// Encrypt data using the public key
async function encryptData(data) {
    const { publicKey } = await getKeys();
    const buffer = Buffer.from(data, 'utf8');
    const encrypted = crypto.publicEncrypt(publicKey, buffer);
    return encrypted.toString('base64');
}

// Decrypt data using the private key
async function decryptData(encryptedData) {
    const { privateKey } = await getKeys();
    const buffer = Buffer.from(encryptedData, 'base64');
    const decrypted = crypto.privateDecrypt(privateKey, buffer);
    return decrypted.toString('utf8');
}

module.exports = { encryptData, decryptData };