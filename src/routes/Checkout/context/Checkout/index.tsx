import React, { FC, createContext, useEffect, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import lsGet from '@/helpers/client-storage/localStorageGet';

import LoaderLoadable from '@/components/LoaderLoadable';

import { useUserData } from '@/context/userData';
import { useToaster } from '@/context/Toaster';

import useGetAddress from '@routes/Checkout/hooks/useGetAddress';
import useGetProductCart from '@routes/Checkout/hooks/useGetProductCart';
import useGetOrderNumber from '@routes/Checkout/hooks/useGetOrderNumber';
import useCheckout from '@routes/Checkout/hooks/useCheckout';
import useCoveredAddress from '@routes/Checkout/hooks/useCoveredAddress';
import useGetGroup from '@routes/Groups/hooks/useGetGroup';
import useGetProductFree from '@/routes/Sharereact/hooks/useGetProductFree';
import useGetProductToken from '@/routes/Tokens/hooks/useGetProductToken';

import { ParamsOrderLogistic } from '@routes/Checkout/hooks/useCheckout/interface';

import cleanDuplicateData from '@helpers/cleanDuplicateData';

import {
  CartResponseInterface,
  AddressResponse,
  OrderNumberResponse,
} from '@routes/Checkout/interface';

const BUY_GROUP = 'group';

interface CheckoutProps {
  dataCart: CartResponseInterface['carts'];
  dataAddress: AddressResponse[];
  dataOrderNumber: OrderNumberResponse;
  dataCartFooter: CartResponseInterface['carts'];
  loadingCart: boolean;
  loadingAddress: boolean;
  loadingOrderNumber: boolean;
  loadingCartFooter: boolean;
  loadingCheckout: boolean;
  redirectUrl: string;
  isClaimToken: boolean;
  isClaimFree: boolean;
  refetchCart: () => void;
  refetchAddress: () => void;
  onClickCheckout: (type: string, isContinueFromGroup: boolean) => void;
}

export const CheckoutContext = createContext<CheckoutProps>({
  dataCart: [],
  dataAddress: [],
  dataOrderNumber: {
    orderNo: '',
    orderSubmitted: '',
  },
  dataCartFooter: [],
  loadingCart: false,
  loadingAddress: false,
  loadingOrderNumber: false,
  loadingCartFooter: false,
  loadingCheckout: false,
  redirectUrl: '',
  isClaimToken: false,
  isClaimFree: false,
  refetchCart: () => {},
  refetchAddress: () => {},
  onClickCheckout: () => {},
});

const CheckoutProvider: FC = ({ children }) => {
  const lsGetAddrID = lsGet({ key: 'addr' });
  const lsGetCart: number[] = useMemo(() => lsGet({ key: 'dfc' }) || [], []);

  const { search } = useLocation();
  const {
    userInfo: { token, profileID },
  } = useUserData();
  const { showToaster } = useToaster();

  const qs = queryString.parse(search);

  const isFromCart = useMemo(() => qs?.from || '', [qs?.from]);
  const getGroupID = useMemo(() => qs?.group || '', [qs?.group]);
  const getClaimToken = useMemo(() => qs?.claim || '', [qs?.claim]);
  const getPIDToken = useMemo(() => qs?.pid || '', [qs?.pid]);
  const getRefNo = useMemo(() => qs?.ref || '', [qs?.ref]);

  const isClaimToken = Boolean(getClaimToken === 'token' && getPIDToken);
  const isClaimFree = Boolean(getClaimToken === 'free' && getPIDToken && getRefNo);

  const { redirectUrl, loading: loadingCheckout, onCheckout, onCheckoutClaimFree } = useCheckout();
  const { getCoveredAddress, dataCoveredAddress } = useCoveredAddress();
  const { getCart, dataCart, loading: loadingCart } = useGetProductCart();
  const { getAddress, dataAddress, loading: loadingAddress } = useGetAddress();
  const { getOrderNumber, dataOrderNumber, loading: loadingOrderNumber } = useGetOrderNumber();
  const {
    getCart: getCartFooter,
    dataCart: dataCartFooter,
    loading: loadingCartFooter,
  } = useGetProductCart();
  const { getGroup, dataGroup, loading: loadingGetGroup } = useGetGroup();
  const { getProductToken, dataProductToken, loading: loadingProductToken } = useGetProductToken();
  const { getProductFree, dataProductFree, loading: loadingProductFree } = useGetProductFree();

  // get data product from group page or share group
  useEffect(() => {
    if (getGroupID) {
      getGroup(token);
    }
  }, [getGroup, getGroupID, token]);

  // get data from cart
  useEffect(() => {
    if (!getGroupID && !isClaimToken && !isClaimFree) {
      getCart({ token, profileID });
      getCartFooter({ token, profileID });
    }
  }, [getCart, getCartFooter, getGroupID, isClaimFree, isClaimToken, profileID, token]);

  // get data product token for claim
  useEffect(() => {
    if (isClaimToken) {
      getProductToken();
    }
  }, [getProductToken, isClaimToken]);

  useEffect(() => {
    if (isClaimFree) {
      getProductFree();
    }
  }, [getProductFree, isClaimFree]);

  // get addresss
  useEffect(() => {
    getAddress(token, profileID);
  }, [getAddress, profileID, token]);

  // get order number
  useEffect(() => {
    getOrderNumber(token);
  }, [getOrderNumber, token]);

  // get covered address area
  useEffect(() => {
    getCoveredAddress(token);
  }, [getCoveredAddress, token]);

  const refetchCart = useCallback(() => {
    if (!getGroupID) {
      getCart({ token, profileID });
      getCartFooter({ token, profileID });
    }
  }, [getCart, getCartFooter, getGroupID, profileID, token]);

  const refetchAddress = useCallback(() => {
    getAddress(token, profileID);
  }, [getAddress, profileID, token]);

  const dataFilteredCart = useMemo(() => {
    if (isFromCart && lsGetCart.length) {
      return dataCart.filter(val => lsGetCart.includes(val.sale_event_detail.id));
    }

    return dataCart;
  }, [dataCart, isFromCart, lsGetCart]);

  const dataFilteredCartFooter = useMemo(() => {
    if (isFromCart && lsGetCart.length) {
      return dataCartFooter.filter(val => lsGetCart.includes(val.sale_event_detail.id));
    }

    return dataCartFooter;
  }, [dataCartFooter, isFromCart, lsGetCart]);

  // new mapping for claim token and claim free
  const dataFilteredClaim = useMemo(() => {
    const newMapClaimToken: CartResponseInterface['carts'] = [];
    const dataChoosed = isClaimToken ? dataProductToken : dataProductFree;

    const findSelected = dataChoosed.find(val => val.id === Number(getPIDToken));

    if (findSelected?.id) {
      newMapClaimToken.push({
        id: findSelected.id,
        qty: 1,
        product_varian: {
          id: findSelected.product_varian.id,
          name: findSelected.product_varian.name,
          descr: findSelected.product_varian.descr,
          priceIDR: findSelected.product_varian.priceIDR,
          slug: findSelected.product_varian.slug,
          sale_event: null,
          normalPrice: null,
          shippingPacketType: null,
          isActive: null,
          varianPic: {
            url: findSelected.product_varian.varianPic.url,
          },
          produk: {
            id: findSelected.product_varian.id,
            prodName: findSelected.product_varian.name,
            tagLine: findSelected.product_varian.descr,
            descr1: findSelected.product_varian.descr,
            descr2: '',
            descr3: '',
            category: '',
            slug: findSelected.product_varian.slug,
            sale_event: null,
            cart: null,
            product_event: null,
            product_varian: 0,
            user_profile: 0,
          },
        },
        sale_event_detail: {
          id: findSelected.id,
          eventPrice: findSelected.eventPrice || 0,
          groupPrice: findSelected.groupPrice || 0,
          pointPrice: findSelected.pointPrice || 0,
          product_varian: 0,
          rewardPoint: findSelected.rewardPoint || 0,
          sale_event: 0,
        },
      });
    }

    return newMapClaimToken;
  }, [dataProductFree, dataProductToken, getPIDToken, isClaimToken]);

  // new mapping continue buy group
  const dataFilteredCartFromGroup = useMemo(() => {
    const newMapGroupForCart: CartResponseInterface['carts'] = [];

    const findFilteredGroup = dataGroup.find(val => val.id === Number(getGroupID));
    findFilteredGroup?.sale_event_detail.forEach(val => {
      const getProductVarianDetail = findFilteredGroup.product_varian.find(
        pv => pv.id === val.product_varian,
      );
      newMapGroupForCart.push({
        id: val.id,
        qty: val.qty,
        product_varian: {
          id: getProductVarianDetail?.id || 0,
          name: getProductVarianDetail?.name || '',
          descr: getProductVarianDetail?.descr || '',
          priceIDR: getProductVarianDetail?.priceIDR || 0,
          slug: getProductVarianDetail?.slug || '',
          produk: {
            id: getProductVarianDetail?.produk.id || 0,
            prodName: getProductVarianDetail?.produk.prodName || '',
            tagLine: getProductVarianDetail?.produk.tagLine || '',
            descr1: getProductVarianDetail?.produk.descr1 || '',
            descr2: getProductVarianDetail?.produk.descr2 || '',
            descr3: getProductVarianDetail?.produk.descr3 || '',
            category: getProductVarianDetail?.produk.category || '',
            slug: getProductVarianDetail?.produk.slug || '',
            sale_event: getProductVarianDetail?.produk.sale_event || null,
            cart: getProductVarianDetail?.produk.cart || null,
            product_event: getProductVarianDetail?.produk.product_event || null,
            product_varian: getProductVarianDetail?.produk.product_varian || 0,
            user_profile: getProductVarianDetail?.produk.user_profile || 0,
          },
          sale_event: getProductVarianDetail?.sale_event || null,
          normalPrice: getProductVarianDetail?.normalPrice || null,
          shippingPacketType: getProductVarianDetail?.shippingPacketType || null,
          isActive: getProductVarianDetail?.isActive || null,
          varianPic: {
            url: getProductVarianDetail?.varianPic.url || '',
          },
        },
        sale_event_detail: {
          eventPrice: val.eventPrice,
          groupPrice: val.groupPrice,
          id: val.id,
          pointPrice: val.pointPrice,
          product_varian: val.product_varian,
          rewardPoint: val.rewardPoint,
          sale_event: val.sale_event,
        },
      });
    });

    return newMapGroupForCart;
  }, [dataGroup, getGroupID]);

  const getAddressData = useMemo(() => {
    if (lsGetAddrID) {
      return dataAddress.find(item => item.id === lsGetAddrID);
    }

    return dataAddress.find(item => item.isDefault);
  }, [dataAddress, lsGetAddrID]);

  const dataFiltered = useMemo(() => {
    if (getGroupID) {
      return dataFilteredCartFromGroup;
    }

    if (isClaimToken || isClaimFree) {
      return dataFilteredClaim;
    }

    return dataFilteredCart;
  }, [
    dataFilteredCart,
    dataFilteredCartFromGroup,
    dataFilteredClaim,
    getGroupID,
    isClaimFree,
    isClaimToken,
  ]);

  const handleClickCheckout = useCallback(
    (type: string, isContinueFromGroup: boolean) => {
      const isCoveredArea = dataAddress.some(
        val =>
          val.id === getAddressData?.id &&
          dataCoveredAddress?.coverageCities?.citiesId.includes(Number(val.cityId)),
      );

      const isBuyGroup = type === BUY_GROUP;
      const isCheckoutClaimToken = Boolean(type === 'claimToken');
      const isCheckoutClaimFree = Boolean(type === 'claimFree');

      const dataRecipient = {
        name: getAddressData?.namaPenerima || '',
        phone_number: getAddressData?.phoneNumberPenerima || '',
      };

      let grossAmount = 0;
      const groupByShop: ParamsOrderLogistic[] = [];
      const getShopID = cleanDuplicateData(
        dataFiltered.map(val => val.product_varian.produk.user_profile),
      );

      getShopID.forEach(_shopID => {
        const getRowItem = dataFiltered.filter(
          row => row.product_varian.produk.user_profile === _shopID,
        );

        groupByShop.push({
          merchant_profile: isClaimToken ? '' : String(_shopID),
          items: getRowItem.map(_row => {
            const price = isBuyGroup
              ? _row.sale_event_detail.groupPrice
              : _row.sale_event_detail.eventPrice;

            const totalRowPrice = _row.qty * price;
            grossAmount += totalRowPrice;

            return {
              name: _row.product_varian.name,
              price: price,
              qty: _row.qty,
              sale_event_detail: _row.sale_event_detail.id,
            };
          }),
        });
      });

      const paramsForCheckout = {
        cust_profile: profileID,
        purchaseOrderNo: dataOrderNumber.orderNo,
        isGroupBuying: isBuyGroup || false,
        isOriginOrder: isContinueFromGroup ? false : true,
        order_payment: {
          transaction_details: {
            gross_amount: grossAmount,
          },
        },
        cust_address: String(getAddressData?.id || 0),
        order_logistics: groupByShop,
        data_penerima: dataRecipient,
        isFromShoppingCart: isContinueFromGroup || isCheckoutClaimToken ? false : true,
      };

      if (isCoveredArea) {
        if (isCheckoutClaimFree) {
          onCheckoutClaimFree({
            token,
            refNo: String(getRefNo),
            body: {
              cust_profile: paramsForCheckout.cust_profile,
              cust_address: paramsForCheckout.cust_address,
              purchaseOrderNo: paramsForCheckout.purchaseOrderNo,
              data_penerima: paramsForCheckout.data_penerima,
              order_logistics: paramsForCheckout.order_logistics.map(val => ({
                items: val.items,
              })),
            },
          });
        } else {
          onCheckout({
            token,
            isBuyGroup,
            isContinueFromGroup,
            groupID: String(getGroupID),
            isCheckoutClaimToken,
            body: paramsForCheckout,
          });
        }
      } else {
        showToaster({
          text: 'Oops, alamat kamu tidak tercover oleh react, silahkan ubah ke area Jabodetabek',
          isError: true,
          duration: 3500,
        });
      }
    },
    [
      dataAddress,
      dataCoveredAddress?.coverageCities?.citiesId,
      dataFiltered,
      dataOrderNumber.orderNo,
      getAddressData?.id,
      getAddressData?.namaPenerima,
      getAddressData?.phoneNumberPenerima,
      getGroupID,
      getRefNo,
      isClaimToken,
      onCheckout,
      onCheckoutClaimFree,
      profileID,
      showToaster,
      token,
    ],
  );

  const dataSendToContext = useMemo(() => {
    if (getGroupID) {
      return { data: dataFilteredCartFromGroup, loading: loadingGetGroup };
    }

    if (isClaimToken || isClaimFree) {
      return { data: dataFilteredClaim, loading: loadingProductToken };
    }

    return { data: dataFilteredCartFooter, loading: loadingCart };
  }, [
    dataFilteredCartFooter,
    dataFilteredCartFromGroup,
    dataFilteredClaim,
    getGroupID,
    isClaimFree,
    isClaimToken,
    loadingCart,
    loadingGetGroup,
    loadingProductToken,
  ]);

  const state = {
    dataCart: dataFiltered,
    dataAddress,
    dataOrderNumber,
    dataCartFooter: dataSendToContext.data,
    loadingCart: getGroupID ? loadingGetGroup : loadingCart,
    loadingAddress,
    loadingOrderNumber,
    loadingCartFooter: dataSendToContext.loading,
    loadingCheckout,
    redirectUrl,
    isClaimToken,
    isClaimFree,
    refetchCart,
    refetchAddress,
    onClickCheckout: handleClickCheckout,
  };

  if (
    (getGroupID && (loadingGetGroup || loadingOrderNumber || loadingAddress)) ||
    (isClaimToken && (loadingProductToken || loadingOrderNumber || loadingAddress)) ||
    (isClaimFree && (loadingProductFree || loadingOrderNumber || loadingAddress)) ||
    (!getGroupID &&
      !isClaimToken &&
      !isClaimFree &&
      (loadingCart || loadingCartFooter || loadingOrderNumber || loadingAddress))
  ) {
    return <LoaderLoadable />;
  }

  return <CheckoutContext.Provider value={state}>{children}</CheckoutContext.Provider>;
};

export default CheckoutProvider;
