interface SubscriptionResponse {
    data: string;
}

interface CancelSubscriptionResponse {
    data: {
        message: string;
    };
}

interface AddCardResponse {
    data: {
        message: string;
    };
}

interface Card {
  _id: string;
  user: string;
  __v: number;
  brand: string;
  createdAt: string;
  default: boolean;
  expMonth: number;
  expYear: number;
  last4: string;
  paymentMethodId: string;
  status: string;
  updatedAt: string;
}

interface Bank {
  _id: string;
  bankId: string;
  __v: number;
  accountHolderName: string | null;
  accountNumber: string;
  bankTitle: string;
  createdAt: string;
  routingNumber: string;
  selected: boolean;
  status: string;
  updatedAt: string;
  user: string;
}

interface FinancialDetailsData {
  cards: Card[];
  banks: Bank[];
}

interface FinancialDetailsResponse {
  success: boolean;
  message: string;
  data: FinancialDetailsData;
}