export interface WaitingResponse {
  expiredTime: string;
  group_order_id: number;
  order_id: number;
  flagFullGroup: boolean;
  buyers_name: string[];
}

export interface ShareResponse {
  data: {
    media: string;
    link: string;
  }[];
}
