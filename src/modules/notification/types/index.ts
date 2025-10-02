export enum OrderStatusTypes {
  PAID = 'paid',
  PAYMENT_FAILED = 'payment_failed',
  CANCELED = 'canceled',
  CLOSED = 'closed',
  UPDATED = 'updated',
}

export enum OrderWebhookTypes {
  PAID = 'order.paid',
  PAYMENT_FAILED = 'order.payment_failed',
  CREATED = 'order.created',
  CANCELED = 'order.canceled',
  CLOSED = 'order.closed',
  UPDATED = 'order.updated',
}

export enum RecipientWebhookTypes {
  CREATED = 'recipient.created',
  UPDATED = 'recipient.updated',
  DELETED = 'recipient.deleted',
}

export enum ChargeWebhookTypes {
  CREATED = 'charge.created',
  UPDATED = 'charge.updated',
  PAID = 'charge.paid',
  PAYMENT_FAILED = 'charge.payment_failed',
  REFUNDED = 'charge.refunded',
  PENDING = 'charge.pending',
  PROCESSING = 'charge.processing',
  UNDERPAID = 'charge.underpaid',
  OVERPAID = 'charge.overpaid',
  PARTIAL_CANCELED = 'charge.partial_canceled',
  CHARGEBACK = 'charge.chargedback',
  ANTIFRAUD_APPROVED = 'charge.antifraud_approved',
  ANTIFRAUD_REPROVED = 'charge.antifraud_reproved',
  ANTIFRAUD_MANUAL = 'charge.antifraud_manual',
  ANTIFRAUD_PENDING = 'charge.antifraud_pending',
}

export enum TransferWebhookTypes {
  PENDING = 'transfer.pending',
  CREATED = 'transfer.created',
  PROCESSING = 'transfer.processing',
  PAID = 'transfer.paid',
  CANCELED = 'transfer.canceled',
  FAILED = 'transfer.failed',
}
