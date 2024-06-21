// pages/api/context.ts
import { NextApiRequest, NextApiResponse } from "next";
import Context from "@/libs/context";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const context = await Context();
    // console.log("context: ", JSON.parse(JSON.stringify(context)));
    res.status(200).json(context);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
