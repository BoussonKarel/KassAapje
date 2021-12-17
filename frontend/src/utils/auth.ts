import type { SignupEntity } from 'src/models/SignupEntity'
import { restAPI } from './restAPI'

export const authHelper = {
  signup: async (newUser: SignupEntity) => {
    return await restAPI
      .post('signup', newUser)
      .then(data => {
        return data
      })
      .catch(error => {
        throw error
      })
  },
}
