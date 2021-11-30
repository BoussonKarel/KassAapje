// app.ts
import express, { Request, Response } from 'express'
// Database, typeorm
import { createDatabase } from 'typeorm-extension'
import {
  Connection,
  ConnectionOptions,
  createConnection,
  getConnectionOptions,
} from 'typeorm'
import seedDatabase from './seeders/seeder'

// Firebase / auth
import admin from 'firebase-admin'
import dotenv from 'dotenv'
import authMiddleware from './auth/authMiddleware'

// CORS
import cors from 'cors'

// GraphQL
import { GraphQLSchema } from 'graphql'
import { buildSchema } from 'type-graphql'
import { graphqlHTTP } from 'express-graphql'

// Resolvers
import { RegisterResolver } from './resolvers/RegisterResolver'
import { ProductResolver } from './resolvers/ProductResolver'
import { OrganizationResolver } from './resolvers/OrganizationResolver'



(async () => {
  const connectionOptions: ConnectionOptions = await getConnectionOptions()

  // Create the database before we make the connection. This will also add the tables
  createDatabase({ ifNotExist: true }, connectionOptions)
    .then(() => console.log('Database has been created!'))
    .then(createConnection)
    .then(async (connection: Connection) => {
      seedDatabase(connection)

      // FIREBASE-ADMIN
      dotenv.config() // This will load in the GOOGLE_APPLICATION_CREDENTIALS

      admin.initializeApp({
        credential: admin.credential.applicationDefault(),
      })

      // APP SETUP
      const app = express(),
        port = process.env.PORT || 3001

      app.use(cors())

      // GRAPHQL
      let schema: GraphQLSchema = {} as GraphQLSchema

      await buildSchema({
        resolvers: [OrganizationResolver, RegisterResolver, ProductResolver],
        // authChecker: customAuthChecker,
        // authMode: 'null'
      }).then(_ => {
        schema = _
      })

      // GraphQL init middleware
      app.use(
        '/v1/', // Url, do you want to keep track of a version?
        graphqlHTTP((request, response) => ({
          schema: schema,
          context: { request, response },
          graphiql: true,
        })),
      )

      // MIDDLEWARE
      app.use(express.json()) // for parsing application/json
      app.use(authMiddleware)

      // ROUTES
      app.get('/', (request: Request, response: Response) => {
        response.send(`KassAapje backend is working`)
      })

      // SIGNUP
      app.post('/signup', async (request: Request, response: Response) => {
        const { email, password, name } = request.body

        const user = await admin.auth().createUser({
          email,
          password,
          displayName: name,
        })

        return response.json(user)
      })

      

      // APP START
      app.listen(port, () => {
        console.info(
          `\nKassAapje backend 🧾🐵💰 \n>>> http://localhost:${port}/v1`,
        )
      })
    })
    .catch(error => console.error(error))
})()
