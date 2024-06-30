const formData = document.getElementsByTagName("input");
let fName = formData[0];
let lName = formData[1];
let mobile = formData[2];
let mail = formData[3];
let pass = formData[4];
let cpass = formData[5];
let efname = document.querySelectorAll("span")[0];
let elname = document.querySelectorAll("span")[1];
let emobile = document.querySelectorAll("span")[2];
let email = document.querySelectorAll("span")[3];
let epass = document.querySelectorAll("span")[4];
let ecpass = document.querySelectorAll("span")[5];
let submitbtn = document.querySelector("button");
let storage = [];
let dataFromStorage = JSON.parse(localStorage.getItem("userData"));

if (dataFromStorage) {
  storage = dataFromStorage;
}

submitbtn.addEventListener("click", (e) => {
e.preventDefault();

  let flag = true;

  let rgex = /^[A-za-z]{1,15}$/;
  console.log(mail.value);

  //firstName validations
  if (fName.value == "") {
    efname.innerHTML = "*First name is required.";
    e.preventDefault();
    flag = false;
  } else if (rgex.test(fName.value)) {
    efname.innerHTML = "";
  } else {
    efname.innerHTML = "*Invalid first name";
    e.preventDefault();
    flag = false;
  }

  //lastname validation
  if (lName.value == "") {
    elname.innerHTML = "*Last name is required.";
    e.preventDefault();
    flag = false;
  } else if (rgex.test(lName.value)) {
    elname.innerHTML = "";
  } else {
    elname.innerHTML = "*Invalid last name";
    e.preventDefault();
    flag = false;
  }

  //mobile expression
  let norgex = /^[6-9][0-9]{9}$/;

  //mobilenumber validatiom
  if (mobile.value == "") {
    emobile.innerHTML = "*Mobile number is required";
    e.preventDefault();
    flag = false;
  } else if (norgex.test(mobile.value)) {
    emobile.innerHTML = "";
  } else {
    emobile.innerHTML = "*Invalid mobile number";
    e.preventDefault();
    flag = false;
  }

  //email validation
  if (mail.value == "") {
    email.innerHTML = "*Email is required";
    e.preventDefault();
    flag = false;
  }

  //password expression
  let prexp = /^[a-zA-Z0-9!@]{6,20}$/;

  //password validation
  if (pass.value == "") {
    epass.innerHTML = "*Please enter the password";
    e.preventDefault();
    flag = false;
  } else if (prexp.test(pass.value)) {
    epass.innerHTML = "";
  } else {
    epass.innerHTML = "*Invalid password";
    e.preventDefault();
    flag = false;
  }

  //confirm password validation
  if (cpass.value == "") {
    ecpass.innerHTML = "*Please enter the confirm password";
    e.preventDefault();
    flag = false;
  } else if (pass.value == cpass.value && cpass.value != "") {
    ecpass.innerHTML = "";
  } else {
    ecpass.innerHTML = "*Password and confirm password is not matching.";
    e.preventDefault();
    flag = false;
  }

  if (flag) {
    let userData = {
      userFirstName: fName.value,
      userLastName: lName.value,
      userMobile: mobile.value,
      userEmail: mail.value,
      userPassword: pass.value,
      userCart: null
    };
    storage.push(userData);
    console.log(storage);
    localStorage.setItem("userData", JSON.stringify(storage));
    window.open("./SignIn.html", "_self");
  }
});
