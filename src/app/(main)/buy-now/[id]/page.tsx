import React, { use } from "react";
import BuyNow from "../_components/buy-now";
import { getWatchById } from "@/lib/helper";

type Props = {
  params: Promise<{ id: string }>;
};

const page = ({ params }: Props) => {
  const { id } = use(params);
  const watch = getWatchById(id);

  return (
    <div className="max-w-screen-2xl mx-auto">
      <BuyNow watch={watch} />
    </div>
  );
};

export default page;
