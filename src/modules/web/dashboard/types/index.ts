export type RecipientInfo = {
  id: string
  name: string
  bankAccount: {
    agency: string
    account: string
    bank: string
  }
  balance: {
    amount: number
    waitingFundsAmount: number
    transferredAmount: number
  }
}
