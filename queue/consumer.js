const amqp = require("amqplib");
async function received() {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    const queueName1 = "service1";
    await channel.assertQueue(queueName1, { durable: true });
    let index = 0;
    channel.consume(queueName1, (msg) => {
        console.log(`${index}`, msg.content.toString());
        index++;
    }, { noAck: true });
}
received();