import { createParamDecorator } from 'type-graphql'
import { EntityManager, getManager } from 'typeorm'
import { Context } from 'vm'
import { addCurrentUserToRequest } from '../auth/customAuthChecker'
import { User } from '../entity/user'

export const CurrentUser = () => {
  return createParamDecorator<Context>(async ({ context }) => {
    return await addCurrentUserToRequest(context.request).then(({ user }) => {
      return getManager().findOneOrFail(
        User,
        { uid: user.uid },
        { relations: ['permissions'] },
      )
    })
  })
}
