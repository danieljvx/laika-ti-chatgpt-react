import React, { FC } from 'react'
import { IProduct } from '../../../core/types'
import Product from './product'
import Box from '@mui/material/Box'
// import { Swiper, SwiperSlide } from 'swiper/react' disable for nextjs
// import { Navigation } from 'swiper' disable for nextjs
// import 'swiper/scss' disable for nextjs

type Props = {
  products: IProduct[]
}

const Products: FC<Props> = ({ products }) => {
  // const swiperId = Math.floor(Math.random() * 1000)
  // const swiperPrevButtonClass = `prevEl-${swiperId}`
  // const swiperNextButtonClass = `nextEl-${swiperId}`
  return (
    <>
      {products.map((product, i) => (
        <Box
          key={`slide-${i}-product`}
          sx={{
            padding: '15px 5px',
          }}
        >
          <Product key={`product-${i}`} product={product} />
        </Box>
      ))}
    </>
  )
}

export default Products
