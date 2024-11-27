import { User } from "@domains/user";
import { Body, Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserFacade } from "@use-cases/facade/user.facade";
import { CreateUserDecorator } from "./decorators/create.user.decorator";
import { UserCreatePipe } from "./pipes/user.create.pipe";

@Controller("user")
@ApiTags("User")
export class UserController {
  constructor(private readonly userFacade: UserFacade) {}

  @CreateUserDecorator()
  public async create(@Body(UserCreatePipe) userToCreate: User): Promise<void> {
    await this.userFacade.create(userToCreate);
  }
}
