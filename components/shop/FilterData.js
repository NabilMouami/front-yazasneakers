"use client";

import { addCart } from "@/features/shopSlice";
import { addWishlist } from "@/features/wishlistSlice";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addPerPage,
  addSort,
  addprice,
  clearBrand,
  clearCategory,
  clearColor,
} from "../../features/filterSlice";
import {
  clearBrandToggle,
  clearCategoryToggle,
  clearColorToggle,
} from "../../features/productSlice";
import ShopCard from "./ShopCard";

const FilterData = ({ filterData }) => {
  console.log(filterData);

  const dispatch = useDispatch();

  const addToCart = (id) => {
    const item = filterData?.find((item) => item.id === id);
    dispatch(addCart({ product: item }));
  };

  const addToWishlist = (id) => {
    const item = filterData?.find((item) => item.id === id);
    dispatch(addWishlist({ product: item }));
  };

  let content = filterData?.map((item, i) => (
    <Fragment key={i}>
      <ShopCard
        item={item}
        addToCart={addToCart}
        addToWishlist={addToWishlist}
      />
    </Fragment>
    // End all products
  ));

  return <>{content}</>;
};

export default FilterData;
