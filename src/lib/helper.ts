import { auctionWatches, fixedPriceWatches, offerWatches } from "./constants";


export type UserRole = "seller" | "bidder" | "offer-maker" | "viewer";

interface Bidder {
  userId: string;
  bidAmount: number;
}

interface Offer {
  userId: string;
  offerAmount: number;
}

interface Watch {
  sellerId: string;
  bidders?: Bidder[];
  offers?: Offer[];
}

export const getUserRoleForWatch = (
  watch: Watch,
  userId: string
): UserRole => {
  if (watch.sellerId === userId) return "seller";

  if (watch.bidders?.some(b => b.userId === userId)) return "bidder";

  if (watch.offers?.some(o => o.userId === userId)) return "offer-maker";

  return "viewer";
};


export function displayPrice(watch: AuctionWatch | FixedPriceWatch | OfferWatch) {
  if (watch?.saleType === "auction") {
    return watch.basePrice
  } else if (watch?.saleType === "fixed-price") {
    return watch.price
  } else if (watch?.saleType === "taking-offer") {
   return watch.expectedPrice
  }
}


export const getWatchById = (watchId: string): AuctionWatch|FixedPriceWatch |OfferWatch | undefined => {

  const auctionMatch = auctionWatches.find(watch => watch.watchId === watchId);
  if (auctionMatch) return auctionMatch;

  const fixedMatch = fixedPriceWatches.find(watch => watch.watchId === watchId);
  if (fixedMatch) return fixedMatch;

  const offerMatch = offerWatches.find(watch => watch.watchId === watchId);
  if (offerMatch) return offerMatch;

  return undefined;
};