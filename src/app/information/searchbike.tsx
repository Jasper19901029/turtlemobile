"use client";
import React, { ReactNode, useState } from "react";
import Select, { SingleValue } from "react-select";
import { cityData, CityData } from "./city";

type Town = {
  town: string;
  isChecked: boolean;
};

type CheckBox = {
  id: string;
  label: string;
  isChecked: boolean;
  value?: string;
  htmlFor: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CheckBox = ({
  id,
  label,
  isChecked,
  value,
  onChange,
}: CheckBox): ReactNode => {
  return (
    <div className="w-[115px] h-[40px] relative mb-[15px] items-center">
      <input
        id={id}
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        value={value}
        className="w-[18px] h-[18px] border-2 border-solid border-[#AEAEAE] rounded-[2px] appearance-none checked:bg-lime-400 z-99"
      />
      {isChecked && (
        <svg
          className="absolute inset-0 left-[-3px] pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none">
          <path
            d="M10 16.4L6 12.4L7.4 11L10 13.6L16.6 7L18 8.4L10 16.4Z"
            fill="white"
          />
        </svg>
      )}
      <label
        htmlFor={id}
        className="w-[72px] ml-[13px] text-[#323232] text-[18px] not-italic font-[400] leading-[24px]">
        {label}
      </label>
    </div>
  );
};

export default function SearchBike({
  setSearchCity,
  town,
  setTown,
}: {
  town: Town[] | null;
  setTown: (town: Town[] | null) => void;
  setSearchCity: (city: string) => void;
}): ReactNode {
  // const [town, setTown] = useState<Town[] | null>(null);
  const [searchField, setSearchField] = useState("");
  const [inputKey, setInputKey] = useState(0);
  const [checkedAll, setCheckedAll] = useState(true);

  const handleSelectChange = (e: SingleValue<CityData>): void => {
    console.log(e);
    if (e === null) {
      setInputKey((pre) => pre + 1);
      setSearchCity("");
      return setTown(null);
    }
    setSearchField("");
    setSearchCity(e.label);
    setTown(e.value.map((town) => ({ town: town, isChecked: true })));
  };

  const handleCheckedAllChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (!town) return;
    setCheckedAll(!checkedAll);
    setTown(town.map((town) => ({ ...town, isChecked: !checkedAll })));
  };

  const handleCheckedChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { id } = e.target;
    if (!town) return;
    setTown(
      town.map((town) => {
        if (town.town === id) {
          return { ...town, isChecked: !town.isChecked };
        }
        return town;
      })
    );
  };

  const checkboxs =
    town &&
    town.map((town) => {
      return (
        <div key={town.town}>
          <CheckBox
            id={town.town}
            label={town.town}
            isChecked={town.isChecked}
            htmlFor={town.town}
            onChange={handleCheckedChange}
          />
        </div>
      );
    });

  return (
    <div className="mt-[32px]">
      <div className="flex">
        <div className="mr-[16px] w-[175px] h-[40px] ">
          <Select
            instanceId="選擇縣市"
            key="選擇縣市"
            placeholder="選擇縣市"
            className="text-[18px] not-italic font-[500] leading-[20px] text-[#323232] text-center tracking-[0.1px] items-center gap-[16px] rounded-[8px] bg-[#F6F6F6]"
            onChange={handleSelectChange}
            closeMenuOnSelect={true}
            isClearable={true}
            options={cityData}
            inputValue={searchField}
            defaultInputValue={searchField}
            controlShouldRenderValue={true}
          />
        </div>
        <div className="w-[277px] h-[40px] flex flex-row bg-[#F6F6F6] relative">
          <input
            className="pl-[16px] w-[277px] h-[40px] text-[18px] not-italic font-[500] leading-[20px] text-[#323232] text-start tracking-[0.1px] items-center gap-[146px] rounded-[8px] bg-[#F6F6F6]"
            placeholder="搜尋站點"
            key={inputKey}
            type="text"
            onChange={(e) => setSearchField(e.target.value)}
          />
          <svg
            className="absolute inset-y-[6px] right-[16px] "
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 18 18"
            fill="none">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.07 9.9525L15.3675 14.25L14.25 15.3675L9.9525 11.07C9.15 11.6475 8.1825 12 7.125 12C4.4325 12 2.25 9.8175 2.25 7.125C2.25 4.4325 4.4325 2.25 7.125 2.25C9.8175 2.25 12 4.4325 12 7.125C12 8.1825 11.6475 9.15 11.07 9.9525ZM7.125 3.75C5.2575 3.75 3.75 5.2575 3.75 7.125C3.75 8.9925 5.2575 10.5 7.125 10.5C8.9925 10.5 10.5 8.9925 10.5 7.125C10.5 5.2575 8.9925 3.75 7.125 3.75Z"
              fill="#AEAEAE"
            />
          </svg>
        </div>
      </div>
      <div className="w-[413px] grid  grid-cols-4 gap-[24px]">
        {town && (
          <div className="mt-[32px] col-span-4">
            <CheckBox
              key="選擇全部"
              id="選擇全部"
              label="選擇全部"
              isChecked={town.every((town) => town.isChecked === true)}
              htmlFor="選擇全部"
              onChange={handleCheckedAllChange}
            />
          </div>
        )}
        {checkboxs}
      </div>
    </div>
  );
}
