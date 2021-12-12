// app.ts
import express, { Request, Response } from 'express'
// Database, typeorm
import { createDatabase } from 'typeorm-extension'
import {
  Connection,
  ConnectionOptions,
  createConnection,
  EntityManager,
  getConnection,
  getConnectionOptions,
  getManager,
} from 'typeorm'
import seedDatabase from './seeders/seeder'

// Firebase / auth
import admin from 'firebase-admin'
import dotenv from 'dotenv'

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
import { RoleResolver } from './resolvers/RoleResolver'
import { User } from './entity/user'
import { customAuthChecker } from './auth/customAuthChecker'
import authenticateRequests from './auth/authenticateRequests'

let attempts = 0;
let max_attempts = 10;
const main = async () => {
  const connectionOptions: ConnectionOptions = await getConnectionOptions()

  // CREATE DATABASE+TABLES, CONNECT, SEED DATABASE
  createDatabase({ ifNotExist: true }, connectionOptions)
    .then(() => console.log('Database has been created!'))
    .then(createConnection)
    .then(async (connection: Connection) => {
      seedDatabase(connection)

      // APP SETUP
      const app = express(),
        port = process.env.PORT || 8888

      // CORS
      app.use(cors())

      // FIREBASE-ADMIN
      dotenv.config() // This will load in the GOOGLE_APPLICATION_CREDENTIALS

      admin.initializeApp({
        credential: admin.credential.applicationDefault(),
      })

      // MIDDLEWARE
      app.use(express.json()) // for parsing application/json

      app.post('/signup', async (request: Request, response: Response) => {
        const manager : EntityManager = getManager();

        const {email, password, name} = request.body;

        // Create firebase user
        await admin.auth().createUser({
          email, password, displayName: name
        }).then(async firebaseUser => {
          // User created, add to database
          const newUser = manager.create(User, firebaseUser);
          await manager.save(newUser).then(savedUser => {
            console.info("✅ Succesfully created user")
            response.send(savedUser).status(201);
          }).catch(async error => {
            console.error(`⛔ (${email}) Could not save new user to database:`, error)
            // Remove user from firebase?
            await admin.auth().deleteUser(firebaseUser.uid)
            response.send("Could not save new user to database.").status(500)
          })
        }).catch(error => {
          console.error(`⛔ (${email}) Could not register user at firebase:`, error)
            response.send("Could not register user at firebase.").status(500)
        })
      })

      // GRAPHQL
      let schema: GraphQLSchema = {} as GraphQLSchema

      await buildSchema({
        resolvers: [OrganizationResolver, RegisterResolver, ProductResolver, RoleResolver],
        authChecker: customAuthChecker,
        authMode: 'null'
      }).then(_ => {
        schema = _
      })

      // GRAPHQL INIT MIDDLEWARE
      app.use(
        '/v1/', // Url, do you want to keep track of a version?
        graphqlHTTP((request, response) => ({
          schema: schema,
          context: { request, response },
          graphiql: true,
        })),
      )

      // ROUTES
      app.get('/', (request: Request, response: Response) => {
        response.send(`KassAapje backend is working`)
      })

      // AUTHENTICATE REQUESTS AFTER THIS
      app.use(authenticateRequests)

      // APP START
      app.listen(port, () => {
        console.info(
          `\nKassAapje backend 🧾🐵💰 \n>>> http://localhost:${port}/v1\n`,
        )
      })
    })
    .catch(error => {
      console.error(error)
      getConnection().close();
      attempts++;
      if (attempts <= max_attempts) setTimeout(main, 10000);
    })
}

main()
