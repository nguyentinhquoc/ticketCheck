import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { TypeClassTicket } from 'src/type_class_ticket/entities/type_class_ticket.entity';

@Entity()
export class TypeTicket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => TypeClassTicket, typeClassTicket => typeClassTicket.type_ticket)
  type_class_tickets: TypeClassTicket[]
}
