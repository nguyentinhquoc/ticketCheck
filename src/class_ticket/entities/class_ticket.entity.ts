import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { TypeClassTicket } from 'src/type_class_ticket/entities/type_class_ticket.entity';

@Entity()
export class ClassTicket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => TypeClassTicket, typeClassTicket => typeClassTicket.class_ticket)
  type_class_tickets: TypeClassTicket[]
}
