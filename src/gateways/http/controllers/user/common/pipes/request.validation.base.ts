import { HttpException, HttpStatus } from "@nestjs/common";
import { ClassConstructor, plainToInstance } from "class-transformer";
import { ValidationError, validate } from "class-validator";

export class RequestValidationBase {
  public async validateClass<T>(cls: ClassConstructor<any>, value: T) {
    const object = plainToInstance(cls, value);

    const errors = await validate(object);

    this.checkConstraintsErrors(this.constraintErrorFormat(errors));
  }

  private constraintErrorFormat(errors: ValidationError[]) {
    const messages: string[] = [];

    errors.forEach((error) => {
      if (error.constraints) {
        messages.push(...Object.values(error.constraints));
      }
    });

    return messages;
  }
  private checkConstraintsErrors(errors: string[]) {
    if (errors.length > 0) {
      throw new HttpException(
        {
          message: errors,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public checkEmptyBody(value: any) {
    if (Object.keys(value).length < 1) {
      throw new HttpException("Validation failed: No payload provided.", HttpStatus.BAD_REQUEST);
    }
  }
}
