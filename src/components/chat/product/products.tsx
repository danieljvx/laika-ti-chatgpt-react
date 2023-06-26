import React, { FC } from 'react'
import { IProduct } from '../../../core/types'
import Product from './product'
import { Carousel, CarouselItem } from '../carousel'

type Props = {
  products: IProduct[]
  addProduct: (product: IProduct) => void
}

const Products: FC<Props> = ({ products, addProduct }) => {
  return (
    <Carousel
      items={products}
      renderItem={({ item, isSnapPoint }) => (
        <CarouselItem key={item.product_name} isSnapPoint={isSnapPoint}>
          <Product key={`product-${item.product_name}`} product={item} addProduct={addProduct} />
        </CarouselItem>
      )}
    />
  )
}

export default Products
