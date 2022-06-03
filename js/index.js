import { Product } from "../model/product.js";

let productList = [];
let productCart = [];

//fetch
const fetchProducts = async () => {
  try {
    const res = await axios({
      url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products",
      method: "GET",
    });

    productList = mapProduct(res.data);

    renderProduct(productList);

    return res.data;
  } catch (err) {
    console.log("loi api");
  }
};

fetchProducts();

//map data
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
  console.log(result)
  return result;
};

//render product
const renderProduct = (data) => {
  let dataHTML = "";

  data.forEach((item, index) => {
    dataHTML += ` <div class="col col-lg-3">
    <div class="item" name>
      <img
        src=${item.img}
        alt="img"
      />
      <div class="item-content">
        <p class="sale">Giảm kịch sàn</p>
        <h1 class="name">${item.name}</h1>
        <p class="price">${item.price} vnđ</p>
        <button class="btnAddCart">Mua ngay</button>
      </div>
    </div>
  </div>
`;
  });

  document.querySelector(".row").innerHTML = dataHTML;

  let handleClick = document.querySelectorAll(".btnAddCart");
  data.forEach((item, index) => {
    handleClick[index].addEventListener("click", () => {
      console.log("Cki");
      addCart(item);
   
    });
  });
};


const addCart = (product) => {
  console.log("add cart parameter")
  console.log(product)
  console.log("product cart parameter")
  console.log(productCart)
  if (product.name) {
    const index = productCart.findIndex((item) => {
      return Number(item.product.id) === Number(product.id);
    });
    if (index !== -1) {
      productCart[index].quality += 1;
    } else {
      productCart = [...productCart, { product, quality: 1 }];
    }
    renderCart(productCart);
  }
};

const renderCart = (data) => {
  if (data) {
    let cartHTML = "";

    for (let item of data) {
      cartHTML += `
      <tr>
        <td>
          <img width="50px" height="50px" src=${item.product.img} alt=${item.product.name} />
        </td>
        <td>${item.product.name}</td>
        <td>${item.product.price}</td>
        <td>123<td>
      </tr>
      `;
    }
    document.querySelector(".table-content").innerHTML = cartHTML;
    console.log("ok");
  }
};
//filter by type
const filterByTypeSamsung = function () {
  const vl = document.querySelector(".form-select").value;
  const result = [];
  productList.forEach((item, index) => {
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
    result.push(productList[index]);
  });
  renderProduct(result);
};

//event
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
