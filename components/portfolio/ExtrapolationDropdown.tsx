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

export const ExtrapolationDropdown = () => {
  const { currentDegree, setCurrentDegree } = useExtrapolation();
  const handleDegreeChange = (degree: string) => {
    setCurrentDegree(degree);
  };

  return (
    <>
      <Select onValueChange={handleDegreeChange} value={currentDegree}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select Extrapolation Degree" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="none">No Extrapolation</SelectItem>
            <SelectItem value="linear">Linear</SelectItem>
            <SelectItem value="quadratic">Quadratic</SelectItem>
            <SelectItem value="cubic">Cubic</SelectItem>
            <SelectItem value="quartic">Quartic</SelectItem>
            <SelectItem value="quintic">Quintic</SelectItem>
            <SelectItem value="sextic">Sextic</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};
