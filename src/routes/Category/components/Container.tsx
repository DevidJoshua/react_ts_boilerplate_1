import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useGetProductBySubCategory from '@routes/Category/hooks/useGetProductBySubCategory';
import Flex from '@components/Flex';
import TopNav from '@components/TopNav';
import { ParameterData,ParamsData} from '../interface/index'
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Typography from '@mui/material/Typography';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import ImgProfile from '@/assets/dummy-profile.png';

import SideCategory from './SideCategory';
import CategoryProductList from './ProductList';
import { styContent } from './styles';

function Container() {
  const history = useHistory();
  const { categoryID,subCategoryId } = useParams<ParamsData>()
  const [parameter,setParamater] = React.useState <ParameterData>({page:1,size:6})
  const {getProduct, dataProduct, loading,setDataProduct} =  useGetProductBySubCategory()
  const [isIncrement, setIsIncremet] = useState < Boolean > (true)

  // useEffect(()=>{
  //   setDataProduct([])
  // },[])

  useEffect(() => {
    getProduct({ categoryID,subCategoryId,page:parameter.page,size:parameter.size})
  }, [subCategoryId,categoryID, getProduct,parameter]);

  // window.onscroll = function (ev) {
  //   if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && isIncrement) {
  //     setParamater({ ...parameter, page: parameter.page + 1 })
  //     setIsIncremet(false)
  //     setTimeout(() => {
  //       setIsIncremet(true)
  //     }, 3000)
  //   }
  // }

  console.log("dat prod=======>",dataProduct.length)
  
  return (
    <>
      <TopNav onBack={() => history.push('/')} isSearchCart />

      <Flex alignItems="flex-start">
        <SideCategory categoryID={categoryID} />

        <div className={styContent}>
          <Flex
            onClick={() => history.push('/group')}
            alignItems="center"
            justifyContent="space-between"
            padding="16px 8px"
            margin="0 0 16px"
            style={{ backgroundColor: '#F8F9FB', borderRadius: '8px' }}
          >
            <AvatarGroup max={2}>
              <Avatar alt="Remy Sharp" src={ImgProfile} />
              <Avatar alt="Travis Howard" src={ImgProfile} />
            </AvatarGroup>
            <Flex flexDirection="column" padding="0 8px 0">
              <Typography fontSize="14px" color="primary" fontWeight="bold">
                Gabung group yuk!
              </Typography>
              <Typography fontSize="14px" style={{ color: '#393939' }}>
                Beli bareng harga murah!
              </Typography>
            </Flex>
            <ChevronRightIcon />
          </Flex>
          {dataProduct.length>0 ? dataProduct.map((r,i)=><CategoryProductList key={i} dataProduct={r} loading={loading} />) : <></> }
        </div>
      </Flex>
    </>
  );
}

export default Container;
