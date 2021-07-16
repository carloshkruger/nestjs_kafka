import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import {
  ClientKafka,
  Ctx,
  KafkaContext,
  MessagePattern,
} from '@nestjs/microservices';
import { Producer } from '@nestjs/microservices/external/kafka.interface';

@Controller()
export class AppController implements OnModuleInit {
  private kafkaProducer: Producer;

  constructor(@Inject('KAFKA_SERVICE') private clientKafka: ClientKafka) {}

  async onModuleInit() {
    this.kafkaProducer = await this.clientKafka.connect();
  }

  @MessagePattern('user-created')
  async userCreated(@Ctx() context: KafkaContext): Promise<void> {
    console.log('service b - user-created');
    console.log(context.getMessage().value);

    await this.kafkaProducer.send({
      topic: 'event-from-service-b',
      messages: [
        {
          value: JSON.stringify({ value: 'test test test' }),
        },
      ],
    });
  }
}
