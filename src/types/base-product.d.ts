type BaseProductUI = {
  id: string;
  title: string;
  image: string;
  price: number;
  isAuthenticated: boolean;
  route: string;
};

type AuctionProductUI = BaseProductUI & {
  type: "auction";
  isAuction: true;
  currentBid: number;
  endsAt: string;
};

type FixedProductUI = BaseProductUI & {
  type: "fixed_price";
  isAuction: false;
};
type TakingOfferUI = BaseProductUI & {
  type: "taking_offers";
  isAuction: false;
};

 type ProductUI = AuctionProductUI | FixedProductUI | TakingOfferUI ;