import axios from 'axios'
import { FINANCE_API_URL } from '../../env'

export const getUsdSellValue = async (): Promise<number> => {
    const instance = axios.create()
    instance.defaults.baseURL = FINANCE_API_URL
    const response = await instance.get('/finance')
    return response.data.results.currencies.USD.sell as number
}