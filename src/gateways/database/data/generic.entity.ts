import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class GenericEntity {
  @PrimaryGeneratedColumn({ type: "integer" })
  public id?: number;

  @CreateDateColumn({
    name: "created_at",
  })
  public createdAt: Date;

  @UpdateDateColumn({
    name: "last_update",
  })
  public lastUpdate: Date;

  @DeleteDateColumn({
    name: "removed_date",
    nullable: true,
  })
  public removedDate: Date;
}
