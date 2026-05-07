"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumbs";
import Link from "next/link";
import { ArrowLeft, Clock, X } from "lucide-react";
import File from "@/components/icons/File";
import { useGetChatMessages, useGetChatRooms, useSendMessages } from "@/features/chat/hooks";
import { formatDate, formatTime, formatTimeLeft } from "@/lib/utils/date.utils";
import { Skeleton } from "@/components/ui/skeleton";
import createSocket from "@/sockets/index"

import { useMe } from "@/features/auth/hooks";
type ChatItem = {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  active: boolean;
};

const sampleChats: ChatItem[] = [
  {
    id: 1,
    name: "Iamactive",
    avatar: "https://i.pravatar.cc/40?img=32",
    lastMessage: "Lectus neque eget ipsum mi tempus...",
    time: "1min",
    active: true,
  },
  {
    id: 2,
    name: "Notactiveanymore",
    avatar: "https://i.pravatar.cc/40?img=5",
    lastMessage: "Lectus neque eget ipsum mi tempu...",
    time: "1min",
    active: false,
  },
  {
    id: 3,
    name: "JohnDoe92",
    avatar: "https://i.pravatar.cc/40?img=12",
    lastMessage: "Amet tincidunt arcu non sodales n...",
    time: "2min",
    active: false,
  },
  {
    id: 4,
    name: "CreativeUser88",
    avatar: "https://i.pravatar.cc/40?img=18",
    lastMessage: "Suspendisse potenti. In egestas er...",
    time: "3min",
    active: false,
  },
  {
    id: 5,
    name: "TechSavvy101",
    avatar: "https://i.pravatar.cc/40?img=11",
    lastMessage: "Praesent semper feugiat nibh sed...",
    time: "5min",
    active: false,
  },
  {
    id: 6,
    name: "ArtisticSoul77",
    avatar: "https://i.pravatar.cc/40?img=22",
    lastMessage: "Vestibulum euismod, nisi vel conse...",
    time: "4min",
    active: false,
  },
];



type MessageStatus = "sending" | "sent" | "failed";

type TempMessage = {
  _id: string;
  text: string;
  createdAt: string;
  isMineMessage: true;
  status: MessageStatus;
  sender: {
    profilePicture?: { location: string };
  };
};

