import { Body, Controller, Get, Header, Post } from '@nestjs/common';
import { NewOrderDto, OrderDto } from '../DTO/OrderDto';
import { OrderService } from '../services/order.service';

@Controller('order')
export class OrderController {

  constructor(private readonly orderService: OrderService) {
  }

  @Post()
  @Header('Cache-Control', 'none')
  async create(@Body() order: NewOrderDto): Promise<any> {
    return await this.orderService.create(order);
  }

  @Get()
  async findAll(): Promise<OrderDto[]> {
    return await this.orderService.findAll();
  }

}
