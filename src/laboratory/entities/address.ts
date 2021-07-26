import { Column } from 'typeorm';

export class Address {
  @Column()
  description: string;
  @Column()
  number: string;
  @Column({ nullable: true })
  complement: string;
  @Column()
  neighborhood: string;
  @Column()
  zipCode: string;
  @Column()
  city: string;
  @Column()
  state: string;

  constructor(address?: Address) {
    if (address) {
      this.description = address.description;
      this.number = address.number;
      this.complement = address.complement;
      this.neighborhood = address.neighborhood;
      this.zipCode = address.zipCode;
      this.city = address.city;
      this.state = address.state;
    }
  }
}
