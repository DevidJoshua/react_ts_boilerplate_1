export interface GroupOrderItemResponse {
  id: number;
  expiredTime: string;
  purchase_order_bs: {
    id: number;
    cust_profile: number;
    puchaseOrderNo: string;
    isGroupBuying: true;
    isOriginOrder: true;
    maxBuyer: number;
    paymentStatus: null;
    logisticStatus: null;
    order_payment: number;
  }[];
  profiles: string;
  gross_amount: number;
  sale_event_detail: {
    id: number;
    product_varian: number;
    sale_event: number;
    eventPrice: number;
    rewardPoint: number;
    groupPrice: number;
    pointPrice: number;
    qty: number;
  }[];
  product_varian: {
    id: number;
    name: string;
    descr: string;
    priceIDR: number;
    slug: string;
    produk: {
      id: number;
      prodName: string;
      tagLine: string;
      descr1: string;
      descr2: string;
      descr3: string;
      category: string;
      slug: string;
      sale_event: null;
      cart: null;
      product_event: null;
      product_varian: number;
      user_profile: number;
    };
    sale_event: null;
    normalPrice: null;
    shippingPacketType: null;
    isActive: null;
    varianPic: {
      url: string;
    };
  }[];
}

export interface GroupOrderResponse {
  groupOrders: GroupOrderItemResponse[];
  message?: string;
}
