import React, { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Nav(): ReactNode {
  return (
    <div className="flex flex-row mx-auto w-[1450px]">
      <Link href="/" className="ml-[124px] mr-[60px] mt-[6px]">
        <Image src="/logo1.png" width={95} height={95} alt="Logo" />
      </Link>
      <div className="w-[520px] h-6 mt-[40px] justify-start items-start gap-10 inline-flex">
        <Link
          href="/instruction"
          className="text-lime-700 hover:text-lime-500 hover:font-bold text-lg font-medium leading-normal">
          使用說明
        </Link>
        <Link
          href="/payment"
          className="text-lime-700 hover:text-lime-500 hover:font-bold text-lg font-medium leading-normal">
          收費方式
        </Link>
        <Link
          href="/information"
          className="text-lime-700 hover:text-lime-500 hover:font-bold text-lg font-medium leading-normal">
          站點資訊
        </Link>
        <Link
          href="/news"
          className="text-lime-700 hover:text-lime-500 hover:font-bold text-lg font-medium leading-normal">
          最新消息
        </Link>
        <Link
          href="/activities"
          className="text-lime-700 hover:text-lime-500 hover:font-bold text-lg font-medium leading-normal">
          活動專區
        </Link>
      </div>
      <div className="w-[85px] h-[40px] mt-[32px] mr-[124px] ml-[432px] bg-lime-500 hover:font-bold rounded-full  justify-center items-center gap-[8px] inline-flex">
        <Link
          href="/sign-in"
          className="text-center text-white text-lg font-normal leading-tight tracking-tight">
          <button>登入</button>
        </Link>
      </div>
    </div>
  );
}
