import { createParamDecorator } from "type-graphql";
import { EntityManager, getManager } from "typeorm";
import { User } from "../entity/user";
import { Context } from 'vm'
import { addCurrentUserToRequest } from "../auth/customAuthChecker";

export const CurrentUser = () => {
  return createParamDecorator<Context>(
    async ({context}) => {
      const manager: EntityManager = getManager()

      const {success} = addCurrentUserToRequest(context.request)

      if (!success) return undefined;

      console.log(context.request.currentUser)
  
      return await manager.findOne(User, {
        user_id: context.request.currentUser.uid,
      })
    }
    );
}