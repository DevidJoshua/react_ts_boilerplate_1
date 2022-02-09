export interface ProductFreeResponse {
  id: number;
  product_varian: {
    id: number;
    name: string;
    descr: string;
    priceIDR: number;
    slug: string;
    produk: number;
    sale_event: number | null;
    normalPrice: number | null;
    shippingPacketType: string;
    isActive: boolean;
    varianPic: {
      url: string;
    };
  };
  eventPrice: number;
  rewardPoint: number;
  groupPrice: number;
  pointPrice: number;
}
