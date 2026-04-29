

export const mapProductToUI = (
  prod: AuctionProduct | FixedPriceProduct | TakingOfferProduct
): ProductUI => {
  const base: BaseProductUI = {
    id: prod._id,
    title: `${prod.brandName} ${prod.model}`,
    image: prod.images?.[0]?.location ?? "https://picsum.photos/400/400",
    price: prod.price,
    isAuthenticated: prod?.authentication?.status === "approved",
    route: "",
  };

  if (prod.type === "auction") {
    return {
      ...base,
      type: "auction",
      route: `/auction/${prod._id}`,
      isAuction: true,
      currentBid: prod.auction?.currentBidAmount ?? 0,
      endsAt: prod?.auction?.endsAt,
    };

    
  }

  if (prod.type === "taking_offers") {
    return {
      ...base,
      type: "taking_offers",
      route: `/taking-offer/${prod._id}`,
      isAuction: false,
    };
  }

  return {
    ...base,
    type: "fixed_price",
    route: `/fixed-price/${prod._id}`,
    isAuction: false,
  };
};