// app.ts
import express, { Request, Response, Router } from 'express';
import {createDatabase} from "typeorm-extension";
import { Connection, ConnectionOptions, createConnection, getConnectionOptions } from 'typeorm';
import seedDatabase from './seeders/seeder';
import { IController } from './controllers/crud.controller';
import { IOrganizationController, OrganizationController } from './controllers/organization.controller';


(async () => {
  const connectionOptions: ConnectionOptions = await getConnectionOptions();
  
  // Create the database before we make the connection. This will also add the tables
  createDatabase({ifNotExist: true}, connectionOptions) 
  .then(() => console.log('Database has been created!'))
  .then(createConnection)
  .then(async (connection: Connection) => {

    seedDatabase(connection);

    // APP SETUP
    const app = express(),
      port = process.env.PORT || 3001;

    // MIDDLEWARE
    app.use(express.json()); // for parsing application/json
    // ROUTES
    app.get('/', (request: Request, response: Response) => {
      response.send(`KassAapje backend is working`);
    });

    interface AppControllers {
      'organizations': IOrganizationController
  }

    const controllers: AppControllers = {
      'organizations': new OrganizationController(),
    };

    Object.entries(controllers).forEach((entry: any) => {
        const key = entry[0] as string,
              controller = entry[1] as IController;
        app.use(`/${key}`, controller.router);
    });

    // APP START
    app.listen(port, () => {
      console.info(`\nKassAapje backend 🧾🐵💰 \n>>> http://localhost:${port}/`);
    });

  })
  .catch(error => console.error(error));

})();