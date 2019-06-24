import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { OrderService } from '../src/services/order.service';
import { Status } from '../src/shared/Status';
import moment = require('moment');

describe('OrderController (e2e)', () => {
  let app: INestApplication;
  const listOfOrders = [
    {
      id: '371e5c95-5470-4c40-a136-99062b906961',
      status: 'some-status',
      pickUpTime: 'some-date',
      pickUpAddress: 'some-address',
      dropOffAddress: 'some-address',
    },
    {
      id: '371e5c95-5470-4c40-a136-99062b906991',
      status: 'some-status',
      pickUpTime: 'some-date',
      pickUpAddress: 'other-address',
      dropOffAddress: 'other-address',
    },
  ];
  const newOrder = {
    status: Status.Pending,
    pickUpTime: '2019-02-11T06:20:32.232Z',
    pickUpAddress: 'some-address',
    dropOffAddress: 'some-address',
  };
  const orderService = {
    create: () => newOrder,
    findAll: () => listOfOrders,
    findOne: () => listOfOrders[1],
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(OrderService)
      .useValue(orderService)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('POST /orders', () => {
    return request(app.getHttpServer())
      .post('/orders')
      .send(newOrder)
      .expect(201)
      .expect(newOrder);
  });

  it('GET /orders ', () => {
    return request(app.getHttpServer())
      .get('/orders')
      .expect(200)
      .expect(listOfOrders);
  });

  it('GET /orders/{id} ', () => {
    return request(app.getHttpServer())
      .get('/orders/371e5c95-5470-4c40-a136-99062b906991')
      .expect(200)
      .expect(listOfOrders[1]);
  });

  describe('handling errors', () => {
    it('should send a HttpException and a 400 status if bad request', () => {
      const errorMessage = {
        'statusCode': 400,
        'timestamp': moment().format('YYYY-M-DD'),
        'path': '/orders',
        'method': 'POST',
        'message': 'Validation failed: isEnum status must be a valid enum value, ' +
        'isDateString pickUpTime must be a ISOString, isString pickUpAddress must be a string, ' +
        'isString dropOffAddress must be a string',
      };

      return request(app.getHttpServer())
        .post('/orders')
        .send('some-order')
        .expect(400)
        .expect(errorMessage);
    });

    it('should send a HttpException and a 404 status if bad url', () => {
      const errorMessage = {
        'statusCode': 404,
        'timestamp': moment().format('YYYY-M-DD'),
        'path': '/',
        'method': 'GET',
        'message': 'Not Found',
      };
      return request(app.getHttpServer())
        .get('/')
        .expect(404)
        .expect(errorMessage);
    });

    it('should send a HttpException and a 400 status if the uuid has not the correct format', () => {
      const errorMessage = {
        'statusCode': 400,
        'timestamp': moment().format('YYYY-M-DD'),
        'path': '/orders/%7Brandom-uuid%7D',
        'method': 'GET',
        'message': 'Bad Request',
      };
      return request(app.getHttpServer())
        .get('/orders/{random-uuid}')
        .expect(400)
        .expect(errorMessage);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
