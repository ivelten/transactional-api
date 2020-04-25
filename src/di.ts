import bcrypt from 'bcrypt'
import { PAGE_SIZE, SALT_ROUNDS } from './env'

const skip = (page: number): number => {
    if (page) {
        return (page - 1) * PAGE_SIZE
    } else {
        return 0;
    }
}

const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, SALT_ROUNDS)
}

export { hashPassword, skip }