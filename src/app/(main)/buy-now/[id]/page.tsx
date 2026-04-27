import BuyNow from "../_components/buy-now";



const page =async ({ params }: Props) => {
const { id } = await params;

  return (
    <div className="max-w-screen-2xl p-2 mx-auto">
      <BuyNow id={id} />
    </div>
  );
};

export default Page;