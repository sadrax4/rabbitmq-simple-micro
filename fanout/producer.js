const amqplib = require("amqplib");
async function sendMsg() {
    const connection = await amqplib.connect("amqp://localhost:5672");
    const exchange = "logs";
    const channel = await connection.createChannel();
    await channel.assertExchange(exchange, "fanout");
    const bufferMessage = Buffer.from("im send message from producer");
    await channel.assertQueue("myFuck", 'fanout');
    channel.publish(exchange, '', bufferMessage);
    setTimeout(() => {
        connection.close();
        process.exit(0);
    }, 2000);
}
sendMsg();