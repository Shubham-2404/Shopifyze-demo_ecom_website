let userInfo = document.querySelector("#userInfo");
let sidebar = document.querySelector("#sidebar");
let close = document.querySelector(".close");
let oneUser = JSON.parse(localStorage.getItem("oneUser"));
let user = document.querySelector(".currentUser");
let subuser = document.querySelector(".currentUser2");
let userName = document.querySelector("#userName");
let details = document.querySelector("#details");
let maleContainer = document.querySelector("#product1");
let prodCount = document.querySelector("#prodCount");
let cartStorage = [];
let data = JSON.parse(localStorage.getItem("userData"));
var productInfo = document.querySelector(".pro-container");
let userMail = document.querySelector(".userMail");
let logout = document.querySelector("#logout");

if (oneUser) {
  if (oneUser.userCart) {
    cartStorage = oneUser.userCart;
    // prodCount.innerHTML = cartStorage.length;
  }
}

// Sidebar details
if (oneUser) {
  console.log(oneUser);
  user.innerHTML = oneUser.userFirstName;
  userMail.innerHTML = oneUser.userEmail;
  subuser.innerHTML = oneUser.userFirstName + " " + oneUser.userLastName;
  logout.addEventListener("click", () => {
    localStorage.removeItem("oneUser");
  });
} else {
  user.innerHTML = null;
  userMail.innerHTML = null;
  subuser.innerHTML = `<a href="./SignIn.html">Please login</a>`;
  logout.innerHTML = null;
}

// Main page
let getData = async function () {
  try {
    let data = await fetch("./data.json");
    let finalData = await data.json();

    // finalData.forEach((v) => {
    //   let { image, title, price } = v;
    //   productInfo.innerHTML += `
    //   <div class="pro" id="${v.id}">
    //     <img src=${image} alt="">
    //     <div class="des">
    //         <span>addidas</span>
    //         <h5>${title}</h5>
    //         <div class="star">
    //             <i class="fas fa-star"></i>
    //             <i class="fas fa-star"></i>
    //             <i class="fas fa-star"></i>
    //             <i class="fas fa-star"></i>
    //             <i class="fas fa-star"></i>
    //         </div>
    //     </div>
    //     <h6>$${price}</h6>
    //      <i class="fal fa-shopping-cart cart"></i>
    //   </div>`;
    // });

    // Add event listeners to the cart buttons
    let allBtn = document.querySelectorAll(".cart");
    allBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (oneUser) {
          // Get product ID from the parent element
          let productId = btn.parentElement.parentElement.id;
          console.log(productId);
          // Remove duplicate products
          cartStorage = cartStorage.filter((e) => e.id != productId);

          // Filter selected product
          let oneProduct = finalData.find((e) => e.id == productId);
          cartStorage.push(oneProduct);

          // Update product count
          prodCount.innerHTML = cartStorage.length;
          oneUser.userCart = cartStorage;

          // Update local storage
          localStorage.setItem("oneUser", JSON.stringify(oneUser));

          // Update user data in local storage
          data = data.filter((e) => e.userMobile != oneUser.userMobile);
          data.push(oneUser);
          localStorage.setItem("userData", JSON.stringify(data));
        } else {
          alert("Login first to add the item into cart.");
          window.location.href = "./SignIn.html"; // Redirect to login page
        }
      });
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
    productInfo.innerHTML += `
    <div class="pro" id="${e.productId}">
        <img src=${e.productImageURLs[0]} alt="">
        <div class="des">
            <span>addidas</span>
            <h5>${e.name}</h5>
            <div class="star">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
            </div>
        </div>
        <h6>₹${e.price}</h6>
       <i class="fal fa-shopping-cart cart"></i> 
    </div>`;
  });

  // Female data
  let femaleData = allData.filter((e) => e.category == "women");
  femaleData.forEach((e) => {
    productInfo.innerHTML += `
    <div class="pro" id="${e.productId}">
        <img src=${e.productImageURLs[0]} alt="">
        <div class="des">
            <span>addidas</span>
            <h5>${e.name}</h5>
            <div class="star">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
            </div>
        </div>
        <h6>₹${e.price}</h6>
        <i class="fal fa-shopping-cart cart"></i> 
    </div>`;
  });

  // Kids data
  let kidsData = allData.filter((e) => e.category == "kids");
  kidsData.forEach((e) => {
    productInfo.innerHTML += `
    <div class="pro" id="${e.productId}">
       <img src="${e.productImageURLs[0]}" alt="" />
        <div class="des">
           <span>addidas</span>
            <h5>${e.name}</h5>
           <div class="star">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
        </div>
    </div>
    <h6>₹${e.price}</h6>
    <i class="fal fa-shopping-cart cart"></i>
  </div>
`;
  });

  // Add event listeners to the cart buttons
  let allBtn = document.querySelectorAll(".cart");
  allBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (oneUser) {
        // Get product ID from the parent element
        let productId = btn.parentElement.id;

        // Remove duplicate products
        cartStorage = cartStorage.filter((e) => e.productId != productId);

        // Filter selected product
        let oneProduct = allData.find((e) => e.productId == productId);
        cartStorage.push(oneProduct);

        // Update product count
        // prodCount.innerHTML = cartStorage.length;
        oneUser.userCart = cartStorage;

        function tempAlert(msg, duration) {
          var el = document.createElement("div");
          el.setAttribute(
            "style",
            "position:absolute;top:20%;left:50%;background-color:orange;color:black"
          );
          el.innerHTML = msg;
          setTimeout(function () {
            el.parentNode.removeChild(el);
          }, duration);
          document.body.appendChild(el);
        }

        tempAlert("Item has been added to the cart", 2000)

        // Update local storage
        localStorage.setItem("oneUser", JSON.stringify(oneUser));

        // Update user data in local storage
        data = data.filter((e) => e.userMobile != oneUser.userMobile);
        data.push(oneUser);
        localStorage.setItem("userData", JSON.stringify(data));
        cartHaveItem();
      } else {
        alert("Login first to add the item into cart.");
        window.location.href = "./SignIn.html"; // Redirect to login page
      }
    });
  });
}

function cartHaveItem() {
  let addedItem = document.querySelector(".shopping");
  if (oneUser && oneUser.userCart.length > 0 || oneUser && oneUser.userCart == null) {
    addedItem.style.background = "orang";
  } else {
    addedItem.style.background = "#e3e6f3";
  }
}
cartHaveItem();

mainfun();
