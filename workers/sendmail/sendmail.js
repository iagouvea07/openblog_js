const amqp = require('amqplib');
const dotenv = require('dotenv');

dotenv.config();

async function consume() {
    try {
        const connection = await amqp.connect(`amqp://${process.env.RABBITMQ_HOST}`);
        const channel = await connection.createChannel();
        const queue = 'mail_queue';

        console.log('Sendmail worker initialized');
        await channel.assertQueue(queue, {durable: true});
        
        channel.consume(queue, (msg) => {
            if(msg !== null) {
                const messageContent = msg.content.toString();
                console.log(`[x] Received: ${messageContent}`);

                console.log('processada: ', messageContent);

                channel.ack(msg);
            }
        })
    } catch (err) {
        console.error('❌ Failed to connect to RabbitMQ', err);
    }
}

consume();