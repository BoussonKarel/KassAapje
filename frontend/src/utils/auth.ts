import { writable } from 'svelte/store'
import { getAuth } from 'firebase/auth'
import type { User } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../config/firebaseConfig'

import type { SignupEntity } from '../models/SignupEntity'
import { restAPI } from './restAPI'

initializeApp(firebaseConfig)

export const authStore = writable<{ user?: any; roles?: any }>(null)

export const setAuthStore = async (user: User) => {
  const token = await user.getIdTokenResult();
  authStore.set({user: token.claims, roles: await getRoles(token.claims)})
}

export const getToken = async () => {
   return getAuth().currentUser.getIdToken();
}

export enum Role {
   OWNER = '*',
   USER = 'u',
}

const getRoles = async (claims) => {
   const perms = claims.perms as string;

   if (!perms) return [];

   const permsSplit = perms.split('_') || []
   const orgPerms = permsSplit[0].split(',') || []
   const regPerms = permsSplit[1].split(',') || []

   const roles = {
      organizations: [],
      registers: [],
   }

   for (const org of orgPerms) {
      const parts = org.split('/')
      const organization_id = parts[0]
      const role = parts[1]
      roles.organizations.push({
         id: organization_id,
         role: role,
      })
   }

   for (const reg of regPerms) {
      const parts = reg.split('/')
      const register_id = parts[0]
      const role = parts[1]
      roles.registers.push({
         id: register_id,
         role: role,
      })
   }

   return roles
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
   },
}
