import { IsString, IsNumber, MaxLength, IsOptional, IsInt, ValidateNested, IsNotEmpty } from 'class-validator'
import { IsCreditCardUsable, IsUserRegistered } from './validation'

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

    @IsNotEmpty()
    @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false }, { message: "value must be a monetary value in BRL coin (number with two decimal places)" })
    value: number

    @IsInt()
    @IsOptional()
    installmentCount?: number
}

export interface IAuthorizeTransactionRequestModel {
    merchantId: number
    customerName?: string
    invoiceNumber?: string
    customerDocument?: string
    payment: IPaymentModel
}

export class AuthorizeTransactionRequestModel implements IAuthorizeTransactionRequestModel {
    constructor(model: IAuthorizeTransactionRequestModel) {
        if (model) {
            this.merchantId = model.merchantId
            this.customerName = model.customerName
            this.invoiceNumber = model.invoiceNumber
            this.customerDocument = model.customerDocument
            this.payment = new PaymentModel(model.payment)
        }
    }

    @IsInt()
    @IsNotEmpty()
    @IsUserRegistered()
    merchantId: number

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

    @IsCreditCardUsable()
    @ValidateNested()
    @IsNotEmpty()
    payment: IPaymentModel
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
    installments: IProcessedTransactionInstallmentModel[]
}