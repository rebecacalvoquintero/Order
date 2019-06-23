import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { OrderModule } from './order.module';


@Module( {
  imports: [TypeOrmModule.forRoot(), OrderModule],
  controllers: [],
  providers: [],
} )
export class AppModule {
  constructor(private readonly connection: Connection) {
  }
}
