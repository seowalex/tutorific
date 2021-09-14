/* eslint-disable func-names */
/* eslint-disable import/prefer-default-export */
import { ValidationOptions, registerDecorator } from 'class-validator';
import userService from '../services/user';

export function UniqueEmail(
  property: string,
  validationOptions?: ValidationOptions
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'UniqueEmail',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any) {
          return userService.getUserByEmail(value).then((user) => {
            if (user) return false;
            return true;
          });
        },
      },
    });
  };
}
