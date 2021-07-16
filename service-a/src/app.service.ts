import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Producer } from '@nestjs/microservices/external/kafka.interface';

@Injectable()
export class AppService implements OnModuleInit {
  private kafkaProducer: Producer;

  constructor(@Inject('KAFKA_SERVICE') private clientKafka: ClientKafka) {}

  async onModuleInit() {
    this.kafkaProducer = await this.clientKafka.connect();
  }

  async createUser(name: string): Promise<void> {
    // Faz o que tem que fazer, como aplicar alguma regra de negócio e gravar no banco de dados

    const userId = Math.random();
    const userData = { id: userId, name };

    await this.kafkaProducer.send({
      topic: 'user-created',
      messages: [
        {
          value: JSON.stringify(userData),
        },
      ],
    });
  }

  async deleteUser(id: string): Promise<void> {
    // Faz o que tem que fazer, como aplicar alguma regra de negócio e remover do banco de dados

    await this.kafkaProducer.send({
      topic: 'user-deleted',
      messages: [
        {
          value: JSON.stringify({ id }),
        },
      ],
    });
  }
}
