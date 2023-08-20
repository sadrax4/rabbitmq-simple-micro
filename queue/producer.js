const amqp = require("amqplib");
async function initChannel() {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    const queueName1 = "service1";
    await channel.assertQueue(queueName1, { durable: true });
    channel.sendToQueue(queueName1, Buffer.from("hello mother fucker"), { persistent: true });
    setTimeout(() => {
        connection.close();
        process.exit(0);
    }, 2000);
}
for (let index = 0; index < 20; index++) {
    initChannel();
}