import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from '../services/order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { OrderModule } from '../order.module';
import { Status } from '../shared/Status';

describe( 'OrderDto Controller', () => {
  let orderController: OrderController;
  let orderService: OrderService;

  beforeAll( async () => {
    const module: TestingModule = await Test.createTestingModule( {
      imports: [
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature( [Order] ),
        OrderModule,
      ],
      controllers: [OrderController],
      providers: [OrderService],
    } ).compile();

    orderController = module.get<OrderController>( OrderController );
    orderService = module.get<OrderService>( OrderService );

  } );

  it( 'should be defined', () => {
    expect( orderController ).toBeDefined();
  } );

  it( 'should create an order', () => {
    const order = {
      id: 'some-order',
      status: Status.Delivered,
      pickUpTime: new Date(),
      pickUpAddress: 'some-address',
      dropOffAddress: 'some-address',
    };
    jest.spyOn( orderService, 'create' )
      .mockImplementation( () => Promise.resolve( order ) );

    expect( orderController.create( order ) ).toEqual(Promise.resolve(order));
  } );
} );


