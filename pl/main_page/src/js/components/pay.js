// checkout

let pay = document.querySelector(".btn-pay");
let sectPay = document.querySelector(".sectPay");

let wrapperDate = document.querySelector(".inputMY");
let wrapperDate1 = document.querySelector(".month-inp");
let wrapperDate2 = document.querySelector(".year-inp");

// const payment = document.querySelector('.payment');
// const thanks = document.querySelector('.thanks');
// const thanksBack = document.querySelector('.thanks__btn');
// const modalOpen = document.querySelectorAll('.open-modal');

let ccNumberInput = document.querySelector(".numb-inp"),
    ccNumberPattern = /^\d{0,16}$/g,
    ccNumberSeparator = " ",
    ccNumberInputOldValue,
    ccNumberInputOldCursor,
    ccExpiryInputMM = document.querySelector(".month-inp"),
    ccExpiryPattern = /^\d{0,4}$/g,
    ccExpirySeparator = "/",
    ccExpiryInputMMOldValue,
    ccExpiryInputMMOldCursor,
    ccExpiryInputYY = document.querySelector(".year-inp"),
    ccExpiryInputYYOldValue,
    ccExpiryInputYYOldCursor,
    ccCVCInput = document.querySelector(".cvv-inp"),
    ccCVCPattern = /^\d{0,3}$/g,
    // https://imask.js.org/guide.html читаем и делаем
    mask = (value, limit, separator) => {
        var output = [];
        for (let i = 0; i < value.length; i++) {
            if (i !== 0 && i % limit === 0) {
                output.push(separator);
            }

            output.push(value[i]);
        }

        return output.join("");
    },
    unmask = (value) => value.replace(/[^\d]/g, ""),
    checkSeparator = (position, interval) =>
        Math.floor(position / (interval + 1)),
    ccNumberInputKeyDownHandler = (e) => {
        let el = e.target;
        ccNumberInputOldValue = el.value;
        ccNumberInputOldCursor = el.selectionEnd;
    },
    ccNumberInputInputHandler = (e) => {
        let el = e.target,
            newValue = unmask(el.value),
            newCursorPosition;

        if (newValue.match(ccNumberPattern)) {
            newValue = mask(newValue, 4, ccNumberSeparator);

            newCursorPosition =
                ccNumberInputOldCursor -
                checkSeparator(ccNumberInputOldCursor, 4) +
                checkSeparator(
                    ccNumberInputOldCursor +
                    (newValue.length - ccNumberInputOldValue.length),
                    4
                ) +
                (unmask(newValue).length - unmask(ccNumberInputOldValue).length);

            el.value = newValue !== "" ? newValue : "";
        } else {
            el.value = ccNumberInputOldValue;
            newCursorPosition = ccNumberInputOldCursor;
        }

        el.setSelectionRange(newCursorPosition, newCursorPosition);

        // highlightCC(el.value);
    },
    // для людей которые задают вопросы https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange#example
    ccExpiryInputMMKeyDownHandler = (e) => {
        let el = e.target;
        ccExpiryInputMMOldValue = el.value;
        ccExpiryInputMMOldCursor = el.selectionEnd;
    },
    ccExpiryInputMMInputHandler = (e) => {
        let el = e.target,
            newValue = el.value;

        newValue = unmask(newValue);
        if (newValue.match(ccExpiryPattern)) {
            newValue = mask(newValue, 3, ccExpirySeparator);
            el.value = newValue;
        } else {
            el.value = ccExpiryInputMMOldValue;
        }
    };
(ccExpiryInputYYKeyDownHandler = (e) => {
    let el = e.target;
    ccExpiryInputYYOldValue = el.value;
    ccExpiryInputYYOldCursor = el.selectionEnd;
}),
    (ccExpiryInputYYInputHandler = (e) => {
        let el = e.target,
            newValue = el.value;

        newValue = unmask(newValue);
        if (newValue.match(ccExpiryPattern)) {
            newValue = mask(newValue, 2, ccExpirySeparator);
            el.value = newValue;
        } else {
            el.value = ccExpiryInputYYOldValue;
        }
    });
