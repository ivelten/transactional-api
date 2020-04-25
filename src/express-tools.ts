import { Response } from 'express'
import { isBadRequest, ResponseModel } from './models'

const sendResponseModel = <T>(model: ResponseModel<T>, apiResponse: Response): void => {
    if (isBadRequest(model))
        apiResponse.status(400)
    else
        apiResponse.status(200)

    apiResponse.send(model)
}

export { sendResponseModel }