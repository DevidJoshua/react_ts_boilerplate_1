export interface OrderListItems {
  id: number;
  price: number;
  quantity: number;
  name: string;
}

export interface OrderLogisticResponse {
  id: number;
  logisticStatus: string;
  package: {
    items: {
      id: number;
      name: string;
      price: number;
      qty: number;
      sale_event_detail?: {
        varianPic?: {
          url?: string;
        };
      };
    }[];
  };
}

export interface OrderListOrderPayment {
  id: number;
  purchase_order_b: number;
  walletTokenId: null | string | number;
  order_id: string;
  payment_type: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  transaction_details: {
    id: number;
    order_id: string;
    gross_amount: number;
  };
  item_details: OrderListItems[];
}

export interface OrderListResponse {
  id: number;
  created_at: string;
  puchaseOrderNo: string;
  isGroupBuying: boolean;
  isGroupExpired: boolean;
  isOriginOrder: boolean;
  maxBuyer: number;
  paymentStatus: string | null;
  logisticStatus: string | null;
  order_payment: OrderListOrderPayment;
  order_logistics: OrderLogisticResponse[];
  flagFullGroup: boolean | null;
  expiredTime: string;
}
