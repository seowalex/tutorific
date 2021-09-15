/* eslint-disable func-names */
/* eslint-disable import/prefer-default-export */
import {
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
} from 'class-validator';
import Conversation from '../models/conversation';
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
          const relatedValue = (args.object as any)[relatedPropertyName]; // other's profile id

          // there should not exist a pair in the conversation table that has (relatedValue, value)
          const incluesBothIds = (conversation: Conversation) =>
            (conversation.firstProfile === value &&
              conversation.secondProfile === relatedValue) ||
            (conversation.firstProfile === relatedValue &&
              conversation.secondProfile === value);

          return conversationService
            .getConversations(relatedValue)
            .then((conversationsFirst) =>
              conversationService
                .getConversations(value)
                .then((conversationsSecond) => {
                  const conversationsOfProfiles =
                    conversationsFirst.concat(conversationsSecond);
                  return !conversationsOfProfiles.some(incluesBothIds);
                })
            );
        },
      },
    });
  };
}
