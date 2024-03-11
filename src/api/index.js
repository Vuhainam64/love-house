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
from "./Account.js";

//news
export {
  createNews,
  getNewsById,
  getAllNews,
  updateNews,
  deleteNewsById,
}
from "./News.js";

//blog
export {
  createBlog,
  getBlogById,
  getAllBlog,
  updateBlog,
  deleteBlogById,
}
from "./Blog.js";

//project
export {
  createSampleProject,
  deleteSampleProjectById,
  getAllSampleProjects,
  getSampleProjectById,
  updateSampleProject,
}
from "./SampleProject.js";

//project
export {
  configProject,
  getAllProjects,
  createProjectByUser,
  getProjectById,
}
from "./Project.js";

//role
export {
  assignRoleForUser,
  getAllRoles,
  removeRoleForUser
}
from "./Role.js";

//supplier
export {
  createSupplier,
  deleteSupplierById,
  getAllSuppliers,
  getSupplierById,
  importSupplierFromExcelSheet,
  updateSupplier,
  getSupplierTemplate
}
from "./Supplier.js";

//SupplierQuotatio
export {
  deleteSupplierQuotationById,
  getAllSupplierQuotations,
  getAllSupplierQuotationsByMonth,
  getSupplierQuotationTemplate,
  uploadSupplierQuotationWithExcelFile,
  getUploadSupplierQuotationWithExcelFileError,
  validExcelFile
}
from "./SupplierPriceQuotation.js";

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
from "./SupplierPriceDetail.js";

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
from "./Material.js";

export {
  getAllExportInventory,
  getAllImportInventory,
  getAllInventory,
  getImportMaterialTemplate,
  importMaterialWithExcel,
  getImportMaterialWithExcelError,
  validInventoryExcelFile,
  getAllExportByQuotationDetailId
}
from "./ImportExportInventory.js";

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
from "./ExportPriceMaterial.js";

export {
  createListQuotationDetail,
  deleteQuotationDetailById,
  getAllApprovedQuotationDetailsByProjectId,
  getQuotationDetailById,
  getQuotationDetailByQuotationId,
  updateQuotationDetail
}
from "./QuotationDetail.js";

export {
  getRemainQuantityForFulfillment,
  updateProgressConstructionMaterial,
  createProgressConstructionMaterial
}
from "./ProgressConstructionMaterial.js"