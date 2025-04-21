const express = require('express');
const router = express.Router();

const db = require('../middleware/db.js');
const rabbitmq = require('../middleware/rabbitmq.js');

router.post('/admin/register', async (req, res) => {
    const { username, name, last_name, email } = req.body;

    await db.Users.create({
        username: username,
        name: name,
        last_name: last_name,
        email: email 
    }, 
    { fields: ['username', 'name', 'last_name', 'email'] });

    const channel = await rabbitmq.connect();
    const message = 'teste';

    channel.sendToQueue('mail_queue', Buffer.from(message));
    console.log(`[x] Sent: ${message}`);

    res.status(200).send('Success!');
});

module.exports = router;
