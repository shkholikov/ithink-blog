// types/express.d.ts or typings/express.d.ts

declare namespace Express {
  export interface Request {
    user: { _id: string };
  }
}
