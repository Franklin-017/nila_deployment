// HERO SECTION DESIGN COLLABORATION ANIMATION 
const textAnimation = document.querySelectorAll(".hs-animate-text");
const textSlide = document.querySelector(".text-slide");

setInterval(() => {
    textSlide.style.width = "0px";
    textSlide.style.overflow = "hidden";
    setTimeout(()=> {
        textAnimation.forEach(node => {
            node.classList.toggle("is-hidden");
            node.classList.toggle("is-visible");
        })
        const contentWidth = document.querySelector(".is-visible").clientWidth + 3;
        textSlide.style.width = contentWidth + "px";
    }, 1000)
}, 10000);

// COLLABORATION MEETS CREATIVITY SECTION
const collaborationContentNode = document.querySelectorAll(".col-content");

const contentList = [
    `
        <div class="primary-color" data-aos="fade-up">
            <p class="text-l pb-2">
                We understand that having autonomy over your designs is key. That's why your drafts are completely private until you invite other folks for feedback and handoff. Just share links to your prototypes or embed them anywhere on the web whenever you're ready.
            </p>
            <p class="text-l">
                You don't have to dig through multiple files to find the latest version. With Nila, designers, developers and marketers can explore and iterate in the same file all at the same time, without ever losing context.
            </p>
        </div>
    `,
    `
        <div class="primary-color" data-aos="fade-up">
            <p class="text-l pb-2">
                Feedback fuels great design. With a dedicated space for comments, Nila makes it easy for teams to spark conversations around anything they create. Everyone can bring more context to their comments with marked elements, pinned selections, replies, @mentions and emoji reactions. 
            </p>
            <p class="text-l">
                Oh, and here's the really cool bit: you can quickly compare changes side-by-side to see who changed what, without ever having to switch tabs or hunt for files.
            </p>
        </div>
    `,
    `
        <div class="primary-color" data-aos="fade-up">
            <p class="text-l pb-2">
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

const collabContentWrapper = document.getElementById("collab-content-wrapper");
function renderHeadingsContent(node) {
    if (node.className.includes("team-invite")) {
        collabContentWrapper.innerHTML = contentList[0];
    } else if (node.className.includes("collab")) {
        collabContentWrapper.innerHTML = contentList[1];
    } else if (node.className.includes("smooth")) {
        collabContentWrapper.innerHTML = contentList[2];
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