// app.ts
import express, { Request, Response } from 'express'
// Database, typeorm
import { createDatabase } from 'typeorm-extension'
import {
  Connection,
  ConnectionOptions,
  createConnection,
  EntityManager,
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
import { InvitationResolver } from './resolvers/InvitationResolver'
import { User } from './entity/user'
import { customAuthChecker } from './auth/customAuthChecker'
import authenticateRequests from './auth/authenticateRequests'
import { OrderResolver } from './resolvers/OrderResolver'

;(async () => {
  const connectionOptions: ConnectionOptions = await getConnectionOptions()

  const initDatabase = () => {
    // CREATE DATABASE
    return (
      createDatabase({ ifNotExist: true }, connectionOptions)
        .then(() => {
          console.log('Database has been created.')
        })
        // CREATE CONNECTION
        .then(createConnection)
        // SEED DATABASE
        .then(async (connection: Connection) => {
          seedDatabase(connection)
        })
    )
  }

  const main = async () => {
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
      const manager: EntityManager = getManager()

      const { email, password, name } = request.body

      // Create firebase user
      await admin
        .auth()
        .createUser({
          email,
          password,
          displayName: name,
        })
        .then(async firebaseUser => {
          // User created, add to database
          const newUser = manager.create(User, firebaseUser)
          await manager
            .save(newUser)
            .then(savedUser => {
              console.info('??? Succesfully created user')
              response.send(savedUser).status(201)
            })
            .catch(async error => {
              console.error(
                `??? (${email}) Could not save new user to database:`,
                error,
              )
              // Remove user from firebase?
              await admin.auth().deleteUser(firebaseUser.uid)
              response
                .status(500)
                .send({ error: 'Could not save new user to database.' })
            })
        })
        .catch(error => {
          console.error(
            `??? (${email}) Could not register user at firebase: ${error.message}`,
          )
          if (error.code === 'auth/email-already-exists')
            response
              .status(409)
              .send({ error: 'Het e-mailadres is al in gebruik.' })
          else
            response
              .status(500)
              .send({ error: 'Kon de gebruiker niet registreren.' })
        })
    })

    // GRAPHQL
    let schema: GraphQLSchema = {} as GraphQLSchema

    await buildSchema({
      resolvers: [
        OrganizationResolver,
        RegisterResolver,
        ProductResolver,
        InvitationResolver,
        OrderResolver,
      ],
      authChecker: customAuthChecker,
      authMode: 'null',
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
        `\nKassAapje backend ???????????? \n>>> http://localhost:${port}/v1\n`,
      )
    })
  }

  // TRY TO INIT THE DATABASE
  initDatabase()
    .then(main)
    .catch(e => {
      console.error('??? Could not create database. Trying again in 10.')
      console.error(e)
      setTimeout(initDatabase, 10000)
    })
})()
