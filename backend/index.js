const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/router.js');

const db = require('./middleware/db.js');
const rabbitmq = require('./middleware/rabbitmq.js');

dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json({ limit: '100mb' }));

app.use("/", router.getRouter);
app.use("/", router.postRouter);


async function startServer() {
  try {
    await db.sequelize.sync();
    console.log(`✅ Database syncronized`);

    await rabbitmq.connect();
    console.log('✅ Connected to RabbitMQ');

    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
      
  } catch (err) {
    console.error('❌ Error to initizalize server:', err.message);
  }
}

startServer();