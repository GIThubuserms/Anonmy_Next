import { z } from "zod";

export const verifyTokenschema=z.object({
   code:z.string().min(6,{message:"Code must be 6 Characters"})
})