"use client"
import BuyNow from "../_components/buy-now";
import { getWatchById } from "@/lib/helper";
import { useParams } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

const page = ({ params }: Props) => {
  const { id } = useParams();
  const watch = getWatchById(id as string);

  return (
    <div className="max-w-screen-2xl p-2 mx-auto">
      <BuyNow watch={watch} />
    </div>
  );
};

export default page;
