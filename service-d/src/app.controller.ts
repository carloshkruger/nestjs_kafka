import { Controller } from '@nestjs/common';
import { Ctx, KafkaContext, MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern('event-from-service-b')
  eventFromServiceB(@Ctx() context: KafkaContext): void {
    console.log('service d - event-from-service-b');
    console.log(context.getMessage().value);
  }
}
