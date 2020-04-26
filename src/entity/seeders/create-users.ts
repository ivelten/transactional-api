import { Factory, Seeder } from 'typeorm-seeding'
import { Connection, InsertResult } from 'typeorm'
import bcrypt from 'bcrypt'
import { SALT_ROUNDS } from '../../env'
import { User } from '../user'
import { insertInto } from '../../di'

export class CreateUsers implements Seeder {
    async run(_: Factory, connection: Connection): Promise<any> {
        const passwordHash = await bcrypt.hash('password', SALT_ROUNDS)
        await insertInto(connection, User, [
            { firstName: 'Ismael', lastName: 'Velten', userName: 'ivelten', email: 'ismaelcarlosvelten@gmail.com', passwordHash, baseTax: 2.5 },
            { firstName: 'Test', lastName: 'Merchant', userName: 'brydge', email: 'brydge.test.merchant@gmail.com', passwordHash, baseTax: 3.0 }
        ])
    }
}