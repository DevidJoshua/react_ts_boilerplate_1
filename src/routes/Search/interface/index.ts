export interface SearchProductVariantResponse {
  id: number;
  name: string;
  descr: string;
  priceIDR: number;
  slug: string;
  produk: number;
  sale_event: number | null;
  normalPrice: number | null;
  shippingPacketType: string;
  isActive: true;
  varianPic: {
    url: string;
  };
}

export interface SearchResponse {
  id: number;
  product_varian: SearchProductVariantResponse;
  eventPrice: number;
  rewardPoint: number;
  groupPrice: number;
  pointPrice: number;
}
