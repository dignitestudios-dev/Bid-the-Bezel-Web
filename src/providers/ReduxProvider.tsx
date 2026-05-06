"use client";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/lib/store";
import { getFirebaseMessaging } from "@/lib/firebase";
import { onMessage } from "firebase/messaging";
import { showSuccess } from "@/lib/toast";

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {


  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
