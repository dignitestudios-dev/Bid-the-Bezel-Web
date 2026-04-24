import BuyNow from "../_components/buy-now";


type Props = {
  params: Promise<{ id: string }>;
};

const page =async ({ params }: Props) => {
const { id } = await params;

  return (
    <div className="max-w-screen-2xl p-2 mx-auto">
      <BuyNow id={id} />
    </div>
  );
};

export default page;
