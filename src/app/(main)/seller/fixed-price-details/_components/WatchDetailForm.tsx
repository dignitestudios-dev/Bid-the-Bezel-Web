"use client";

import { Button } from "@/components/ui/button";
import { FloatingInput } from "@/components/ui/floating-input";
import {
  WatchDetailPayload,
  watchDetailSchema,
} from "@/features/products/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setWatchDetails, setWatchId } from "@/lib/slices/addproductSlice";
import { useAddProduct } from "@/features/products/hook";
import { generateReferenceId } from "@/lib/helper";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  onNext: () => void;
};

const WatchDetailForm = ({ onNext }: Props) => {
  const dispatch = useAppDispatch();
  const referenceId = generateReferenceId();

  const { mutate, isPending } = useAddProduct();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<WatchDetailPayload>({
    resolver: zodResolver(watchDetailSchema),
    defaultValues: {
      watchBrand: "",
      modelReference: "",
      referenceId: referenceId,
      price: "",
      contents: "",
      photos: [],
    },
  });
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

  const onSubmit = (data: WatchDetailPayload) => {
    mutate(data, {
      onSuccess: (response) => {
        if (response?.data) {
          dispatch(setWatchDetails(response?.data));
          dispatch(setWatchId(response?.data?._id));
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
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <FloatingInput
              id="watchBrand"
              label="Watch Brand"
              {...register("watchBrand")}
              error={errors.watchBrand?.message}
            />
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
            maxLength={5000}
            {...register("price")}
            error={errors.price?.message}
          />
        </div>

        <div className="relative w-full mb-6">
          <textarea
            id="contents"
            placeholder=" "
            className={`peer w-full rounded-xl border-2 bg-white px-4 pt-6 pb-2 text-[15px] text-black focus:outline-none transition-all min-h-[100px]
      ${errors.contents ? "border-red-500" : "border-gray-200 focus:border-gray-700"}
    `}
            {...register("contents")}
          />

          <label
            htmlFor="contents"
            className={`pointer-events-none absolute left-4 top-2 text-[14px] transition-all duration-200
      peer-placeholder-shown:top-4 peer-placeholder-shown:text-[16px]
      peer-focus:top-2 peer-focus:text-[14px]
      ${errors.contents ? "text-red-500" : "text-gray-500 peer-focus:text-gray-700"}
    `}
          >
            Contents / Notes
          </label>

          {errors.contents?.message && (
            <p className="mt-1 text-xs text-red-500">
              {errors.contents.message}
            </p>
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
          disabled={isPending}
        >
          {isPending ? "Submitting" : "Next"}
        </Button>
      </form>
    </div>
  );
};

export default WatchDetailForm;
