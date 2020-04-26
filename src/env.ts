import * as dotenv from 'dotenv'

dotenv.config();

if (!(process.env.PORT || process.env.FINANCE_API_URL))
    process.exit(1)

export const PORT: number = parseInt(process.env.PORT as string, 10)

export const FINANCE_API_URL = process.env.FINANCE_API_URL

export const SALT_ROUNDS = process.env.NODE_ENV == 'production' ? 12 : 0