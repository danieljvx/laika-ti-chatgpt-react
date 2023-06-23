import * as React from 'react'
import { describe, it } from '@jest/globals'
import { render } from '@testing-library/react'

import 'jest-canvas-mock'

import Product from '../../src/components/chat/product/product'

describe('Common render', () => {
  it('renders without crashing', () => {
    render(
      <Product
        product={{
          product_name: 'Product Example',
          product_description: 'Product for example',
          sale_price: 1,
          url: '',
          brand: '',
        }}
      />,
    )
  })
})
