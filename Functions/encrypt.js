// const crypto = require('crypto');
  
// // Difining algorithm
// const algorithm = 'aes-256-cbc';
  
// // Defining key
// const key = crypto.randomBytes(32);
  
// // Defining iv
// const iv = crypto.randomBytes(16);
  
// // An encrypt function
// function encrypt(text) {
  
//  // Creating Cipheriv with its parameter
//  let cipher = crypto.createCipheriv(
//       algorithm, Buffer.from(key), iv);
  
//  // Updating text
//  let encrypted = cipher.update(text);
  
//  // Using concatenation
//  encrypted = Buffer.concat([encrypted, cipher.final()]);
  
//  // Returning iv and encrypted data
//  return { iv: iv.toString('hex'), 
//     encryptedData: encrypted.toString('hex') };
// }

// function decrypt(text) {
  
//   let iv = Buffer.from(text.iv, 'hex');
//   // return console.log(text.encryptedData);
//   let encryptedText =
//      Buffer.from(text.encryptedData, 'hex');
   
//   // Creating Decipher
//   let decipher = crypto.createDecipheriv(
//          algorithm, Buffer.from(key), iv);
   
//   // Updating encrypted text
//   let decrypted = decipher.update(encryptedText);
//   decrypted = Buffer.concat([decrypted, decipher.final()]);
   
//   // returns data after decryption
//   return decrypted.toString();
//  }
   
// //  Encrypts output
// //  var output = encrypt('Geeks4Geeks');
// // console.log(output);

// // const v = 'e05ba076902b6398d4afa3072af60c09';
// // const end = '7e0c83eea52a07a097914cfdb9c231336e46bd6ec5de150d584532fec48f0761';

// const output = {
//   iv: '60c573a45779f4fe2be994681bed3460',
//   encryptedData: 'c448d21a44a9d60577500e11be10cf7d'
// }

// // console.log(output);
   
// //  // Decrypts output
//  console.log(decrypt(output));

// module.exports.encrypt = encrypt;
// module.exports.decrypt = decrypt;