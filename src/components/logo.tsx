import Image from "next/image";
import React from "react";

type Props = {};

const Logo = (props: Props) => {
  return (
    <>
      <Image src={"/images/logo.png"} alt="logo" width={90} height={90} />
    </>
  );
};

export default Logo;
