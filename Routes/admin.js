const route = require('express').Router();
const fs = require('fs');
const { auth } = require('../Middlewares/auth');

const { encrypt, decrypt } = require('../Functions/encrypt');


route.post('/register', (req, res) => {
  try {
    const { email, pass } = req.body;

  if (!email) {
    return res.status(201).json({
      message: 'Email is Required!!',
    });
  }

  if (!pass) {
    return res.status(201).json({
      message: 'Password is Required!!',
    });
  }

  try {
    fs.readFileSync(`${email}.js`);
    return res.status(201).json({
      message: 'Email Already Exist',
    });
  } catch (error) {
    
  }

  const content = {
    email,
    pass,
  }

  const stringifyContent = JSON.stringify(content);

  try {
    fs.writeFileSync(`${email}.js`, stringifyContent);

    return res.status(200).json({
      message: 'Success',
    });

  } catch (error) {
    console.log(error);
  }
  } catch (error) {
    console.log(error);
  }
})

route.post('/login', (req, res) => {
  try {
    const { email, pass } = req.body;

    try {
      const content = fs.readFileSync(`${email}.js`);

      // console.log(JSON.parse(content));

      const parseData = JSON.parse(content);

      if (parseData.pass !== pass) {
        return res.status(201).json({
          message: 'Email or Password not correct',
        });
      }

      const num = Math.floor(Math.random() * 1000000);
      const token = `${email}-${num}`;

      // const token = encrypt(email);
      // console.log(token);

      const data = {
        email,
        pass,
        token,
      }
      const stringifyContent = JSON.stringify(data);

      fs.writeFileSync(`${email}.js`, stringifyContent);

      return res.status(200).json({
        message: 'Success',
        token,
      });
    } catch (error) {
      return res.status(201).json({
        message: 'Email or Password not correct',
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error. Please Try Again',
    });
  }
});

route.post('/add', auth, async(req, res) => {
  try {
    const num = Math.floor(Math.random() * 1000000);

    const trackNumber = `col-TN-${num}`;
    const data = {
      trackNumber,
      shipperName: req.body.shipperName,
      shipperEmail: req.body.shipperEmail,
      shipperTel: req.body.shipperTel,
      shipperAdd: req.body.shipperAdd,
      recieverName: req.body.recieverName,
      recieverEmail: req.body.recieverEmail,
      recieverTel: req.body.recieverTel,
      recieverAdd: req.body.recieverAdd,
      origin: req.body.origin,
      dest: req.body.dest,
      shipStatus: req.body.shipStatus,
      packageType: req.body.packageType,
      shipType: req.body.shipType,
      shipMode: req.body.shipMode,
      payMode: req.body.payMode,
      deliveryDate: req.body.deliveryDate,
      departureTime: req.body.departureTime,
      pickupDate: req.body.pickupDate,
      pickupTime: req.body.pickupTime,
      comment: req.body.comment,
    };
  
    const stringifyData = JSON.stringify(data)
  
    fs.writeFileSync(`${data.trackNumber}.js`, stringifyData, (err) => {
      if (err) {
        console.log(err)
      }
  
      console.log('successfully created');
    });

    console.log(data);
  
    return res.status(200).json({
      message: `Please copy and keep it save. ${trackNumber}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Failed. Something Went Wrong!!',
    });
  }
});

route.post('/id-info', async(req, res) => {
  try {
    const { trackNumber } = req.body;

  try {
    const data = fs.readFileSync(`${trackNumber}.js`);

    const parseData = JSON.parse(data);
    console.log(parseData);

    return res.status(200).json({
      data: parseData,
      message: 'Success',
    });
  } catch (error) {
    return res.status(404).json({
      message: 'Tracking Number Not Found.',
    });
  }
  } catch (error) {
    return res.status(500).json({
      message: 'Server Error',
    });
  }
});

route.post('/edit', auth, (req, res) => {
  const trackNumber = req.body.trackNumber;

  try {
    fs.readFileSync(`${trackNumber}.js`);
  } catch (e) {
    return res.status(404).json({
      message: "No Tracking Number Found. Please Contact system administrator",
    });
  }

  const data = {
      trackNumber,
      shipperName: req.body.shipperName,
      shipperEmail: req.body.shipperEmail,
      shipperTel: req.body.shipperTel,
      shipperAdd: req.body.shipperAdd,
      recieverName: req.body.recieverName,
      recieverEmail: req.body.recieverEmail,
      recieverTel: req.body.recieverTel,
      recieverAdd: req.body.recieverAdd,
      origin: req.body.origin,
      dest: req.body.dest,
      shipStatus: req.body.shipStatus,
      packageType: req.body.packageType,
      shipType: req.body.shipType,
      shipMode: req.body.shipMode,
      payMode: req.body.payMode,
      deliveryDate: req.body.deliveryDate,
      departureTime: req.body.departureTime,
      pickupDate: req.body.pickupDate,
      pickupTime: req.body.pickupTime,
      comment: req.body.comment,
    };
  
    const stringifyData = JSON.stringify(data);
  
    try {
      fs.writeFileSync(`${trackNumber}.js`, stringifyData);
    } catch (error) {
      return res.status(400).json({
        message: 'Could not be updated. Please Try Again',
      });
    }
  
    return res.status(200).json({
      message: 'Saved Successfully',
    });
});

route.post('/forget-password', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(201).json({
      message: 'Email is Required!',
    });
  }

  try {
    fs.readFileSync(`${email}.js`);
  } catch (e) {
    return res.status(404).json({
      message: 'User Not Found',
    });
  }
});

module.exports = route;