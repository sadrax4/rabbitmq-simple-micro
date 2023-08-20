const amqplib = require("amqplib");
async function sendMsg() {
    const connection = await amqplib.connect("amqp://localhost:5672");
    const exchange = "headerMessage";
    const channel = await connection.createChannel();
    await channel.assertExchange(exchange, "headers");
    channel.publish(exchange, '', Buffer.from("message"), {
        headers: {
            author: "ss",
            price: "22",
            private: "true"
        },
        appId: process.pid.toString()
    });
}
sendMsg();