const Chats = () => {

  const [chats] = useState<ChatItem[]>(sampleChats);
  const [selectedChat, setSelectedChat] = useState<any>()
  const [message, setMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { data: userData } = useMe()

  const userId = userData?.data?._id;

  const { data: allChatRooms, isLoading: roomsLoading } = useGetChatRooms()
  const { data: chatRoomMessages, isLoading: messagesLoading } = useGetChatMessages(selectedChat?._id)
  const [messages, setMessages] = useState<any>(chatRoomMessages?.data)

  const { mutateAsync: sendMessage } = useSendMessages(selectedChat?._id)
  const { socket, connect } = createSocket()
  const [chatRooms, setChatRooms] = useState<any[]>([]);

  useEffect(() => {
    if (allChatRooms?.data) {
      setChatRooms(allChatRooms.data);
    }
  }, [allChatRooms]);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop =
        messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (allChatRooms?.data?.length > 0 && !selectedChat) {
      setSelectedChat(allChatRooms.data[0]);
    }

  }, [allChatRooms, selectedChat]);


  useEffect(() => {
    connect();

    if (!selectedChat) return;

    const handleNewMessage = (incomingMsg: any) => {

      setMessages((prev: any[]) => {
        const tempMessageExists = prev.find(
          (msg) => msg.tempId === incomingMsg.tempId
        );

        if (tempMessageExists) {
          return prev.map((msg) =>
            msg.tempId === incomingMsg.tempId
              ? {
                ...incomingMsg,
                status: "sent",
              }
              : msg
          );
        }

        const alreadyExists = prev.some(
          (msg) => msg._id === incomingMsg._id
        );

        if (alreadyExists) return prev;

        return [...prev, incomingMsg];
      });

      setChatRooms((prevRooms: any[]) => {

        const updatedRooms = prevRooms.map((room) => {
          if (room._id === incomingMsg.room) {
            return {
              ...room,
              lastMessage: {
                text: incomingMsg.text,
                sentAt: incomingMsg.createdAt,
              },
            };
          }

          return room;
        });


        updatedRooms.sort((a, b) => {
          return (
            new Date(b.lastMessage?.sentAt || 0).getTime() -
            new Date(a.lastMessage?.sentAt || 0).getTime()
          );
        });

        return updatedRooms;
      });
    };

    socket.on("new_message", handleNewMessage);

    return () => {
      socket.off("new_message", handleNewMessage);
    };
  }, [selectedChat]);




  const handleSend = async () => {
    if (!message.trim()) return

    const tempId = `temp_${Date.now()}`
    const optimisticMsg = {
      _id: tempId,
      tempId,
      text: message,
      createdAt: new Date().toISOString(),
      status: "sending",
      sender: {
        _id: userId,
        profilePicture: {
          location:
            userData?.data?.profilePicture?.location || "",
        },
      },
    };

    setMessages((prev: any) => [...prev, {
      ...optimisticMsg,
      sender: { _id: userId, profilePicture: { location: userData?.data?.profilePicture?.location || "" } }
    }])
    setMessage("")

    try {
      await sendMessage({ text: message, tempId: tempId })

    } catch {

      setMessages((prev: any) =>
        prev.map((m: any) => m._id === tempId ? { ...m, status: "failed" } : m)
      )
    }
  }

  useEffect(() => {
    setMessages(chatRoomMessages?.data)
  }, [chatRoomMessages]);

  return (
    <div className="min-h-screen p-10 bg-white">
      <div className="w-full mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <Link href="/" className="text-gray-700 hover:text-gray-900">
            <ArrowLeft />
          </Link>

          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbPage className="font-semibold">Chats</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left: chat list */}
            <div className="w-full lg:w-1/3 border-r border-gray-100 p-6">
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700">
                  Active Chats
                </h4>
                <div className="mt-3">
                  {roomsLoading ? (
                    <div className="space-y-4">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 p-3 rounded-lg border"
                        >
                          <Skeleton className="w-10 h-10 rounded-full" />

                          <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-48" />
                          </div>

                          <Skeleton className="h-3 w-10" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    chatRooms?.map((c: any) => (
                      <div
                        key={c._id}
                        onClick={() => {
                          setSelectedChat(c);
                        }}
                        className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer overflow-hidden transition-all ${selectedChat?._id === c._id
                          ? "bg-[#0E2430] text-white"
                          : "hover:bg-gray-50"
                          }`}
                      >
                        {c?.participants
                          ?.filter((item: any) => item?.user?._id !== userId)
                          ?.map((item: any) => (
                            <React.Fragment key={item?._id}>

                              <img
                                src={
                                  item?.user?.profilePicture?.location ||
                                  "/default-avatar.png"
                                }
                                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                              />


                              <div className="flex-1 min-w-0">

                                <div
                                  className={`font-medium truncate ${selectedChat?._id === c._id
                                    ? "text-white"
                                    : "text-gray-900"
                                    }`}
                                >
                                  {item?.user?.userName || "User"}
                                </div>


                                <div
                                  className={`text-xs mt-1 line-clamp-2 break-words ${selectedChat?._id === c._id
                                    ? "text-gray-200"
                                    : "text-gray-500"
                                    }`}
                                >
                                  {c.lastMessage?.text || "No messages yet"}
                                </div>
                              </div>
                            </React.Fragment>
                          ))}


                        <div
                          className={`text-xs whitespace-nowrap flex-shrink-0 ${selectedChat?._id === c._id
                            ? "text-gray-200"
                            : "text-gray-500"
                            }`}
                        >
                          {formatTime(c.lastMessage?.sentAt)}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-700">
                    Inactive Past Chats
                  </h4>
                  <div className="mt-3 space-y-3">
                    {chats
                      .filter((c) => !c.active)
                      .map((c) => (
                        <div
                          key={c.id}
                          onClick={() => setSelectedId(c.id)}
                          className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${selectedId === c.id
                            ? "bg-[#0E2430] text-white"
                            : "hover:bg-gray-50"
                            }`}
                        >
                          <img
                            src={c.avatar}
                            alt={c.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="flex-1 text-sm">
                            <div
                              className={`font-medium ${selectedId === c.id
                                ? "text-white"
                                : "text-gray-900"
                                }`}
                            >
                              {c.name}
                            </div>
                            <div
                              className={`${selectedId === c.id
                                ? "text-gray-200"
                                : "text-gray-500"
                                } text-xs mt-1`}
                            >
                              {c.lastMessage}
                            </div>
                          </div>
                          <div
                            className={`text-xs ${selectedId === c.id
                              ? "text-gray-200"
                              : "text-gray-500"
                              }`}
                          >
                            {c.time}
                          </div>
                        </div>
                      ))}
                  </div>
                </div> */}
            </div>


            <div className="w-full lg:flex-1 p-6 flex flex-col">
              {selectedChat?.participants?.map((item: any) => (
                <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                  <img
                    src={item?.user?.profilePicture?.location}
                    alt={item?.user?.userName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="font-medium text-lg">{item?.user?.userName}</div>
                </div>

              ))}

              <div
                ref={messagesEndRef}
                className="flex-1 p-2 overflow-y-scroll h">
                {messages?.length === 0 ? (
                  <div className="text-center text-sm text-gray-500 my-10">
                    No messages yet
                  </div>
                ) : (
                  <div className="text-center text-sm text-gray-500 mb-6">
                    {formatDate(selectedChat?.createdAt)}
                  </div>
                )}

                {messagesLoading ? (
                  <div className="space-y-3">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className={`flex items-end gap-3 ${i % 2 === 0 ? "justify-end" : ""
                          }`}
                      >
                        {i % 2 !== 0 && (
                          <Skeleton className="w-8 h-8 rounded-full" />
                        )}

                        <Skeleton
                          className={`h-14 rounded-2xl ${i % 2 === 0 ? "w-52" : "w-64"
                            }`}
                        />

                        {i % 2 === 0 && (
                          <Skeleton className="w-8 h-8 rounded-full" />
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-[400px]">

                    {messages?.map((item: any) => {

                      const isMine = item?.sender?._id === userId;

                      return (
                        <div key={item._id} className="mb-4">
                          {isMine ? (
                            <div className="flex items-end justify-end gap-3">
                              <div className="bg-[#3A556B] text-white px-5 py-3 rounded-xl rounded-br-none max-w-md break-all">
                                <p>{item.text}</p>
                                <span className="text-[10px] text-gray-300 block mt-1 text-right flex items-center justify-end gap-1">
                                  {item.status === "sending" && (
                                    <>
                                      <Clock className="w-3 h-3 animate-pulse" />
                                      <span>Sending...</span>
                                    </>
                                  )}
                                  {item.status === "failed" && (
                                    <>
                                      <X className="w-3 h-3 text-red-400" />
                                      <span className="text-red-400">Failed</span>
                                    </>
                                  )}
                                  {/* sent OR server messages (no status field) */}
                                  {(!item.status || item.status === "sent") && (
                                    formatTime(item.createdAt)
                                  )}
                                </span>
                              </div>
                              <img
                                src={item?.sender?.profilePicture?.location ?? "/default-avatar.png"}
                                className="w-8 h-8 rounded-full object-cover"
                              />
                            </div>
                          ) : (
                            // ── Other user's message ─────────────────────────────────
                            <div className="flex items-end gap-3">
                              <img
                                src={item?.sender?.profilePicture?.location ?? "/default-avatar.png"}
                                className="w-8 h-8 rounded-full object-cover"
                              />
                              <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-xl rounded-bl-none max-w-md break-all">
                                <p>{item?.text}</p>
                                <span className="text-[10px] text-gray-500 block mt-1">
                                  {formatTime(item.createdAt)}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="pt-4">
                {/* {true ? ( */}
                <div className="flex items-center p-3 border border-gray-200 rounded-xl">
                  <input type="file" id="attach-file" className="hidden" />
                  <label htmlFor="attach-file" className="cursor-pointer">
                    <File />
                  </label>

                  <input
                    placeholder="Send a message"
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);


                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && message.trim()) {
                        handleSend();
                      }
                    }}
                    className="flex-1 px-4 py-3 rounded-md text-sm placeholder-gray-500 outline-none"
                  />

                  <button
                    onClick={handleSend}
                    disabled={!message.trim()}
                    className={`ml-3 w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0 transition-all
  ${message.trim()
                        ? "bg-[#0E2430] text-white hover:opacity-90"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path
                        d="M22 2L11 13"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M22 2L15 22l-4-9-9-4 19-7z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                {/* ) : ( */}
                {/* <div className="text-center text-gray-500 py-8">
                      You can no longer chat with this user
                    </div> */}
                {/* )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
