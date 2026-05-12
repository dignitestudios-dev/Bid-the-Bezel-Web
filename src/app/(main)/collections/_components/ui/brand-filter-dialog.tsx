"use client";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";

type Props = {
  onApply: (brands: string[]) => void;
};

const brandCategories = {
  "Ultra Luxury": [
    "Jacob & Co",
    "Bovet",
    "F.P. Journe",
    "Greubel Forsey",
    "Richard Mille",
    "H. Moser & Cie",
    "Louis Moinet",
  ],
  "High-End Luxury": [
    "Urwerk",
    "A. Lange & Söhne",
    "Patek Philippe",
    "Audemars Piguet",
    "Vanguart",
    "Vacheron Constantin",
    "Blancpain",
    "Breguet",
    "Jaeger-LeCoultre",
    "Piaget",
    "Ulysse Nardin",
  ],
  "Luxury": [
    "De Bethune",
    "Rolex",
    "Omega",
    "IWC Schaffhausen",
    "Grand Seiko",
    "Zenith",
    "Glashütte Original",
    "Breitling",
    "Cartier",
    "Bvlgari",
    "Panerai",
    "Chopard",
    "Corum",
    "Hublot",
  ],
  "Basic Luxury": [
    "Tudor",
    "TAG Heuer",
    "Longines",
    "Oris",
    "Rado",
    "Baume & Mercier",
    "Maurice Lacroix",
    "Sinn",
    "Frédérique Constant",
    "Alpina",
    "Junghans",
    "Fortis",
    "Ball Watch",
    "Nomos Glashütte",
    "Bell & Ross",
    "Eterna",
  ],
};

const BrandFilterDialog = ({ onApply }: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("Ultra Luxury");
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const toggle = (brand: string) => {
    setSelected((prev) => ({ ...prev, [brand]: !prev[brand] }));
  };

  const handleApply = () => {
    const selectedBrands = Object.keys(selected).filter((key) => selected[key]);
    onApply(selectedBrands);
    setOpen(false);
  };

  const handleClear = () => {
    setSelected({});
    onApply([]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className="flex items-center justify-between gap-2 border-2 border-border py-3 w-[100px] rounded-xl"
        >
          Brand <ChevronDown size={16} />
        </Button>
      </DialogTrigger>

      <DialogContent
        className="w-[600px] max-w-full p-0"
        showCloseButton={false}
      >
        <div className="w-full flex">
          <div className="w-[250px] border-r p-6 space-y-6">
            {Object.keys(brandCategories).map((category) => (
              <div
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`font-semibold p-3 hover:bg-gray-100 transition-all rounded-lg cursor-pointer flex gap-5 items-center justify-between ${
                  selectedCategory === category ? "bg-gray-100" : ""
                }`}
              >
                {category} <ChevronRight />
              </div>
            ))}
          </div>

          <div className="flex-1 p-6">
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {brandCategories[selectedCategory as keyof typeof brandCategories]?.map((brand) => (
                <div key={brand} className="flex items-center justify-between">
                  <div>{brand}</div>
                  <input
                    type="checkbox"
                    checked={!!selected[brand]}
                    onChange={() => toggle(brand)}
                    className="h-5 w-5 rounded cursor-pointer"
                  />
                </div>
              ))}
            </div>

            <div className="mt-10 flex justify-end gap-3">
              <Button
                variant="ghost"
                onClick={handleClear}
                className="bg-gray-100 rounded-full w-[130px]"
              >
                Clear
              </Button>
              <Button
                onClick={handleApply}
                className="rounded-full w-[130px]"
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BrandFilterDialog;
