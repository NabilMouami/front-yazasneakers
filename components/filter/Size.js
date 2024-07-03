"use client";

import React from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";

function SizeSidebar({
  toggleSizeDropdown,
  isSizeDropdownOpen,
  displayedSizes,
  allSizes,
  sizes,
  setSizes,
  showMoreSizes,
  setShowMoreSizes,
}) {
  const handleCheckboxChange = (e, setState) => {
    const isChecked = e.target.checked;
    const filterValue = e.target.value;

    setState((prev) => {
      if (isChecked) {
        return [...prev, filterValue];
      } else {
        return prev.filter((value) => value !== filterValue);
      }
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-gray-800 font-semibold text-[15.5px]">Size</span>
        {isSizeDropdownOpen ? (
          <MdExpandLess
            color="#000"
            size={30}
            onClick={toggleSizeDropdown}
            className="cursor-pointer right-0"
          />
        ) : (
          <MdExpandMore
            color="#000"
            size={30}
            onClick={toggleSizeDropdown}
            className="cursor-pointer right-0"
          />
        )}
      </div>
      {isSizeDropdownOpen && (
        <div className="w-full flex flex-col gap-2">
          {displayedSizes.map((size) => (
            <div key={size} className="w-full  flex items-center gap-2">
              <input
                type="checkbox"
                value={size}
                checked={sizes.some((s) => s === size)}
                onChange={(e) => handleCheckboxChange(e, setSizes)}
                className="w-[16px] h-[16px]"
              />
              <span className="text-gray-800 font-semibold text-[20px]">
                {size}
              </span>
            </div>
          ))}
          {allSizes.length > 5 && (
            <button
              onClick={() => setShowMoreSizes(!showMoreSizes)}
              className="text-blue-500 hover:underline mt-2"
            >
              {showMoreSizes ? "Show less" : "Show more"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default SizeSidebar;
