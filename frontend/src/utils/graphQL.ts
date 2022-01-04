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
      }
    }`,
   userOrganizations: `query {
      getUserOrganizations {
        organization_id,
        name,
      }
    }`,
   organizationsWithRegisters: `query {
      getOrganizations {
        organization_id,
        name,
        registers {
          register_id,
          name,
        }
      }
    }`,
   organization: `query ($id: String!) {
      getOrganizationById(id: $id) {
         name,
         website,
         email,
         zip,
         country,
         street,
         street_number,
         city,
      
      }
   }`,
   userOrganizationsWithRegisters: `query {
      getUserOrganizations {
        organization_id,
        name,
        registers {
          register_id,
          name,
        }
      }
    }`,
}

export const gqlHelper = {
   queries: {
      organizations: () => query('getOrganizations', gqlQueries.organizations),
      userOrganizations: () => query('getUserOrganizations', gqlQueries.userOrganizations),
      organizationsWithRegisters: () =>
         query('getOrganizations', gqlQueries.organizationsWithRegisters),
      userOrganizationsWithRegisters: () =>
         query('getUserOrganizations', gqlQueries.userOrganizationsWithRegisters),
      organization: (id: string) => query('getOrganizationById', gqlQueries.organization, { id }),
   },
}
