import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  createUser(@Body() data: any): Promise<void> {
    return this.appService.createUser(data.name);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): Promise<void> {
    return this.appService.deleteUser(id);
  }
}
