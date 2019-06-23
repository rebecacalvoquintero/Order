import {
  Body,
  Controller,
  Get,
  Header,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  ParseUUIDPipe,
  Post,
  UsePipes,
} from '@nestjs/common';
import { NewOrderDto, OrderDto } from '../DTO/OrderDto';
import { OrderService } from '../services/order.service';
import { ValidationPipe } from '../shared/validation.pipe';

@Controller( 'order' )
export class OrderController {

  private logger = new Logger( 'OrderController' );

  constructor(private readonly orderService: OrderService) {
  }

  @Post()
  @Header( 'Cache-Control', 'none' )
  @UsePipes( new ValidationPipe() )
  async create(@Body() order: NewOrderDto): Promise<any> {
    this.logger.log( JSON.stringify( order ) );
    return await this.orderService.create( order );
  }

  @Get()
  @UsePipes( new ValidationPipe() )
  async findAll(): Promise<OrderDto[]> {
    return await this.orderService.findAll();
  }

  @Get( ':id' )
  @UsePipes(new ValidationPipe())
  async findOne(@Param( 'id' , ParseUUIDPipe) id: string): Promise<OrderDto> {
    const order = await this.orderService.findOne( id );
    if (!order) {
      throw new HttpException( 'Not Found', HttpStatus.NOT_FOUND );
    }
    return order;
  }
}
