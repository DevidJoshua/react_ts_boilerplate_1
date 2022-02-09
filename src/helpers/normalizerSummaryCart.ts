import { CartResponseInterface } from '@routes/Checkout/interface';

const normalizerSummaryCart = (dataCart: CartResponseInterface['carts']) => {
  let totalPriceGroup = 0;
  let totalPricePersonal = 0;
  let totalQty = 0;
  let totalProduct = 0;
  let totalToken = 0;

  if (dataCart.length > 0) {
    totalProduct = dataCart.length;

    dataCart.forEach(val => {
      const priceGroup = val.sale_event_detail.groupPrice * val.qty;
      const pricePersonal = val.sale_event_detail.eventPrice * val.qty;

      totalPriceGroup += priceGroup;
      totalPricePersonal += pricePersonal;
      totalQty += val.qty;
      totalToken += val.sale_event_detail.pointPrice;
    });
  }

  return {
    totalPriceGroup,
    totalPricePersonal,
    totalQty,
    totalProduct,
    totalToken,
  };
};

export default normalizerSummaryCart;
