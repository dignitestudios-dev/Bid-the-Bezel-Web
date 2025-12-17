import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/lib/hooks";
import { CircleQuestionMark, SendHorizontal } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};
export const watchFAQs = [
  {
    id: 1,
    question: "What materials are used in premium watches?",
    answer:
      "Premium watches are commonly made from stainless steel, titanium, ceramic, sapphire crystal, and sometimes precious metals like gold or platinum.",
  },
  {
    id: 2,
    question: "What is the difference between automatic and quartz watches?",
    answer:
      "Automatic watches are powered by wrist movement and mechanical components, while quartz watches run on batteries and are more accurate with less maintenance.",
  },
  {
    id: 3,
    question: "Are luxury watches a good investment?",
    answer:
      "Certain luxury watches from brands like Rolex, Patek Philippe, and Omega can appreciate in value over time, depending on rarity, condition, and market demand.",
  },
  {
    id: 4,
    question: "How often should a watch be serviced?",
    answer:
      "Mechanical and automatic watches should typically be serviced every 3–5 years to maintain accuracy and longevity.",
  },
  {
    id: 5,
    question: "What does water resistance rating mean?",
    answer:
      "Water resistance indicates how much exposure to water a watch can handle. For example, 30m is splash-resistant, 100m is suitable for swimming, and 300m is for professional diving.",
  },
  {
    id: 6,
    question: "What is a chronograph watch?",
    answer:
      "A chronograph is a watch that includes a stopwatch function, often with additional sub-dials for measuring elapsed time.",
  },
  {
    id: 7,
    question: "How can I verify if a watch is authentic?",
    answer:
      "Authenticity can be verified through serial numbers, original documentation, brand-certified dealers, and professional watch authentication services.",
  },
];

const Questions = (props: Props) => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  return (
    <div className="rounded-xl border border-[#E3E3E3]">
      <div className="bg-[#F7F7F7] rounded-t-xl font-semibold text-lg md:text-xl flex gap-2 items-center px-6 py-4 border-b">
        <CircleQuestionMark /> <h1>Questions about the product</h1>
      </div>
      <div className="p-4 ">
        {isLoggedIn ?    <div className="bg-[#F7F7F7] p-2 rounded-lg  flex h-20 flex-col items-end"> 
          <Input placeholder="Ask your question" className="border-none shadow-none focus:shadow-none focus:border-none focus:outline-none" />
          <SendHorizontal size={50} className="bg-black h-8 p-1 rounded-sm text-white " />
           </div> :    <span className="">
          <Link className="font-semibold" href={"/login"}>
            Login
          </Link>{" "}
          or{" "}
          <Link className="font-semibold" href={"/sign-up"}>
            Register
          </Link>{" "}
          to ask questions
        </span> }
     
        <div className="h-[400px] overflow-auto">
          {watchFAQs.map((q, idx) => (
            <div key={idx} className="border-b border-[#E3E3E3] pb-4">
              <div className="flex items-start gap-4  py-4">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.14693 28.7971C1.82137 29.725 0 28.7767 0 27.1587V2C0 0.89543 0.895431 0 2 0H28C29.1046 0 30 0.895431 30 2V22C30 23.1046 29.1046 24 28 24H10.6304C10.2201 24 9.81969 24.1262 9.48352 24.3615L3.14693 28.7971Z"
                    fill="#0D1B2A"
                  />
                  <path
                    d="M15.0015 16.196C13.7695 16.196 12.7895 15.86 12.0615 15.188C11.3335 14.5067 10.9695 13.536 10.9695 12.276V9.924C10.9695 8.664 11.3335 7.698 12.0615 7.026C12.7895 6.34467 13.7695 6.004 15.0015 6.004C16.2335 6.004 17.2135 6.34467 17.9415 7.026C18.6695 7.698 19.0335 8.664 19.0335 9.924V12.276C19.0335 13.536 18.6695 14.5067 17.9415 15.188C17.2135 15.86 16.2335 16.196 15.0015 16.196ZM15.0015 14.544C15.6922 14.544 16.2289 14.3433 16.6115 13.942C16.9942 13.5407 17.1855 13.004 17.1855 12.332V9.868C17.1855 9.196 16.9942 8.65933 16.6115 8.258C16.2289 7.85667 15.6922 7.656 15.0015 7.656C14.3202 7.656 13.7835 7.85667 13.3915 8.258C13.0089 8.65933 12.8175 9.196 12.8175 9.868V12.332C12.8175 13.004 13.0089 13.5407 13.3915 13.942C13.7835 14.3433 14.3202 14.544 15.0015 14.544ZM15.6455 18.52C15.1882 18.52 14.8149 18.3753 14.5255 18.086C14.2455 17.806 14.1055 17.428 14.1055 16.952V16H15.8975V16.672C15.8975 16.952 16.0282 17.092 16.2895 17.092H17.1155V18.52H15.6455Z"
                    fill="white"
                  />
                </svg>
                <div>
                  <h3 className="text-sm font-semibold">{q.question}</h3>
                  <div className="flex gap-2 text-xs">
                    <h5>Watchseller</h5>
                    <span className="font-thin">12 Jan 2025, 12:30 Pm</span>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.14693 28.7971C1.82137 29.725 0 28.7767 0 27.1587V2C0 0.89543 0.895431 0 2 0H28C29.1046 0 30 0.895431 30 2V22C30 23.1046 29.1046 24 28 24H10.6304C10.2201 24 9.81969 24.1262 9.48352 24.3615L3.14693 28.7971Z"
                    fill="#778DA9"
                  />
                  <path
                    d="M11.3155 16L13.8915 6.2H17.1115L19.6875 16H17.7835L17.2515 13.844H13.7515L13.2195 16H11.3155ZM14.1855 12.136H16.8175L15.6275 7.362H15.3755L14.1855 12.136Z"
                    fill="white"
                  />
                </svg>

                <div>
                  <h3 className="text-sm font-semibold">{q.answer}</h3>
                  <div className="flex gap-2 text-xs">
                    <h5>Watchseller</h5>
                    <span className="font-thin">
                      12 Jan 2025, 12:30 Pm Seller
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Questions;
