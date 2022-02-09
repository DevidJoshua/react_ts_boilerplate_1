export interface ATCResponse {
  created_at: string;
  created_by: null;
  id: number;
  product_varian: null;
  published_at: string;
  qty: number;
  sale_event_detail: {
    created_at: string;
    created_by: number;
    eventPrice: number;
    groupPrice: number;
    id: number;
    product_varian: number;
    published_at: string;
    rewardPoint: number;
    sale_event: number;
    updated_at: string;
    updated_by: number;
  };
  savedPrice: number;
  updated_at: string;
  updated_by: null;
}
