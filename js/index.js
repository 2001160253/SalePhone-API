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
      item.quantity
    );
  });
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
        <p class="price"> ${numberWithCommas( item.price)} vnđ</p>
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
      addCart(item);
    });
  });
};

const addCart = (product) => {
  if (product.quantity > 0) {
    const index = productCart.findIndex((item) => {
      return Number(item.product.id) === Number(product.id);
    });

    if (index !== -1) {
      productCart[index].quantity += 1;
    } else {
      productCart = [...productCart, { product, quantity: 1 }];
    }

    renderCart(productCart);
  }
  saveCart();
};

const renderCart = (data) => {
  if (data) {
    let cartHTML = "";

    for (let item of data) {
      cartHTML += `
      <tr class="item">
      <td class="item-img">
        <img src=${item.product.img} alt=${item.product.name} />
      </td>
      <td class="item-name">${item.product.name}</td>
      <td style="width: calc(100%/8); font-size:15px">${numberWithCommas(item.product.price)}</td>
      <td class="item-quantity">
        <button class=" decreaseQuantity">-</button>
        <span> ${item.quantity}</span>
        <button class="ascendingQuantity">+</button>
      </td>
      <td class="item-price">${numberWithCommas(item.product.price * item.quantity)}</td>
      <td><button class="item-delete deleteProduct">X</button></td>
    </tr>
      `;
    }
    document.querySelector(".table-content").innerHTML = cartHTML;

    let deleteItem = document.querySelectorAll(".deleteProduct");
    let ascendingItem = document.querySelectorAll(".ascendingQuantity");
    let decreaseItem = document.querySelectorAll(".decreaseQuantity");
    const total = productCart.reduce((total, item) => {
      return total + item.quantity * item.product.price;
    }, 0);
    const formatTotal=numberWithCommas(total)
    document.querySelector("#totalPrice").innerHTML = formatTotal;

    productCart.forEach((item, index) => {
      deleteItem[index].addEventListener("click", () => {
        deleteProduct(item.product.id);
      });
      ascendingItem[index].addEventListener("click", () => {
        ascendingQuantity(item.product.id, 1);
      });
      decreaseItem[index].addEventListener("click", () => {
        decreaseQuantity(item.product.id, 1);
      });
    });
  }
  saveCart();
};
//decreaseQuantity
const decreaseQuantity = (id, value) => {
  const product = productCart.map((item) => {
    if (item.product.id === id) {
      return { product: item.product, quantity: item.quantity - value };
    }
    return item;
  });
  productCart = product;
  renderCart(productCart);
};
//ascendingQuantity
const ascendingQuantity = (id, value) => {
  const product = productCart.map((item) => {
    if (item.product.id === id) {
      return { product: item.product, quantity: item.quantity + value };
    }
    return item;
  });
  productCart = product;
  renderCart(productCart);
};

//deleteProduct
const deleteProduct = (id) => {
  const item = productCart.filter((item) => {
    return item.product.id !== id;
  });
  productCart = item;
  renderCart(productCart);
  saveCart();
};
//pay
let pay = document.querySelector(".pay");

pay.addEventListener("click", () => {
  productCart = [];
  renderCart(productCart);
});
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

//local storage
const saveCart = () => {
  const cartsListJSON = JSON.stringify(productCart);
  localStorage.setItem("list", cartsListJSON);
};
const getCart = () => {
  let cartsListJSON = localStorage.getItem("list");
  cartsListJSON = JSON.parse(cartsListJSON);
  if (cartsListJSON) {
    productCart = cartsListJSON.map((item) => {
      return item;
    });
  }
  renderCart(productCart);
};
getCart();

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
