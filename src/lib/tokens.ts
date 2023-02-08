
import jwt from "jsonwebtoken";
import { TokenPayload } from "../types";

export const createAccessToken = (payload:TokenPayload): Promise<string| undefined> =>
  new Promise((resolve, reject) =>
    jwt.sign( payload, process.env.JWT_SECRET!,
      { expiresIn: "1 week" },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    )
  );

export const verifyAccessToken = (token:string) : Promise<TokenPayload|undefined> =>
  new Promise((resolve, reject) =>
    jwt.verify(token, process.env.JWT_SECRET!, (err, payload) => {
      if (err) {
        reject(err);
      } else {
        resolve(payload as TokenPayload);
      }
    })
  );