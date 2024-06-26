//! Fetch the data from server

let productInfo = document.querySelector(".pro-container");
console.log(productInfo);

let getData = async function () {
  try {
    let data = await fetch("./data.json");
    let finalData = await data.json();

    finalData.map((v, i) => {
      let { image, title, price } = v;
      productInfo.innerHTML += ` <div class="pro">
                <img src=${image} alt="">
                <div class="des">
                    <span>addidas</span>
                    <h5>${title}</h5>
                    <div class="star"></div>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <h6>$${price}</h6>
                <a href="#"> <i class="fal fa-shopping-cart cart"></i> </a>
            </div>`;
    });
  } catch (error) {
    console.log(error);
  }
};

getData();
