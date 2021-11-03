import { Config } from "../entity/config";
import { Connection, getRepository } from "typeorm";
import { plainToClass } from "class-transformer";
import { Organization } from "../entity/organization";

import organizations from './organizations.json'

const seedDatabase = async (connection: Connection) => {
    const dbIsSeeded = await getRepository(Config).findOne('seeded');
    if (dbIsSeeded === undefined) {
        await connection.manager.save(plainToClass(Organization, organizations)); // Seed birds

        // Mark as seeded.
        const seeded = new Config();
        seeded.key = 'seeded';
        seeded.value = 'true';
        await connection.manager.save(seeded);
    
        console.log('I have seeded the database with everything necessary!');
    } else {
        console.log('The database has already been seeded before.');
    }

}  
export default seedDatabase;