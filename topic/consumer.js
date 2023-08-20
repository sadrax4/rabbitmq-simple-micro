const amqplib = require("amqplib");
const logTypes = process.argv.slice(2);
async function sendMsg() {
    const connection = await amqplib.connect("amqp://localhost:5672");
    const exchange = "logs";
    const channel = await connection.createChannel();
    await channel.assertExchange(exchange, "topic");
    const assertQueue = await channel.assertQueue('', { exclusive: true });
    for (const pattern of logTypes) {
        console.log(pattern);
        channel.bindQueue(assertQueue.queue, exchange, pattern);
    }
    channel.consume(assertQueue.queue, msg => {
        console.log(msg.content.toString());
    })
}
sendMsg();