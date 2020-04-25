import { User } from '../entity/user'
import { getConnection } from 'typeorm'
import { skip } from '../di'
import { PAGE_SIZE } from '../env'

export const saveUser = async (user: User): Promise<User> => {
    return await getConnection().getRepository(User).save(user)
}

export const getUsers = async (page: number): Promise<User[]> => {
    return await getConnection().getRepository(User).find({ take: PAGE_SIZE, skip: skip(page) })
}