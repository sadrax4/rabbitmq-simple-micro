const amqplib = require("amqplib");
async function sendMsg() {
    const connection = await amqplib.connect("amqp://localhost:5672");
    const exchange = "headerMessage";
    const channel = await connection.createChannel();
    await channel.assertExchange(exchange, "headers");
    const assertQueue = await channel.assertQueue('', { exclusive: true });
    channel.bindQueue(assertQueue.queue, exchange, '');
    channel.consume(assertQueue.queue, msg => {
        console.log(msg.content.toString());
        console.log(msg.properties)
    })
}
sendMsg();