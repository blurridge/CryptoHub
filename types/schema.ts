import * as z from "zod";

export const InvestmentFormSchema = z.object({
  coin_id: z.string({ required_error: "Please select a coin." }).min(1),
  amount_invested: z.coerce
    .number({
      required_error: "Please enter the amount you invested in PHP.",
    })
    .positive({
      message: "Please enter an amount greater than zero."
    }),
  date_invested: z.date({
    required_error: "Please enter the date you invested in the coin.",
  }),
});

export type FormType = z.infer<typeof InvestmentFormSchema>;
