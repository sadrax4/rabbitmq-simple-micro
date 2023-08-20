const amqplib = require("amqplib");
const [logType, message] = process.argv.slice(2);
async function sendMsg() {
    const connection = await amqplib.connect("amqp://localhost:5672");
    const exchange = "logs";
    const channel = await connection.createChannel();
    await channel.assertExchange(exchange, "direct");
    channel.publish(exchange, logType, Buffer.from(message));
}
sendMsg();