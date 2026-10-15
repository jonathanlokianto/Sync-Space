import z from "zod";
console.log("DEBUG ENV:", process.env.NEXT_PUBLIC_API_URL);
// const envSchema = z.object({
//   // NEXT_PUBLIC_API_URL: z.string().url(),
//   NEXT_PUBLIC_API_URL: z.httpUrl(),
// });

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().refine(
    (val) => {
      try {
        new URL(val);
        return true;
      } catch {
        return false;
      }
    },
    {
      message: "Invalid URL format",
    },
  ),
});

const _env = envSchema.safeParse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
});

if (!_env.success) {
  console.error("Invalid environment variables:", z.treeifyError(_env.error));
  throw new Error("Invalid environment variables");
}
export const env = _env.data;
