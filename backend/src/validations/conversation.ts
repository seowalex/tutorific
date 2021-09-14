/* eslint-disable func-names */
/* eslint-disable import/prefer-default-export */
import {
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
} from 'class-validator';
import _ from 'lodash';
import conversationService from '../services/conversation';

export function UniqueConversation(
  property: string,
  validationOptions?: ValidationOptions
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'UniqueConversation',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return conversationService
            .getConversations(relatedValue)
            .then((conversationsFirst) =>
              conversationService
                .getConversations(value)
                .then(
                  (conversationsSecond) =>
                    _.intersectionBy(
                      conversationsFirst,
                      conversationsSecond,
                      'id'
                    ).length === 0
                )
            );
        },
      },
    });
  };
}
