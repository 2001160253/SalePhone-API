import { Product } from "../model/product.js";

let productList = [];

const fetchProducts = async () => {
  try {
    const res = await axios({
      url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products",
      method: "GET",
    });
    console.log(res.data);
    productList = mapProduct(res.data);
    console.log(productList);
    renderProduct(productList);
    return res.data;
  } catch (err) {
    console.log("loi api");
  }
};

fetchProducts();

const mapProduct = (data) => {
  const result = data.map((item, index) => {
    return new Product(
      item.name,
      item.price,
      item.screen,
      item.backcamera,
      item.frontcamera,
      item.img,
      item.desc,
      item.type,
      item.id,
      item.quality
    );
  });
  return result;
};

const renderProduct = (data) => {
  let dataHTML = "";

  data.forEach((item, index) => {
    dataHTML += item.renderMain();
  });

  document.querySelector(".row").innerHTML = dataHTML;
};

const filterByTypeSamsung = function () {
  const vl = document.querySelector(".form-select").value;
  const result = [];
  productList.forEach((item, index) => {
    console.log(item.type);
    if (item.type === "Samsung") {
      result.push(productList[index]);
    }
  });
  renderProduct(result);
};

const filterByTypeIphone = function () {
  const vl = document.querySelector(".form-select").value;
  const result = [];
  productList.forEach((item, index) => {
    console.log(item.type);
    if (item.type === "Iphone") {
      result.push(productList[index]);
    }
  });
  renderProduct(result);
};

const filterByTypeAll = function () {
  const vl = document.querySelector(".form-select").value;
  const result = [];
  productList.forEach((item, index) => {
    console.log(item.type);
    result.push(productList[index]);
  });
  renderProduct(result);
};
const selectProduct = document.querySelector(".form-select");

selectProduct.addEventListener("change", () => {
  if (parseInt(selectProduct.value) === 1) {
    filterByTypeSamsung();
  } else if (parseInt(selectProduct.value) === 2) {
    filterByTypeIphone();
  } else {
    filterByTypeAll();
  }
});
