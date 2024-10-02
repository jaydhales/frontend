import type { MutableRefObject, SyntheticEvent } from "react";
import { useCallback, useEffect, useRef } from "react";
import { FormControl } from "../ui/form";
import { RadioGroupItem } from "../ui/radio-group";
import { mapLeverage } from "@/lib/utils";

export function RadioItem({
  value,
  fieldValue,
  setValue,
}: {
  value: string;
  fieldValue: string;
  setValue: (s: string) => void;
}) {
  const selected = fieldValue === value;
  const radioRef = useRef(null);
  const handleCardClicked = useCallback(() => {
    setValue && setValue(value); // this function is a callback for change the "selected" state
  }, [setValue, value]);

  const handleRadioClick = useCallback((e: SyntheticEvent) => {
    e.stopPropagation();
  }, []);

  useEffect(() => {
    if (selected) {
      if (radioRef.current) {
        const ref = radioRef as unknown as MutableRefObject<HTMLInputElement>;
        ref.current.focus();
        ref.current.click();
      }
    }
  }, [selected]);
  return (
    <FormControl>
      <div
        data-active={value === fieldValue ? "true" : ""}
        className="flex w-full cursor-pointer justify-between rounded-md border-2 border-secondary-100 px-2 py-1 data-[active=true]:border-gold"
        onClick={handleCardClicked}
      >
        <div className="flex select-none flex-col justify-between gap-y-2">
          <span className="text-[14px]">{mapLeverage(value)}x</span>
          <span className="text-[12px] text-gray-500">Lorem ispum</span>
        </div>

        <div className="flex items-center">
          <RadioGroupItem
            ref={radioRef}
            onClick={handleRadioClick}
            value={value}
          />
        </div>
      </div>
    </FormControl>
  );
}
