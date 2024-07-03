"use client";
import { useDispatch, useSelector } from "react-redux";
import { addBrand } from "../../features/filterSlice";
import { brandCheck } from "../../features/productSlice";

const BrandLevel = ({ contract, setContract }) => {
  const { categoryList } = useSelector((state) => state.Categories) || {};
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

  // dispatch product-type

  return (
    <>
      {categoryList?.map((item) => (
        <div className="form-check" key={item.id}>
          <input
            className="form-check-input"
            id={`brand${item.id}`}
            type="checkbox"
            checked={contract.some((c) => c === item.name)}
            value={item.value}
            onChange={(e) => handleCheckboxChange(e, setContract)}
          />
          <label className="form-check-label" htmlFor={`brand${item.id}`}>
            {item.name}
          </label>
        </div>
      ))}
    </>
  );
};

export default BrandLevel;
