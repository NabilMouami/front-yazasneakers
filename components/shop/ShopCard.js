"use client";

import Link from "next/link";

const config_url = `http://localhost:5000`;

const ShopCard = ({ item, addToCart, addToWishlist }) => {
  console.log(item);
  const myArray = JSON.parse(item.nemuro_shoes);

  const imagesArray = JSON.parse(item.images) || [];
  const validImages = [item.image, ...imagesArray].filter((image) => image);

  const images = {
    img1: `${config_url}/images/${validImages[0]}`,
    img2: `${config_url}/images/${validImages[1] || ""}`,
    img3: `${config_url}/images/${validImages[2] || ""}`,
    img4: `${config_url}/images/${validImages[3] || ""}`,
  };
  const createButton = (number) => (
    <button
      key={number}
      className="btn btn-sm btn-outline-secondary"
      style={{ borderRadius: "25px", padding: "0.25rem 0.75rem" }} // Smaller padding
    >
      {number}
    </button>
  );

  return (
    <>
      <div className="col">
        <div className="tpproduct tpproductitem mb-15 p-relative">
          <div className="tpproduct__thumb">
            <div className="tpproduct__thumbitem p-relative">
              <Link href={`/shop-details/${item.id}`}>
                <img src={images.img1} alt="product-thumb" />
                <img
                  className="thumbitem-secondary"
                  src={images.img3}
                  alt="product-thumb"
                />
              </Link>
              <div className="tpproduct__thumb-bg">
                <div className="tpproductactionbg">
                  <a onClick={() => addToCart(item.id)} className="add-to-cart">
                    <i className="fal fa-shopping-basket" />
                  </a>
                  <Link href={`/shop-details/${item.id}`}>
                    <i className="fal fa-eye" />
                  </Link>
                  <a
                    onClick={() => addToWishlist(item.id)}
                    className="wishlist"
                  >
                    <i className="fal fa-heart" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="tpproduct__content-area">
            <h3 className="tpproduct__title mb-5">
              <Link href={`/shop-details/${item.id}`}>{item.name}</Link>
            </h3>
            <div className="tpproduct__priceinfo p-relative">
              <div className="tpproduct__ammount">
                <span>{item.price}.00DH</span>
              </div>
            </div>
            <div className="mb-2 p-2 d-flex flex-column gap-2 me-2">
              <div className="row row-cols-4 row-cols-md-4 row-cols-lg-4 g-2">
                {myArray.map(createButton)}
              </div>
            </div>
          </div>
          <div className="tpproduct__ratingarea">
            <div className="d-flex align-items-center justify-content-between">
              <div className="tpproductdot">
                <Link
                  className="tpproductdot__variationitem"
                  href={`/shop-details/${item.id}`}
                >
                  <div className="tpproductdot__termshape">
                    <span className="tpproductdot__termshape-bg" />
                    <span className="tpproductdot__termshape-border" />
                  </div>
                </Link>
                <Link
                  className="tpproductdot__variationitem"
                  href={`/shop-details/${item.id}`}
                >
                  <div className="tpproductdot__termshape">
                    <span className="tpproductdot__termshape-bg red-product-bg" />
                    <span className="tpproductdot__termshape-border red-product-border" />
                  </div>
                </Link>
                <Link
                  className="tpproductdot__variationitem"
                  href={`/shop-details/${item.id}`}
                >
                  <div className="tpproductdot__termshape">
                    <span className="tpproductdot__termshape-bg orange-product-bg" />
                    <span className="tpproductdot__termshape-border orange-product-border" />
                  </div>
                </Link>
                <Link
                  className="tpproductdot__variationitem"
                  href={`/shop-details/${item.id}`}
                >
                  <div className="tpproductdot__termshape">
                    <span className="tpproductdot__termshape-bg purple-product-bg" />
                    <span className="tpproductdot__termshape-border purple-product-border" />
                  </div>
                </Link>
              </div>
              <div className="tpproduct__rating">
                <ul>
                  <li>
                    <Link href="#">
                      <i className="fas fa-star" />
                    </Link>
                    <Link href="#">
                      <i className="fas fa-star" />
                    </Link>
                    <Link href="#">
                      <i className="fas fa-star" />
                    </Link>
                    <Link href="#">
                      <i className="fas fa-star" />
                    </Link>
                    <Link href="#">
                      <i className="far fa-star" />
                    </Link>
                  </li>
                  <li>
                    <span>(81)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopCard;