// чекаю корректность введенных данных и подсвечиваю поля
const checkAreaNum = () => {
    if (ccNumberInput.value.length < 19) {
        ccNumberInput.classList.add("error");
        ccNumberInput.classList.remove("succes");
    } else {
        ccNumberInput.classList.add("succes");
        ccNumberInput.classList.remove("error");
    }
};
const checkAreaDate = () => {
    if (ccExpiryInputMM.value.length < 2 || ccExpiryInputYY.value.length < 2) {
        wrapperDate.classList.add("error");
        wrapperDate.classList.remove("succes");
    } else {
        wrapperDate.classList.add("succes");
        wrapperDate.classList.remove("error");
    }
};
const checkAreaCvc = () => {
    if (ccCVCInput.value.length < 3) {
        ccCVCInput.classList.add("error");
        ccCVCInput.classList.remove("succes");
    } else {
        ccCVCInput.classList.add("succes");
        ccCVCInput.classList.remove("error");
    }
};

// function checkDateYY() {
//     if (ccExpiryInputYY.value.length > 1) {
//         ccExpiryInputYY.classList.add("success");
//         ccExpiryInputYY.classList.remove("error");
//     } else {
//         ccExpiryInputYY.classList.remove("success");
//         ccExpiryInputYY.classList.add("error");
//     }
// }
// ccExpiryInputYY.addEventListener('input', checkDateYY)
// чекаем главное условие для разблокировки pay
function checkArea() {
    document.addEventListener("input", (e) => {
        if (
            ccNumberInput.value.length == 19 &&
            ccExpiryInputYY.value.length == 2 &&
            ccCVCInput.value.length == 3
        ) {
            pay.removeAttribute("disabled");
            pay.classList.remove("disabled");
        } else {
            pay.setAttribute("disabled", "disabled");
            pay.classList.add("disabled");
        }
    });
    ccNumberInput.onclick('input', function () {
        checkAreaNum();
    });
    ccExpiryInputMM.onclick('input', function () {
        checkAreaDate();
    });
    ccExpiryInputYY.onclick('input', function () {
        checkAreaDate();
    });
    ccCVCInput.onclick('input', function () {
        checkAreaCvc();
    });
}
checkArea();

ccCVCInput.value.length == 3

// ограничение для ввода месяца
ccExpiryInputMM.addEventListener("input", (e) => {
    let value = +ccExpiryInputMM.value;
    if (value > 12) {
        ccExpiryInputMM.value = "";
    } else if (ccExpiryInputMM.value == "00") {
        ccExpiryInputMM.value = "";
    }
});
ccExpiryInputMM.addEventListener("blur", (e) => {
    let value = +ccExpiryInputMM.value;
    if (ccExpiryInputMM.value.length == 1) {
        ccExpiryInputMM.value = `0${value}`;
        checkAreaDate();
    }
});

// ограничение для ввода года
ccExpiryInputYY.addEventListener("change", (e) => {
    let value = +ccExpiryInputYY.value;
    if (value > 30) {
        ccExpiryInputYY.value = "";
    } else if (value < 20) {
        ccExpiryInputYY.value = "";
    }
    checkAreaDate();
});

// проверка введеннх данных через функции

ccNumberInput.addEventListener("keydown", ccNumberInputKeyDownHandler);
ccNumberInput.addEventListener("input", ccNumberInputInputHandler);
ccExpiryInputMM.addEventListener("keydown", ccExpiryInputMMKeyDownHandler);
ccExpiryInputMM.addEventListener("input", ccExpiryInputMMInputHandler);
ccCVCInput.addEventListener("keydown", ccExpiryInputMMKeyDownHandler);
ccCVCInput.addEventListener("input", ccExpiryInputMMInputHandler);
pay.addEventListener("click", (e) => {
    sectPay.style.opacity = '0';
    setTimeout(function () {
        sectPay.style.opacity = '1';
    }, 400);

});


// валидация


var form = document.forms.validation;
if (form) {
    form.addEventListener('input', function (event) {
        var inputIndex = getIndexFromSet(form, event.target);
        if (event.target.value.length >= parseInt(event.target.getAttribute('maxlength'))) {
            if (inputIndex < form.length - 1) {
                form[inputIndex + 1].focus();
            } else {
                form[0].focus();
            }
        }
        if (event.target.value.length == 0) {
            if (inputIndex > 0) {
                form[inputIndex - 1].focus();
            } else {
                form[form.length - 1].focus();
            }
        }
    });
}

function getIndexFromSet(set, elm) {
    var setArr = [].slice.call(set);
    for (var i in setArr) {
        if (setArr[i] == elm) {
            return parseInt(i);
        };
    }
}
