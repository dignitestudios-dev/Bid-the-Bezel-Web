"use client";
import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumbs";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import File from "@/components/icons/File";

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

const Chats = () => {
  const [chats] = useState<ChatItem[]>(sampleChats);
  const [selectedId, setSelectedId] = useState<number>(1);

  const selected = chats.find((c) => c.id === selectedId) || chats[0];

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
                  {chats
                    .filter((c) => c.active)
                    .map((c) => (
                      <div
                        key={c.id}
                        onClick={() => setSelectedId(c.id)}
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                          selectedId === c.id
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
                            className={`font-medium ${
                              selectedId === c.id
                                ? "text-white"
                                : "text-gray-900"
                            }`}
                          >
                            {c.name}
                          </div>
                          <div
                            className={`${
                              selectedId === c.id
                                ? "text-gray-200"
                                : "text-gray-500"
                            } text-xs mt-1`}
                          >
                            {c.lastMessage}
                          </div>
                        </div>
                        <div
                          className={`text-xs ${
                            selectedId === c.id
                              ? "text-gray-200"
                              : "text-gray-500"
                          }`}
                        >
                          {c.time}
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="mt-6">
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
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                          selectedId === c.id
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
                            className={`font-medium ${
                              selectedId === c.id
                                ? "text-white"
                                : "text-gray-900"
                            }`}
                          >
                            {c.name}
                          </div>
                          <div
                            className={`${
                              selectedId === c.id
                                ? "text-gray-200"
                                : "text-gray-500"
                            } text-xs mt-1`}
                          >
                            {c.lastMessage}
                          </div>
                        </div>
                        <div
                          className={`text-xs ${
                            selectedId === c.id
                              ? "text-gray-200"
                              : "text-gray-500"
                          }`}
                        >
                          {c.time}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Right: chat panel */}
            <div className="w-full lg:flex-1 p-6 flex flex-col">
              <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                <img
                  src={selected.avatar}
                  alt={selected.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="font-medium text-lg">{selected.name}</div>
              </div>

              <div className="flex-1 p-2 overflow-auto">
                <div className="w-full">
                  <div className="text-center text-sm text-gray-500 mb-6">
                    Wednesday, 20 Nov
                  </div>

                  <div className="flex items-end gap-3 mb-6">
                    <img
                      src={chats[0].avatar}
                      alt="sender"
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-xl rounded-bl-none max-w-md">
                      Lectus neque eget ipsum mi tempus sed. Lorem ipsum dolor
                      sit amet consectetur adipisicing elit.
                    </div>
                  </div>

                  <div className="flex items-end justify-end gap-3 mb-6">
                    <div className="bg-[#3A556B] text-white px-5 py-3 rounded-xl rounded-br-none max-w-md">
                      Lectus neque eget ipsum mi tempus sed tempus sed.
                    </div>
                    <img
                      src={selected.avatar}
                      alt="me"
                      className="w-8 h-8 rounded-full"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                {selected.active ? (
                  <div className="flex items-center p-3 border border-gray-200 rounded-xl">
                    <input type="file" id="attach-file" className="hidden" />
                    <label htmlFor="attach-file" className="cursor-pointer">
                      <File />
                    </label>

                    <input
                      placeholder="Send a message"
                      className="flex-1 px-4 py-3 rounded-md text-sm placeholder-gray-500 outline-none"
                    />

                    <button className="ml-3 w-10 h-10 bg-[#0E2430] text-white rounded-md flex items-center justify-center flex-shrink-0">
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
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    You can no longer chat with this user
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
