import React from "react";

const Logout = ({ color }: { color?: string }) => {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill={"none"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5 2.5H5.83332C5.3913 2.5 4.96737 2.67559 4.65481 2.98816C4.34225 3.30072 4.16666 3.72464 4.16666 4.16667V15.8333C4.16666 16.2754 4.34225 16.6993 4.65481 17.0118C4.96737 17.3244 5.3913 17.5 5.83332 17.5H12.5M15.8333 10L12.5 6.66667M15.8333 10L12.5 13.3333M15.8333 10H7.49999"
        stroke={color || "#0D1B2A"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Logout;
