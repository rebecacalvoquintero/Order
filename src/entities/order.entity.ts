import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from '../shared/Status';

@Entity()
export class Order {
  @PrimaryGeneratedColumn( 'uuid' )
  id: string;

  @Column( 'enum', { enum: Status } )
  status: Status;

  @Column()
  pickUpTime: Date;

  @Column()
  pickUpAddress: string;

  @Column()
  dropOffAddress: string;
}
