import React, { useEffect, useState } from 'react'
import useProductList from '@routes/Home/hooks/useProductList'
import LoaderProduct from '@components/ProductCard/Loader'
import { ParameterData } from '../../../interface/index'
import ProductItem from './ProductItem'
import { styWrapProduct } from '../styles'
import CircularProgress from '@mui/material/CircularProgress'

function ProductList () {
  const { dataProduct, loading, getProduct } = useProductList()
  const [parameter, setParameter] = useState < ParameterData > ({ page: 1, size: 6 })
  const [isIncrement, setIsIncremet] = useState < Boolean > (true)
  useEffect(() => {
    getProduct(parameter)
  }, [getProduct, parameter])

  window.onscroll = function (ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && isIncrement) {
      setParameter({ ...parameter, page: parameter.page + 1 })
      setIsIncremet(false)
      setTimeout(() => {
        setIsIncremet(true)
      }, 3000)
    }
  }
  
  if (loading) {
    return (
      <div>
        {[0, 1].map(val => (
          <LoaderProduct key={val} />
        ))}
      </div>
    )
  }
  const renderItemProduct = (data) => {
    if (data.length > 0) {
      return data.map((val, key) => {
        const product = val.product_varian
        return (
          <ProductItem
            key={val.id}
            saleEventID={val.id}
            productImage={product.varianPic.url}
            productName={product.name}
            productPoint={val.rewardPoint}
            productPrice={val.groupPrice}
            sold={0}
            rating={0}
          />
        )
      })
    }
    return null
  };

  return dataProduct.length < 1 ? <LoaderProduct key={0} /> : dataProduct.map((r, key) => <div key={key} className={styWrapProduct}>{renderItemProduct(r)}</div>)
}

export default ProductList
