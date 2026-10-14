/* ====================================================================== 
script.js - JavaScript for the WEDE5020 six-page website 
This one file is linked from every page, so each feature first checks 
that its elements exist on the current page before doing anything. 
====================================================================== */ 
// Step 4 - Prove the file is connected (open DevTools > Console to see it) 
console.log("script.js is connected!"); 
// Step 5 - Footer: show the current year automatically 
const yearSpan = document.getElementById("year"); 
if (yearSpan) { 
yearSpan.textContent = new Date().getFullYear(); 
}

const shopName = "Logo.";     
// text (a "string") goes in quotes 
const itemCount = 8;          
// a number has no quotes 
let visibleCount = 0;         
// "let" because we will change it later 
visibleCount = visibleCount + 1;   // now it holds 1
function sayHello() { 
console.log("Hello!"); 
} 
sayHello();   
// runs it: prints Hello!
if (itemCount === 0) { 
console.log("Nothing here"); 
} else { 
console.log("We have items"); 
}
// Step 6 - FAQ accordion: click a question to show or hide its answer 
const faqItems = document.querySelectorAll(".faq-item"); 
faqItems.forEach(function (item) { 
const question = item.querySelector("h3");
  // Start with every answer hidden 
  item.classList.add("closed"); 
 
  // Make the question reachable and understandable without a mouse 
  question.setAttribute("tabindex", "0"); 
  question.setAttribute("role", "button"); 
  question.setAttribute("aria-expanded", "false"); 
 
  function toggleAnswer() { 
    // toggle() adds the class if it is missing, removes it if present, 
    // and gives back true when the class is now ON the element. 
    const isClosed = item.classList.toggle("closed"); 
 
    if (isClosed) { 
      question.setAttribute("aria-expanded", "false"); 
    } else { 
      question.setAttribute("aria-expanded", "true"); 
    } 
  } 
 
  question.addEventListener("click", toggleAnswer); 
 
  question.addEventListener("keydown", function (event) { 
    if (event.key === "Enter" || event.key === " ") { 
      event.preventDefault(); // stop the space bar scrolling the page 
      toggleAnswer(); 
    } 
  }); 
}); 
// Step 7 - Product search: filter the cards as the visitor types 
const searchInput = document.getElementById("product-search"); 
const productCards = document.querySelectorAll(".product-card"); 
const noResults = document.getElementById("no-results"); 
 
if (searchInput) { 
  searchInput.addEventListener("input", function () { 
    const searchText = searchInput.value.trim().toLowerCase(); 
    let visibleCount = 0; 
 
    productCards.forEach(function (card) { 
      const name = card.querySelector("h3").textContent; 
      const details = card.querySelector(".product-meta").textContent; 
      const cardText = (name + " " + details).toLowerCase(); 
 
      if (cardText.includes(searchText)) { 
        card.classList.remove("is-hidden"); 
        visibleCount = visibleCount + 1; 
      } else { 
        card.classList.add("is-hidden"); 
      } 
      }); 
if (visibleCount === 0) { 
noResults.classList.remove("is-hidden"); 
} else { 
noResults.classList.add("is-hidden"); 
} 
}); 
} 
// Step 8 - switch / case: a hint that changes with the chosen reason 
const typeSelect = document.getElementById("enq-type"); 
const typeHint = document.getElementById("type-hint"); 
 
function showTypeHint() { 
  if (!typeSelect || !typeHint) { 
    return; // not on the Enquiries page, so do nothing 
  } 
 
  let message = ""; 
 
  switch (typeSelect.value) { 
    case "Enquiry about a service": 
      message = "Please tell us which service you are interested in."; 
      break; 
    case "Enquiry about a product": 
      message = "Please tell us the product name and size."; 
      break; 
    case "I want to volunteer": 
      message = "Wonderful! Tell us when you are available and what you enjoy doing."; 
      break; 
    default: 
      message = "Tell us how we can help you today."; 
  }
  typeHint.textContent = message; 
} 
if (typeSelect) { 
typeSelect.addEventListener("change", showTypeHint); 
showTypeHint(); // show the starting hint straight away 
} 
// Step 9 - Form validation (works for BOTH the Enquiries and Contact forms) 
 
// Is this text shaped like an email address? (something@something.something) 
function isValidEmail(email) { 
  const atPosition = email.indexOf("@"); 
  const lastDotPosition = email.lastIndexOf("."); 
 
  return ( 
    atPosition > 0 && 
    lastDotPosition > atPosition + 1 && 
    lastDotPosition < email.length - 1 && 
    !email.includes(" ") 
  ); 
} 
 
// Put a red border on a field and add an error message under it 
function showError(field, message) { 
  field.classList.add("input-error"); 
 
  const error = document.createElement("span"); 
  error.className = "error-message"; 
  error.textContent = message; 
 
  field.parentElement.appendChild(error); 
} 
 
// Remove every error message and red border from a form 
function clearErrors(form) { 
  form.querySelectorAll(".error-message").forEach(function (error) { 
    error.remove(); 
  }); 
 
  form.querySelectorAll(".input-error").forEach(function (field) { 
    field.classList.remove("input-error"); 
  }); 
} 
const forms = document.querySelectorAll("form"); 
 
forms.forEach(function (form) { 
  const successMessage = form.querySelector(".form-success"); 
 
  form.addEventListener("submit", function (event) { 
    event.preventDefault(); // stop the page reloading - we check first 
 
    clearErrors(form); 
 
    if (successMessage) { 
      successMessage.classList.add("is-hidden"); 
    } 
 
    let formIsValid = true; 
    let firstBadField = null; 
 
    const requiredFields = form.querySelectorAll("[required]"); 
 
    requiredFields.forEach(function (field) { 
      const value = field.value.trim(); 
      const labelText = field.labels[0].textContent; 
      let problem = ""; 
 
      if (value === "") { 
        problem = labelText + " is required."; 
      } else if (field.type === "email" && !isValidEmail(value)) { 
        problem = "Please enter a valid email address, like you@email.com."; 
      }
       if (problem !== "") { 
        showError(field, problem); 
        formIsValid = false; 
 
        if (firstBadField === null) { 
          firstBadField = field; 
        } 
      } 
    }); 
 
    if (formIsValid) { 
      form.reset(); 
      showTypeHint(); // reset() empties the menu, so refresh the hint 
 
      if (successMessage) { 
        successMessage.classList.remove("is-hidden"); 
      } 
    } else { 
      firstBadField.focus(); // jump the cursor to the first problem 
    } 
  }); 
}); 
