import express from "express";
import { UserRoutes } from "../modules/User/user.routes";
import { AuthRoutes } from "../modules/Auth/auth.routes";
import { VendorsRoutes } from "../modules/Vendor/vendor.route";
import { ShopsRoutes } from "../modules/Shop/shop.route";
import { PorductsRoutes } from "../modules/Product/product.route";
import { CustomerRoutes } from "../modules/Customer/customer.route";
import { CartRoutes } from "../modules/cart/cart.route";
import { CartItemsRoutes } from "../modules/cartItem/cartItem.route";



const router = express.Router();

const moduleRotes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes
  },
  {
    path: "/vendors",
    route: VendorsRoutes
  },
  {
    path: "/shops",
    route: ShopsRoutes
  },
  {
    path: "/products",
    route: PorductsRoutes
  },
  {
    path: "/customer",
    route: CustomerRoutes
  },
  {
    path: "/carts",
    route: CartRoutes
  },
  {
    path: "/cart",
    route: CartItemsRoutes
  }
];

moduleRotes.forEach(route => router.use(route.path, route.route));

export default router;
