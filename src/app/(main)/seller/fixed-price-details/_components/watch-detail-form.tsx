"use client";

import { Button } from "@/components/ui/button";
import { FloatingInput } from "@/components/ui/floating-input";
import {
  WatchDetailPayload,
  watchDetailSchema,
} from "@/features/products/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setWatchDetails, setWatchId } from "@/lib/slices/addproductSlice";
import { useAddProduct } from "@/features/products/hook";
import { generateReferenceId } from "@/lib/helper";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { isValid } from "zod/v3";
import { Upload } from "lucide-react";
import { showError } from "@/lib/toast";

type Props = {
  onNext: () => void;
};
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const WatchDetailForm = ({ onNext }: Props) => {
  const dispatch = useAppDispatch();
  const referenceId = useMemo(() => generateReferenceId(), []);

  const { mutate, isPending } = useAddProduct();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors, isValid },
  } = useForm<z.input<typeof watchDetailSchema>>({
    resolver: zodResolver(watchDetailSchema),
    mode: "onChange",
    defaultValues: {
      watchBrand: "",
      modelReference: "",
      referenceId: referenceId,
      price: "",
      contents: "",
      photos: [],
      purchaseYear: "",
      watchCondition: "",
    },
  });
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) return;

    const currentPhotos = watch("photos") || [];

    const validFiles = Array.from(files)
      .filter((file) => {
        // validate image type
        if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
          showError(`${file.name} is not a supported image`);
          return false;
        }

        // validate file size
        if (file.size > MAX_FILE_SIZE) {
          showError(`${file.name} must be 5MB or less`);
          return false;
        }

        return true;
      })
      .map((file) => ({
        file,
        name: file.name,
        url: URL.createObjectURL(file),
      }));

    setValue("photos", [...currentPhotos, ...validFiles], {
      shouldValidate: true,
    });

    e.target.value = "";
  };

  const onSubmit = (data: any) => {
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
                <SelectTrigger
                  className={`peer w-full rounded-xl border-2 bg-white px-4 py-7  text-[15px] text-black focus:outline-none transition-all ${
                    errors.watchBrand
                      ? "border-red-500"
                      : "border-gray-200 focus:border-gray-700"
                  }`}
                >
                  <SelectValue placeholder="Select watch brand" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem
                    value="Ultra Luxury"
                    disabled
                    className="font-semibold text-xs"
                  >
                    Ultra Luxury
                  </SelectItem>
                  <SelectItem value="Jacob & Co">Jacob & Co</SelectItem>
                  <SelectItem value="Bovet">Bovet</SelectItem>
                  <SelectItem value="F.P. Journe">F.P. Journe</SelectItem>
                  <SelectItem value="Greubel Forsey">Greubel Forsey</SelectItem>
                  <SelectItem value="Richard Mille">Richard Mille</SelectItem>
                  <SelectItem value="H. Moser & Cie">H. Moser & Cie</SelectItem>
                  <SelectItem value="Louis Moinet">Louis Moinet</SelectItem>

                  <SelectItem
                    value="High-End Luxury"
                    disabled
                    className="font-semibold text-xs mt-2"
                  >
                    High-End Luxury
                  </SelectItem>
                  <SelectItem value="Urwerk">Urwerk</SelectItem>
                  <SelectItem value="A. Lange & Söhne">
                    A. Lange & Söhne
                  </SelectItem>
                  <SelectItem value="Patek Philippe">Patek Philippe</SelectItem>
                  <SelectItem value="Audemars Piguet">
                    Audemars Piguet
                  </SelectItem>
                  <SelectItem value="Vanguart">Vanguart</SelectItem>
                  <SelectItem value="Vacheron Constantin">
                    Vacheron Constantin
                  </SelectItem>
                  <SelectItem value="Blancpain">Blancpain</SelectItem>
                  <SelectItem value="Breguet">Breguet</SelectItem>
                  <SelectItem value="Jaeger-LeCoultre">
                    Jaeger-LeCoultre
                  </SelectItem>
                  <SelectItem value="Piaget">Piaget</SelectItem>
                  <SelectItem value="Ulysse Nardin">Ulysse Nardin</SelectItem>

                  <SelectItem
                    value="Luxury"
                    disabled
                    className="font-semibold text-xs mt-2"
                  >
                    Luxury
                  </SelectItem>
                  <SelectItem value="De Bethune">De Bethune</SelectItem>
                  <SelectItem value="Rolex">Rolex</SelectItem>
                  <SelectItem value="Omega">Omega</SelectItem>
                  <SelectItem value="IWC Schaffhausen">
                    IWC Schaffhausen
                  </SelectItem>
                  <SelectItem value="Grand Seiko">Grand Seiko</SelectItem>
                  <SelectItem value="Zenith">Zenith</SelectItem>
                  <SelectItem value="Glashütte Original">
                    Glashütte Original
                  </SelectItem>
                  <SelectItem value="Breitling">Breitling</SelectItem>
                  <SelectItem value="Cartier">Cartier</SelectItem>
                  <SelectItem value="Bvlgari">Bvlgari</SelectItem>
                  <SelectItem value="Panerai">Panerai</SelectItem>
                  <SelectItem value="Chopard">Chopard</SelectItem>
                  <SelectItem value="Corum">Corum</SelectItem>
                  <SelectItem value="Hublot">Hublot</SelectItem>

                  <SelectItem
                    value="Basic Luxury"
                    disabled
                    className="font-semibold text-xs mt-2"
                  >
                    Basic Luxury
                  </SelectItem>
                  <SelectItem value="Tudor">Tudor</SelectItem>
                  <SelectItem value="TAG Heuer">TAG Heuer</SelectItem>
                  <SelectItem value="Longines">Longines</SelectItem>
                  <SelectItem value="Oris">Oris</SelectItem>
                  <SelectItem value="Rado">Rado</SelectItem>
                  <SelectItem value="Baume & Mercier">
                    Baume & Mercier
                  </SelectItem>
                  <SelectItem value="Maurice Lacroix">
                    Maurice Lacroix
                  </SelectItem>
                  <SelectItem value="Sinn">Sinn</SelectItem>
                  <SelectItem value="Frédérique Constant">
                    Frédérique Constant
                  </SelectItem>
                  <SelectItem value="Alpina">Alpina</SelectItem>
                  <SelectItem value="Junghans">Junghans</SelectItem>
                  <SelectItem value="Fortis">Fortis</SelectItem>
                  <SelectItem value="Ball Watch">Ball Watch</SelectItem>
                  <SelectItem value="Nomos Glashütte">
                    Nomos Glashütte
                  </SelectItem>
                  <SelectItem value="Bell & Ross">Bell & Ross</SelectItem>
                  <SelectItem value="Eterna">Eterna</SelectItem>
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
            step="0.01"
            type="number"
            // maxLength={5000}
            {...register("price")}
            error={errors.price?.message}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Purchase Year */}
          <div>
            <FloatingInput
              type="date"
              label="Purchase Year"
              id="date"
              {...register("purchaseYear")}
              error={errors.purchaseYear?.message}
            />
          </div>

          {/* Watch Condition */}
          <div>
            <Select
              value={getValues("watchCondition")}
              onValueChange={(value) => {
                setValue("watchCondition", value, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
            >
              <SelectTrigger
                className={`w-full rounded-xl border-2 bg-white px-4 py-7 text-[15px] text-black focus:outline-none transition-all
                ${
                  errors.watchCondition
                    ? "border-red-500"
                    : "border-gray-200 focus:border-gray-700"
                }`}
              >
                <SelectValue placeholder="Select watch condition" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Like new">Like new</SelectItem>
                <SelectItem value="Very good">Very good</SelectItem>
                <SelectItem value="Good">Good</SelectItem>
                <SelectItem value="Fair">Fair</SelectItem>
                <SelectItem value="Vintage">Vintage</SelectItem>
              </SelectContent>
            </Select>

            {errors.watchCondition?.message && (
              <p className="mt-1 text-sm text-red-500">
                {errors.watchCondition.message}
              </p>
            )}
          </div>
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
              <div className="mb-2">
                <Upload />
              </div>
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

export default WatchDetailForm;
