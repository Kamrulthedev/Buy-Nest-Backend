import { catchAsync } from "../../../shared/catchAsync";
import { pick } from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { ProductFilterableFields } from "./constent";
import { ProductsServices } from "./product.service";

const CreateProductDB = catchAsync(async (req, res) => {
  const result = await ProductsServices.CreateProduct(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Create Product Successfully!",
    data: result,
  });
});



const GetAllProductsDB = catchAsync(async (req, res) => {
  const filter = pick(req.query, ProductFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await ProductsServices.GetAllProducts(filter, options);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Products Data fetched Successfully!",
    meta: result.meta,
    data: result.data,
  });
});

const GetAllProductsWithVendorDB = catchAsync(async (req, res) => {
  const { id } = req.params
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await ProductsServices.GetAllProductsWithVendor(id, options);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Vendor Products Data fetched Successfully!",
    data: result
  });
});



const GetByProductIdDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductsServices.GetByProductId(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Procuts By Id Data Fatched Successfully!",
    data: result,
  });
});


const UpdateProductIdDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductsServices.UpdateProductId(id, req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Update Product By Id Successfully!",
    data: result,
  });
});



const DeleteProductIdDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductsServices.DeleteProductId(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Delete Prodcut By Id Successfully!",
    data: result,
  });
});


export const ProductsControllars = {
  CreateProductDB,
  GetAllProductsDB,
  GetByProductIdDB,
  GetAllProductsWithVendorDB,
  DeleteProductIdDB,
  UpdateProductIdDB
};
