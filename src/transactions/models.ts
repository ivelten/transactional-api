import { IsString, IsDecimal, IsNotEmpty, IsNumber, MaxLength, IsBoolean, IsCreditCard } from 'class-validator'
import Decimal from 'decimal.js'

export interface IAuthorizeTransactionRequestModel {
    value: Decimal
    installmentCount?: number
    customerName?: string
    invoiceNumber?: string
    customerDocument?: string
    autoCapture?: boolean
    creditCardNumber: string
}

export class AuthorizeTransactionRequestModel implements IAuthorizeTransactionRequestModel {
    constructor(model: IAuthorizeTransactionRequestModel) {
        this.value = model.value
        this.installmentCount = model.installmentCount
        this.customerName = model.customerName
        this.invoiceNumber = model.invoiceNumber
        this.customerDocument = model.customerDocument
        this.autoCapture = model.autoCapture
    }

    @IsNotEmpty()
    @IsDecimal({ decimal_digits: '2,2' })
    value: Decimal

    @IsNumber({ maxDecimalPlaces: 0 })
    installmentCount?: number

    @IsString()
    @MaxLength(100)
    customerName?: string

    @IsString()
    @MaxLength(100)
    invoiceNumber?: string

    @IsString()
    @MaxLength(15)
    customerDocument?: string

    @IsBoolean()
    autoCapture?: boolean

    @IsCreditCard()
    @MaxLength(16)
    creditCardNumber: string
}

export interface ICaptureTransactionModel {
    transactionId: string
}

export interface IProcessedTransactionInstallmentModel {
    installmentNumber: number
    value: Decimal
}

export interface IProcessedTransactionResponseModel {
    transactionId: string
    value: Decimal
    usdValue: Decimal
    customerName?: string
    invoiceNumber?: string
    customerDocument?: string
    creditCardNumber: string
    authorizationDate?: Date
    captureDate?: Date
    installments: IProcessedTransactionInstallmentModel[]
}

export interface IProcessTransactionFailureResponseModel {
    request: IAuthorizeTransactionRequestModel
    message: string
}