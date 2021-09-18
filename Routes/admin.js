const route = require('express').Router();
const fs = require('fs');
const { auth } = require('../Middlewares/auth');
const Track = require('../Model/track');
const OnlineModel = require('../Model/online');
const nodemailer = require('nodemailer');
require('dotenv');

const { encrypt, decrypt } = require('../Functions/encrypt');

const admin_transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.devEmail,
    pass: process.env.Pass,
  },
});


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

    const data = new Track({
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
      currDest: req.body.currDest,
      wght: req.body.wght,
    });
  
    // const stringifyData = JSON.stringify(data)
  
    // fs.writeFileSync(`${data.trackNumber}.js`, stringifyData, (err) => {
    //   if (err) {
    //     console.log(err)
    //   }
  
    //   console.log('successfully created');
    // });

    // console.log(data);

    data.save();
  
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
    const data = await Track.findOne({ trackNumber });

    // const parseData = JSON.parse(data);
    // console.log(parseData);

    if (!data) {
      return res.status(404).json({
        message: 'Tracking Number Not Found',
      });
    };

    const mailSend = {
      from: process.env.devEmail,
      to: process.env.Email,
      subject: 'Tracking Number has been tracked',
      text: `This tracking number ${data.trackNumber} has been tracked. See the client`,
    };

    admin_transporter.sendMail(mailSend, (err, info) => {
      if (err) {
        console.log(`Error: ${err.response}`);
      } else {
        console.log(`The message was sent ${info.response}`);
      }
    });

    return res.status(200).json({
      data,
      message: 'Success',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server Error',
    });
  }
});

route.post('/edit', auth, async (req, res) => {
  const trackNumber = req.body.trackNumber;

  const trFound = await Track.findOne({ trackNumber });

  if (!trFound) {
    return res.status(404).json({
      message: 'Tracking Number Not Found',
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
    currDest: req.body.currDest,
    wght: req.body.wght,
    };

    const trackEdit = await Track.findOneAndUpdate({ trackNumber }, data);

    trackEdit.save();
  
    // const stringifyData = JSON.stringify(data);
  
    // try {
    //   fs.writeFileSync(`${trackNumber}.js`, stringifyData);
    // } catch (error) {
    //   return res.status(400).json({
    //     message: 'Could not be updated. Please Try Again',
    //   });
    // }
  
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

route.get('/online', async (req, res) => {
  try {
    const onlineStatus = await OnlineModel.findOne({ name: 'slada' });

    return res.status(200).json({
      onlineStatus,
    });
  } catch(error) {
    console.log(error);

    return res.status(500).json({
      err: 'Internal Server Error Occurred',
    });
  }
});

route.post('/online', async (req, res) => {
  try {
    const onlineStatus = await OnlineModel.findOne({ name: req.body.onlineName });

    if (!onlineStatus) {
      const newOnlineStatus = await new OnlineModel({
        name: req.body.onlineName,
        online: req.body.online,
      });

      newOnlineStatus.save();

      return res.status(200).json({
        message: 'created successfully',
      });
    }

    const updatedOnlineStatus = await OnlineModel.findByIdAndUpdate(onlineStatus._id, {
      name: onlineStatus.name,
      online: req.body.online,
    });

    updatedOnlineStatus.save();

    return res.status(200).json({
      message: 'Updated successfully',
    });
  } catch(error) {
    console.log(error);

    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

route.put('/verify-payment', async (req, res) => {
  try {
    const options = {
      method: 'GET',
      url: `https://api.flutterwave.com/v3/transactions/${req.body.transaction_id}/verify`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: process.env.flutterSecKey,
      },
    };
    // axios(options, (error, response) => {
    //   if (error) throw new Error(error);
    //   console.log(response.body);
    // });

    const response = await axios(options);
    if (response.status !== 200) {
      return res.status(404).json({
        status: 'failed',
        message: 'Verification Failed!!',
      });
    }
    // After Successfully Verifying the Payment this will give value to the customer
    const giveCustomerValue = await customersModel.findOne('slada', {
      name: 'slada',
      online: false,
    });

    giveCustomerValue.save();

    return res.status(200).json({
      status: 'success',
      message: 'Verification Successful',
    });
  } catch (error) {
    return res.status(400).json({
      status: 'failed',
      message: 'Bad Request',
    });
  }
});

module.exports = route;