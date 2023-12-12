"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { InvestmentFormSchema, FormType } from "@/types/schema";
import { InvestmentFormProps } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ButtonGreenLoader } from "@/components/loaders/Loader";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useCoins } from "@/context/CoinContext";
import Image from "next/image";
import { uploadToFirestore } from "@/utils/uploadToFirestore";
import { useAuth } from "@/context/AuthContext";

export const InvestmentForm = ({ handleDialogClose }: InvestmentFormProps) => {
  const { coinList, coinCache } = useCoins();
  const { user } = useAuth();
  const currentUserEmail = user?.email;
  const form = useForm<FormType>({
    resolver: zodResolver(InvestmentFormSchema),
    mode: "onChange",
    defaultValues: {
      coin_id: "",
      amount_invested: 0,
      date_invested: new Date(),
    },
  });
  const { formState } = form;
  const { isSubmitting, isValid } = formState;
  // Define a submit handler.
  const onSubmit = async (payload: FormType) => {
    if (user && currentUserEmail) {
      await uploadToFirestore({ payload, coinCache, currentUserEmail });
    }
    if (handleDialogClose) {
      handleDialogClose();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="date_invested"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Investment Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="coin_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Coin</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select coin you invested in" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {coinList.map((coin) => (
                    <SelectItem key={"Sel" + coin.coin_id} value={coin.coin_id}>
                      <div className="flex gap-5">
                        <Image
                          src={coin.image_link}
                          alt={`${coin.coin_id} logo`}
                          width={24}
                          height={24}
                          priority
                        />
                        {coin.name} {"("}
                        {coin.symbol.toUpperCase()}
                        {")"}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount_invested"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount Invested (in PHP)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isSubmitting ? (
          <Button disabled>
            <ButtonGreenLoader />
          </Button>
        ) : (
          <Button type="submit" disabled={!isValid}>
            Submit
          </Button>
        )}
      </form>
    </Form>
  );
};
