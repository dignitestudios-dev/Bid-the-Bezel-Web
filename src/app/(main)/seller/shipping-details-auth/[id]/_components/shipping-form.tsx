import { Button } from "@/components/ui/button";
import { useAuthenticate } from "@/features/products/hook";
import { ShippingPayload, shippingSchema } from "@/features/products/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link2, Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";


type ShippingFormProps = {
    setStep: (step: StepTypeAuthenticate) => void;
    defaultValues: ShippingPayload;
    setShippingData: React.Dispatch<React.SetStateAction<ShippingPayload>>;
    id: any;
};
export type AuthenticatePayload = ShippingPayload & {
    id: string;
    isDraft: boolean;
};

const ShippingForm = ({ setStep, defaultValues, setShippingData, id }: ShippingFormProps) => {
    const [actionType, setActionType] = useState<"draft" | "submit" | null>(null);
    const router = useRouter()
    const { mutateAsync: authenticate, isPending } = useAuthenticate();
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<ShippingPayload>({
        resolver: zodResolver(shippingSchema),
        defaultValues,
    });

    const fileList = watch("images");
    const files = Array.from(fileList || []);
    const onSubmit = (data: ShippingPayload) => {
        setActionType("submit");

        authenticate({
            id,
            ...data,
            isDraft: false,
        }, {
            onSuccess: () => {
                setShippingData(data);
                setStep("payment");
            },
            onSettled: () => setActionType(null)

        });

    };

    const handleDraft = () => {
        setActionType("draft");

        handleSubmit(async (data) => {
            setShippingData(data);

            authenticate(
                {
                    id,
                    ...data,
                    isDraft: true,
                },
                {
                    onSuccess: () => {
                        router.push("/profile/my-orders");
                    },
                    onSettled: () => {
                        setActionType(null);
                    },
                }
            );
        })();
    };
    const removeFile = () => {
        setValue("images", undefined);
    };

    return (
        <div className=" p-4 flex items-center justify-center">
            <div className="bg-white max-w-4xl w-full rounded-lg shadow-sm p-6">
                {/* Our Info Section */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h3 className="text-sm font-semibold mb-3">Our Info</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs text-gray-600 mb-1">
                                Shipping Address
                            </p>
                            <p className="text-sm">
                                123 Magellan Ave, Dillon, CO 80435
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-600 mb-1">Email</p>
                            <p className="text-sm">Info@bidthebezel</p>
                        </div>
                    </div>
                </div>

                <h2 className="text-lg font-semibold mb-6">Shipping Details</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="text-sm font-medium mb-2 block">
                            Select Courier
                        </label>
                        <select
                            id="courier"
                            {...register("courier")}
                            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "right 0.75rem center",
                                backgroundSize: "1.25rem",
                                paddingRight: "2.5rem",
                            }}
                        >
                            <option value="">Select</option>
                            <option value="fedex">FedEx</option>
                            <option value="ups">UPS</option>
                            <option value="usps">USPS</option>
                            <option value="dhl">DHL</option>
                        </select>
                        {errors.courier?.message && (
                            <p className="text-red-500 pt-2 text-[12px]">
                                {errors.courier.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="text-sm font-medium mb-2 block">
                            Reference ID
                        </label>
                        <input
                            type="text"
                            id="referenceId"
                            {...register("trackingNumber")}
                            placeholder="ID here"
                            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.trackingNumber?.message && (
                            <p className="text-red-500 pt-2 text-[12px]">
                                {errors.trackingNumber.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="text-sm font-medium mb-2 block">
                            Tracking Number Link
                        </label>
                        <div className="relative">
                            <Link2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                id="trackingLink"
                                {...register("trackingLink")}
                                placeholder="Tracking link here"
                                className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        {errors.trackingLink?.message && (
                            <p className="text-red-500 pt-2 text-[12px]">
                                {errors.trackingLink.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-6">
                        <label className="text-sm font-medium mb-2 block">
                            Photos of proof{" "}
                            <span className="text-gray-400 font-normal">(Optional)</span>
                        </label>

                        <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center relative">
                            <input
                                type="file"
                                id="file"
                                accept=".jpg,.jpeg,.png"
                                {...register("images")}
                                multiple
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <Upload className="w-5 h-5 mx-auto mb-2 text-gray-400" />
                            <p className="text-sm font-medium mb-1">Click to upload</p>
                            <p className="text-xs text-gray-500">
                                Only Jpg, Png files upto 5mb
                            </p>
                            <p className="text-xs text-gray-400 absolute top-3 right-3">
                                1/20
                            </p>
                        </div>

                        {errors.images?.message && (
                            <p className="text-red-500 pt-2 text-[12px]">
                                {errors.images.message as string}
                            </p>
                        )}

                        {files.length > 0 && (
                            <div className="mt-3 space-y-2">
                                {files.map((file: any, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gray-200 rounded overflow-hidden">
                                                <img
                                                    src={URL.createObjectURL(file)}
                                                    alt="preview"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            <p className="text-xs text-gray-500">
                                                {(file.size / 1024 / 1024).toFixed(1)}mb
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newFiles = [...files];
                                                newFiles.splice(index, 1);
                                                setValue("images", newFiles);
                                            }}
                                            className="w-6 h-6 bg-red-500 text-white rounded flex items-center justify-center hover:bg-red-600"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex gap-3">
                        <Button
                            type="button"
                            disabled={isPending && actionType === "draft"}

                            onClick={handleDraft}
                            className="flex-1 py-3 bg-[#F7F7F7] text-primary border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 hover:text-primary transition-colors"
                        >
                            {isPending && actionType === "draft" ? "Saving..." : "Save as draft"}
                        </Button>
                        <Button
                            type="submit"
                            disabled={isPending && actionType === "submit"}
                            className="flex-1 py-3 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                        >
                            {isPending && actionType === "submit" ? "Submitting..." : "Payment"}

                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ShippingForm;