export interface ItemsResponse {
  id: number;
  product_varian: {
    id: 3;
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
      product_event: null;
      product_varian: null;
    };
    sale_event: null;
    normalPrice: null;
    shippingPacketType: null;
    isActive: null;
    varianPic: {
      url: string;
    };
  };
  sale_event: number;
  eventPrice: number;
  rewardPoint: number;
  groupPrice: number;
  pointPrice: number;
  qty: number;
}

export interface WaitingFriendResponse {
  expiredTime: string;
  buyers_name: string[];
  flagFullGroup: boolean;
  items: ItemsResponse[];
}
