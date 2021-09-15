/* eslint-disable func-names */
/* eslint-disable import/prefer-default-export */
import {
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
} from 'class-validator';
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
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return userService.getUserByEmail(value).then((user) => {
            if (user?.id === relatedValue) return true;
            if (user) return false;
            return true;
          });
        },
      },
    });
  };
}
