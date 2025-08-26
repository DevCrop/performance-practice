import { products } from "./products.js";
import { renderProducts } from "./rendering.js";

let productModulePromise;

const loadProductModule = () => {
  if (!productModulePromise) {
    productModulePromise = import("./product-management.js");
  }
  return productModulePromise;
};

const addProduct = async (event) => {
  try {
    const mod = await loadProductModule();
    mod.addProduct(event);
  } catch (error) {
    console.error("Failed to load product-management.js:", error);
  }
};

const deleteProduct = async (productId) => {
  try {
    const mode = await loadProductModule();
    mode.deleteProduct(productId);
  } catch (error) {
    console.error("Failed to load product-management.js", error);
  }
};

function initProducts() {
  renderProducts(products, deleteProduct);
}

const addProductForm = document.getElementById("new-product");

initProducts();

addProductForm.addEventListener("submit", addProduct);
