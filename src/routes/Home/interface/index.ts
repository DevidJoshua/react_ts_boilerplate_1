export interface ProductVariantResponse {
  id: number;
  name: string;
  descr: string;
  weight: number;
  dimensionInCm: number;
  unitOfWeight: string;
  priceIDR: number;
  published_at: string;
  created_at: string;
  updated_at: string;
  slug: string;
  sale_event: null;
  normalPrice: null;
  widthInCm: null;
  heightInCm: null;
  lengthInCm: null;
  shippingPacketType: null;
  varianPic: {
    url: string;
  };
}

export interface ParameterData{
  page: number;
  size: number;
}

export interface ProductListResponse {
  id: number;
  product_varian: ProductVariantResponse;
  eventPrice: number;
  rewardPoint: number;
  published_at: string;
  created_at: string;
  updated_at: string;
  groupPrice: number;
}

export interface BannerResponse {
  id: number;
  bannerTitle: string;
  slug: string;
  landingEndPoint: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  image: {
    id: number;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    url: string;
  };
}
