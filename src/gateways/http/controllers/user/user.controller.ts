import { User } from "@domains/user";
import { Body, Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserFacade } from "@use-cases/facade/user.facade";
import { CreateUserDecorator } from "./decorators/create.user.decorator";
import { FindAllUserDecorator } from "./decorators/find.all.user.decorator";
import { UpdateUserDecorator } from "./decorators/update.user.decorator";
import { UserCreatePipe } from "./pipes/user.create.pipe";
import { UserUpdatePipe } from "./pipes/user.update.pipe";

@Controller("user")
@ApiTags("User")
export class UserController {
  constructor(private readonly userFacade: UserFacade) {}

  @CreateUserDecorator()
  public async create(@Body(UserCreatePipe) userToCreate: User): Promise<void> {
    await this.userFacade.create(userToCreate);
  }

  @FindAllUserDecorator()
  public async findAll(): Promise<User[]> {
    return this.userFacade.findAll();
  }

  @UpdateUserDecorator()
  public async update(@Body(UserUpdatePipe) userToUpdate: User): Promise<void> {
    await this.userFacade.update(userToUpdate);
  }
}
