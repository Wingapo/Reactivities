import {z} from "zod";
import {Category} from "../types";



const requiredString = (field: string) => z
  .string({error: `${field} is required`})
  .min(1, {message: `${field} is required`});

export const activitySchema = z.object({
  title: requiredString('Title'),
  description: requiredString('Description'),
  category: z.enum(Object.values(Category)),
  date: z.coerce.date<Date>({message: 'Date is required'}),
  location: z.object({
    venue: requiredString('Venue'),
    city: z.string().optional(),
    latitude: z.coerce.number<number>(),
    longitude: z.coerce.number<number>(),
  }),
});

export type ActivitySchema = z.infer<typeof activitySchema>;
