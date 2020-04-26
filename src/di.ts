import bcrypt from 'bcrypt'
import { SALT_ROUNDS } from './env'
import { DEFAULT_OFFSET, DEFAULT_LIMIT } from './constants'
import { Connection, InsertResult } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, SALT_ROUNDS)
}

export const paginateWithDefaults = <T>(get: (offset: number, limit: number) => Promise<T[]>) => 
    (offset: number, limit: number) => {
        if (!offset) offset = DEFAULT_OFFSET
        if (!limit) limit = DEFAULT_LIMIT
        return get(offset, limit)
}

export const insertInto = async <T>(
    connection: Connection,
    entity: (new () => T),
    values: QueryDeepPartialEntity<T> | QueryDeepPartialEntity<T>[]): Promise<InsertResult> => {
        return await connection
            .createQueryBuilder()
            .insert()
            .into(entity)
            .values(values)
            .execute()
}