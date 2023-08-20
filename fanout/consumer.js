const amqplib = require("amqplib");
async function getMsg() {
    const connection = await amqplib.connect("amqp://localhost:5672");
    const exchange = "logs";
    const channel = await connection.createChannel();
    await channel.assertExchange(exchange, "fanout");
    const assertQueue = await channel.assertQueue("myFuck", { exclusive: false });
    console.log(assertQueue);
    channel.bindQueue(assertQueue.queue, exchange, '');
    channel.consume(assertQueue.queue, msg => {
        if (msg.content) {
            channel.ack(msg)
            console.log(msg.content.toString());
        }
    })
}
getMsg();