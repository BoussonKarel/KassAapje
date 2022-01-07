import type { OrderItem } from "./OrderItem";
import type { Payment } from "./Payment";
import type { User } from "./User"

export interface Order {
  order_id?: string
  register_id: string
  timestamp?: Date
  customer_name?: string
  seller?: User
  order_items?: OrderItem[]
  payments?: Payment[]
}