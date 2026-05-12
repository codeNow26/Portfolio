document.querySelectorAll(".contact-input").forEach(input => {
    setupValidation(input);
});

document.getElementById("privacy-check")
    .addEventListener("change", validateForm);
    
/**
 * Sets up validation for input */
function setupValidation(input) {
    const container = input.closest(".contact-field");
    const error = container.querySelector(".error-message");
    const invalidError = document.getElementById("invalid-sign_up-email");
    let touched = false;
    setupFocus(input, () => touched = true);
    setupBlur(input, () => touched && validateInput(input, container, error, invalidError, touched));
    setupInput(input, error, invalidError);
}

/** Adds focus listener*/
function setupFocus(input, callback) {
    input.addEventListener("focus", callback);
}

/**
 * Adds blur listener */
function setupBlur(input, callback) {
    input.addEventListener("blur", callback);
}

/**
 * Adds input event */
function setupInput(input, error, invalidError) {
    input.addEventListener("input", () => {
        const value = input.value.trim();
        const isValid = checkValidity(input, value);
        toggleValidationClasses(input, isValid);
        removeRequiredError(input, error);
        removeEmailError(input, invalidError);
        validateForm();
    });
}

/** Validates input field */
function validateInput(input, container, error, invalidError, touched) {
    const value = input.value.trim();
    const isValid = checkValidity(input, value);
    toggleValidationClasses(input, isValid);
    toggleRequiredError(value, touched, container, error, input);

    if (input.type === "email") {
        toggleEmailError(value, isValid, invalidError);
    }

    validateForm();
}

/** Checks input validity */
function checkValidity(input, value) {
    if (input.type !== "email") {
        return value.length > 0;
    }

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/** Toggles validation classes */
function toggleValidationClasses(input, isValid) {
    input.classList.toggle("valid", isValid);
    input.classList.toggle("invalid", !isValid);
}

/** Toggles required error message */
function toggleRequiredError(value, touched, container, error, input) {
    const show = !value && touched;

    container.classList.toggle("submit", show);
    error?.classList.toggle("opacity-1", show);

    if (show) {
        input.placeholder = "";
    }
}

/** Toggles email validation error */
function toggleEmailError(value, isValid, invalidError) {
    const show = value && !isValid;
    invalidError.classList.toggle("opacity-1", show);
}

/** Removes required field error */
function removeRequiredError(input, error) {
    if (input.value.trim()) {
        error?.classList.remove("opacity-1");
    }
}

/** Removes invalid email error */
function removeEmailError(input, invalidError) {
    const value = input.value.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    if (value && isValid) {
        invalidError.classList.remove("opacity-1");
    }
}

/** Validates entire form and updates submit button state */
function validateForm() {
    const inputs = document.querySelectorAll(".contact-input");
    const button = document.getElementById("contact-submit");
    const checkbox = document.getElementById("privacy-check");
    let formValid = true;

    inputs.forEach(input => {
        if (!input.classList.contains("valid")) {
            formValid = false;
        }
    });
    const allValid = formValid && checkbox.checked;
    button.disabled = !allValid
}

/** Handles form submission and sends email */
function sendMail(event) {
    event.preventDefault();

    resetStatusMessages();

    if (!isPrivacyAccepted()) {
        showPrivacyError();
        return;
    }

    const formData = getFormData();
    setButtonState(true, "Sending...");
    sendEmail(formData).then(handleSuccessfulSubmit);
}

/** Resets form after successful email submission */
function handleSuccessfulSubmit() {
    document.querySelector("form").reset();

    document.querySelectorAll(".contact-input").forEach(input => {
        input.classList.remove("valid", "invalid");
    });

    validateForm();
}

/** Clears success and error messages */
function resetStatusMessages() {
    getSuccessElement().classList.remove("is-visible");
    getErrorElement().classList.remove("is-visible");
}

/** Checks if privacy checkbox is checked */
function isPrivacyAccepted() {
    return document.getElementById("privacy-check").checked;
}

/** Displays privacy policy error message */
function showPrivacyError() {
    const error = getErrorElement();

    error.innerText = "Please accept the privacy policy";
    error.style.color = "#EC7B7B";
    error.classList.add("is-visible");
}

/** Gets form data from input fields */
function getFormData() {
    return {
        name: document.querySelector('[name="name"]').value,
        email: document.querySelector('[name="email"]').value,
        message: document.querySelector('[name="message"]').value
    };
}

/** Updates submit button state and text */
function setButtonState(disabled, text) {
    const btn = document.querySelector('button[type="submit"]');

    btn.disabled = disabled;
    btn.innerText = text;
}

/** Sends email using EmailJS service */
function sendEmail(formData) {
  return  emailjs.send(
        "service_a5hs47c",
        "template_6s3rwh8",
        formData
    )
    .then(handleSuccess)
    .catch(handleError);
}

/** Handles successful email submission */
function handleSuccess() {
    const success = getSuccessElement();

    success.innerText = "Message sent successfully";
    success.style.color = "#3DCFB6";
    success.classList.add("is-visible");

    document.querySelector("form").reset();

    setButtonState(false, "Say Hello ;)");
}

/** Handles email submission error */
function handleError(error) {
    console.error(error);

    const statusError = getErrorElement();
    statusError.innerText = "Something went wrong. Try again.";
    statusError.style.color = "#EC7B7B";
    statusError.classList.add("is-visible");

    setButtonState(false, "Try again");
}

/** Returns success message element */
function getSuccessElement() {
    return document.getElementById("form-status");
}

/** Returns error message element */
function getErrorElement() {
    return document.getElementById("privacy-error");
}