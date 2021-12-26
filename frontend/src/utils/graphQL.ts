import { getAuth } from 'firebase/auth'
import { baseUrl } from '../config/api'

const query = async (name: string, query: string, variables?: Object) => {
   const body = JSON.stringify({
      query,
      variables,
   });
   console.log(body)
   const res = await fetch(`${baseUrl}/v1/graphQL`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${await getAuth().currentUser?.getIdToken()}`,
      },
      body,
   })
      .then(res => res.json())
      .catch(error => console.error({ error }))

      return res.data[name]
}

export const gqlHelper = {
   queries: {
      organizations: () => query(
         'getOrganizations',
         `query {
            getOrganizations {
              organization_id,
              name,
              color
            }
          }
        `,
      ),
      organizationsWithRegisters: () => query(
        'getOrganizations',
        `query {
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
        }`
      ),
      organization: (id: string) => query(
         'getOrganizationById',
         `query {
            getOrganizationById(id: "${id}") {
               name,
               color
            }
         }`
      )
   },
}
