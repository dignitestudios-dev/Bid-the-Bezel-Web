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
    .max(1000, "Description must be at most 1000 characters"),
  model: z
      .string()
        .min(2, "Model reference is required")
        .max(50, "Model reference must be at most 50 characters")
        .regex(
            /^[a-zA-Z0-9\s-]+$/,
            "Model reference must not contain special characters"
        ),
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
    watch,
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

  const selectedBrand = watch("brandName");



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
              value={selectedBrand}
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
                <SelectItem value="Ultra Luxury" disabled className="font-semibold text-xs">Ultra Luxury</SelectItem>
                <SelectItem value="Jacob & Co">Jacob & Co</SelectItem>
                <SelectItem value="Bovet">Bovet</SelectItem>
                <SelectItem value="F.P. Journe">F.P. Journe</SelectItem>
                <SelectItem value="Greubel Forsey">Greubel Forsey</SelectItem>
                <SelectItem value="Richard Mille">Richard Mille</SelectItem>
                <SelectItem value="H. Moser & Cie">H. Moser & Cie</SelectItem>
                <SelectItem value="Louis Moinet">Louis Moinet</SelectItem>
                
                <SelectItem value="High-End Luxury" disabled className="font-semibold text-xs mt-2">High-End Luxury</SelectItem>
                <SelectItem value="Urwerk">Urwerk</SelectItem>
                <SelectItem value="A. Lange & Söhne">A. Lange & Söhne</SelectItem>
                <SelectItem value="Patek Philippe">Patek Philippe</SelectItem>
                <SelectItem value="Audemars Piguet">Audemars Piguet</SelectItem>
                <SelectItem value="Vanguart">Vanguart</SelectItem>
                <SelectItem value="Vacheron Constantin">Vacheron Constantin</SelectItem>
                <SelectItem value="Blancpain">Blancpain</SelectItem>
                <SelectItem value="Breguet">Breguet</SelectItem>
                <SelectItem value="Jaeger-LeCoultre">Jaeger-LeCoultre</SelectItem>
                <SelectItem value="Piaget">Piaget</SelectItem>
                <SelectItem value="Ulysse Nardin">Ulysse Nardin</SelectItem>
                
                <SelectItem value="Luxury" disabled className="font-semibold text-xs mt-2">Luxury</SelectItem>
                <SelectItem value="De Bethune">De Bethune</SelectItem>
                <SelectItem value="Rolex">Rolex</SelectItem>
                <SelectItem value="Omega">Omega</SelectItem>
                <SelectItem value="IWC Schaffhausen">IWC Schaffhausen</SelectItem>
                <SelectItem value="Grand Seiko">Grand Seiko</SelectItem>
                <SelectItem value="Zenith">Zenith</SelectItem>
                <SelectItem value="Glashütte Original">Glashütte Original</SelectItem>
                <SelectItem value="Breitling">Breitling</SelectItem>
                <SelectItem value="Cartier">Cartier</SelectItem>
                <SelectItem value="Bvlgari">Bvlgari</SelectItem>
                <SelectItem value="Panerai">Panerai</SelectItem>
                <SelectItem value="Chopard">Chopard</SelectItem>
                <SelectItem value="Corum">Corum</SelectItem>
                <SelectItem value="Hublot">Hublot</SelectItem>
                
                <SelectItem value="Basic Luxury" disabled className="font-semibold text-xs mt-2">Basic Luxury</SelectItem>
                <SelectItem value="Tudor">Tudor</SelectItem>
                <SelectItem value="TAG Heuer">TAG Heuer</SelectItem>
                <SelectItem value="Longines">Longines</SelectItem>
                <SelectItem value="Oris">Oris</SelectItem>
                <SelectItem value="Rado">Rado</SelectItem>
                <SelectItem value="Baume & Mercier">Baume & Mercier</SelectItem>
                <SelectItem value="Maurice Lacroix">Maurice Lacroix</SelectItem>
                <SelectItem value="Sinn">Sinn</SelectItem>
                <SelectItem value="Frédérique Constant">Frédérique Constant</SelectItem>
                <SelectItem value="Alpina">Alpina</SelectItem>
                <SelectItem value="Junghans">Junghans</SelectItem>
                <SelectItem value="Fortis">Fortis</SelectItem>
                <SelectItem value="Ball Watch">Ball Watch</SelectItem>
                <SelectItem value="Nomos Glashütte">Nomos Glashütte</SelectItem>
                <SelectItem value="Bell & Ross">Bell & Ross</SelectItem>
                <SelectItem value="Eterna">Eterna</SelectItem>
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
              maxLength={1000}
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