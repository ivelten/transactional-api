import bcrypt from 'bcrypt'
import { SALT_ROUNDS } from './env'
import { DEFAULT_OFFSET, DEFAULT_LIMIT } from './constants'

export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, SALT_ROUNDS)
}

export const paginateWithDefaults = <T>(get: (offset: number, limit: number) => Promise<T[]>) => 
    (offset: number, limit: number) => {
        if (!offset) offset = DEFAULT_OFFSET
        if (!limit) limit = DEFAULT_LIMIT
        return get(offset, limit)
    }