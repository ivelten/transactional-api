import bcrypt from 'bcrypt'
import { SALT_ROUNDS } from './env'
import { DEFAULT_OFFSET, DEFAULT_LIMIT } from './constants'
import { Connection, InsertResult } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { Response } from 'express'
import Decimal from 'decimal.js'
import { getUsdSellValue } from './clients/hgbrasil/calls'

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

export const processRequest = async (res: Response, processor: () => Promise<void>) => {
    try {
        await processor()
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
}

export const mapper = <S,T>(map: (source: S) => Promise<T>) => 
    async (source: S): Promise<T> => {
        if (!source) return undefined
        return await map(source)
}

export const getUsdValue = async (brlValue: number): Promise<number> => {
    const usdSellValue = await getUsdSellValue()
    return Decimal.div(brlValue, usdSellValue).toSignificantDigits(2).toNumber()
}