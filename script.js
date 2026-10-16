/* CAMERA POP-UP */

const cameraButton = document.querySelector("#cameraButton");
const photoResult = document.querySelector("#photoResult");
const cameraFlash = document.querySelector("#cameraFlash");
const closePhoto = document.querySelector("#closePhoto");

/* Opens the funny picture */

if (cameraButton && photoResult && cameraFlash) {
    cameraButton.addEventListener("click", function () {
        cameraFlash.classList.remove("flash-active");

        void cameraFlash.offsetWidth;

        cameraFlash.classList.add("flash-active");

        setTimeout(function () {
            photoResult.hidden = false;
            cameraButton.setAttribute("aria-expanded", "true");
        }, 200);
    });
}

/* Closes the funny picture */

if (closePhoto && photoResult && cameraButton) {
    closePhoto.addEventListener("click", function () {
        photoResult.hidden = true;
        cameraButton.setAttribute("aria-expanded", "false");
    });
}


/* DRAWING CANVAS */

const drawingCanvas = document.querySelector("#drawingCanvas");
const clearButton = document.querySelector("#clearButton");

if (drawingCanvas) {
    const drawingContext = drawingCanvas.getContext("2d");

    /* Sets the canvas size and brush */

    function prepareCanvas() {
        const canvasSize = drawingCanvas.getBoundingClientRect();

        drawingCanvas.width = canvasSize.width;
        drawingCanvas.height = canvasSize.height;

        drawingContext.strokeStyle = "#c43478";
        drawingContext.lineWidth = 4;
        drawingContext.lineCap = "round";
        drawingContext.lineJoin = "round";
    }

    prepareCanvas();

    let isDrawing = false;

    /* Starts drawing */

    drawingCanvas.addEventListener("pointerdown", function (event) {
        event.preventDefault();

        isDrawing = true;
        drawingCanvas.setPointerCapture(event.pointerId);

        const canvasPosition = drawingCanvas.getBoundingClientRect();

        drawingContext.beginPath();

        drawingContext.moveTo(
            event.clientX - canvasPosition.left,
            event.clientY - canvasPosition.top
        );
    });

    /* Draws while the pointer moves */

    drawingCanvas.addEventListener("pointermove", function (event) {
        if (!isDrawing) {
            return;
        }

        event.preventDefault();

        const canvasPosition = drawingCanvas.getBoundingClientRect();

        drawingContext.lineTo(
            event.clientX - canvasPosition.left,
            event.clientY - canvasPosition.top
        );

        drawingContext.stroke();
    });

    /* Stops drawing */

    drawingCanvas.addEventListener("pointerup", function (event) {
        isDrawing = false;
        drawingCanvas.releasePointerCapture(event.pointerId);
    });

    drawingCanvas.addEventListener("pointerleave", function () {
        isDrawing = false;
    });

    drawingCanvas.addEventListener("pointercancel", function () {
        isDrawing = false;
    });

    /* Clears the drawing */

    if (clearButton) {
        clearButton.addEventListener("click", function () {
            isDrawing = false;

            drawingContext.clearRect(
                0,
                0,
                drawingCanvas.width,
                drawingCanvas.height
            );

            drawingContext.beginPath();
        });
    }
}


/* RANDOM REMINDERS */

const reminderButton = document.querySelector("#reminderButton");
const reminderText = document.querySelector("#reminderText");

const reminders = [
    "You're doing better than you think!",
    "Take a break and drink some water.",
    "Small progress is still progress.",
    "Your ideas are worth creating.",
    "Be proud of how far you've come.",
    "You've got this!",
    "Remember to save your work!"
];

if (reminderButton && reminderText) {
    reminderButton.addEventListener("click", function () {
        const randomNumber = Math.floor(
            Math.random() * reminders.length
        );

        reminderText.textContent = reminders[randomNumber];
    });
}


/* CONTACT FORM */

const contactForm = document.querySelector("#contactForm");
const nameInput = document.querySelector("#fname");
const emailInput = document.querySelector("#email");

const nameError = document.querySelector("#nameError");
const emailError = document.querySelector("#emailError");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        let formIsValid = true;

        /* Removes old error messages */

        nameError.textContent = "";
        emailError.textContent = "";

        nameInput.classList.remove("input-error");
        emailInput.classList.remove("input-error");

        /* Checks the name */

        if (nameInput.value.trim() === "") {
            nameError.textContent = "Please enter your name.";
            nameInput.classList.add("input-error");
            formIsValid = false;
        }

        /* Checks the email */

        if (emailInput.value.trim() === "") {
            emailError.textContent = "Please enter your email.";
            emailInput.classList.add("input-error");
            formIsValid = false;
        } else if (!emailInput.validity.valid) {
            emailError.textContent = "Please enter a valid email.";
            emailInput.classList.add("input-error");
            formIsValid = false;
        }

        /* Stops the form if there is an error */

        if (!formIsValid) {
            event.preventDefault();
        }
    });
}

/* CONTACT CALENDAR */

const calendarTitle = document.querySelector("#calendarTitle");
const calendarGrid = document.querySelector("#calendarGrid");
const previousMonthButton = document.querySelector("#previousMonth");
const nextMonthButton = document.querySelector("#nextMonth");

/* Starts on the current month */

let displayedDate = new Date();

/* Builds the calendar */

function renderCalendar() {
    if (!calendarTitle || !calendarGrid) {
        return;
    }

    const year = displayedDate.getFullYear();
    const month = displayedDate.getMonth();

    /* Shows the month and year */

    calendarTitle.textContent = new Intl.DateTimeFormat("en-US", {
        month: "long",
        year: "numeric"
    }).format(displayedDate);

    /* Removes the old dates */

    calendarGrid
        .querySelectorAll(".empty-day, .day-number")
        .forEach(function (calendarCell) {
            calendarCell.remove();
        });

    /* Finds the first day */

    const firstDayOfMonth = new Date(
        year,
        month,
        1
    ).getDay();

    /* Finds the number of days */

    const numberOfDays = new Date(
        year,
        month + 1,
        0
    ).getDate();

    /* Adds empty spaces */

    for (let index = 0; index < firstDayOfMonth; index++) {
        const emptyCell = document.createElement("div");

        emptyCell.classList.add("empty-day");
        calendarGrid.appendChild(emptyCell);
    }

    /* Adds the dates */

    for (let day = 1; day <= numberOfDays; day++) {
        const dayCell = document.createElement("div");

        dayCell.classList.add("day-number");
        dayCell.textContent = day;

        /* Highlights today */

        const today = new Date();

        const isToday =
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();

        if (isToday) {
            dayCell.classList.add("today");
        }

        calendarGrid.appendChild(dayCell);
    }
}


/* Previous month */

if (previousMonthButton) {
    previousMonthButton.addEventListener("click", function () {
        displayedDate.setMonth(
            displayedDate.getMonth() - 1
        );

        renderCalendar();
    });
}


/* Next month */

if (nextMonthButton) {
    nextMonthButton.addEventListener("click", function () {
        displayedDate.setMonth(
            displayedDate.getMonth() + 1
        );

        renderCalendar();
    });
}


/* Shows the calendar */

renderCalendar();