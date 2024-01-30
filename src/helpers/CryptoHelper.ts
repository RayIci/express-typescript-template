import { LoadEnv } from "@/helpers/EnvHelper";
import InternalServerError from "@/errors/InternalServerError";

import crypto from "crypto";


/**
 * Generates a random base64 string using crypto.randomBytes.
 *
 * @return {string} The random base64 string.
 */
export const RandomBytes = () => crypto.randomBytes(128).toString("base64");


/**
 * Generates an HMAC hash based on the provided salt and plain password.
 *
 * @param {string} salt - the salt used for hashing
 * @param {string} plain_password - the plain password to be hashed
 * @return {string} the generated HMAC hash
 */
export const HashPassword = (salt: string, plain_password: string) => {
  LoadEnv();

  // If the secret is not defined in the environment variables, throw an error
  if (!process.env.ENCRYPTION_SECRET) {
    throw new InternalServerError("No encryption secret defined in environment variables");
  }

  return crypto
    .createHmac("sha256", [salt, plain_password].join("/"))
    .update(process.env.ENCRYPTION_SECRET as string)
    .digest("hex");
};
