import * as dotenv from 'dotenv'

dotenv.config();

if (!process.env.PORT) process.exit(1)

export const PORT: number = parseInt(process.env.PORT as string, 10)

export const SALT_ROUNDS = process.env.NODE_ENV == 'production' ? 12 : 0