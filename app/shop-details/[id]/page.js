"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addCartWithSize } from "@/features/shopSlice";
import { addWishlist } from "@/features/wishlistSlice";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import "react-image-gallery/styles/css/image-gallery.css";
import Preloader from "@/components/elements/Preloader";

const config_url = `http://localhost:5000`;

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 5,
  spaceBetween: 25,
  autoplay: {
    delay: 3500,
  },
  breakpoints: {
    1400: {
      slidesPerView: 5,
    },
    1200: {
      slidesPerView: 5,
    },
    992: {
      slidesPerView: 4,
    },
    768: {
      slidesPerView: 2,
    },
    576: {
      slidesPerView: 2,
    },
    0: {
      slidesPerView: 1,
    },
  },
  navigation: {
    nextEl: ".tprelated__nxt",
    prevEl: ".tprelated__prv",
  },
};
export default function ShopDetails() {
  const { productList } = useSelector((state) => state.Products) || {};
  const [productSimilaire, setProductSimilaire] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectsize, setSelected] = useState(true);

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [category, setCategory] = useState("");
  const [activeIndex, setActiveIndex] = useState(1);
  const handleOnClick = (index) => {
    setActiveIndex(index);
  };
  const dispatch = useDispatch();
  const abc = useParams();

  useEffect(() => {
    console.log(abc);
    const id = abc.id;

    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/interface/products/${parseInt(id)}`
        );
        console.log("API Response:", response.data);

        const productData = response?.data[0];
        console.log("Product Data:", productData);

        await setProduct(productData);
        await setCategory(productData.category_names);
        await setLoading(false);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, []); // Only run once on component mount
  useEffect(() => {
    const filtered = productList.filter(
      (product) => product.category_names == category
    );
    setProductSimilaire(filtered);
  }, [product]);

  const handleSelectedSize = (size) => {
    setSelectedSize(size);
    setSelected(false);
  };
  const addToCart = (id, size) => {
    const item = productList?.find((item) => item.id === id);
    const itemwithsize = { item, size };
    console.log(itemwithsize);
    dispatch(addCartWithSize({ product: itemwithsize }));
  };

  const addToWishlist = (id) => {
    const item = productList?.find((item) => item.id === id);
    dispatch(addWishlist({ product: item }));
  };

  if (loading) {
    return <Preloader />;
  }

  if (!product) {
    return <div>Product not found</div>;
  }
  const myArray = JSON.parse(product.nemuro_shoes);

  const imagesArray = JSON.parse(product.images) || [];
  const validImages = [product.image, ...imagesArray].filter((image) => image);

  const images = {
    img1: `${config_url}/images/${validImages[0]}`,
    img2: `${config_url}/images/${validImages[1] || ""}`,
    img3: `${config_url}/images/${validImages[2] || ""}`,
    img4: `${config_url}/images/${validImages[3] || ""}`,
  };

  const productDetailItem = {
    images: validImages.map((image) => ({
      original: `${config_url}/images/${image}`,
      thumbnail: `${config_url}/images/${image}`,
    })),
  };

  const renderImage = (item) => (
    <Zoom>
      <img src={item.original} alt={item.description} />
    </Zoom>
  );

  const createButton = (number) => (
    <button
      key={number}
      onClick={() => handleSelectedSize(number)}
      className={`btn btn-sm ${
        selectedSize === number
          ? "btn-dark text-white"
          : "btn-outline-secondary"
      }`}
      style={{ borderRadius: "25px", padding: "0.25rem 0.75rem" }} // Smaller padding
    >
      {number}
    </button>
  );
  return (
    <>
      <Layout headerStyle={3} footerStyle={1} breadcrumbTitle="Shop Details">
        <div>
          <section className="product-area pt-80 pb-25">
            <div className="container">
              <div className="row">
                <div className="col-lg-5 col-md-12">
                  <div className="tpproduct-details__nab pr-50 mb-40">
                    <ReactImageGallery
                      showFullscreenButton={false}
                      showPlayButton={false}
                      renderItem={renderImage}
                      autoPlay={false}
                      lazyLoad={true}
                      items={productDetailItem.images}
                    />
                  </div>
                </div>
                <div className="col-lg-5 col-md-7">
                  <div className="tpproduct-details__content">
                    <div className="tpproduct-details__title-area d-flex align-items-center flex-wrap mb-5">
                      <h3 className="tpproduct-details__title">
                        {product.name}
                      </h3>
                      <span className="tpproduct-details__stock">In Stock</span>
                    </div>
                    <div
                      className="mb-2 p-2 d-flex flex-column gap-2 me-2"
                      style={{ width: "90%" }}
                    >
                      <div className="small font-weight-bold">Tailles</div>
                      <div className="row row-cols-1 row-cols-md-1 row-cols-lg-4 g-2">
                        {myArray.map(createButton)}
                      </div>
                    </div>
                    <div className="tpproduct-details__price mb-30 d-flex gap-2 justify-center">
                      {product.price_promo === 0 ? (
                        ""
                      ) : (
                        <span>{product.price_promo}Dh</span>
                      )}
                      {product.price_promo === 0 ? (
                        <span>{product.price}Dh</span>
                      ) : (
                        <del className="ml-4">{product.price}Dh</del>
                      )}
                    </div>
                    <div className="tpproduct-details__count d-flex align-items-center flex-wrap mb-25">
                      <div className="tpproduct-details__cart ml-20">
                        <button>
                          <i
                            className="fal fa-shopping-cart"
                            onClick={() => addToCart(product.id, selectedSize)}
                          />{" "}
                          Add To Cart
                        </button>
                      </div>
                      <div className="tpproduct-details__wishlist ml-20">
                        <Link href="#">
                          <i className="fal fa-heart" />
                        </Link>
                      </div>
                    </div>
                    <div className="tpproductdot mb-30">
                      <Link className="tpproductdot__variationitem" href="#">
                        <div className="tpproductdot__termshape">
                          <span className="tpproductdot__termshape-bg" />
                          <span className="tpproductdot__termshape-border" />
                        </div>
                      </Link>
                      <Link className="tpproductdot__variationitem" href="#">
                        <div className="tpproductdot__termshape">
                          <span className="tpproductdot__termshape-bg red-product-bg" />
                          <span className="tpproductdot__termshape-border red-product-border" />
                        </div>
                      </Link>
                      <Link className="tpproductdot__variationitem" href="#">
                        <div className="tpproductdot__termshape">
                          <span className="tpproductdot__termshape-bg orange-product-bg" />
                          <span className="tpproductdot__termshape-border orange-product-border" />
                        </div>
                      </Link>
                      <Link className="tpproductdot__variationitem" href="#">
                        <div className="tpproductdot__termshape">
                          <span className="tpproductdot__termshape-bg purple-product-bg" />
                          <span className="tpproductdot__termshape-border purple-product-border" />
                        </div>
                      </Link>
                    </div>
                    <div className="tpproduct-details__information tpproduct-details__categories">
                      <p>Categories:</p>
                      <span>
                        <Link href="#">{product.category_names}</Link>
                      </span>
                    </div>
                    <div className="tpproduct-details__information tpproduct-details__tags">
                      <p>Tags:</p>
                      <span>
                        <Link href="#">{product.genre}</Link>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-md-5">
                  <div className="tpproduct-details__condation">
                    <ul>
                      <li>
                        <div className="tpproduct-details__condation-item d-flex align-items-center">
                          <div className="tpproduct-details__condation-thumb">
                            <img
                              src="/assets/img/icon/product-det-1.png"
                              alt=""
                              className="tpproduct-details__img-hover"
                            />
                          </div>
                          <div className="tpproduct-details__condation-text">
                            <p>
                              Free Shipping apply to all
                              <br />
                              orders over 500 Dh
                            </p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="tpproduct-details__condation-item d-flex align-items-center">
                          <div className="tpproduct-details__condation-thumb">
                            <img
                              src="/assets/img/icon/product-det-2.png"
                              alt=""
                              className="tpproduct-details__img-hover"
                            />
                          </div>
                          <div className="tpproduct-details__condation-text">
                            <p>
                              Guranteed 100% Organic
                              <br />
                              from natural farmas
                            </p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="tpproduct-details__condation-item d-flex align-items-center">
                          <div className="tpproduct-details__condation-thumb">
                            <img
                              src="/assets/img/icon/product-det-3.png"
                              alt=""
                              className="tpproduct-details__img-hover"
                            />
                          </div>
                          <div className="tpproduct-details__condation-text">
                            <p>
                              1 Day Returns if you change
                              <br />
                              your mind
                            </p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* product-area-end */}
          {/* product-details-area-start */}
          <div className="product-details-area">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="tpproduct-details__navtab mb-60">
                    <div className="tpproduct-details__nav mb-30">
                      <ul
                        className="nav nav-tabs pro-details-nav-btn"
                        id="myTabs"
                        role="tablist"
                      >
                        <li
                          className="nav-item"
                          onClick={() => handleOnClick(1)}
                        >
                          <button
                            className={
                              activeIndex == 1
                                ? "nav-links active"
                                : "nav-links"
                            }
                          >
                            Description
                          </button>
                        </li>
                        <li
                          className="nav-item"
                          onClick={() => handleOnClick(2)}
                        >
                          <button
                            className={
                              activeIndex == 2
                                ? "nav-links active"
                                : "nav-links"
                            }
                          >
                            Additional information
                          </button>
                        </li>
                        <li
                          className="nav-item"
                          onClick={() => handleOnClick(3)}
                        >
                          <button
                            className={
                              activeIndex == 3
                                ? "nav-links active"
                                : "nav-links"
                            }
                          >
                            Reviews (2)
                          </button>
                        </li>
                      </ul>
                    </div>
                    <div
                      className="tab-content tp-content-tab"
                      id="myTabContent-2"
                    >
                      <div
                        className={
                          activeIndex == 1
                            ? "tab-para tab-pane fade show active"
                            : "tab-para tab-pane fade"
                        }
                      >
                        <p className="mb-30">{product.description}</p>
                      </div>
                      <div
                        className={
                          activeIndex == 2
                            ? "tab-pane fade show active"
                            : "tab-pane fade"
                        }
                      >
                        <div className="product__details-info table-responsive">
                          <table className="table table-striped">
                            <tbody>
                              <tr>
                                <td className="add-info">Weight</td>
                                <td className="add-info-list"> 2 lbs</td>
                              </tr>
                              <tr>
                                <td className="add-info">Dimensions</td>
                                <td className="add-info-list">
                                  {" "}
                                  12 × 16 × 19 in
                                </td>
                              </tr>
                              <tr>
                                <td className="add-info">Product</td>
                                <td className="add-info-list">
                                  {" "}
                                  Purchase this product on rag-bone.com
                                </td>
                              </tr>
                              <tr>
                                <td className="add-info">Color</td>
                                <td className="add-info-list"> Gray, Black</td>
                              </tr>
                              <tr>
                                <td className="add-info">Size</td>
                                <td className="add-info-list"> S, M, L, XL</td>
                              </tr>
                              <tr>
                                <td className="add-info">Model</td>
                                <td className="add-info-list"> Model </td>
                              </tr>
                              <tr>
                                <td className="add-info">Shipping</td>
                                <td className="add-info-list">
                                  {" "}
                                  Standard shipping: $5,95L
                                </td>
                              </tr>
                              <tr>
                                <td className="add-info">Care Info</td>
                                <td className="add-info-list">
                                  {" "}
                                  Machine Wash up to 40ºC/86ºF Gentle Cycle
                                </td>
                              </tr>
                              <tr>
                                <td className="add-info">Brand</td>
                                <td className="add-info-list"> Kazen</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div
                        className={
                          activeIndex == 3
                            ? "tab-pane fade show active"
                            : "tab-pane fade"
                        }
                      >
                        <div className="product-details-review">
                          <h3 className="tp-comments-title mb-35">
                            3 reviews for “Wide Cotton Tunic extreme hammer”
                          </h3>
                          <div className="latest-comments mb-55">
                            <ul>
                              <li>
                                <div className="comments-box d-flex">
                                  <div className="comments-avatar mr-25">
                                    <img
                                      src="/assets/img/shop/reviewer-01.png"
                                      alt=""
                                    />
                                  </div>
                                  <div className="comments-text">
                                    <div className="comments-top d-sm-flex align-items-start justify-content-between mb-5">
                                      <div className="avatar-name">
                                        <b>Siarhei Dzenisenka</b>
                                        <div className="comments-date mb-20">
                                          <span>March 27, 2018 9:51 am</span>
                                        </div>
                                      </div>
                                      <div className="user-rating">
                                        <ul>
                                          <li>
                                            <Link href="#">
                                              <i className="fas fa-star" />
                                            </Link>
                                          </li>
                                          <li>
                                            <Link href="#">
                                              <i className="fas fa-star" />
                                            </Link>
                                          </li>
                                          <li>
                                            <Link href="#">
                                              <i className="fas fa-star" />
                                            </Link>
                                          </li>
                                          <li>
                                            <Link href="#">
                                              <i className="fas fa-star" />
                                            </Link>
                                          </li>
                                          <li>
                                            <Link href="#">
                                              <i className="fal fa-star" />
                                            </Link>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                    <p className="m-0">
                                      This is cardigan is a comfortable warm
                                      classic piece. Great to layer with a light
                                      top and you can dress up or down given the
                                      jewel buttons. I'm 5'8” 128lbs a 34A and
                                      the Small fit fine.
                                    </p>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div className="comments-box d-flex">
                                  <div className="comments-avatar mr-25">
                                    <img
                                      src="/assets/img/shop/reviewer-02.png"
                                      alt=""
                                    />
                                  </div>
                                  <div className="comments-text">
                                    <div className="comments-top d-sm-flex align-items-start justify-content-between mb-5">
                                      <div className="avatar-name">
                                        <b>Tommy Jarvis </b>
                                        <div className="comments-date mb-20">
                                          <span>March 27, 2018 9:51 am</span>
                                        </div>
                                      </div>
                                      <div className="user-rating">
                                        <ul>
                                          <li>
                                            <Link href="#">
                                              <i className="fas fa-star" />
                                            </Link>
                                          </li>
                                          <li>
                                            <Link href="#">
                                              <i className="fas fa-star" />
                                            </Link>
                                          </li>
                                          <li>
                                            <Link href="#">
                                              <i className="fas fa-star" />
                                            </Link>
                                          </li>
                                          <li>
                                            <Link href="#">
                                              <i className="fas fa-star" />
                                            </Link>
                                          </li>
                                          <li>
                                            <Link href="#">
                                              <i className="fal fa-star" />
                                            </Link>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                    <p className="m-0">
                                      This is cardigan is a comfortable warm
                                      classic piece. Great to layer with a light
                                      top and you can dress up or down given the
                                      jewel buttons. I'm 5'8” 128lbs a 34A and
                                      the Small fit fine.
                                    </p>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div className="comments-box d-flex">
                                  <div className="comments-avatar mr-25">
                                    <img
                                      src="/assets/img/shop/reviewer-03.png"
                                      alt=""
                                    />
                                  </div>
                                  <div className="comments-text">
                                    <div className="comments-top d-sm-flex align-items-start justify-content-between mb-5">
                                      <div className="avatar-name">
                                        <b>Johnny Cash</b>
                                        <div className="comments-date mb-20">
                                          <span>March 27, 2018 9:51 am</span>
                                        </div>
                                      </div>
                                      <div className="user-rating">
                                        <ul>
                                          <li>
                                            <Link href="#">
                                              <i className="fas fa-star" />
                                            </Link>
                                          </li>
                                          <li>
                                            <Link href="#">
                                              <i className="fas fa-star" />
                                            </Link>
                                          </li>
                                          <li>
                                            <Link href="#">
                                              <i className="fas fa-star" />
                                            </Link>
                                          </li>
                                          <li>
                                            <Link href="#">
                                              <i className="fas fa-star" />
                                            </Link>
                                          </li>
                                          <li>
                                            <Link href="#">
                                              <i className="fal fa-star" />
                                            </Link>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                    <p className="m-0">
                                      This is cardigan is a comfortable warm
                                      classic piece. Great to layer with a light
                                      top and you can dress up or down given the
                                      jewel buttons. I'm 5'8” 128lbs a 34A and
                                      the Small fit fine.
                                    </p>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div className="product-details-comment">
                            <div className="comment-title mb-20">
                              <h3>Add a review</h3>
                              <p>
                                Your email address will not be published.
                                Required fields are marked*
                              </p>
                            </div>
                            <div className="comment-rating mb-20 d-flex">
                              <span>Overall ratings</span>
                              <ul>
                                <li>
                                  <Link href="#">
                                    <i className="fas fa-star" />
                                  </Link>
                                </li>
                                <li>
                                  <Link href="#">
                                    <i className="fas fa-star" />
                                  </Link>
                                </li>
                                <li>
                                  <Link href="#">
                                    <i className="fas fa-star" />
                                  </Link>
                                </li>
                                <li>
                                  <Link href="#">
                                    <i className="fas fa-star" />
                                  </Link>
                                </li>
                                <li>
                                  <Link href="#">
                                    <i className="fal fa-star" />
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            <div className="comment-input-box">
                              <form action="#">
                                <div className="row">
                                  <div className="col-xxl-12">
                                    <div className="comment-input">
                                      <textarea placeholder="Your review..." />
                                    </div>
                                  </div>
                                  <div className="col-xxl-6">
                                    <div className="comment-input">
                                      <input
                                        type="text"
                                        placeholder="Your Name*"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-xxl-6">
                                    <div className="comment-input">
                                      <input
                                        type="email"
                                        placeholder="Your Email*"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-xxl-12">
                                    <div className="comment-submit">
                                      <button
                                        type="submit"
                                        className="tp-btn pro-submit"
                                      >
                                        Submit
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* product-details-area-end */}
          {/* related-product-area-start */}
          <div className="related-product-area pt-65 pb-50 related-product-border">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-sm-6">
                  <div className="tpsection mb-40">
                    <h4 className="tpsection__title">Related Products</h4>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="tprelated__arrow d-flex align-items-center justify-content-end mb-40">
                    <div className="tprelated__prv">
                      <i className="far fa-long-arrow-left" />
                    </div>
                    <div className="tprelated__nxt">
                      <i className="far fa-long-arrow-right" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-container related-product-active">
                <Swiper {...swiperOptions}>
                  {productSimilaire?.map((item) => {
                    const images = JSON.parse(item.images); // Parse the images string into an array
                    const firstImage = images[0];
                    const secondImage = images[1];

                    return (
                      <SwiperSlide key={item.id}>
                        <div className="tpproduct pb-15 mb-30">
                          <div className="tpproduct__thumb p-relative">
                            <Link href="/shop-details-2">
                              <img
                                src={`${config_url}/images/${firstImage}`}
                                alt="product-thumb"
                              />
                              <img
                                className="product-thumb-secondary"
                                src={`${config_url}/images/${secondImage}`}
                                alt="product-thumb-secondary"
                              />
                            </Link>
                            <div className="tpproduct__thumb-action">
                              <Link className="comphare" href="#">
                                <i className="fal fa-exchange" />
                              </Link>
                              <Link className="quckview" href="#">
                                <i className="fal fa-eye" />
                              </Link>
                              <Link className="wishlist" href="/wishlist">
                                <i className="fal fa-heart" />
                              </Link>
                            </div>
                          </div>
                          <div className="tpproduct__content">
                            <h3 className="tpproduct__title">
                              <Link href="/shop-details">{item.name}</Link>
                            </h3>
                            <div className="tpproduct__priceinfo p-relative">
                              <div className="tpproduct__priceinfo-list">
                                <span>{item.price}.00 Dh</span>
                              </div>
                              <div className="tpproduct__cart">
                                <Link href="/cart">
                                  <i className="fal fa-shopping-cart" />
                                  Add To Cart
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
