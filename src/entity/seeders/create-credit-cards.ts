import { Seeder, Factory } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { insertInto } from '../../di'
import { CreditCard } from '../credit-card'

export class CreateCreditCards implements Seeder {
    async run(_: Factory, connection: Connection): Promise<any> {
        await insertInto(connection, CreditCard, [
            { number: '4916707826986668', limit: 10000, balance: 10000, active: true },
            { number: '5417289476012799', limit: 1000, balance: 1000, active: true },
            { number: '378565996859860', limit: 10000, balance: 10000, active: false },
            { number: '6011262546085408', limit: 10000, balance: 0, active: true },
        ])
    }
}