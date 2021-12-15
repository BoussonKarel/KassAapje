import { Config } from "../entity/config";
import { Connection, getRepository } from "typeorm";
import { plainToClass } from "class-transformer";
import { Organization } from "../entity/organization";
import { Register } from "../entity/register";

import organizations from './organizations.json'
import registers from './registers.json'

import admin from 'firebase-admin'
import { User } from "../entity/user";

const seedDatabase = async (connection: Connection) => {
    try {
        console.info('ℹ Seeding started')
    const dbIsSeeded = await getRepository(Config).findOne('seeded');
    if (dbIsSeeded === undefined) {
        await connection.manager.save(plainToClass(Organization, organizations)); // Seed organizations
        await connection.manager.save(plainToClass(Register, registers));
    
        console.log('✅ I have seeded the database with JSONs.');

        admin.auth().listUsers().then(usersResult => {
            connection.manager.transaction(async manager => {
                for (const user of usersResult.users) {
                    const newUser  = connection.manager.create(User, user);
                    await manager.save(newUser);
                }
            }).then(() => {
                console.log(`✅ I have seeded the database with ${usersResult.users.length} firebase users.`);
            })
        })

        // Mark as seeded.
        const seeded = new Config();
        seeded.key = 'seeded';
        seeded.value = 'true';
        await connection.manager.save(seeded);

    } else {
        console.log('❎ Database has already been seeded before.');
    }
    } catch (error:any) {
        console.error("SEEDING ERROR: " + error.message)
    }
}  
export default seedDatabase;