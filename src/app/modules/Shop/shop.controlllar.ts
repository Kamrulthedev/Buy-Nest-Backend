import { catchAsync } from "../../../shared/catchAsync";
import { pick } from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { ShopFilterableFields } from "./shop.constent";
import { ShopServices } from "./shop.service";



const GetAllShopsDB = catchAsync(async (req, res) => {
  const filter = pick(req.query, ShopFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await ShopServices.GetAllShops(filter, options);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Shop Data fetched Successfully!",
    meta: result.meta,
    data: result.data,
  });
});



const GetAllShopsCreateCartsDB = catchAsync(async (req, res) => {
    const result = await ShopServices.GetAllShopsCreateCarts();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Shop Data Fatched Successfully!",
      data: result,
    });
  });


const GetByShopIdDB = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ShopServices.GetByShopId(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Shop Data Fatched Successfully!",
      data: result,
    });
  });


const GetBywithVendorShopIdDB = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ShopServices.GetByWithVendorShopId(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Shop With Vendor Data Fatched Successfully!",
      data: result,
    });
  });



  const UdpateShop = async(id: string, data: any) =>{
    
  }


export const ShopsControllars = {
    GetAllShopsDB,
    GetByShopIdDB,
    GetBywithVendorShopIdDB,
    GetAllShopsCreateCartsDB
};
