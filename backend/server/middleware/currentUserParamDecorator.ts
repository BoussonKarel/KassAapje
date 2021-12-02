import { createParamDecorator } from "type-graphql";
import { EntityManager, getManager } from "typeorm";
import { Context } from 'vm'
import { addCurrentUserToRequest } from "../auth/customAuthChecker";

export const CurrentUser = () => {
  return createParamDecorator<Context>(
    async ({context}) => {
      const manager: EntityManager = getManager()

      const {user} = await addCurrentUserToRequest(context.request)

      return user;
    }
    );
}