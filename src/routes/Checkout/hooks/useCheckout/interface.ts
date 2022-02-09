export interface ParamsItemsCheckout {
  name: string;
  price: number;
  qty: number;
  sale_event_detail: number;
}

export interface ParamsOrderLogistic {
  merchant_profile: string;
  items: ParamsItemsCheckout[];
}

export interface ParamsCheckout {
  cust_profile: number;
  purchaseOrderNo: string;
  isGroupBuying: boolean;
  isOriginOrder: boolean;
  order_payment: {
    transaction_details: {
      gross_amount: number;
    };
  };
  cust_address: string;
  order_logistics: ParamsOrderLogistic[];
  data_penerima: {
    name: string;
    phone_number: string;
  };
}

export interface ParamsCheckoutClaimFree {
  cust_profile: number;
  purchaseOrderNo: string;
  cust_address: string;
  order_logistics: {
    items: {
      name: string;
      price: number;
      qty: number;
      sale_event_detail: number;
    }[];
  }[];
  data_penerima: {
    name: string;
    phone_number: string;
  };
}

export interface ItemDetailsResponse {
  id: number;
  price: number;
  quantity: number;
  name: string;
}

export interface CheckoutResponse {
  message?: string;
  createPurchaseOrder: {
    id: number;
    puchaseOrderNo: string;
    order_payment: {
      transaction_details: {
        id: number;
        order_id: string;
        gross_amount: number;
      };
      item_details: ItemDetailsResponse[];
      customer_details: {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
      };
    };
  };
}

export interface PaymentResponse {
  token: string;
  redirect_url: string;
}
