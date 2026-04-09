"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { X } from "lucide-react"
import { useRouter } from "next/navigation"

export function SubscriptionCancelledModal({
    open,
    onClose
}: {
    open: boolean
    onClose: () => void
}) {
    const router = useRouter();

    const handleBackToDashboard = () => {
        onClose();
        router.push("/");
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent
                showCloseButton={false}
                className="
                    w-[700px] max-w-[95vw]
                    p-0
                    bg-white
                    border border-[#E3E3E3]
                    rounded-3xl
                    flex flex-col
                    overflow-hidden
                "
            >
                <DialogHeader className="sr-only">
                    <DialogTitle>Subscription Cancelled Success</DialogTitle>
                </DialogHeader>

                <div className="p-10 flex flex-col items-center justify-center text-center relative min-h-[450px]">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-8 right-8 text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                        <X size={24} />
                    </button>

                    {/* Cancelled Icon */}
                    <div className="w-32 h-32 rounded-full bg-gray-50 flex items-center justify-center mb-8">
                        <div className="w-16 h-16 rounded-full bg-[#FF3B30] border-4 border-white flex items-center justify-center shadow-lg">
                            <X size={32} className="text-white" strokeWidth={3} />
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold mb-4">
                        Subscription Cancelled
                    </h2>

                    <p className="text-gray-500 max-w-[450px] leading-relaxed mb-10 font-medium">
                        Lorem Et Ultricies Tincidunt Lacinia Maecenas Erat. Non Lacus At Eget
                        Auctor Ultrices Volutpat Vitae Vestibulum. Ut Elit Scelerisque Vivamus
                        In Mauris Viverra Et Eros.
                    </p>

                    <button
                        onClick={handleBackToDashboard}
                        className="
                            px-10 py-3 
                            rounded-full 
                            bg-[#F7F7F7] 
                            text-gray-700 
                            font-medium 
                            hover:bg-gray-200 
                            transition-colors 
                            cursor-pointer
                        "
                    >
                        Back to Dashboard
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
