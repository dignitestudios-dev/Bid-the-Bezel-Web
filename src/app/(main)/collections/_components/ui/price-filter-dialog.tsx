"use client";
import React, { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

type Props = {
  onApply?: (min?: number, max?: number) => void;
  type?: string;
};

const MAX = 100000;

const PriceFilterDialog = ({ onApply, type }: Props) => {
  const isAuction = type === "auction";
  const MIN_START = isAuction ? 5000 : 0;

  const [open, setOpen] = useState(false);
  const [min, setMin] = useState(MIN_START);
  const [max, setMax] = useState(MAX);

  // Reset when category changes
  useEffect(() => {
    setMin(MIN_START);
    setMax(MAX);
    onApply?.(undefined, undefined);
  }, [type]);

  const onMinChange = (v: number) => {
    const val = Math.min(Math.max(MIN_START, v), max);
    setMin(val);
  };

  const onMaxChange = (v: number) => {
    const val = Math.max(Math.min(MAX, v), min);
    setMax(val);
  };

  const sliderRef = useRef<HTMLDivElement | null>(null);
  const activeRef = useRef<'min' | 'max' | null>(null);

  const clamp = (n: number, a = MIN_START, b = MAX) => Math.max(a, Math.min(b, n));

  const getValueFromClientX = (clientX: number) => {
    const el = sliderRef.current;
    if (!el) return MIN_START;
    const rect = el.getBoundingClientRect();
    const ratio = (clientX - rect.left) / rect.width;
    return Math.round(clamp(ratio * (MAX - MIN_START) + MIN_START));
  };

  const handleApply = () => {
    onApply?.(min, max);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className="flex items-center justify-between gap-2 border-2 border-border py-3 w-[100px] rounded-xl"
        >
          Price <ChevronDown size={16} />
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[600px] max-w-full p-6" showCloseButton={false}>
        <div className="space-y-6">
          <div className="w-full">
            <div
              ref={sliderRef}
              className="relative h-8 flex items-center"
              onPointerDown={(e) => {
                const val = getValueFromClientX(e.clientX);
                const closer = Math.abs(val - min) <= Math.abs(val - max) ? "min" : "max";
                activeRef.current = closer;
                if (closer === "min") onMinChange(val);
                else onMaxChange(val);

                const handlePointerMove = (ev: PointerEvent) => {
                  const v = getValueFromClientX(ev.clientX);
                  if (activeRef.current === "min") onMinChange(v);
                  else if (activeRef.current === "max") onMaxChange(v);
                };

                const handlePointerUp = () => {
                  activeRef.current = null;
                  window.removeEventListener("pointermove", handlePointerMove);
                  window.removeEventListener("pointerup", handlePointerUp);
                };

                window.addEventListener("pointermove", handlePointerMove);
                window.addEventListener("pointerup", handlePointerUp);
                e.currentTarget.setPointerCapture?.(e.pointerId);
                e.preventDefault();
              }}
            >
              <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2">
                <div className="h-2 bg-gray-100 rounded" />
              </div>

              <div
                className="absolute top-1/2 transform -translate-y-1/2 h-2 rounded bg-emerald-500"
                style={{
                  left: `${((min - MIN_START) / (MAX - MIN_START)) * 100}%`,
                  width: `${((max - min) / (MAX - MIN_START)) * 100}%`
                }}
              />

              <div
                className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2"
                style={{ left: `${((min - MIN_START) / (MAX - MIN_START)) * 100}%` }}
                role="slider" aria-valuemin={MIN_START} aria-valuemax={MAX} aria-valuenow={min}
              >
                <div className="w-4 h-4 rounded-full bg-white border-2 border-emerald-500" />
              </div>

              <div
                className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2"
                style={{ left: `${((max - MIN_START) / (MAX - MIN_START)) * 100}%` }}
                role="slider" aria-valuemin={MIN_START} aria-valuemax={MAX} aria-valuenow={max}
              >
                <div className="w-4 h-4 rounded-full bg-white border-2 border-emerald-500" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground">From</div>
              <div className="mt-2 flex items-center">
                <span className="text-lg font-semibold">$</span>
                <input
                  type="number"
                  max={MAX}
                  min={MIN_START}
                  value={min}
                  onChange={(e) => onMinChange(Number(e.target.value || MIN_START))}
                  className="w-full bg-transparent text-lg font-semibold outline-none ml-1"
                />
              </div>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground">To</div>
              <div className="mt-2 flex items-center">
                <span className="text-lg font-semibold">$</span>
                <input
                  type="number"
                  max={MAX}
                  min={MIN_START}
                  value={max}
                  onChange={(e) => onMaxChange(Number(e.target.value || MIN_START))}
                  className="w-full bg-transparent text-lg font-semibold outline-none ml-1"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t flex justify-end gap-3">
            <Button variant="ghost" onClick={() => {
              setOpen(false);
              setMin(MIN_START);
              setMax(MAX);
              onApply?.(undefined, undefined);
            }} className="bg-gray-100 rounded-full w-[130px]">
              Cancel
            </Button>
            <Button onClick={handleApply} className="rounded-full w-[130px]">
              Apply
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PriceFilterDialog;
