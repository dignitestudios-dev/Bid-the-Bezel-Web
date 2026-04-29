import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";



import { useUpdateProduct } from "@/features/products/hook";
import { Textarea } from "@/components/ui/text-area";
import { z } from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FloatingInput } from "@/components/ui/floating-input";

export const updateProductSchema = z.object({
  brandName: z
    .string()
    .trim()
    .min(3, "Brand name must be at least 3 characters")
    .max(100, "Brand name must be at most 100 characters"),

  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(200, "Description must be at most 200 characters"),
  model: z
    .string()
    .trim()
    .min(1, "Model is required")
    .min(6, "Model must be at least 6 characters")
    .max(50, "Model must be at most 50 characters"),
});

export type UpdateProductFormValues = z.infer<typeof updateProductSchema>;
export function UpdateProductDialog({
  id,
  open,
  setOpen,
  initialTitle,
  initialDescription,
  model,
}: {
  id: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  initialTitle?: string;
  initialDescription?: string;
  model?: string;
}) {
  const { mutate: updateProduct, isPending } = useUpdateProduct();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm<UpdateProductFormValues>({
    resolver: zodResolver(updateProductSchema),
    mode: "onChange",
    defaultValues: {
      brandName: initialTitle,
      description: initialDescription,
      model: model,
    },
  });



  const onSubmit = (values: UpdateProductFormValues) => {
    updateProduct(
      { id, ...values },
      {
        onSuccess: () => {
          setOpen(false);
          reset({
            brandName: values.brandName,
            description: values.description,
            model: values.model,
          });
        },
      }
    );
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="max-w-lg w-full">
        <AlertDialogHeader>
          <AlertDialogTitle>Update Product</AlertDialogTitle>
          <AlertDialogDescription>
            Update brand name and description of your listing.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <Select
              value={initialTitle}

              onValueChange={(value) => {
                setValue("brandName", value, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
            >
              <SelectTrigger className={`peer w-full rounded-xl border-2 bg-white px-4 py-7  text-[15px] text-black focus:outline-none transition-all ${errors.brandName
                ? "border-red-500"
                : "border-gray-200 focus:border-gray-700"
                }`} >
                <SelectValue placeholder="Select watch brand" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="jacobs_and_co">Jacobs & Co</SelectItem>
                <SelectItem value="richard_mille">Richard Mille</SelectItem>
                <SelectItem value="bovet">Bovet</SelectItem>
                <SelectItem value="greubel_forsey">Greubel Forsey</SelectItem>
                <SelectItem value="h_moses_cie">H Moses & Cie</SelectItem>
                <SelectItem value="louis_monne">Louis Monne</SelectItem>
              </SelectContent>
            </Select>
            {errors.brandName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.brandName.message}
              </p>
            )}
          </div>
          <FloatingInput
            id="model"
            label="Model"
            {...register("model")}
            error={errors.model?.message}
          />
          {/* Description */}
          <div>
            <Textarea
              id="description"
              placeholder="Enter description"
              {...register("description")}
              rows={7}
              maxLength={200}
              className="w-full break-all whitespace-pre-wrap"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <AlertDialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isPending || !isValid}
            >
              {isPending ? "Updating..." : "Update"}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}