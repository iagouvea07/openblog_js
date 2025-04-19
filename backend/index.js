const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./routes/router.js')

dotenv.config()
const app = express()

const PORT = process.env.PORT

app.use(express.json())
app.use(cors())

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json({ limit: '100mb' }));

app.use("/", router.getRouter)

const server = app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
  
server.on('error', (err) => {
  console.error('❌ Erro ao iniciar o servidor:', err.message);
});