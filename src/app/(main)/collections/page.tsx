import React, { Suspense } from "react";
import Collections from "./_components/collections";

type Props = {};

const page = (props: Props) => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Collections />
      </Suspense>
    </>
  );
};

export default page;
