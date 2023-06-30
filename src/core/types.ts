export interface IUser {
  id: number
  fullname: string
  email: string
  avatar: string
  userId: number
  tokenAuth: string
  socketId: string
  temp: boolean
}

export interface IRoom {
  id: string
  host: IUser
  guest: IUser
  messages: IMessage[]
}

export interface IMessage {
  user: IUser
  time: Date
  message: string
  roomId: string
  products: IProduct[]
}

export interface ServerToClientEvents {
  chat: (e: IMessage) => void
  chatGptLoading: (e: boolean) => void
  join_room: (e: IRoom) => void
  writing: (e: boolean) => void
}

export interface ClientToServerEvents {
  chat: (e: IMessage) => void
  chatGptLoading: (e: boolean) => void
  join_room: (e: { host: IUser; guest: IUser | undefined | null }) => void
  writing: (e: boolean) => void
}

export type ITheme = 'dark' | 'light'

export interface IChat {
  host: string
  user: IUser | null
  open?: boolean
  float?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'
  autoConnect?: boolean
  theme?: ITheme
  addProduct?: (product: IProduct) => void
}

export interface IBrand {
  id: number
  image_app: string
  image_web: string
  name: string
  show: boolean
  slug: string
  slug_pet?: string
  sorter?: string
}

export interface IProduct {
  product_name: string
  product_description: string
  sale_price: number
  url: string
  brand: string
  reference_id: number
}

export interface IProductReference {
  id: number
  is_member: boolean
  membership: object
  sale_price: number
  saving_member: number
  sku: string
  status_id: number
  stock: number
  price_with_discount: number
  promotion: {
    id: number
    value: number
    name: string
    start_date: string
    final_date: string
    promotion_type: {
      id: number
      name: string
    }
  }
  reference: string
  reference_images: IProductReferenceImage[]
}

export interface IProductReferenceImage {
  id: number
  name: string
  reference_id: number
  url: string
  url_raw: string
}
