import type { Product } from "./Product"

export interface OrderItem {
  orderitem_id?: string
  product_id: string
  product?: Product
  variation_id?: string
  price?: number
  quantity?: number
  // delivered?: boolean
}