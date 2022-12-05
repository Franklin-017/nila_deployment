const inputField = document.querySelectorAll("input");
const textareaField = document.querySelector("textarea");
const placeholderText = document.querySelectorAll(".placeholder");
const nameError = document.querySelector(".name-empty-error");
const emailEmptyError = document.querySelector(".email-empty-error");
const emailInvalidError = document.querySelector(".email-invalid-error");
const errorMessageContainer = document.querySelector(".message-empty-error");

inputField.forEach(field => {
    field.addEventListener("focus", () => {
        let inputFieldName = field.getAttribute("placeholder");
        if (inputFieldName === "name") {
            nameError.style.visibility = "hidden";
        } else if (inputFieldName === "email") {
            emailEmptyError.style.visibility = "hidden";
            emailInvalidError.style.visibility = "hidden";
        }

        const placeholderSpan = field.nextElementSibling;
        placeholderSpan.classList.add("animate-input-placeholder");
    })
})

placeholderText.forEach(text => {
    text.addEventListener("click", () => {
        text.classList.add("animate-input-placeholder");
        const inputField = text.previousElementSibling;
        inputField.focus();
    })
})

textareaField.addEventListener("focus", () => {
    errorMessageContainer.style.visibility = "hidden";
    const placeholderSpan = textareaField.nextElementSibling;
    placeholderSpan.classList.add("animate-input-placeholder");
})

document.addEventListener("click", (e) => {
    inputField.forEach(field => {
        const inputValue = field.value.trim();
        const placeholderSpan = field.nextElementSibling;
        if (inputValue === "" && e.target !== field && e.target !== placeholderSpan) {
            placeholderSpan.classList.remove("animate-input-placeholder");
            field.value = '';
        }
    })

    const textareaValue = textareaField.value.trim();
    const placeholderSpan = textareaField.nextElementSibling;
    if (textareaValue === "" && e.target !== textareaField && e.target !== placeholderSpan) {
        placeholderSpan.classList.remove("animate-input-placeholder");
        textareaField.value = '';
    }
})

const submitBtn = document.querySelector(".submit-btn");

submitBtn.addEventListener("click", () => {
    inputField.forEach(field => {
        let inputFieldName = field.getAttribute("placeholder");
        let fieldValue = field.value;
        if (fieldValue === "") {
            if (inputFieldName === "name") {
                nameError.style.visibility = "visible";
            } else if (inputFieldName === "email") {
                emailEmptyError.style.visibility = "visible";
            }
        } else if (inputFieldName === "email" && !isValidEmail(fieldValue)) {
                emailInvalidError.style.visibility = "visible";
        } 
    })

    if (textareaField.value === "") {
        errorMessageContainer.style.visibility = "visible";
    }
})

function isValidEmail(email) {
    const emailPattern = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return emailPattern.test(email);
}