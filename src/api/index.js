export const baseURL = "https://hcqs-backend.azurewebsites.net";
export const usertoken = localStorage.accessToken;

//account
export {
  createAccount,
  getAccountById,
  getAllAccount,
  getNewToken,
  activeAccount,
  googleCallback,
  loginWithEmailPass,
  sendOTP,
  sendResetPassOTP,
  submitOTPResetPass,
  updateAccount
}
from "./Account";

//news
export {
  createNews,
  getNewsById,
  getAllNews,
  updateNews,
  deleteNewsById,
}
from "./News";

//blog
export {
  createBlog,
  getBlogById,
  getAllBlog,
  updateBlog,
  deleteBlogById,
}
from "./Blog";

//project
export {
  createSampleProject,
  deleteSampleProjectById,
  getAllSampleProjects,
  getSampleProjectById,
  updateSampleProject,
}
from "./SampleProject";

//project
export {
  configProject,
  getAllProjects,
  createProjectByUser,
  getProjectById,
}
from "./Project";

//role
export {
  assignRoleForUser,
  getAllRoles,
  removeRoleForUser
}
from "./Role";

//supplier
export {
  createSupplier,
  deleteSupplierById,
  getAllSuppliers,
  getSupplierById,
  importSupplierFromExcelSheet,
  updateSupplier,
}
from "./Supplier";

//SupplierQuotatio
export {
  deleteSupplierQuotationById,
  getAllSupplierQuotations,
  getAllSupplierQuotationsByMonth,
  getSupplierQuotationTemplate,
  uploadSupplierQuotationWithExcelFile,
  getUploadSupplierQuotationWithExcelFileError
}
from "./SupplierPriceQuotation";

//SupplierPriceDetail
export {
  getAllQuotationPrices,
  getLatestQuotationPriceByMaterialId,
  getLatestQuotationPriceByMaterialName,
  getLatestQuotationPriceBySupplierId,
  getLatestQuotationPriceBySupplierName,
  getQuotationPriceByMaterialId,
  getQuotationPriceByMaterialName,
  getQuotationPriceBySupplierId,
  getQuotationPriceBySupplierName
}
from "./SupplierPriceDetail";

//Material
export {
  createMaterial,
  deleteMaterialById,
  getAllMaterials,
  getMaterialById,
  getMaterialByName,
  updateMaterial,
  updateMaterialQuantity
}
from "./Material";

export {
  getAllExportInventory,
  getAllImportInventory,
  getAllInventory,
  getImportMaterialTemplate,
  importMaterialWithExcel,
  getImportMaterialWithExcelError
}
from "./ImportExportInventory";

export {
  createExportPriceMaterial,
  deleteExportPriceMaterialById,
  getAllExportPriceMaterial,
  getExportPriceMaterialById,
  getExportPriceMaterialTemplate,
  getLatestExportPriceMaterial,
  importExportPriceMaterialFromExcelSheet,
  updateExportPriceMaterial
}
from "./ExportPriceMaterial";