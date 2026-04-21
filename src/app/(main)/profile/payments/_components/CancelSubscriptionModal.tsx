import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useCancelSubscription } from "@/features/subscription/hook"
import { showError, showSuccess } from "@/lib/toast"
import { useQueryClient } from "@tanstack/react-query"
import { ArrowLeft, X, Loader2 } from "lucide-react"

export function CancelSubscriptionModal({
    open,
    onClose,
    onBack,
    onSuccessAction,
    planId
}: {
    open: boolean
    onClose: () => void
    onBack: () => void
    onSuccessAction: () => void
    planId: string
}) {
    const { mutate, isPending } = useCancelSubscription();
    const queryClient = useQueryClient();
    
    const handleCancel = () => {
        if (!planId) return;
        mutate({ planId }, {
            onSuccess: () => {
                showSuccess("Subscription cancelled successfully");
                onSuccessAction();
                queryClient.invalidateQueries({ queryKey: ["get-profile"] });

            },
            onError: (err) => {
                showError(err);
            }
        });
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
                    <DialogTitle>Cancel Subscription Confirmation</DialogTitle>
                </DialogHeader>

                <div className="p-10 flex flex-col relative h-full min-h-[400px]">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-8 right-8 text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                        <X size={24} />
                    </button>

                    {/* Back Link */}
                    <button
                        onClick={onBack}
                        className="flex items-center gap-3 text-2xl font-semibold mb-10 cursor-pointer group hover:text-gray-700 transition-colors"
                    >
                        <ArrowLeft size={28} />
                        <span>Cancel Subscription</span>
                    </button>

                    <div className="flex flex-col gap-6 max-w-[550px]">
                        <h2 className="text-2xl font-bold leading-tight">
                            Are You Sure You Want To Cancel Subscription?
                        </h2>

                        <p className="text-gray-600 leading-relaxed font-medium">
                          Your active subscription will be cancelled, and no future charges will be applied after the current billing cycle ends. You will continue to have access to subscription features until the expiry date. This action cannot be undone.
                        </p>

                        <div className="mt-4">
                            <button
                                onClick={handleCancel}
                                disabled={isPending}
                                className="
                                    px-8 py-3 
                                    rounded-full 
                                    border border-[#FFDAD8] 
                                    text-[#FF3B30] 
                                    font-medium 
                                    hover:bg-[#FFF5F5] 
                                    transition-colors 
                                    cursor-pointer
                                    flex items-center justify-center gap-2
                                    disabled:opacity-50 disabled:cursor-not-allowed
                                "
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="animate-spin" size={18} />
                                        <span>Cancelling...</span>
                                    </>
                                ) : (
                                    "Cancel Subscription"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
