import { useMe } from "@/features/auth/hooks";
import { useCreateAnswer } from "@/features/product-qa/hook";
import { answerSchema } from "@/features/product-qa/schema";
import { formatDate } from "@/lib/utils/date.utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleQuestionMark, Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Pagination from "./pagination";


type Props = {

    productQAndA?: any;
    page: number
    setPage: (page: number) => void
    pagination?: any
};

const Answers = ({ productQAndA, page, setPage, pagination }: Props) => {
    const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);
    const { data, isLoading } = useMe()
    const isLoggedIn = data?.data ? true : false

    const { mutate: createAnswer, isPending: createAnswerLoading } = useCreateAnswer(activeQuestionId || "")

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(answerSchema),
        defaultValues: { answer: "" },
    });

    const answer = watch("answer")
    const answerLength = answer.length
    const remainingChars = 250 - answerLength

    const onSubmit = (data: any) => {
        createAnswer(data, {
            onSuccess: () => {
                reset();
                setActiveQuestionId(null);
            },
        }
        );
    };


    return (
        <div className="rounded-xl border border-[#E3E3E3]">
            <div className="bg-[#F7F7F7] rounded-t-xl font-semibold text-xl flex gap-2 items-center px-6 py-4 border-b">
                <CircleQuestionMark /> <h1>Questions about the product</h1>
            </div>
            <div className="p-4 ">
                {!isLoggedIn &&
                    <span className="">
                        <Link className="font-semibold" href={"?authstep=login"}>
                            Login
                        </Link>{" "}
                        or{" "}
                        <Link className="font-semibold" href={"?authstep=login"}>
                            Register
                        </Link>{" "}
                        to ask questions
                    </span>}

                <div className="h-[400px] overflow-auto">
                    {productQAndA?.map((q: any, i: number) => (
                        <div key={i} className="border-b border-[#E3E3E3] pb-4">
                            <div className="flex items-start gap-4  py-2">
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
                                <div className="w-full">
                                    <h3 className="text-sm font-semibold break-all">
                                        {q?.question}
                                    </h3>
                                    <div className="flex gap-2 text-xs">
                                        <h5>{q?.askedBy?.userName || "User"}</h5>
                                        <span className="font-thin">{formatDate(q?.createdAt)}</span>
                                    </div>
                                </div>
                            </div>
                            {q?.isAnswered && (
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

                                    <div className="w-full">
                                        <h3 className="text-sm font-semibold  break-all">{q?.answer}</h3>
                                        <div className="flex gap-2 text-xs">
                                            <h5>{q?.answeredBy?.userName || "User"}</h5>
                                            <span className="font-thin">
                                                {formatDate(q?.updatedAt
)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                            )}
                            {!q?.isAnswered && (

                                <button
                                    onClick={() => {
                                        const id = q._id?.toString() || q.id?.toString();
                                        setActiveQuestionId(prev => prev === id ? null : id);
                                    }}
                                    className={`ml-10 text-sm font-semibold cursor-pointer ${activeQuestionId === (q._id?.toString() || q.id?.toString()) ? "text-red-500" : ""}`}
                                >
                                    Reply
                                </button>
                            )}
                            {activeQuestionId === (q._id?.toString() || q.id?.toString()) && (
                                <form
                                    onSubmit={handleSubmit((data) => onSubmit(data))}
                                    className="w-full">

                                    <div className="ml-10 mt-3 flex items-center justify-between gap-2 border rounded-lg px-3 py-2">
                                        <div className="w-full">
                                            <input
                                                type="text"
                                                placeholder="Reply here"
                                                {...register("answer")}
                                                className="w-full outline-none"
                                                maxLength={250}
                                            />
                                            <div className="flex items-center gap-2 my-2">
                                                <span className="text-xs text-gray-500">
                                                    {remainingChars}/{250}
                                                </span>
                                                {errors.answer && <span className="text-xs text-red-500">{errors.answer.message}</span>}
                                            </div>

                                        </div>
                                        <button
                                            type="submit"
                                            disabled={createAnswerLoading}
                                            className="bg-black text-white cursor-pointer p-2 rounded-md disabled:opacity-50"
                                        >
                                            {createAnswerLoading ? <Loader2 className="animate-spin" /> : "Send"}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    ))}

                </div>
                {pagination && (
                    <Pagination
                        page={page}
                        pagination={pagination}
                        setPage={setPage}
                    />
                )}
            </div>
        </div>
    );
};

export default Answers;
