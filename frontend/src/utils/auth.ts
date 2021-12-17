import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { firebaseConfig } from '../config/FirebaseConfig';

import type { SignupEntity } from '../models/SignupEntity'
import { restAPI } from './restAPI'

firebase.initializeApp(firebaseConfig)
export const auth = firebase.auth()

export const decodePermissions = (user) => {
  const permsSplit = user.perms.split('_');
  console.log(permsSplit);
}

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
  }
}

