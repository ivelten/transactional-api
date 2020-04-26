import { IsString, IsNumber, MaxLength, IsBoolean, IsCreditCard, IsOptional, IsInt, ValidateNested } from 'class-validator'
import { IsCreditCardUsable } from './validation'

export interface IPaymentModel {
    creditCardNumber: string
    value: number
    installmentCount?: number
}

export class PaymentModel implements IPaymentModel {
    constructor(model: IPaymentModel) {
        if (model) {
            this.creditCardNumber = model.creditCardNumber
            this.value = model.value
            this.installmentCount = model.installmentCount
        }
    }

    creditCardNumber: string

    @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false }, { message: "value must be a monetary value in BRL coin (number with two decimal places)" })
    value: number

    @IsInt()
    @IsOptional()
    installmentCount?: number
}

export interface IAuthorizeTransactionRequestModel {
    customerName?: string
    invoiceNumber?: string
    customerDocument?: string
    autoCapture?: boolean
    payment: IPaymentModel
}

export class AuthorizeTransactionRequestModel implements IAuthorizeTransactionRequestModel {
    constructor(model: IAuthorizeTransactionRequestModel) {
        if (model) {
            this.customerName = model.customerName
            this.invoiceNumber = model.invoiceNumber
            this.customerDocument = model.customerDocument
            this.autoCapture = model.autoCapture
            this.payment = new PaymentModel(model.payment)
        }
    }

    @IsString()
    @IsOptional()
    @MaxLength(100)
    customerName?: string

    @IsString()
    @IsOptional()
    @MaxLength(100)
    invoiceNumber?: string

    @IsString()
    @IsOptional()
    @MaxLength(15)
    customerDocument?: string

    @IsBoolean()
    @IsOptional()
    autoCapture?: boolean

    @IsCreditCardUsable()
    @ValidateNested()
    payment: IPaymentModel
}

export interface ICaptureTransactionModel {
    transactionId: string
}

export class CaptureTransactionModel implements ICaptureTransactionModel {
    @IsString()
    @MaxLength(37)
    transactionId: string
}

export interface IProcessedTransactionInstallmentModel {
    installmentNumber: number
    value: number
}

export interface IProcessedTransactionResponseModel {
    transactionId: string
    value: number
    usdValue: number
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