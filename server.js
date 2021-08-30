const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const mainRoute = require('./Routes/main');
const loginRoute = require('./Routes/admin');


const app = express();
const port = process.env.PORT || 5000;
const corsOption = {
  origin: ['http://localhost:3000', 'https://sigmadelivery-frontend.pages.dev', 'https://sladatransport.com'],
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOption));

app.use('/track', mainRoute);
app.use('/admin', loginRoute);

app.get('/', (req, res) => {
  res.send('The Site is Up and Running');
});

app.listen(port, () => {
  console.log(`Server Started on port ${port}`);
});