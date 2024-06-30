let username = document.querySelector("#userName");
let password = document.querySelector("#pass");
let loginbtn = document.querySelector("button");

let getData = JSON.parse(localStorage.getItem("userData")) || [];
console.log(getData);

loginbtn.addEventListener("click", (e) => {
  e.preventDefault();

  let currUser = getData.find((user) => {
    if (
      (user.userEmail == username.value &&
        user.userPassword == password.value) ||
      (user.userMobile == username.value && user.userPassword == password.value)
    ) {
      return user;
    }
    else{}
  });

  if (currUser) {
    let user = document.querySelector("#welcomemsg");
    user.innerHTML = `${currUser.userFirstName} welcome to the Shopifyze.`;
    let oneUser = localStorage.setItem("oneUser", JSON.stringify(currUser));
    setTimeout(() => {
      window.open("./Main.html", "_self");
    }, 1000);
  } else if (
    username.value == "shubhamdarekar@gmail.com" &&
    password.value == ""
  ) {
    alert("Please enter the password.");
  } else if (
    username.value == "shubhamdarekar@gmail.com" &&
    password.value != "shubham@123"
  ) {
    alert("Password is incorrect! try again.");
  } else if (username.value == "" && password.value == "shubham@123") {
    alert("Please enter the email or mobilenumber.");
  } else if (username.value == "" && password.value == "") {
    alert("Please enter the username and password.");
  } else {
    alert("Account not found.");
  }
});
