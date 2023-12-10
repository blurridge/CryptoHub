"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useExtrapolation } from "@/context/ExtrapolationContext";

export const DayDropdown = () => {
  const { currentDay, setCurrentDay } = useExtrapolation();
  const daysOptions = Array.from({ length: 30 }, (_, index) => index + 1);
  const daysItems = daysOptions.map((day) => (
    <SelectItem key={day.toString()} value={day.toString()}>
      {`${day} Day${day !== 1 ? "s" : ""}`}
    </SelectItem>
  ));

  const handleDayChange = (day: string) => {
    setCurrentDay(Number(day));
  };

  return (
    <>
      <Select onValueChange={handleDayChange} value={String(currentDay)}>
        <SelectTrigger className="w-[230px]">
          <SelectValue placeholder="Select Days in the Future" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>{daysItems}</SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};
