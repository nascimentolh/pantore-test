import { UserRole } from "@domains/user-role.enum";
import { Builder, IBuilder } from "builder-pattern";
import { Column, Entity } from "typeorm";
import { EncryptionTransformer } from "typeorm-encrypted";
import { GenericEntity } from "./generic.entity";

@Entity("user")
export class UserEntity extends GenericEntity {
  @Column("varchar", { length: 70, nullable: false, unique: true })
  public email: string;

  @Column("varchar", { length: 255, nullable: false })
  public name: string;

  @Column("varchar", {
    nullable: true,
    transformer: new EncryptionTransformer({
      key: process.env.PASSWORD_ENCRYPTION_KEY,
      algorithm: process.env.PASSWORD_ENCRYPTION_ALGORITHM,
      ivLength: Number(process.env.PASSWORD_ENCRYPTION_LENGTH),
      iv: process.env.PASSWORD_ENCRYPTION_IV,
    }),
  })
  public password: string;

  @Column("enum", { enum: UserRole, default: UserRole.CUSTOMER })
  public role: UserRole;

  public static builder(): IBuilder<UserEntity> {
    return Builder<UserEntity>();
  }
}
