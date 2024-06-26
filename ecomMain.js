let userInfo = document.querySelector("#userInfo");
let sidebar = document.querySelector("#sidebar");
let close = document.querySelector(".close");
let oneUser = JSON.parse(localStorage.getItem("oneUser"));
let user = document.querySelector("#user");
let userName = document.querySelector("#userName");
let details = document.querySelector("#details");
let maleContainer = document.querySelector("#product1");
let femaleContainer = document.querySelector("#femalecontainer");
let kidsContainer = document.querySelector("#kidscontainer");
let electronicsContainer = document.querySelector("#electronicscontainer");
let prodCount = document.querySelector("#prodCount");
let cartStorage = [];
let data = JSON.parse(localStorage.getItem("userData"));
var productInfo = document.querySelector(".pro-container");


if (oneUser) {
  if (oneUser.userCart) {
    cartStorage = oneUser.userCart;
    prodCount.innerHTML = cartStorage.length;
  }
}

// userInfo.addEventListener("click", () => {
//   sidebar.style.right = "0";
// });

// close.addEventListener("click", () => {
//   sidebar.style.right = "-100%";
// });

// Sidebar details
if (oneUser) {
  user.innerHTML = oneUser.userFirstName;
  userName.innerHTML = oneUser.userFirstName;
  details.innerHTML = `
    <h3>Mobile Number: ${oneUser.userMobile}</h3>
    <h3>Email: ${oneUser.userEmail}</h3>
    <a href="">Your cart</a>
    <a href="./ecomMain.html" id="logout"><button>Logout</button></a>`;
  let logout = document.querySelector("#logout");
  logout.addEventListener("click", () => {
    localStorage.removeItem("oneUser");
  });
}

// Main page
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


async function mainfun() {
  const loadingElement = document.getElementById("loading");
  const loadingError = document.querySelector(".pnf");

  // Show the loading indicator
  loadingElement.style.display = "block";
  productInfo.style.display = "none";
  loadingError.style.display = "none";
  
  try {
    let dataFromServer = await fetch(
      "https://www.shoppersstack.com/shopping/products/alpha"
    );
    let jsonData = await dataFromServer.json();
    console.log(jsonData);
    var allData = jsonData.data;
  } catch (error) {
    loadingError.style.display = "block";
    console.log(error);
  } finally {
    // Hide the loading indicator and show the product container

    loadingElement.style.display = "none";
    productInfo.style.display = "grid"; // Assuming you want to use grid layout
  }

  // Male data

  let maleData = allData.filter((e) => e.category == "men");
  maleData.forEach((e) => {
    let productInfo = document.querySelector(".pro-container");
    productInfo.innerHTML += `<div class="pro">
                <img src=${e.productImageURLs[0]} alt="">
                <div class="des">
                    <h5>${e.name}</h5>
                    <div class="star"></div>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <h6>$${e.price}</h6>
                <a href="#"> <i class="fal fa-shopping-cart cart"></i> </a>
            </div>`;
  });

 

  // Female data
  let femaleData = allData.filter((e) => e.category == "women");
  femaleData.forEach((e) => {
    let productInfo = document.querySelector(".pro-container");
    productInfo.innerHTML += `<div class="pro">
                <img src=${e.productImageURLs[0]} alt="">
                <div class="des">
                    <span>addidas</span>
                    <h5>${e.name}</h5>
                    <div class="star"></div>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <h6>$${e.price}</h6>
                <a href="#"> <i class="fal fa-shopping-cart cart"></i> </a>
            </div>`;
  });

  // Kids data
  let kidsData = allData.filter((e) => e.category == "kids");
  kidsData.forEach((e) => {
    let productInfo = document.querySelector(".pro-container");
    productInfo.innerHTML += `<div class="pro">
                <img src=${e.productImageURLs[0]} alt="">
                <div class="des">
                    <span>addidas</span>
                    <h5>${e.name}</h5>
                    <div class="star"></div>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <h6>$${e.price}</h6>
                <a href="#"> <i class="fal fa-shopping-cart cart"></i> </a>
            </div>`;
  });

  // Search functionality
  // let userInput = document.querySelector("#userInput");
  // let searchBtn = document.querySelector("#searchBtn");
  // let searchContainer = document.querySelector("#searchcontainer");

  // searchBtn.addEventListener("click", () => {
  //   searchContainer.innerHTML = "";
  //   if (userInput.value) {
  //     let searchProduct = allData.filter((e) =>
  //       e.name.toLowerCase().includes(userInput.value.toLowerCase())
  //     );
  //     if (searchProduct.length > 0) {
  //       searchProduct.forEach((e) => {
  //         searchContainer.innerHTML += `
  //           <div id="${e.productId}">
  //             <img src="${e.productImageURLs[0]}" alt="">
  //             <h5>${e.name}</h5>
  //             <h3>Price: ${e.price}</h3>
  //             <h3>Rating: ${e.rating}</h3>
  //             <button>Add to cart</button>
  //           </div>`;
  //       });
  //     } else {
  //       searchContainer.innerHTML = "Result not found";
  //     }
  //   } else {
  //     searchContainer.innerHTML = "Result not found";
  //   }
  // });

  // // Cart items
  // let allBtn = document.querySelectorAll("main button");
  // allBtn.forEach((btn) => {
  //   btn.addEventListener("click", () => {
  //     if (oneUser) {
  //       // Remove duplicate products
  //       cartStorage = cartStorage.filter(
  //         (e) => e.productId != btn.parentElement.id
  //       );

  //       // Filter selected product
  //       let oneProduct = allData.find(
  //         (e) => e.productId == btn.parentElement.id
  //       );
  //       cartStorage.push(oneProduct);

  //       // Update product count
  //       prodCount.innerHTML = cartStorage.length;
  //       oneUser.userCart = cartStorage;

  //       // Update local storage
  //       localStorage.setItem("oneUser", JSON.stringify(oneUser));

  //       // Update user data in local storage
  //       data = data.filter((e) => e.userMobile != oneUser.userMobile);
  //       data.push(oneUser);
  //       localStorage.setItem("userData", JSON.stringify(data));
  //     } else {
  //       alert("Login first to add the item into cart.");
  //       window.open("../HTML files/ecomSignin.html");
  //     }
  //   });
  // });
}

mainfun();
