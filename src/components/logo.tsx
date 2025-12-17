import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const Logo = (props: Props) => {
  return (
    <Link href={"/"}>
      <Image src={"/images/logo.png"} alt="logo" width={90} height={90} />
    </Link>
  );
};

export default Logo;
