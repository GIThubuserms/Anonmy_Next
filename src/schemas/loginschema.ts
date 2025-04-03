import { z } from "zod";

export const loginschema=z.object({
  email:z.string(),
  password:z.string()
})