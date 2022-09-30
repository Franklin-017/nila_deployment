// Lottie file animation 
const logoAnimation = {
    container: document.querySelector('.logo-animation'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '../assets/lottie/logo-animation.json'
}

const secondFoldAnimation = {
    container: document.querySelector('.vs-animation-section'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '../assets/lottie/unique_design_mandala.json'
}

const thirdFoldAnimation = {
    container: document.querySelector('.ads-animation-section'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '../assets/lottie/fold_3_mandala.json'
}

const fourthFoldAnimation = {
    container: document.querySelector('.fog-animation-section'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '../assets/lottie/our_mission_mandala.json'
}

const caricatureAnimation = {
    container: document.querySelector('.circular-path'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '../assets/lottie/caricature.json'
}

bodymovin.loadAnimation(logoAnimation);
bodymovin.loadAnimation(secondFoldAnimation);
bodymovin.loadAnimation(thirdFoldAnimation);
bodymovin.loadAnimation(fourthFoldAnimation);

const videoSection = document.querySelector(".vs-content-wrapper");
const iFrameElement = document.querySelector(".branding-video-wrapper");
const brandingVideo = document.querySelector(".branding-video");
const win = brandingVideo.contentWindow;
const videoUrl = 'https://player.vimeo.com/video/683774352?h=40bdcc301f&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479;color=0063f4';


videoSection.addEventListener("click", () => {
    win.postMessage("playVideo", videoUrl);
    iFrameElement.style.transition = 'all 0.5s ease-in';
    iFrameElement.style.transform = "scale(1)";
    iFrameElement.style.visibility = "visible";
    document.querySelector("html").classList.add("overflow-hidden");
})

const closeVideo = document.querySelector(".close-video");

closeVideo.addEventListener("click", () => {
    win.postMessage("pauseVideo", videoUrl);
    iFrameElement.style.transition = 'all 0.5s ease-in';
    iFrameElement.style.transform = "scale(0)";
    iFrameElement.style.visibility = "hidden";
    document.querySelector("html").classList.remove("overflow-hidden");
})

// Fifth fold carousel

const weAreNillaCarouselContent = [
    {
        name: "Karthikeyan J",
        image: "../assets/caricature/karthikeyan.png",
        role: "Head of product",
        accomplishment: "During his 15 years of leading product teams, Karthik noticed several challenges that came in the way of designing and shipping great products. That's when he came up with the idea for a platform that could simplify the way teams design together."
    },
    {
        name: "Jerome Joel",
        image: "../assets/caricature/jerome.png",
        role: "Product Designer",
        accomplishment: "As the first designer on a team designing a platform for designers, Jerome is passionate about shaping the future of design - this is what inspires him every single day. Jerome spent over 5 years crafting mobile app interfaces before he joined the Nila team."
    },
    {
        name: "Meera Sapra",
        image: "../assets/caricature/meera_sapra.png",
        role: "Head of Marketing ",
        accomplishment: "With over 14 years of her life’s work in product management and marketing for business software, Meera believes design is key to both product-building and storytelling. She now focuses on building Nila as a brand that designers would love."
    },
    {
        name: "Praburaj Moorthy",
        image: "../assets/caricature/praburaj.png",
        role: "Engineering Lead ",
        accomplishment: "After a decade of developing presentation software for iOS, Prabu found himself fascinated by the vision of building a powerful native platform where designers can create their best work. He now leads our development efforts for the Nila Mac app found himself intrigued by the problems that would often come up during the design collaboration process. He now leads our development efforts towards building Nila as a platform that will solve these problems."
    },
    {
        name: "Jagadeesan Krishnan",
        image: "../assets/caricature/jagadeesan.png",
        role: "Lead web developer ",
        accomplishment: "With over 7 years of engineering and product-building experience, Jagadeesan was one of the first web developers to join our team. He now drives our engineering efforts to Nila as a platform that will redefine how people design together."
    }
];

const carouselSlider = document.querySelector(".carousel-slider");
let carouselContent = "";

weAreNillaCarouselContent.forEach(content => {
    carouselContent = carouselContent + `
        <div class="carousel-container">
            <div class="wan-img-wrapper ${content.name.replace(" ", "_").toLowerCase()}">
                <div class="pic-gradient"></div>
                <div class="pic-gradient-anim"></div>
                <img id="caricature" src="${content.image}" />
            </div>
            <div class="carousel-content">
                <p class="person-name">${content.name}</p>
                <p class="prof-role">${content.role}</p>
                <p class="carousel-desc">${content.accomplishment}</p>
            </div>
        </div>
    `;
})

carouselSlider.innerHTML = carouselContent;
bodymovin.loadAnimation(caricatureAnimation);

let slides = document.querySelectorAll(".carousel-container");
let sliderIndex = 0;
let slideIntervalId;

const firstClone = slides[0].cloneNode(true);
firstClone.id = "first-clone";

carouselSlider.append(firstClone);

const carouselWidth = slides[sliderIndex].clientWidth;
let slideInterval = 200000;

const startSlide = () => {
    slideIntervalId = setInterval(() => {
        sliderIndex++;
        highlightCarouselText(sliderIndex);
        carouselSlider.style.transform = "translateX(-" + carouselWidth * sliderIndex + "px)";
        carouselSlider.style.transition = "0.7s";
    }, slideInterval);
}
startSlide();

carouselSlider.addEventListener("transitionend", () => {
    slides = document.querySelectorAll(".carousel-container");
    if (slides[sliderIndex].id === firstClone.id) {
        carouselSlider.style.transition = 'none';
        sliderIndex = 0;
        carouselSlider.style.transform = "translateX(-" + carouselWidth * sliderIndex + "px)";
    }
})

const carousel = document.getElementById("carousel");

carousel.addEventListener("mouseenter", () => { clearInterval(slideIntervalId) });

carousel.addEventListener("mouseleave", startSlide);

function highlightCarouselText(index) {
    const lists = document.querySelectorAll(".leads li");
    lists.forEach((list, ind) => {
        list.addEventListener
        index = index === lists.length ? 0 : index;
        if (index === ind) {
            list.classList.add("gradient-text");
        } else {
            list.classList.remove("gradient-text")
        }
    })
}

const leadsList = document.querySelectorAll(".list");
leadsList.forEach((list, ind) => {
    list.addEventListener("click", (e) => {
        clearTimeout(slideIntervalId);
        startSlide();
        sliderIndex = ind;
        carouselSlider.style.transform = "translateX(-" + carouselWidth * sliderIndex + "px)";
        carouselSlider.style.transition = "0.7s";
        highlightCarouselText(sliderIndex);
    })
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
    }, 4000)
}

futureOfDesignElement.addEventListener("transitionend", () => {
    futureOfDesignElement.innerText = futureOfDesignWords[futureOfDesignWordIndex];
    futureOfDesignElement.style.transform = "translateY(0%)";
    futureOfDesignElement.style.opacity = 1;
})

animateWords();
