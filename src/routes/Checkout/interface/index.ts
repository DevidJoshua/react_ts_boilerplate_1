export const defaultPropsOrderNumberResponse = {
  orderNo: '',
  orderSubmitted: '',
};

export interface OrderNumberResponse {
  orderNo: string;
  orderSubmitted: string;
}

export interface AddressResponse {
  id: number;
  latitude: number;
  longitude: number;
  specificGuide: string;
  addrLine1: string;
  province: null;
  city: null;
  cityId: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  postalCode: string;
  addrType: string;
  title: string;
  slug: null;
  suburb: string;
  suburb_id: null;
  area: string;
  area_id: null;
  suburbId: string;
  areaId: string;
  isDefault: boolean;
  namaPenerima: string | null;
  phoneNumberPenerima: string | null;
}

export interface CartProductVariantResponse {
  id: number;
  name: string;
  descr: string;
  weight?: number;
  dimensionInCm?: number;
  unitOfWeight?: string;
  priceIDR: number;
  published_at?: string;
  created_by?: number;
  updated_by?: number;
  created_at?: string;
  updated_at?: string;
  slug: string;
  produk: {
    id: number;
    prodName: string;
    tagLine: string;
    published_at?: string;
    created_by?: number;
    updated_by?: number;
    created_at?: string;
    updated_at?: string;
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
  widthInCm?: null;
  heightInCm?: null;
  lengthInCm?: null;
  shippingPacketType: null;
  isActive: null;
  varianPic: {
    url: string;
  };
}

export interface CartSaleEventDetailResponse {
  id: number;
  product_varian: number;
  sale_event: number;
  eventPrice: number;
  rewardPoint: number;
  published_at?: string;
  created_by?: number;
  updated_by?: number;
  created_at?: string;
  updated_at?: string;
  groupPrice: number;
  pointPrice: number;
}
export interface CartItemResponseInterface {
  id: number;
  product_varian: CartProductVariantResponse;
  user_profile?: number;
  savedPrice?: number;
  qty: number;
  published_at?: string;
  created_by?: null;
  updated_by?: null;
  created_at?: string;
  updated_at?: string;
  sale_event_detail: CartSaleEventDetailResponse;
}

export interface CartResponseInterface {
  carts: CartItemResponseInterface[];
}
