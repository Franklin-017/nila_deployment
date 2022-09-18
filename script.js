// ignorei18n_start
// Cursor Lottie file animation 
const videoSectionCursor = {
    container: document.querySelector('.video_section_cursor'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: './assets/lottie/clickanddrag.json'
}

bodymovin.loadAnimation(videoSectionCursor);

// Cursor Functionalities
const mouseCursor = document.querySelector(".cursor");
const cursorCircle = document.querySelector(".cursor_circle");
const videoCursorAnimation = document.querySelector(".video_section_cursor");

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
    if (window.scrollY !== 0) {
        navbar.classList.add("navbar-squeeze");
    } else {
        navbar.classList.remove("navbar-squeeze");
    }
}
/*
{
    classList: [],
    addClass: [],
    removeClass: []
}
*/

const animationList = [
    {
        "target": ["slide-up-1", "slide-up-2", "slide-up-3", "slide-up-4", "slide-up-5"],
        "classNamesToRemove": ["flip-y", "opacity-0"]
    },
    {
        "target": ["wan-slide-up", "wan-carousel-slide-up", "wan-list-slide-up", "lu-slide-up", "lu-btn-slide-up"],
        "classNamesToRemove": ["transform-slide-down", "opacity-0"]
    },
    {
        "target": ["vs-content-right", "vs-content-left"],
        "classNamesToRemove": ["transform-slide-right", "transform-slide-left", "opacity-0"]
    },
    {
        "target": ["vs-content", "vs-center-heart"],
        "classNamesToAdd": ["content-animation", "heart-scale-in"],
    },
    {
        "target": ["email-input"],
        "classNamesToRemove": ["w-0"],
        "classNamesToAdd": ["w-8"]
    }
];

const scrollTriggered = (e) => {
    animateNavbar();
    setActiveState();
    animationList.forEach(animation => {
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
            if ((scrollTop > (scrollTop + nodeElementPosition).toFixed() - clientHeight * conditionalOffset)) {
                return nodeElement;
            } else {
                return false;
            }
        } catch(err) {
            
        }
    }
};

const animateUsingClassNames = ({ target, classNamesToAdd, classNamesToRemove, conditionalOffset }) => {
    console.log(target);
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
}

(() => {
    animateUsingClassNames({
        "target": ["hs-slide-up"],
        "classNamesToAdd": [],
        "classNamesToRemove": ["flip-y"]
    });
})();

const setActiveState = () => {
    const elements = document.getElementsByClassName("t");
    const { scrollTop  } = document.documentElement;

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
}

const closeWaitlistSlider = document.querySelector(".close-waitlist-slider");
const waitlistSlider = document.querySelector(".join-waitlist-slider");
const joinWaitlistBtn = document.querySelector(".join-waitlist-btn");

closeWaitlistSlider.addEventListener("click", () => {
    waitlistSlider.classList.remove("open");
})

joinWaitlistBtn.addEventListener("click", () => {
    waitlistSlider.classList.add("open");
})
// ignorei18n_end 
