const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const mainRoute = require('./Routes/main');


const app = express();
const port = process.env.PORT || 5000;
const corsOption = {
  origin: ['http://localhost:3000'],
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOption));

app.use('/track', mainRoute);

app.listen(port, () => {
  console.log(`Server Started on port ${port}`);
});