// ignorei18n_start
// Cursor Lottie file animation
const videoSectionCursor = {
  container: document.querySelector(".video_section_cursor"),
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "../assets/lottie/clicktoplay.json"
};

const canvasCursor = {
  container: document.querySelector(".canvas_section_cursor"),
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "./assets/lottie/clickanddrag.json"
};

bodymovin.loadAnimation(videoSectionCursor);
bodymovin.loadAnimation(canvasCursor);

// Cursor Functionalities
const mouseCursor = document.querySelector(".cursor");
const cursorCircle = document.querySelector(".cursor_circle");

const mouse = { x: -100, y: -100 };
const pos = { x: 0, y: 0 };
const speed = 0.1;

const updateMouseCoordinates = (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
};

window.addEventListener("mousemove", updateMouseCoordinates);

function updateCursor() {
  const diffX = Math.round(mouse.x - pos.x);
  const diffY = Math.round(mouse.y - pos.y);

  pos.x += diffX * speed;
  pos.y += diffY * speed;

  const translate = "translate3d(" + pos.x + "px ," + pos.y + "px, 0)";

  mouseCursor.style.transform = translate;
}

function cursorMovementLoop() {
  updateCursor();
  requestAnimationFrame(cursorMovementLoop);
}

requestAnimationFrame(cursorMovementLoop);

const cursorModifiers = document.querySelectorAll("[cursor-class]");

cursorModifiers.forEach((cursorModifier) => {
  cursorModifier.addEventListener("mouseenter", () => {
    const className = cursorModifier.getAttribute("cursor-class");
    mouseCursor.classList.add(className);
  });
});

cursorModifiers.forEach((cursorModifier) => {
  cursorModifier.addEventListener("mouseleave", () => {
    const className = cursorModifier.getAttribute("cursor-class");
    mouseCursor.classList.remove(className);
  });
});

// Scroll functionality on Navbar
const navbar = document.querySelector(".navbar");

function animateNavbar() {
  let transition = "all 0.3s ease-in";
  if (window.scrollY !== 0) {
    navbar.classList.add("navbar-squeeze");
    document.querySelector(".brand-logo").style.transition = transition;
    document.querySelector(".navlinks").style.transition = transition;
  } else {
    navbar.classList.remove("navbar-squeeze");
  }
}

const animationList = [
  {
    target: ["vs-content"],
    classNamesToAdd: ["content-animation"]
  }
];

const scrollTriggered = (e) => {
  animateNavbar();
  setActiveState();
  animationList.forEach((animation) => {
    animateUsingClassNames(animation);
  });
};

window.addEventListener("scroll", scrollTriggered);

const canTriggerAnimation = (target, conditionalOffset = 0.85) => {
  const { scrollTop, clientHeight } = document.documentElement;
  let nodeElement = document.getElementsByClassName(target);
  if (nodeElement) {
    try {
      let nodeElementPosition = nodeElement[0].getBoundingClientRect().top;
      if (scrollTop > (scrollTop + nodeElementPosition).toFixed() - clientHeight * conditionalOffset) {
        return nodeElement;
      } else {
        return false;
      }
    } catch (err) {}
  }
};

const animateUsingClassNames = ({ target, classNamesToAdd, classNamesToRemove, conditionalOffset }) => {
  target.forEach((ele) => {
    let elementToAnimate = canTriggerAnimation(ele, conditionalOffset);
    if (elementToAnimate !== undefined && elementToAnimate) {
      if (classNamesToAdd && classNamesToAdd.length) {
        classNamesToAdd.forEach((cssClass) => {
          for (let i = 0; i < elementToAnimate.length; i++) {
            try {
              elementToAnimate[i].classList.add(cssClass);
            } catch (err) {
              console.log(err);
            }
          }
        });
      }
      if (classNamesToRemove && classNamesToRemove.length) {
        classNamesToRemove.forEach((cssClass) => {
          for (let i = 0; i < elementToAnimate.length; i++) {
            try {
              elementToAnimate[i].classList.remove(cssClass);
            } catch (err) {
              console.log(err);
            }
          }
        });
      }
    }
  });
};

const setActiveState = () => {
  const elements = document.getElementsByClassName("t");
  const { scrollTop } = document.documentElement;

  for (let ind = 0; ind < elements.length; ind++) {
    let cur_element = elements[ind];
    let cur_pos = scrollTop + 300;
    if (innerHeight < 600) {
      cur_pos = scrollTop + 200;
    }

    let top = cur_element.offsetTop;
    let bottom = top + cur_element.clientHeight;

    if (cur_pos >= top && cur_pos <= bottom) {
      cur_element.classList.add("active-content");
    } else {
      cur_element.classList.remove("active-content");
    }
  }
};

const closeWaitlistSlider = document.querySelector(".close-waitlist-slider");
const waitlistSlider = document.querySelector(".join-waitlist-slider");
const joinWaitlistBtn = document.querySelector(".join-waitlist-btn");
const emailWaitlist = document.querySelector(".waitlist-email");

// closeWaitlistSlider.addEventListener("click", () => {
//     waitlistSlider.classList.remove("open");
//     document.querySelector("html").classList.remove("overflow-hidden");
// })

// joinWaitlistBtn.addEventListener("click", () => {
//     waitlistSlider.classList.add("open");
//     document.querySelector("html").classList.add("overflow-hidden");
//     emailWaitlist.focus();
// })

const emailInput = document.querySelector(".email-input");
const addToWaitlistbtn = document.querySelector(".get-update-btn");
const errorMessage = document.querySelector(".error-message");
const focusBorder = document.querySelector(".focus-border");

console.log(screen.width);

emailInput.addEventListener("input", () => {
  hideInputErrorMessage();
});

addToWaitlistbtn.addEventListener("click", () => {
  let email = emailInput.value;
  if (email === "") {
    showInputErrorMessage("Please enter your email address");
    return;
  }
  if (isValidEmail(email)) {
    addToWaitlist(email);
  } else {
    showInputErrorMessage("Please enter a valid email");
  }
});

function isValidEmail(email) {
  const emailPattern = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return emailPattern.test(email);
}

function showInputErrorMessage(message) {
  focusBorder.classList.add("error");
  errorMessage.innerText = message;
}

function hideInputErrorMessage() {
  focusBorder.classList.remove("error");
  errorMessage.innerText = "";
}

function addToWaitlist(email) {
  fetch("https://stage.localnila.com/joinwaitlist", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain */*",
      "Content-type": "application/json"
    },
    body: JSON.stringify({ emailId: email })
  });
}

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};
// ignorei18n_end
