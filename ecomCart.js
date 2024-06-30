let oneUser = JSON.parse(localStorage.getItem("oneUser"));
let data = JSON.parse(localStorage.getItem("userData"));
let userCart = oneUser ? oneUser.userCart : [];

let msg = document.querySelector("#message");
let container = document.querySelector("#cont");

if (oneUser) {
  msg.innerHTML = `Hi , ${oneUser.userFirstName}`;

  // Displaying products
  if (userCart.length != 0) {
    console.log(userCart);
    function displayProduct() {
      container.innerHTML = ""; // Clear container before displaying products
      userCart.map((e) => {
        container.innerHTML += `
          <div class="design" id="${e.productId}">
            <div><img src="${e.productImageURLs[0]}" alt="" /></div>
            <div>
              <h3>${e.name}</h3>
              <h2>${e.price}</h2>
            </div>
            <div><i class="fa-solid fa-trash"></i></div>
          </div>`;
      });
      attachDeleteEvents();
    }

    displayProduct();
  } else {
    container.innerHTML = `<div id="cartCont">
        <div id="cont">
          Your cart is empty back to <a href="./ecomMain.html">main page</a>
        </div>`;
  }

  // Attaching delete events
  function attachDeleteEvents() {
    let allDeleteBtn = document.querySelectorAll(".fa-trash");
    allDeleteBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        const productId = btn.parentElement.parentElement.id;
        console.log(productId);
        userCart = userCart.filter((e) => e.productId != productId);
        console.log(userCart);

        // Update oneUser and localStorage
        oneUser.userCart = userCart;
        localStorage.setItem("oneUser", JSON.stringify(oneUser));

        // Update data in localStorage
        data = data.map((user) => {
          if (user.userMobile === oneUser.userMobile) {
            return oneUser;
          }
          return user;
        });
        localStorage.setItem("userData", JSON.stringify(data));

        // Re-display products
        displayProduct();

        if(userCart.length == 0){
          container.innerHTML = `<div id="cartCont">
          <div id="cont">
            Your cart is empty back to <a href="./ecomMain.html">main page</a>
          </div>`;
        }
      });
    });
  }
}
