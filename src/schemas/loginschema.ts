import { z } from "zod";

const usernamevalidation=z
.string()

export const loginschema=z.object({
  identifier:usernamevalidation,
  password:z.string()
})