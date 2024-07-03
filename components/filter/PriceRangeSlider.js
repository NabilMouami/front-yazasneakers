"use client";
import { useEffect, useState } from "react";
import InputRange from "react-input-range";
import { useDispatch, useSelector } from "react-redux";
import { addprice } from "../../features/filterSlice";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
const PriceRangeSlider = ({ handlePriceChange, price }) => {
  const { shopList } = useSelector((state) => state.filter);

  return (
    <div className="w-full flex flex-col gap-2">
      <Slider
        range
        min={0}
        max={2000}
        value={price}
        onChange={handlePriceChange}
        className="w-full"
        trackStyle={{ backgroundColor: "black", height: 10 }}
        railStyle={{ backgroundColor: "lightblue", height: 10 }}
        handleStyle={{
          height: 20,
          width: 20,
          backgroundColor: "gray",
        }}
      />
      <span className="text-gray-800 font-medium text-[15px]">
        Price: From: {price[0]} Dh To: {price[1]} Dh
      </span>
    </div>
  );
};

export default PriceRangeSlider;
