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
import { ArrowLeft, Clock, FileText, X, ZoomIn, ZoomOut } from "lucide-react";
import File from "@/components/icons/File";
import { useGetChatMessages, useGetChatRooms, useSendMessages, useSendMessagesMedia } from "@/features/chat/hooks";
import { formatDate, formatTime, formatTimeLeft } from "@/lib/utils/date.utils";
import { Skeleton } from "@/components/ui/skeleton";
import createSocket from "@/sockets/index"
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useMe } from "@/features/auth/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import {toast } from "sonner"
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
  const queryClient = useQueryClient()
  const [chats] = useState<ChatItem[]>(sampleChats);
  const [selectedChat, setSelectedChat] = useState<any>()
  const [message, setMessage] = useState("")
  const [files, setFiles] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { data: userData } = useMe()
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const userId = userData?.data?._id;

  const { data: allChatRooms, isLoading: roomsLoading } = useGetChatRooms()
  const { data: chatRoomMessages, isLoading: messagesLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetChatMessages(selectedChat?._id)

  const allMessages = chatRoomMessages?.pages?.slice().reverse().flatMap(page => page?.data) || [];
  const [messages, setMessages] = useState<any[]>(allMessages)
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true);
  const previousMessageCountRef = useRef(0);
  const previousScrollHeightRef = useRef(0);
  const isInitialLoadRef = useRef(true);

  const { mutateAsync: sendMessage } = useSendMessages(selectedChat?._id)
  const { mutateAsync: sendMedia } = useSendMessagesMedia(selectedChat?._id)
  console.log(files)

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = Array.from(
      event.target.files || []
    );

    console.log("selectedFiles", selectedFiles);

    const MAX_IMAGE_SIZE = 20 * 1024 * 1024;

    const validFiles = selectedFiles.filter((file) => {
      if (file.type.startsWith("image/") && file.size > MAX_IMAGE_SIZE) {
        toast(`${file.name} exceeds 20MB limit`);
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      setFiles((prev) => [...prev, ...validFiles]);
    }

    // reset input
    event.target.value = "";
  };

  const { socket, connect } = createSocket()
  const [chatRooms, setChatRooms] = useState<any[]>([]);

  useEffect(() => {
    if (allChatRooms?.data) {
      setChatRooms(allChatRooms.data);
    }
  }, [allChatRooms]);

  useEffect(() => {
    const scrollToBottom = () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
      }
    };

    if (shouldScrollToBottom) {
      requestAnimationFrame(() => {
        scrollToBottom();
        setShouldScrollToBottom(false);
      });
    }
  }, [messages, shouldScrollToBottom]);

  useEffect(() => {
    if (messagesEndRef.current && !shouldScrollToBottom && previousScrollHeightRef.current > 0) {
      const scrollContainer = messagesEndRef.current;
      const newScrollHeight = scrollContainer.scrollHeight;
      const scrollDiff = newScrollHeight - previousScrollHeightRef.current;
      scrollContainer.scrollTop = scrollDiff;
      previousScrollHeightRef.current = 0;
    }
  }, [messages, shouldScrollToBottom]);

  useEffect(() => {
    if (allChatRooms?.data?.length > 0 && !selectedChat) {
      setSelectedChat(allChatRooms.data[0]);
    }
    if (selectedChat) {
      previousMessageCountRef.current = 0;
      isInitialLoadRef.current = true;
      setShouldScrollToBottom(true);
    }
  }, [selectedChat]);


  useEffect(() => {
    connect();

    if (!selectedChat) return;

    const handleNewMessage = (incomingMsg: any) => {

      queryClient.invalidateQueries({
        queryKey: ["get-chat-rooms"],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-chat-messages"],
      });

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
    if (!message.trim() && files.length === 0) return;

    const tempId = `temp_${Date.now()}`;

    const currentMessage = message;
    const currentFiles = files;

    setMessage("");
    setFiles([]);

    const optimisticMsg = {
      _id: tempId,
      tempId,
      text: currentMessage,
      attachments: currentFiles.map((f: any) => ({
        name: f.name,
        type: f.type,
        url: URL.createObjectURL(f),
      })),

      createdAt: new Date().toISOString(),
      status: "sending",
      sender: {
        _id: userId,
        profilePicture: {
          location: userData?.data?.profilePicture?.location || "",
        },
      },
    };

    setMessages((prev: any) => [...prev, optimisticMsg]);
    setShouldScrollToBottom(true);

    try {

      if (currentFiles.length > 0) {
        const formData = new FormData();

        currentFiles.forEach((file) => {
          formData.append("files", file);
        });

        if (currentMessage.trim()) {
          formData.append("text", currentMessage);
        }

        formData.append("tempId", tempId);

        await sendMedia(formData);
        return;
      }

      await sendMessage({
        text: currentMessage,
        tempId,
      });

    } catch {
      setMessages((prev: any) =>
        prev.map((m: any) =>
          m._id === tempId ? { ...m, status: "failed" } : m
        )
      );
    }
  };

  useEffect(() => {
    const allMsgs = chatRoomMessages?.pages?.slice().reverse().flatMap(page => page?.data) || [];
    const lastMessageId = allMsgs[allMsgs.length - 1]?._id;
    const previousLastMessageId = messages[messages.length - 1]?._id;
    const isNewMessage = lastMessageId && lastMessageId !== previousLastMessageId && previousMessageCountRef.current > 0;
    const isPagination = allMsgs.length > previousMessageCountRef.current && previousMessageCountRef.current > 0 && !isNewMessage;

    if (isPagination && messagesEndRef.current) {
      previousScrollHeightRef.current = messagesEndRef.current.scrollHeight;
    }

    setMessages(allMsgs);

    if (isInitialLoadRef.current && allMsgs.length > 0) {
      setShouldScrollToBottom(true);
      isInitialLoadRef.current = false;
    } else if (isNewMessage) {
      setShouldScrollToBottom(true);
    }

    previousMessageCountRef.current = allMsgs.length;
  }, [chatRoomMessages]);

  const handleImageClick = (url: string) => {
    setZoomedImage(url);
    setZoomLevel(1);
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.5, 0.5));
  };

  const handleCloseZoom = () => {
    setZoomedImage(null);
    setZoomLevel(1);
  };

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
                  ) : chatRooms?.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-gray-500">No active chats</p>
                    </div>
                  ) : (
                    chatRooms?.map((c: any) => {
                      const otherParticipants = c?.participants?.filter((item: any) => item?.user?._id !== userId);
                      const isGroupChat = otherParticipants?.length > 1;

                      return (
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
                          {isGroupChat ? (
                            <div className="flex -space-x-2 flex-shrink-0">
                              {otherParticipants?.slice(0, 2).map((item: any, idx: number) => (
                                <React.Fragment key={item?._id}>
                                  {item?.user?.profilePicture?.location ? (
                                    <img
                                      src={item?.user?.profilePicture?.location}
                                      className="w-10 h-10 rounded-full object-cover border-2 border-white"
                                    />
                                  ) : (
                                    <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white text-xs font-semibold border-2 border-white">
                                      AD
                                    </div>
                                  )}
                                </React.Fragment>
                              ))}
                            </div>
                          ) : (
                            otherParticipants?.map((item: any) => (
                              <React.Fragment key={item?._id}>
                                {item?.user?.profilePicture?.location ? (
                                  <img
                                    src={item?.user?.profilePicture?.location}
                                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                                  />
                                ) : (
                                  <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
                                    AD
                                  </div>
                                )}
                              </React.Fragment>
                            ))
                          )}

                          <div className="flex-1 min-w-0">
                            <div
                              className={`font-medium truncate ${selectedChat?._id === c._id
                                ? "text-white"
                                : "text-gray-900"
                                }`}
                            >
                              {isGroupChat
                                ? otherParticipants.map((p: any) => p?.user?.userName || "Admin").join(", ")
                                : otherParticipants?.[0]?.user?.userName || "Admin"}
                            </div>

                            <div
                              className={`text-xs mt-1 line-clamp-1 break-words ${selectedChat?._id === c._id
                                ? "text-gray-200"
                                : "text-gray-500"
                                }`}
                            >
                              {c.lastMessage?.text || "No messages yet"}
                            </div>
                          </div>

                          <div
                            className={`text-xs whitespace-nowrap flex-shrink-0 ${selectedChat?._id === c._id
                              ? "text-gray-200"
                              : "text-gray-500"
                              }`}
                          >
                            {formatTime(c.lastMessage?.sentAt)}
                          </div>
                        </div>
                      )
                    })
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
              {!selectedChat && (
                <div className="text-center text-gray-500 text-lg py-8">
                  Select a chat to start messaging
                </div>
              )}
              {selectedChat && (
                <>
                  <div className="flex items-center gap-3 pb-4 border-b border-gray-100 flex-wrap">
                {selectedChat?.participants?.map((item: any) => (
                  <div key={item?._id} className="flex items-center gap-2">
                    {item?.user?.profilePicture?.location ? (
                      <img
                        src={item?.user?.profilePicture?.location}
                        alt={item?.user?.userName}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xs font-semibold">
                        AD
                      </div>
                    )}
                    <div className="font-medium text-sm">{item?.user?.userName || "Admin"}</div>
                  </div>
                ))}
              </div>

              <div
                ref={messagesEndRef}
                onScroll={(e) => {
                  const target = e.currentTarget;
                  if (target.scrollTop <= 50 && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                  }
                }}
                className="flex-1 p-2 overflow-y-auto min-h-[400px] max-h-[500px]">

                <div className="min-h-full flex flex-col justify-end">
                  {isFetchingNextPage && (
                    <div className="text-center py-2">
                      <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
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
                    <div>
                      {messages?.map((item: any) => {

                        const isMine = item?.sender?._id === userId;
                        const media = item.attachments || item.files || [];

                        return (
                          <div key={item._id} className="mb-4">
                            {isMine ? (
                              <div className="flex items-end justify-end gap-3">
                                <div className="bg-[#3A556B] text-white px-5 py-3 rounded-xl rounded-br-none max-w-md break-all">
                                  <p>{item.text}</p>
                                  {media?.length > 0 && (
                                    <div className="mt-2 space-y-2">
                                      {media.map((file: any, index: number) => {

                                        const url = file.url || file.location;

                                        const mime =
                                          file.mimeType ||
                                          file.type ||
                                          "";

                                        const isImage = mime.startsWith("image/");
                                        const isVideo = mime.startsWith("video/");
                                        const isAudio = mime.startsWith("audio/");
                                        const isDoc = !isImage && !isVideo && !isAudio;

                                        return (
                                          <div key={index}>

                                            {isImage && (
                                              <img
                                                src={url}
                                                alt="media"
                                                onClick={() => handleImageClick(url)}
                                                className="max-w-[220px] rounded-lg border cursor-pointer hover:opacity-90 transition-opacity"
                                              />
                                            )}

                                            {isVideo && (
                                              <video
                                                src={url}
                                                controls
                                                className="max-w-[220px] rounded-lg border"
                                              />
                                            )}

                                            {isDoc && (
                                              <a
                                                href={url}
                                                target="_blank"
                                                className="flex items-center gap-2 p-3 bg-white border rounded-lg shadow-sm hover:bg-gray-50"
                                              >
                                                <FileText className="w-5 h-5 text-red-500" />
                                                <span className="text-sm  text-black font-medium">
                                                  {file.name || "PDF File"}
                                                </span>
                                              </a>
                                            )}

                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}
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

                                    {(!item.status || item.status === "sent") && (
                                      formatTime(item.createdAt)
                                    )}
                                  </span>
                                </div>
                                {item?.sender?.profilePicture?.location ? (
                                  <img
                                    src={item?.sender?.profilePicture?.location}
                                    className="w-8 h-8 rounded-full object-cover"
                                  />
                                ) : (
                                  <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xs font-semibold">
                                    AD
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="flex items-end gap-3">
                                {item?.sender?.profilePicture?.location ? (
                                  <img
                                    src={item?.sender?.profilePicture?.location}
                                    className="w-8 h-8 rounded-full object-cover"
                                  />
                                ) : (
                                  <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xs font-semibold">
                                    AD
                                  </div>
                                )}
                                <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-xl rounded-bl-none max-w-md break-all">
                                  <p>{item?.text}</p>
                                  {media?.length > 0 && (
                                    <div className="mt-2 space-y-2">
                                      {media.map((file: any, index: number) => {

                                        const url = file.url || file.location;

                                        const mime =
                                          file.mimeType ||
                                          file.type ||
                                          "";

                                        const isImage = mime.startsWith("image/");
                                        const isVideo = mime.startsWith("video/");
                                        const isAudio = mime.startsWith("audio/");
                                        const isDoc = !isImage && !isVideo && !isAudio;

                                        return (
                                          <div key={index}>


                                            {isImage && (
                                              <img
                                                src={url}
                                                alt="media"
                                                onClick={() => handleImageClick(url)}
                                                className="max-w-[220px] rounded-lg border cursor-pointer hover:opacity-90 transition-opacity"
                                              />
                                            )}


                                            {isVideo && (
                                              <video
                                                src={url}
                                                controls
                                                className="max-w-[220px] rounded-lg border"
                                              />
                                            )}

                                            {isDoc && (
                                              <a
                                                href={url}
                                                target="_blank"
                                                className="flex items-center gap-2 p-3 bg-white border rounded-lg shadow-sm hover:bg-gray-50"
                                              >
                                                <FileText className="w-5 h-5 text-red-500" />
                                                <span className="text-sm  text-black font-medium">
                                                  {file.name || "PDF File"}
                                                </span>
                                              </a>
                                            )}

                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}
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
              </div>
              <div className="pt-4">
                {files?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {files?.map((file: File, index) => {

                      const url = URL.createObjectURL(file);
                      const type = file.type;

                      const isImage = type.startsWith("image/");
                      const isVideo = type.startsWith("video/");
                      const isAudio = type.startsWith("audio/");
                      const isDoc =
                        !isImage && !isVideo && !isAudio;

                      return (
                        <div
                          key={index}
                          className="relative p-2 bg-gray-100 rounded-lg flex items-center gap-2"
                        >

                          {/* IMAGE */}
                          {isImage && (
                            <img
                              src={url}
                              className="w-[200px] h-[150px] rounded object-cover border"
                            />
                          )}

                          {/* VIDEO */}
                          {isVideo && (
                            <video
                              src={url}
                              className="w-[200px] h-[150px] rounded border"
                              controls
                            />
                          )}

                          {isDoc && (
                            <div className="px-2 py-1 rounded flex items-center text-xs bg-gray-200 rounded">
                              <a
                                href={url}
                                target="_blank"
                                className="flex items-center gap-2 p-3 bg-white border rounded-lg shadow-sm hover:bg-gray-50"
                              >
                                <FileText className="w-5 h-5 text-red-500" />
                                <span className="text-sm font-medium">
                                  {file.name || "PDF File"}
                                </span>
                              </a>
                            </div>
                          )}

                          <button
                            onClick={() => {
                              setFiles((prev) =>
                                prev.filter((_, i) => i !== index)
                              );
                            }}
                            className="absolute -top-2 -right-2 bg-white rounded-full shadow p-1"
                          >
                            <X className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
                {/* {true ? ( */}
                {chatRooms?.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    No active chats
                  </div>
                ) : (
                  <div className="flex items-center p-3 border border-gray-200 rounded-xl">
                    <input
                      type="file"
                      id="attach-file"
                      className="hidden"
                      onChange={handleFileChange}
                      multiple
                      accept="*/*"
                    />
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
                      disabled={!message.trim() && files.length === 0}
                      className={`ml-3 w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0 transition-all
  ${message.trim() || files.length > 0

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
                )}
              </div>
              </>
              )}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={!!zoomedImage} onOpenChange={handleCloseZoom}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 overflow-hidden bg-black/95">
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute top-4 right-4 z-50 flex gap-2">
              <button
                onClick={handleZoomOut}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors"
              >
                <ZoomOut className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={handleZoomIn}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors"
              >
                <ZoomIn className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={handleCloseZoom}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="overflow-auto max-w-full max-h-full p-8">
              {zoomedImage && (
                <img
                  src={zoomedImage}
                  alt="Zoomed"
                  className="max-w-full max-h-[80vh] w-auto h-auto object-contain transition-transform duration-200"
                  style={{
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: "center center",
                  }}
                />
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Chats;
