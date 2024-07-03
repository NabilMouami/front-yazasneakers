import Link from "next/link";
import Image from "next/image";
import CartShow from "../elements/CartShow";
import WishListShow from "../elements/WishListShow";

export default function HeaderSticky({
  scroll,
  isCartSidebar,
  handleCartSidebar,
}) {
  return (
    <>
      <div
        id="header-sticky"
        className={`logo-area tp-sticky-one mainmenu-5 ${
          scroll ? "header-sticky" : ""
        }`}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-2 col-lg-3">
              <div className="logo">
                <Link href="/">
                  <Image
                    src="/assets/img/logo/logo.webp"
                    alt="yazasneakers"
                    height={100}
                    width={100}
                  />
                </Link>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="main-menu">
                <nav>
                  <ul>
                    <li className="ml-40">
                      <Link href="/">Home</Link>
                    </li>
                    <li className="ml-40">
                      <Link href="/shop-2">Shop</Link>
                    </li>
                    <li className="ml-40">
                      <Link href="/cart">Cart</Link>
                    </li>
                    <li className="ml-40">
                      <Link href="/blog">Blog</Link>
                    </li>
                    <li className="ml-40">
                      <Link href="/contact">Contact</Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="col-xl-4 col-lg-9">
              <div className="header-meta-info d-flex align-items-center justify-content-end">
                <div className="header-meta__social  d-flex align-items-center">
                  <button
                    className="header-cart p-relative tp-cart-toggle"
                    onClick={handleCartSidebar}
                  >
                    <i className="fal fa-shopping-cart" />
                    <CartShow />
                  </button>
                  <Link href="/sign-in">
                    <i className="fal fa-user" />
                  </Link>
                  <Link
                    href="/wishlist"
                    className="header-cart p-relative tp-cart-toggle"
                  >
                    <i className="fal fa-heart" />
                    <WishListShow />
                  </Link>
                </div>
                <div className="header-meta__search-5 ml-25">
                  <div className="header-search-bar-5">
                    <form action="#">
                      <div className="search-info-5 p-relative">
                        <button className="header-search-icon-5">
                          <i className="fal fa-search" />
                        </button>
                        <input type="text" placeholder="Search products..." />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
