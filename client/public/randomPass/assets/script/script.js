// Assignment Code
var generateBtn = document.querySelector("#generate");
var buttons = document.querySelector(".buttons");
var conditions = {"Lowercase": true, "Uppercase": true, "Numbers": true, "Special": true}
var length = document.getElementById("length");

// first, special characters, then numbers, then upper, then lower
const ascii_numbers = 
[[33, 35, 36, 37, 38, 42, 63, 64, 94, 95], 
[48, 49, 50, 51, 52, 53, 54, 55, 56, 57], 
[65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90], 
[97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122]];

buttons.childNodes.forEach(button => {
  button.addEventListener("click", function() {
    conditions[this.textContent] = !conditions[this.textContent];
    if (conditions[this.textContent]) {
      this.style = "";
    }
    else {
      this.style = "background-color: #DC143C;";
    }
  })
});

function getRandom (arr) {
  return arr[Math.round(Math.random() * (arr.length - 1))];
}

function generatePassword () {
  let password = [], allowed_characters = [], chosen = null, len = parseInt(length.value);
  
  
  if (len < 8 || len === NaN) {
    len = 8;
    length.value = "8";
  }
  if (len > 128) {
    len = 128;
    length.value = "128";
  }

  if (conditions["Lowercase"]) {
    allowed_characters.push(3);
  }
  if (conditions["Uppercase"]) {
    allowed_characters.push(2);
  }
  if (conditions["Numbers"]) {
    allowed_characters.push(1);
  }
  if (conditions["Special"]) {
    allowed_characters.push(0);
  }

  for (i = 0; i < len; i++) {
    chosen = ascii_numbers[getRandom(allowed_characters)];
    console.log(chosen);
    password.push(String.fromCharCode(getRandom(chosen)));
  }

  return password.join("");
}

// Write password to the #password input
function writePassword() {
  let g = false;
  for (const key in conditions) {
    if(conditions[key]) {
      g = true;
      break
    }
  }

  if (!g) {
    alert("Please select one or more criteria");
    return
  }

  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

length.value = "8";
