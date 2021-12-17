import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../config/firebaseConfig'

import type { SignupEntity } from '../models/SignupEntity'
import { restAPI } from './restAPI'

initializeApp(firebaseConfig)

export enum Role {
  OWNER = '*',
  USER = 'u'
}

export const getPermissions = async () => {
  const perms = await getAuth()
    .currentUser.getIdTokenResult()
    .then((idTokenResult) => idTokenResult.claims.perms as string);

  const permsSplit = perms.split('_');
  const orgPerms = permsSplit[0].split(',');
  const regPerms = permsSplit[1].split(',');

  const roles = {
    organizations: [],
    registers: []
  };

  for (const org of orgPerms) {
    const parts = org.split('/');
    const organization_id = parts[0];
    const role = parts[1];
    roles.organizations.push({
      id: organization_id,
      role: role
    })
  }

  for (const reg of regPerms) {
    const parts = reg.split('/');
    const register_id = parts[0];
    const role = parts[1];
    roles.registers.push({
      id: register_id,
      role: role
    })
  }

  return roles;
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

