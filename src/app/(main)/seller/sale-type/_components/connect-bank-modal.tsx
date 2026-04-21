"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAddBankAccount } from "@/features/billing/hook";
import { useAppDispatch } from "@/lib/hooks";
import { login } from "@/lib/slices/authSlice";
import { useMe } from "@/features/auth/hooks";
import { useEffect } from "react";

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    userBankAccount: string | null | undefined;
};

const ConnectBankModal = ({ open, setOpen, userBankAccount }: Props) => {

    const { mutateAsync: addBankAccount, isPending } = useAddBankAccount()

    const handleAddBankAccount = () => {
        addBankAccount({ url: window.location.href })
    }

    // useEffect(() => {
    //     if (data?.data) {
    //         dispatch(login(data.data));
    //     }
    // }, [data]);
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Connect Bank Account</DialogTitle>
                    <DialogDescription>
                        {userBankAccount === "review" ? "Your bank account is under review. Please wait for approval." : "You need to connect your bank account before continuing."}
                    </DialogDescription>
                </DialogHeader>

                <div className="flex justify-center pt-4">
                    <Button disabled={userBankAccount === "review" || isPending} onClick={handleAddBankAccount} className="w-full">
                        {isPending ? "Connecting..." : "Connect Bank Account"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog >
    );
};

export default ConnectBankModal;