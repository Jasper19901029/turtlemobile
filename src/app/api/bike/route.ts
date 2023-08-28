import { NextRequest } from "next/server";

const Get = async (req: NextRequest) => {
  const res = await fetch(
    "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json"
  );
  const data = await res.json();
  return res;
};
