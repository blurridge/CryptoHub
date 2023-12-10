"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import { InvestmentForm } from "@/components/portfolio/InvestmentForm";

export const AddInvestment = () => {
  const [open, setOpen] = useState(false);
  const handleDialogClose = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-fit">
          <Plus className="mr-2 h-4 w-4" /> Add Investment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] overflow-y-scroll max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Add an investment</DialogTitle>
          <DialogDescription>Enter details here.</DialogDescription>
        </DialogHeader>
        <InvestmentForm handleDialogClose={handleDialogClose} />
      </DialogContent>
    </Dialog>
  );
};
