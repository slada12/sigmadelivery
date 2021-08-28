const fs = require('fs');

const auth = async (req, res, next) => {
  const token = req.headers['auth-token'];
  const parseToken = token.split('-');
  console.log(parseToken[0]);

  // const num1 = decrypt(parseToken);

  // console.log(num1);

  try {
    const rawEmail = fs.readFileSync(`${parseToken[0]}.js`);

    const email = JSON.parse(rawEmail);
    console.log(email);

    if (email.token !== token) {
      return res.status(404).json({
        message: 'Unauthorize',
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: 'Unauthorize',
    });
  }

  next();
};

module.exports.auth = auth;