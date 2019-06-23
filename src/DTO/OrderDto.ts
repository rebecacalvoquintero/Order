import { ApiModelProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn } from 'typeorm';

import { Status } from '../shared/Status';
import { IsDateString, IsEnum, IsString } from 'class-validator';

export class NewOrderDto {
  @ApiModelProperty({ enum: ['Pending', 'InTransit', 'Delivered', 'Rejected']})
  @IsEnum(['Pending', 'InTransit', 'Delivered', 'Rejected'])
  readonly status: Status;
  @ApiModelProperty({ type: Date, format: 'date-time', example: '2019-02-11T06:20:32.232Z'})
  @IsDateString()
  readonly pickUpTime: Date;
  @ApiModelProperty()
  @IsString()
  readonly pickUpAddress: string;
  @ApiModelProperty()
  @IsString()
  readonly dropOffAddress: string;
}

export class OrderDto  extends NewOrderDto {
  @ApiModelProperty()
  @PrimaryGeneratedColumn('uuid')
  @IsString()
  readonly id: string;
}