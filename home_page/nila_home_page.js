// Lottie file animation
const logoAnimation = {
    container: document.querySelector('.logo-animation'),
    renderer: 'svg',
    loop: false,
    autoplay: true,
    path: '../assets/lottie/logo-animation.json'
}

const thirdFoldAnimation = {
    container: document.querySelector('.animation-section-3'),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: '../assets/lottie/page3.json'
}

const flySoloAnimation = {
    container: document.querySelector('.fly-solo-animation'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '../assets/lottie/page3.json'
}

const collabSectionElement = document.querySelector('.collab-animation-section');
const collabSectionAnimation = {
    container: collabSectionElement,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '../assets/lottie/collabMandala.json'
}

const cardOneElement = document.querySelector('.card-img-1');
const cardOne = {
    container: cardOneElement,
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: '../assets/lottie/flexiblevector.json',
    rendererSettings: {
        progressiveLoad: true,
    }
}

const cardTwoElement = document.querySelector('.card-img-2');
const cardTwo = {
    container: cardTwoElement,
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: '../assets/lottie/autolayouts.json',
    rendererSettings: {
        progressiveLoad: true,
    }
}

const cardThreeElement = document.querySelector('.card-img-3');
const cardThree = {
    container: cardThreeElement,
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: '../assets/lottie/animatedprototypes.json',
    rendererSettings: {
        progressiveLoad: true,
    }
}

const cardFourElement = document.querySelector('.card-img-4');
const cardFour = {
    container: cardFourElement,
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: '../assets/lottie/animatedprototypes.json',
    rendererSettings: {
        progressiveLoad: true,
    }
}

const cardFiveElement = document.querySelector('.card-img-5');
const cardFive = {
    container: cardFiveElement,
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: '../assets/lottie/sharedstyles.json',
    rendererSettings: {
        progressiveLoad: true,
    }
}

const cardSixElement = document.querySelector('.card-img-6');
const cardSix = {
    container: cardSixElement,
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: '../assets/lottie/reusablecomponents.json',
    rendererSettings: {
        progressiveLoad: true,
    }
}

const inviteTeamElement = document.querySelector('.invite-team-animation');
const inviteTeamLottie = {
    container: inviteTeamElement,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '../assets/lottie/inviteurteam.json',
    rendererSettings: {
        progressiveLoad: true,
    }
}

const smootherHandsoffElement = document.querySelector('.smoother-handsoff-animation');
const smootherHandsoffLottie = {
    container: smootherHandsoffElement,
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: '../assets/lottie/smootherhandsoff.json',
    rendererSettings: {
        progressiveLoad: true,
    }
}

const commentConverseElement = document.querySelector('.comment-converse-animation');
const commentConverseLottie = {
    container: commentConverseElement,
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: '../assets/lottie/commentconverse.json',
    rendererSettings: {
        progressiveLoad: true,
    }
}

bodymovin.loadAnimation(logoAnimation);
bodymovin.loadAnimation(flySoloAnimation);
const cardOneAnimation = bodymovin.loadAnimation(cardOne);
const cardTwoAnimation = bodymovin.loadAnimation(cardTwo);
const cardThreeAnimation = bodymovin.loadAnimation(cardThree);
const cardFourAnimation = bodymovin.loadAnimation(cardFour);
const cardFiveAnimation = bodymovin.loadAnimation(cardFive);
const cardSixAnimation = bodymovin.loadAnimation(cardSix);
const thirdFoldLoader = bodymovin.loadAnimation(thirdFoldAnimation);
const collabSectionLoader = bodymovin.loadAnimation(collabSectionAnimation);
const inviteTeamLoader = bodymovin.loadAnimation(inviteTeamLottie);
const smootherHandsoffLoader = bodymovin.loadAnimation(smootherHandsoffLottie);
const commentConverseLoader = bodymovin.loadAnimation(commentConverseLottie);
// /* Lottie file animation */

const pageLoader = document.querySelector('.page-loader');

setTimeout(() => {
    pageLoader.classList.add("close");
    document.querySelector("html").classList.remove("overflow-hidden");
}, 3000);

window.addEventListener("scroll", () => {
    const { scrollTop, clientHeight } = document.documentElement;
    const nodeElementPosition = document.querySelector(".animation-section-3").getBoundingClientRect().top;
    if ((scrollTop > (scrollTop + nodeElementPosition).toFixed() - clientHeight * 0.85)) {
        thirdFoldLoader.play();
    }
})

const cardsElement = [
    {
        element: cardOneElement,
        animation: cardOneAnimation
    },
    {
        element: cardTwoElement,
        animation: cardTwoAnimation
    },
    {
        element: cardThreeElement,
        animation: cardThreeAnimation
    },
    {
        element: cardFourElement,
        animation: cardFourAnimation
    },
    {
        element: cardFiveElement,
        animation: cardFiveAnimation
    },
    {
        element: cardSixElement,
        animation: cardSixAnimation
    }
];

const cardlayout = document.querySelectorAll(".card-container");


cardlayout.forEach((layout) => {
    layout.addEventListener("mouseenter", (event) => {
        cardsElement.forEach(({ element, animation }) => {
            if (event.target.children[0].children[0] === element) {
                animation.play();
            }
        })
    });

    layout.addEventListener("mouseleave", (event) => {
        cardsElement.forEach(({ element, animation }) => {
            if (event.target.children[0].children[0] === element) {
                animation.goToAndStop(0, true);
            }
        })
    });
})

const textAnimation = document.querySelectorAll(".hs-animate-text");
const textSlide = document.querySelector(".text-slide");

setInterval(() => {
    textSlide.style.width = "0px";
    textSlide.style.overflow = "hidden";
    setTimeout(() => {
        textAnimation.forEach(node => {
            node.classList.toggle("is-hidden");
            node.classList.toggle("is-visible");
        })
        const contentWidth = document.querySelector(".is-visible").clientWidth + 3;
        textSlide.style.width = contentWidth + "px";
    }, 1000)
}, 10000);


const collaborationContentNode = document.querySelectorAll(".col-content");

const contentList = [
    `
        <div class="primary-color" data-aos="fade-up">
            <p class="text-m pb-2">
                We understand that having autonomy over your designs is key. That's why your drafts are completely private until you invite other folks for feedback and handoff. Just share links to your prototypes or embed them anywhere on the web whenever you're ready.
            </p>
            <p class="text-m">
                You don't have to dig through multiple files to find the latest version. With Nila, designers, developers and marketers can explore and iterate in the same file all at the same time, without ever losing context.
            </p>
        </div>
    `,
    `
        <div class="primary-color" data-aos="fade-up">
            <p class="text-m pb-2">
                Feedback fuels great design. With a dedicated space for comments, Nila makes it easy for teams to spark conversations around anything they create. Everyone can bring more context to their comments with marked elements, pinned selections, replies, @mentions and emoji reactions. 
            </p>
            <p class="text-m">
                Oh, and here's the really cool bit: you can quickly compare changes side-by-side to see who changed what, without ever having to switch tabs or hunt for files.
            </p>
        </div>
    `,
    `
        <div class="primary-color" data-aos="fade-up">
            <p class="text-m pb-2">
                File exports are a thing of the past–so of course, you can copy design specs and code for any element with Inspect and download assets in any format. You'll never find anyone in your team asking, "Is this the latest file?" again. Just design and handoff. It's that simple. 
            </p>
        </div>
    `
]

function unselectSelectedContent() {
    collaborationContentNode.forEach(node => {
        let parentNode = node.parentNode;
        parentNode.classList.remove("content-selected");
    })
}

// const inviteTeamLoader = bodymovin.loadAnimation(inviteTeamLottie);
// const smootherHandsoffLoader = bodymovin.loadAnimation(smootherHandsoffLottie);
// const commentConverseLoader = bodymovin.loadAnimation(commentConverseLottie);

const collabContentWrapper = document.querySelector(".collab-content-wrapper");
function renderHeadingsContent(node) {
    if (node.className.includes("team-invite")) {
        collabContentWrapper.innerHTML = contentList[0];
        inviteTeamLoader.play();
    } else if (node.className.includes("collab")) {
        collabContentWrapper.innerHTML = contentList[1];
        commentConverseLoader.play();
    } else if (node.className.includes("smooth")) {
        collabContentWrapper.innerHTML = contentList[2];
        smootherHandsoffLoader.play();

    }
}

collaborationContentNode.forEach(contentNode => {
    contentNode.addEventListener("click", (event) => {
        if (event.target.className === "gradient-text") {
            let parentNode = event.target.parentNode;
            let greatParentNode = parentNode.parentNode;
            unselectSelectedContent();
            renderHeadingsContent(parentNode);
            greatParentNode.classList.add("content-selected");
        }
    })
})

const homeSectionContentWords = ["with the power<br /> of the Mac.", "with the flexibility<br /> of the cloud."];

const homeSectionContentElement = document.querySelector(".animate-content");
let homeSectionContentWordIndex = 0;

const animateContent = () => {
    setInterval(() => {
        homeSectionContentElement.style.transform = "translateY(30%)";
        homeSectionContentElement.style.opacity = 0;
        homeSectionContentWordIndex++;
        if (homeSectionContentWordIndex >= homeSectionContentWords.length) {
            homeSectionContentWordIndex = 0;
        }
    }, 10000)
}

homeSectionContentElement.addEventListener("transitionend", () => {
    homeSectionContentElement.innerHTML = homeSectionContentWords[homeSectionContentWordIndex];
    homeSectionContentElement.style.transform = "translateY(0%)";
    homeSectionContentElement.style.opacity = 1;
})

animateContent();