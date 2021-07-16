import { Controller } from '@nestjs/common';
import { Ctx, KafkaContext, MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern('user-created')
  userCreated(@Ctx() context: KafkaContext): void {
    console.log('service c - user-created');
    console.log(context.getMessage().value);
  }

  @MessagePattern('user-deleted')
  userDeleted(@Ctx() context: KafkaContext): void {
    console.log('service c - user-deleted');
    console.log(context.getMessage().value);
  }
}
