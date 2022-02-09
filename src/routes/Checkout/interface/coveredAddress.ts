export interface CoveredAddressResponse {
  id: number;
  promoSaleEventID: string;
  baseSaleEventID: string;
  isLogisticByreact: boolean;
  coverageCities: {
    citiesId: number[];
  };
  newCustomerRewardPoint: number;
  maxGroupBuyer: number;
  mgmRewardPoint: number;
}
