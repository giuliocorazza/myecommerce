export interface Product {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
  }
  
  export interface CartItem {
    id: number
    title: string
    price: number
    image: string
    quantity: number
  }
  
  export interface WishlistItem {
    id: number
    title: string
    price: number
    image: string
  }