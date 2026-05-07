"use client";

import { Button } from "@/components/ui/button";
import { FloatingInput } from "@/components/ui/floating-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { generateReferenceId } from "@/lib/helper";
import { useMemo } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AuctionWatchPayload, auctionWatchSchema } from "@/features/auction/schema";
import { useAddAuctionProduct } from "@/features/auction/hook";
import z from "zod";

type Props = {
    onNext: () => void;
    setWatchId: React.Dispatch<React.SetStateAction<string | null>>;
};

const AuctionWatchDetailForm = ({ onNext, setWatchId }: Props) => {
    const referenceId = useMemo(() => generateReferenceId(), []);

    const { mutate, isPending } = useAddAuctionProduct();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        getValues,
        formState: { errors , isValid},
    } = useForm<z.input<typeof auctionWatchSchema>>({
        resolver: zodResolver(auctionWatchSchema),
        mode: "onChange",
        defaultValues: {
            auctionDays: 3,
            watchBrand: "",
            modelReference: "",
            referenceId: referenceId,
            price: 5000,
            contents: "",
            photos: [],
        },
    });

    const selectedDays = watch("auctionDays");

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (!files) return;

        const fileArray = Array.from(files).map((file) => ({
            file,
            name: file.name,
            url: URL.createObjectURL(file),
        }));

        setValue("photos", fileArray, { shouldValidate: true });
    };

    const onSubmit = (data: z.input<typeof auctionWatchSchema>) => {
        mutate(data as AuctionWatchPayload, {
            onSuccess: (response) => {
                if (response?.data) {
                    setWatchId(response?.data?._id)
                    localStorage.setItem("refId", referenceId);
                    onNext();

                }
            },
        });
    };

    const handleRemovePhoto = (index: number) => {
        const currentPhotos = watch("photos") || [];

        const updatedPhotos = currentPhotos.filter((_, i) => i !== index);

        setValue("photos", updatedPhotos, { shouldValidate: true });
    };

    return (
        <div className="bg-white border max-w-4xl mx-auto rounded-xl p-8 shadow-sm">
            <h3 className="font-semibold mb-6 text-2xl ">Watch Details</h3>
            <div className="bg-[#F7F7F7] p-3 my-8 space-y-2 rounded-xl border">
                <h1 className="text-xl font-semibold">Watch Reference ID</h1>
                <h4 className="text-lg font-semibold">{referenceId}</h4>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-6">
                    <p className="text-sm font-medium mb-2">
                        Select Auction Days <span className="text-red-500">*</span>
                    </p>

                    <div className="flex gap-3">
                        {[3, 5, 7].map((day) => (
                            <button
                                key={day}
                                type="button"
                                onClick={() =>
                                    setValue("auctionDays", day, {
                                        shouldValidate: true,
                                        shouldDirty: true,
                                    })
                                }
                                className={`px-4 py-2 rounded-full border text-sm transition-all
          ${selectedDays === day
                                        ? "bg-slate-800 text-white"
                                        : "bg-white text-gray-700"
                                    }
        `}
                            >
                                {day} Days
                            </button>
                        ))}
                    </div>

                    {errors.auctionDays?.message && (
                        <p className="mt-2 text-sm text-red-500">
                            {errors.auctionDays.message}
                        </p>
                    )}
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <div className="space-y-1">
                            {/* <label className="text-sm font-medium">Watch Brand</label> */}

                            <Select
                                value={getValues("watchBrand")}

                                onValueChange={(value) => {
                                    setValue("watchBrand", value, {
                                        shouldValidate: true,
                                        shouldDirty: true,
                                    });
                                }}
                            >
                                <SelectTrigger className={`peer w-full rounded-xl border-2 bg-white px-4 py-7  text-[15px] text-black focus:outline-none transition-all ${errors.watchBrand
                                    ? "border-red-500"
                                    : "border-gray-200 focus:border-gray-700"
                                    }`} >
                                    <SelectValue placeholder="Select watch brand" />
                                </SelectTrigger>

                                      <SelectContent>
                  <SelectItem value="Jacobs & Co">Jacobs & Co</SelectItem>
                  <SelectItem value="Richard Mille">Richard Mille</SelectItem>
                  <SelectItem value="bovet">Bovet</SelectItem>
                  <SelectItem value="Greubel Forsey">Greubel Forsey</SelectItem>
                  <SelectItem value="H Moses & Cie">H Moses & Cie</SelectItem>
                  <SelectItem value="Louis Monne">Louis Monne</SelectItem>
                </SelectContent>
                            </Select>

                            {errors.watchBrand?.message && (
                                <p className="text-sm text-red-500">
                                    {errors.watchBrand.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div>
                        <FloatingInput
                            id="modelReference"
                            label="Model Reference"
                            {...register("modelReference")}
                            error={errors.modelReference?.message}
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <FloatingInput
                        id="price"
                        label="Price"
                        type="number"
                         step="0.01"
                        maxLength={5000}
                        {...register("price")}
                    // error={errors.price?.message}
                    />
                    {errors.price?.message ? (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.price.message}
                        </p>
                    ) : (
                        <p className="mt-1 text-sm text-[#0D0D0D] flex gap-2 items-center">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.3335 11.333H8.66683V7.33301H7.3335V11.333ZM8.00016 5.99967C8.18905 5.99967 8.3475 5.93567 8.4755 5.80767C8.6035 5.67967 8.66727 5.52145 8.66683 5.33301C8.66639 5.14456 8.60239 4.98634 8.47483 4.85834C8.34727 4.73034 8.18905 4.66634 8.00016 4.66634C7.81127 4.66634 7.65305 4.73034 7.5255 4.85834C7.39794 4.98634 7.33394 5.14456 7.3335 5.33301C7.33305 5.52145 7.39705 5.6799 7.5255 5.80834C7.65394 5.93679 7.81216 6.00056 8.00016 5.99967ZM8.00016 14.6663C7.07794 14.6663 6.21128 14.4912 5.40016 14.141C4.58905 13.7908 3.8835 13.3159 3.2835 12.7163C2.6835 12.1168 2.20861 11.4112 1.85883 10.5997C1.50905 9.78812 1.33394 8.92145 1.3335 7.99967C1.33305 7.0779 1.50816 6.21123 1.85883 5.39967C2.2095 4.58812 2.68439 3.88256 3.2835 3.28301C3.88261 2.68345 4.58816 2.20856 5.40016 1.85834C6.21216 1.50812 7.07883 1.33301 8.00016 1.33301C8.9215 1.33301 9.78816 1.50812 10.6002 1.85834C11.4122 2.20856 12.1177 2.68345 12.7168 3.28301C13.3159 3.88256 13.7911 4.58812 14.1422 5.39967C14.4933 6.21123 14.6682 7.0779 14.6668 7.99967C14.6655 8.92145 14.4904 9.78812 14.1415 10.5997C13.7926 11.4112 13.3177 12.1168 12.7168 12.7163C12.1159 13.3159 11.4104 13.791 10.6002 14.1417C9.78994 14.4923 8.92327 14.6672 8.00016 14.6663ZM8.00016 13.333C9.48905 13.333 10.7502 12.8163 11.7835 11.783C12.8168 10.7497 13.3335 9.48856 13.3335 7.99967C13.3335 6.51079 12.8168 5.24967 11.7835 4.21634C10.7502 3.18301 9.48905 2.66634 8.00016 2.66634C6.51127 2.66634 5.25016 3.18301 4.21683 4.21634C3.1835 5.24967 2.66683 6.51079 2.66683 7.99967C2.66683 9.48856 3.1835 10.7497 4.21683 11.783C5.25016 12.8163 6.51127 13.333 8.00016 13.333Z" fill="#0D0D0D" />
                            </svg>
                            Minimum auction price is $5000
                        </p>
                    )}
                </div>

                <div className="w-full mb-6">
                    <label
                        htmlFor="contents"
                        className={`block text-sm font-medium mb-1 ${errors.contents ? "text-red-500" : "text-gray-700"}`}
                    >
                        Contents / Notes
                    </label>
                    <textarea
                        id="contents"
                        placeholder="Enter contents or notes..."
                        className={`w-full rounded-xl border-2 bg-white px-4 py-3 text-[15px] text-black focus:outline-none transition-all min-h-[100px] resize-none
      ${errors.contents ? "border-red-500" : "border-gray-200 focus:border-gray-700"}
    `}
                        maxLength={1000}
                        {...register("contents")}
                    />
                    {errors.contents?.message && (
                        <p className="mt-1 text-xs text-red-500">{errors.contents.message}</p>
                    )}
                </div>

                <div className="mb-6">
                    <label className="text-sm mb-1 block">Photos</label>

                    <input
                        type="file"
                        multiple
                        accept="image/png, image/jpeg"
                        className="hidden"
                        id="photos"
                        onChange={handlePhotoUpload}
                    />

                    <label
                        htmlFor="photos"
                        className="border-2 border-dashed rounded-lg p-8 text-center bg-gray-50 block cursor-pointer"
                    >
                        <div className="flex flex-col items-center">
                            <div className="mb-2">📤</div>
                            <p className="text-sm font-medium mb-1">Click to upload</p>
                            <p className="text-xs text-gray-500">
                                Only JPG, PNG files (upto 5MB)
                            </p>
                        </div>
                    </label>

                    {errors.photos?.message && (
                        <p className="mt-2 text-xs text-red-500">{errors.photos.message}</p>
                    )}

                    {watch("photos")?.length > 0 && (
                        <div className="mt-3 space-y-2">
                            {watch("photos").map((file, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-2 p-2 bg-gray-50 rounded-md"
                                >
                                    <img
                                        src={file.url}
                                        alt={file.name}
                                        className="w-10 h-10 object-cover rounded"
                                    />

                                    <span className="text-sm flex-1">{file.name}</span>

                                    {/* ❌ Remove Button */}
                                    <button
                                        type="button"
                                        onClick={() => handleRemovePhoto(idx)}
                                        className="text-red-500 text-xs font-medium hover:underline"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <Button
                    className="w-full bg-slate-900 hover:bg-slate-800"
                    type="submit"
                    disabled={isPending || !isValid}
                >
                    {isPending ? "Submitting" : "Next"}
                </Button>
            </form>
        </div>
    );
};

export default AuctionWatchDetailForm;
