import { getAuth } from 'firebase/auth'
import { baseUrl } from '../config/api'

const query = async (name: string, query: string, variables?: Object) => {
   return await fetch(`${baseUrl}/v1/graphQL`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${await getAuth().currentUser?.getIdToken()}`,
      },
      body: JSON.stringify({
         query,
         variables,
      }),
   })
      .then(res => res.json())
      .then(json => {
         if (json.errors) throw json.errors[0]
         else return json.data[name]
      })
}

export const gqlQueries = {
   organizations: `query {
      getOrganizations {
        organization_id,
        name,
        color
      }
    }`,
   organizationsWithRegisters: `query {
      getOrganizations {
        organization_id,
        name,
        color,
        registers {
          register_id,
          name,
          color
        }
      }
    }`,
   organization: `query ($id: String!) {
      getOrganizationById(id: $id) {
         name,
         color
      }
   }`,
}

export const gqlHelper = {
   queries: {
      organizations: () => query('getOrganizations', gqlQueries.organizations),
      organizationsWithRegisters: () =>
         query('getOrganizations', gqlQueries.organizationsWithRegisters),
      organization: (id: string) => query('getOrganizationById', gqlQueries.organization, { id }),
   },
}