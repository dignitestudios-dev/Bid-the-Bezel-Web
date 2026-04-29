import React, { Suspense } from "react";
import OrderCompletedBuyer from "./_components/order-completed-buyer";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OrderCompletedBuyer />
      </Suspense>
    </div>
  );
};

export default page;
