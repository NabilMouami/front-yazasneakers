"use client";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addQty, deleteCart } from "@/features/shopSlice";
const config_url = `http://localhost:5000`;

const CartItems = () => {
  const { cart } = useSelector((state) => state.shop) || {};

  const dispatch = useDispatch();

  // delete cart item
  const deleteCartHandler = (id) => {
    dispatch(deleteCart(id));
  };

  // qty handler
  const qtyHandler = (id, qty) => {
    dispatch(addQty({ id, qty }));
  };

  return (
    <>
      {cart?.map((data) => (
        <tr className="cart-item" key={data.item.id}>
          <td className="product-thumbnail">
            <Link href={`/shop/${data.item.id}`}>
              <img
                src={`${config_url}/images/${data.item.image}`}
                alt="cart added product"
              />
            </Link>
          </td>

          <td className="product-name">
            <Link href={`/shop/${data.item.id}`}>{data.item.name}</Link>
          </td>
          <td className="product-name">
            <button
              className="btn btn-sm btn-dark text-white"
              style={{ borderRadius: "25px", padding: "0.25rem 0.75rem" }} // Smaller padding
            >
              {data.size}
            </button>
          </td>

          <td className="product-price">{data.item.price} Dh</td>

          <td className="product-subtotal">
            <span className="amount">{(data.item?.price).toFixed(2)} Dh</span>
          </td>

          <td className="product-remove">
            <button
              onClick={() => deleteCartHandler(data.item?.id)}
              className="remove"
            >
              <span className="flaticon-dustbin">Remove</span>
            </button>
          </td>
        </tr>
      ))}
    </>
  );
};

export default CartItems;
