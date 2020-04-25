import { User } from '../entity/user'
import { getConnection } from 'typeorm'
import { paginateGetWithDefaults } from '../di'

export const saveUser = async (user: User): Promise<User> => {
    return await getConnection().getRepository(User).save(user)
}

export const getUsers = paginateGetWithDefaults(async (offset: number, limit: number): Promise<User[]> => {
    return await getConnection().getRepository(User).find({ take: limit, skip: offset })
})