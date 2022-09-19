// Lottie file animation 
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

bodymovin.loadAnimation(secondFoldAnimation);
bodymovin.loadAnimation(thirdFoldAnimation);
bodymovin.loadAnimation(fourthFoldAnimation);

// Fifth fold carousel

const weAreNillaCarouselContent = [
    {
        name: "Karthikeyan J",
        image: "../assets/caricature/karthikeyan.svg",
        role: "Head of product",
        accomplishment: "During his 15 years of leading product teams, Karthik noticed several challenges that came in the way of designing and shipping great products. That's when he came up with the idea for a platform that could simplify the way teams design together."
    },
    {
        name: "Jerome Joel",
        image: "../assets/caricature/jerome.svg",
        role: "Product Designer",
        accomplishment: "As the first designer on a team designing a platform for designers, Jerome is passionate about shaping the future of design - this is what inspires him every single day. Jerome spent over 5 years crafting mobile app interfaces before he joined the Nila team."
    },
    {
        name: "Meera Sapra",
        image: "../assets/caricature/meera_sapra.svg",
        role: "Head of Marketing ",
        accomplishment: "With over 14 years of her life’s work in product management and marketing for business software, Meera believes design is key to both product-building and storytelling. She now focuses on building Nila as a brand that designers would love."
    },
    {
        name: "Praburaj Moorthy",
        image: "../assets/caricature/praburaj.svg",
        role: "Engineering Lead ",
        accomplishment: "After a decade of developing presentation software for iOS, Prabu found himself fascinated by the vision of building a powerful native platform where designers can create their best work. He now leads our development efforts for the Nila Mac app found himself intrigued by the problems that would often come up during the design collaboration process. He now leads our development efforts towards building Nila as a platform that will solve these problems."
    },
    {
        name: "Jagadeesan Krishnan",
        image: "../assets/caricature/jagadeesan.svg",
        role: "Lead web developer ",
        accomplishment: "With over 7 years of engineering and product-building experience, Jagadeesan was one of the first web developers to join our team. He now drives our engineering efforts to Nila as a platform that will redefine how people design together."
    }
];

const carouselSlider = document.querySelector(".carousel-slider");
let carouselContent = "";

weAreNillaCarouselContent.forEach(content => {
    carouselContent = carouselContent + `
        <div class="carousel-content flex flex-col-mobile mobile-center">
            <div class="pr-5 mp-0">
                <div class="wan-img-wrapper">
                    <img id="caricature" src="${content.image}" />
                    <div class="circular-path"></div>
                </div>
            </div>
            <div class="w-5 mw-10 tw-10 pl-5 mp-0 text-center-mobile">
                <div class="">
                    <h1 id="person_name" class="text-xl title-color">${content.name}</h1>
                </div>
                <div class="pb-2">
                    <h4 class="text-m title-color">${content.role}</h4>
                </div>
                <div class="w-8 mw-auto text-m  primary-color pb-2">${content.accomplishment}</div>
            </div>
        </div>
    `;
})

carouselSlider.innerHTML = carouselContent;

let slides = document.querySelectorAll(".carousel-content");
let sliderIndex = 0;
let slideIntervalId;

const firstClone = slides[0].cloneNode(true);
firstClone.id = "first-clone";

carouselSlider.append(firstClone);

const carouselWidth = slides[sliderIndex].clientWidth;
let slideInterval = 20000;

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
    slides = document.querySelectorAll(".carousel-content");
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
