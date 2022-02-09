export interface ProductVariantResponse {
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
}

export interface ProductTokenResponse {
  id: number;
  product_varian: ProductVariantResponse;
  eventPrice: number | null;
  rewardPoint: number | null;
  groupPrice: number | null;
  pointPrice: number | null;
}
