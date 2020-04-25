import * as dotenv from 'dotenv'

dotenv.config();

if (!process.env.PORT) {
    process.exit(1)
}

const PORT: number = parseInt(process.env.PORT as string, 10)
const SALT_ROUNDS = process.env.NODE_ENV == 'production' ? 12 : 0
const PAGE_SIZE = 50

export { PORT, SALT_ROUNDS, PAGE_SIZE }