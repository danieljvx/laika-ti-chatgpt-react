import React, { FC } from 'react'
import { IProduct } from '../../../core/types'
import Product from './product'
import Box from '@mui/material/Box'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import 'swiper/swiper.scss'

type Props = {
  products: IProduct[]
}

const Products: FC<Props> = ({ products }) => {
  const swiperId = Math.floor(Math.random() * 1000)
  const swiperPrevButtonClass = `prevEl-${swiperId}`
  const swiperNextButtonClass = `nextEl-${swiperId}`
  return (
    <Swiper
      spaceBetween={10}
      breakpoints={{
        0: {
          slidesPerView: 1.5,
        },
        530: {
          slidesPerView: 1.5,
        },
        700: {
          slidesPerView: 2,
        },
        850: {
          slidesPerView: 2.5,
        },
        1150: {
          slidesPerView: 2.5,
        },
        1450: {
          slidesPerView: 3,
        },
      }}
      navigation={{
        prevEl: '.' + swiperPrevButtonClass,
        nextEl: '.' + swiperNextButtonClass,
      }}
      modules={[Navigation]}
    >
      {products.map((product, i) => (
        <SwiperSlide key={`slide-${i}-product`} className='slider_card-product'>
          <Box
            sx={{
              padding: '15px 5px',
            }}
          >
            <Product key={`product-${i}`} product={product} />
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Products
