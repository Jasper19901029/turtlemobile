"use client";
import { ReactNode, useState, useEffect } from "react";
import SearchBike from "./searchbike";

type BikeData = {
  sno: string;
  sna: string;
  sbi: number;
  sarea: string;
  bemp: number;
};

type Town = {
  town: string;
  isChecked: boolean;
};
// tot:總停車格, sbi:目前車輛,lat,lng, sna,bemp: 空位數量

// {"sno":"500101001","sna":"YouBike2.0_捷運科技大樓站","tot":28,"sbi":2,"sarea":"大安區","mday":"2023-08-27 20:08:04","lat":25.02605,"lng":121.5436,"ar":"復興南路二段235號前","sareaen":"Daan Dist.","snaen":"YouBike2.0_MRT Technology Bldg. Sta.","aren":"No.235， Sec. 2， Fuxing S. Rd.","bemp":26,"act":"1","srcUpdateTime":"2023-08-27 20:08:43","updateTime":"2023-08-27 20:08:52","infoTime":"2023-08-27 20:08:04","infoDate":"2023-08-27"}

export default function Information(): ReactNode {
  const [bikeData, setBikeData] = useState<BikeData[]>([]);
  const [town, setTown] = useState<Town[] | null>(null);
  const [searchCity, setSearchCity] = useState<string | null>("");
  const [renderBike, setRenderBike] = useState<BikeData[]>([]);

  useEffect(() => {
    const fetchBike = async () => {
      const getBiike = await fetch(
        "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json"
      );
      const data = await getBiike.json();
      setBikeData(
        data.map((data: BikeData) => {
          return {
            sno: data.sno,
            sna: data.sna.replace("YouBike2.0_", ""),
            sbi: data.sbi,
            sarea: data.sarea,
            bemp: data.bemp,
          };
        })
      );
    };
    fetchBike();
  }, []);

  useEffect(() => {
    if (town) {
      const newBikeData = bikeData.filter((bike) => {
        const filterTown = town
          .filter((town) => town.isChecked === true)
          .map((e) => e.town);
        return filterTown.includes(bike.sarea);
      });
      setRenderBike(newBikeData);
    }
    if (!town) {
      setRenderBike([]);
    }
  }, [town, searchCity]);

  return (
    <div className=" mx-auto w-[1192px] mt-[35px] relative">
      <img
        src="Frame.png"
        alt=""
        className={
          town && town && town.length > 4
            ? `absolute left-[578px] top-[201px]`
            : `absolute left-[578px] top-[0px]`
        }
      />
      <h2 className="text-lime-700 text-2xl font-bold leading-normal tracking-widest">
        站點資訊
      </h2>
      <SearchBike
        key="abcss"
        setSearchCity={setSearchCity}
        town={town}
        setTown={setTown}
      />
      <section className="w-[1192px] h-[498px] mx-auto mt-[40px] mb-[70px] rounded-3xl border border-zinc-400 overflow-hidden ">
        <div className="w-[1192px] h-[66px] bg-lime-400 rounded-tl-3xl rounded-tr-3xl ">
          <span className="inline-block mt-[21px] mb-[21px] ml-[46px] mr-[132px] text-[18px] not-italic font-[500] leading-[24px] text-[#FFFFFF]">
            縣市
          </span>
          <span className="inline-block mt-[21px] mb-[21px] mr-[258px] text-[18px] not-italic font-[500] leading-[24px] text-[#FFFFFF]">
            區域
          </span>
          <span className="inline-block mt-[21px] mb-[21px] mr-[252px] text-[18px] not-italic font-[500] leading-[24px] text-[#FFFFFF]">
            站點名稱
          </span>
          <span className="inline-block mt-[21px] mb-[21px] mr-[120px] text-[18px] not-italic font-[500] leading-[24px] text-[#FFFFFF]">
            可借車輛
          </span>
          <span className="inline-block mt-[21px] mb-[21px] mr-[96px] text-[18px] not-italic font-[500] leading-[24px] text-[#FFFFFF]">
            可還空位
          </span>
          <div className="w-[1188px] h-[498px] overflow-hidden hover:overflow-y-auto">
            {renderBike.map((bike) => {
              return (
                <div
                  key={bike.sno}
                  className="w-[1192px] h-[68px] odd:bg-[#FFF] even:bg-[#F6F6F6] ">
                  <span className="inline-block ml-[40px] mr-[120px] mt-[24px] text-[16px] text-center not-italic font-[400] leading-[24px] text-[#323232]">
                    {searchCity}
                  </span>
                  <span className="inline-block mr-[120px] mt-[24px] text-[16px] text-center not-italic font-[400] leading-[24px] text-[#323232]">
                    {bike.sarea}
                  </span>
                  <span className="w-[336px] inline-block mr-[146px] mt-[24px] text-[16px] text-center not-italic font-[400] leading-[24px] text-[#323232]">
                    {bike.sna}
                  </span>
                  <span className="w-[22px] inline-block mr-[168px] mt-[24px] text-[18px] text-center not-italic font-[700] leading-[24px] text-[#B5CC22]">
                    {bike.sbi}
                  </span>
                  <span className="w-[22px] inline-block mr-[122px] mt-[24px] text-[18px] text-center not-italic font-[700] leading-[24px] text-[#B5CC22]">
                    {bike.bemp}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
