// app.ts
import express, { Request, Response } from 'express'
import { createDatabase } from 'typeorm-extension'
import {
  Connection,
  ConnectionOptions,
  createConnection,
  getConnectionOptions,
} from 'typeorm'
import seedDatabase from './seeders/seeder'
import cors from 'cors'

;import { GraphQLSchema } from 'graphql';
import { OrganizationResolver } from './resolvers/OrganizationResolver';
import { buildSchema } from 'type-graphql';
import { graphqlHTTP } from 'express-graphql';
(async () => {
  const connectionOptions: ConnectionOptions = await getConnectionOptions()

  // Create the database before we make the connection. This will also add the tables
  createDatabase({ ifNotExist: true }, connectionOptions)
    .then(() => console.log('Database has been created!'))
    .then(createConnection)
    .then(async (connection: Connection) => {
      seedDatabase(connection)

      // APP SETUP
      const app = express(),
        port = process.env.PORT || 3001

      app.use(cors())

      // MIDDLEWARE
      app.use(express.json()) // for parsing application/json

      // ROUTES
      app.get('/', (request: Request, response: Response) => {
        response.send(`KassAapje backend is working`)
      })

      /**
       *
       * @description create the graphql schema with the imported resolvers
       */
      let schema: GraphQLSchema = {} as GraphQLSchema

      await buildSchema({
        resolvers: [OrganizationResolver],
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

      // APP START
      app.listen(port, () => {
        console.info(
          `\nKassAapje backend 🧾🐵💰 \n>>> http://localhost:${port}/`,
        )
      })
    })
    .catch(error => console.error(error))
})()
