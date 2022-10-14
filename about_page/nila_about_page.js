// Lottie file animation
const logoAnimation = {
  container: document.querySelector(".logo-animation"),
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "../assets/lottie/logo-animation.json"
};

const secondFoldAnimation = {
  container: document.querySelector(".vs-animation-section"),
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "../assets/lottie/unique_design_mandala.json"
};

const thirdFoldAnimation = {
  container: document.querySelector(".ads-animation-section"),
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "../assets/lottie/fold_3_mandala.json"
};

const fourthFoldAnimation = {
  container: document.querySelector(".fog-animation-section"),
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "../assets/lottie/our_mission_mandala.json"
};

const caricatureAnimation = {
  container: document.querySelector(".circular-path"),
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "../assets/lottie/caricature.json"
};

bodymovin.loadAnimation(logoAnimation);
bodymovin.loadAnimation(secondFoldAnimation);
bodymovin.loadAnimation(thirdFoldAnimation);
bodymovin.loadAnimation(fourthFoldAnimation);

const videoSection = document.querySelector(".vs-content-wrapper");
const iFrameElement = document.querySelector(".branding-video-wrapper");
const brandingVideo = document.querySelector(".branding-video");
const win = brandingVideo.contentWindow;
const videoUrl = "https://player.vimeo.com/video/683774352?h=40bdcc301f&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479;color=0063f4";

videoSection.addEventListener("click", () => {
  win.postMessage("playVideo", videoUrl);
  iFrameElement.style.transition = "all 0.5s ease-in";
  iFrameElement.style.transform = "scale(1)";
  iFrameElement.style.visibility = "visible";
  document.querySelector("html").classList.add("overflow-hidden");
});

const closeVideo = document.querySelector(".close-video");

closeVideo.addEventListener("click", () => {
  win.postMessage("pauseVideo", videoUrl);
  iFrameElement.style.transition = "all 0.5s ease-in";
  iFrameElement.style.transform = "scale(0)";
  iFrameElement.style.visibility = "hidden";
  document.querySelector("html").classList.remove("overflow-hidden");
});

// Fifth fold carousel

const carouselSlider = document.querySelector(".carousel-slider");

let slides = document.querySelectorAll(".carousel-container");
let sliderIndex = 1;
let slideIntervalId;

const carouselWidth = slides[sliderIndex].clientWidth;
let slideInterval = 20000;

carouselSlider.style.transform = "translateX(-" + carouselWidth + "px)";
const startSlide = () => {
  slideIntervalId = setInterval(() => {
    highlightCarouselText(sliderIndex);
    sliderIndex++;
    carouselSlider.style.transform = "translateX(-" + carouselWidth * sliderIndex + "px)";
    carouselSlider.style.transition = "0.7s";
  }, slideInterval);
};
startSlide();

let touchStartingPos;
let touchEndingPos;
let swipeVerticalStartPos;
let swipeVerticalEndPos;

carouselSlider.addEventListener("touchstart", (e) => {
  touchStartingPos = e.touches[0].clientX;
  swipeVerticalStartPos = e.touches[0].clientY;
});

carouselSlider.addEventListener("touchend", (e) => {
  touchEndingPos = e.changedTouches[0].clientX;
  swipeVerticalEndPos =  e.changedTouches[0].clientY;
  let swipeDistance = touchStartingPos - touchEndingPos;
  let isVerticalSwipe = Math.abs(swipeVerticalStartPos - swipeVerticalEndPos) > 50;

  if (!isVerticalSwipe && swipeDistance > 100) {
    clearTimeout(slideIntervalId);
    startSlide();
    highlightCarouselText(sliderIndex);
    sliderIndex++;
    carouselSlider.style.transition = "0.7s";
    carouselSlider.style.transform = "translateX(-" + carouselWidth * sliderIndex + "px)";
  } else if (!isVerticalSwipe && swipeDistance < -100) {
    clearTimeout(slideIntervalId);
    startSlide();
    sliderIndex--;
    console.log(sliderIndex);
    highlightCarouselText(sliderIndex - 1);
    carouselSlider.style.transition = "0.7s";
    carouselSlider.style.transform = "translateX(-" + carouselWidth * sliderIndex + "px)";
  } else {
    clearTimeout(slideIntervalId);
    startSlide();
    highlightCarouselText(sliderIndex);
    carouselSlider.style.transition = "0.7s";
    carouselSlider.style.transform = "translateX(-" + carouselWidth * sliderIndex + "px)";
  }
});

carouselSlider.addEventListener("transitionend", (e) => {
    console.log(e)
  if (slides[sliderIndex].id === "first-clone") {
    carouselSlider.style.transition = "none";
    sliderIndex = 1;
    carouselSlider.style.transform = "translateX(-" + carouselWidth * sliderIndex + "px)";
  } else if (slides[sliderIndex].id === "last-clone") {
    carouselSlider.style.transition = "none";
    sliderIndex = slides.length - 2;
    carouselSlider.style.transform = "translateX(-" + carouselWidth * sliderIndex + "px)";
  }
});

carouselSlider.addEventListener("touchmove", (e) => {
  const touchSwipe = e.touches[0].clientX;
  const verticalSwipe = e.touches[0].clientY;
  let isVerticalSwipe = Math.abs(swipeVerticalStartPos - verticalSwipe) > 10;

  if (!isVerticalSwipe && touchStartingPos < touchSwipe) {
    const swipeTransition = parseInt(carouselWidth * sliderIndex - touchSwipe);
    carouselSlider.style.transform = "translateX(-" + swipeTransition + "px)";
  } else if (!isVerticalSwipe && touchStartingPos > touchSwipe) {
    const swipeTransition = parseInt(carouselWidth * sliderIndex + touchSwipe);
    carouselSlider.style.transform = "translateX(-" + swipeTransition + "px)";
  }
});

const carousel = document.getElementById("carousel");

carousel.addEventListener("mouseenter", () => {
  clearInterval(slideIntervalId);
});

carousel.addEventListener("mouseleave", startSlide);

function highlightCarouselText(index) {
  const lists = document.querySelectorAll(".leads li");
  lists.forEach((list, ind) => {
    index = index === lists.length ? 0 : index === -1 ? lists.length - 1 : index;
    if (index === ind) {
      list.classList.add("gradient-text");
    } else {
      list.classList.remove("gradient-text");
    }
  });
}

const leadsList = document.querySelectorAll(".list");
leadsList.forEach((list, ind) => {
  list.addEventListener("click", (e) => {
    clearTimeout(slideIntervalId);
    startSlide();
    sliderIndex = ind + 1;
    carouselSlider.style.transform = "translateX(-" + carouselWidth * sliderIndex + "px)";
    carouselSlider.style.transition = "0.7s";
    highlightCarouselText(ind);
  });
});

const futureOfDesignWords = ["inclusive", "seamless", "collaborative"];

const futureOfDesignElement = document.querySelector(".animate-words");
let futureOfDesignWordIndex = 0;

const animateWords = () => {
  setInterval(() => {
    futureOfDesignElement.style.transform = "translateY(50%)";
    futureOfDesignElement.style.opacity = 0;
    futureOfDesignWordIndex++;
    if (futureOfDesignWordIndex >= futureOfDesignWords.length) {
      futureOfDesignWordIndex = 0;
    }
  }, 4000);
};

futureOfDesignElement.addEventListener("transitionend", () => {
  futureOfDesignElement.innerText = futureOfDesignWords[futureOfDesignWordIndex];
  futureOfDesignElement.style.transform = "translateY(0%)";
  futureOfDesignElement.style.opacity = 1;
});

animateWords();
