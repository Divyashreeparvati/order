import { Consumer, Kafka, logLevel, Partitioners, Producer } from "kafkajs";
import { MessageBrokerType, MessageHandler, PublishType } from "./broker.type";
import { MessageType, OrderEvent, TOPIC_TYPE } from "../../types";

const CLIENT_ID = "order-service"
const GROUP_ID = "order-service-group"
const BROKERS = [ "localhost:9092"]

const kafka = new Kafka({
    clientId: CLIENT_ID,
    brokers: BROKERS,
    logLevel: logLevel.INFO
})

let producer: Producer
let consumer: Consumer

const createTopic = async (topic: string[]) => {
    const topics = topic.map((t) => ({
        topic: t,
        numPartitions: 2,
        replicationFactor: 1
    }))

    const admin = kafka.admin();
    await admin.connect()
    const topicExists = await admin.listTopics()
    for (const t of topics) {
        if (!topicExists.includes(t.topic)) {
            await admin.createTopics({
                topics: [t]
            })
        }
    }

    await admin.disconnect()
}

const connectionProducer = async <T>(): Promise<T> => {
    await createTopic(["OrderEvents"])

    if (!producer) {
        producer = kafka.producer()
    }

    producer = kafka.producer({
        createPartitioner: Partitioners.DefaultPartitioner
    })

    await producer.connect()
    return producer as unknown as T
}

const disconnectProducer = async (): Promise<void> => {
    if (producer) {
        await producer.disconnect()
    }
}

export const publish = async (data: PublishType): Promise<boolean> => {
    const producer = await connectionProducer<Producer>()
    const result = await producer.send({
        topic: data.topic,
        messages: [{
            headers: data.headers,
            key: data.event,
            value: JSON.stringify(data.message)
        }]
    })
    return !result
}

const connectConsumer = async <T>(): Promise<T> => {
    if (consumer) {
        return consumer as unknown as T
    }
    consumer = kafka.consumer({
        groupId: GROUP_ID
    })
    await consumer.connect()

    return consumer as unknown as T
}

const disconnectConsumer = async (): Promise<void> => {
    if (consumer) {
        await consumer.disconnect()
    }
}

const subscribe = async (messageHandler: MessageHandler, topic: TOPIC_TYPE): Promise<void> => {
    const consumer = await connectConsumer<Consumer>();
    await consumer.subscribe({ topic: topic, fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            if (topic !== "OrderEvents") {
                return
            }

            if (message.key && message.value) {
                const inputMessage: MessageType = {
                    header: message.headers,
                    event: message.key.toString() as OrderEvent,
                    data: message.value ? JSON.parse(message.value.toString()) : null
                }

                await messageHandler(inputMessage)
                await consumer.commitOffsets([{
                    topic: topic,
                    partition: partition,
                    offset: (Number(message.offset) + 1).toString()
                }])
            }
        }
    })
}

export const MessageBroker: MessageBrokerType = {
    connectionProducer,
    disconnectProducer,
    publish,
    connectConsumer,
    disconnectConsumer,
    subscribe
}