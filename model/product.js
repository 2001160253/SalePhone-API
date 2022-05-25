export class Product {
  constructor(
    name,
    price,
    screen,
    backcamera,
    frontcamera,
    img,
    desc,
    type,
    id,
    quality
  ) {
    this.name = name;
    this.price = price;
    this.screen = screen;
    this.backcamera = backcamera;
    this.frontcamera = frontcamera;
    this.img = img;
    this.desc = desc;
    this.type = type;
    this.id = id;
    this.quality = quality;
  }

  total() {}

  renderMain() {
    return ` <div class="col col-lg-3">
        <div class="item">
          <img
            src=${this.img}
            alt="img"
          />
          <div class="item-content">
            <h1 class="name">${this.name}</h1>
            <p class="price">${this.price} vnđ</p>
            <p class="sale"> 
            Còn 10/10 suất</p>
          </div>
        </div>
        </div>
`;
  }
}
