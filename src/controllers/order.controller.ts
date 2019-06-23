import { Body, Controller, Header, Post } from '@nestjs/common';
import { NewOrderDto } from '../DTO/OrderDto';
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
}
