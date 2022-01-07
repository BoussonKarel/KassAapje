import { getAuth } from 'firebase/auth'
import type { Order } from '../models/Order'
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
      .catch(e => {
         console.error({ e })
         throw new Error('Er ging iets fout bij het uitvoeren van de query/mutation.')
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
         box,
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
   registers: `query ($organization_id: String!) {
      getRegistersByOrganization(organization_id: $organization_id) {
        register_id,
        name,
        description,
        organization {
           organization_id,
           name
        }
      }
    }`,
   register: `query ($register_id: String!){
      getRegisterById(id: $register_id) {
          name,
          description
      }
  }`,
   invitation: `query ($invitation_id: String!) {
      getInvitationInfo(id: $invitation_id) {
        invitation_id,
        register {
           register_id,
           name
        },
        organization {
           organization_id,
           name
        },
        role,
        expiration_date
      }
    }`,
   products: `query ($register_id: String!){
      getProducts(register_id: $register_id) {
         product_id,
         name,
         price,
         stock_quantity
      }
   }`,
   product: `query ($product_id: String!){
      getProductById(id: $product_id) {
          name,
          price,
          stock_quantity
      }
   }`,
}

export const gqlMutations = {
   addOrganization: `mutation ($organization: OrganizationInput!) {
      addOrganization(organization: $organization) {
         organization_id,
         name
      }
   }`,
   updateOrganization: `mutation ($organization: OrganizationUpdateInput!) {
      updateOrganization(organization: $organization) {
         organization_id
      }
   }`,
   addRegister: `mutation ($register: RegisterInput!) {
      addRegister(register: $register) {
         register_id,
         name
      }
   }`,
   updateRegister: `mutation ($register: RegisterUpdateInput!) {
      updateRegister(register: $register) {
         register_id
      }
   }`,
   acceptInvitation: `mutation ($invitation_id: String!) {
      acceptInvitation(id: $invitation_id)
   }`,
   addProduct: `mutation ($product: ProductInput!) {
      addProduct(product: $product) {
         product_id
      }
   }`,
   updateProduct: `mutation ($product: ProductUpdateInput!) {
      updateProduct(product: $product) {
         product_id
      }
   }`,
   addOrder: `mutation ($order: OrderInput!) {
      addOrder(order: $order) {
         order_id
      }
   }`
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
      registers: (organization_id: string) =>
         query('getRegistersByOrganization', gqlQueries.registers, { organization_id }),
      register: (register_id: string) =>
         query('getRegisterById', gqlQueries.register, { register_id }),
      invitation: (invitation_id: string) =>
         query('getInvitationInfo', gqlQueries.invitation, { invitation_id }),
      products: (register_id: string) => query('getProducts', gqlQueries.products, { register_id }),
      product: (product_id: string) => query('getProductById', gqlQueries.product, { product_id }),
   },
   mutations: {
      addOrganization: organization =>
         query('addOrganization', gqlMutations.addOrganization, { organization }),
      updateOrganization: organization =>
         query('updateOrganization', gqlMutations.updateOrganization, { organization }),
      addRegister: register => query('addRegister', gqlMutations.addRegister, { register }),
      updateRegister: register =>
         query('updateRegister', gqlMutations.updateRegister, { register }),
      acceptInvitation: (invitation_id: string) =>
         query('acceptInvitation', gqlMutations.acceptInvitation, { invitation_id }),
      addProduct: product => query('addProduct', gqlMutations.addProduct, { product }),
      updateProduct: product => query('updateProduct', gqlMutations.updateProduct, { product }),
      addOrder: (order: Order) => {
         console.log({order})
         return query('addOrder', gqlMutations.addOrder, { order })
      },
   },
}
