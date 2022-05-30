/*
    * Переменные в camelCase хранят данные из JS
    * Переменные в under_score хранят данные из DOM
    * Переменные с приставкой "ls" хрнят значения для localStorage
    * Значение всех "тестовых" переменных назначено в начале файла
    * Ссылка на исходник в корневой дирректории в README
*/




//!||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||




"use.strict"



import * as EmailValidator from 'email-validator';
import Swiper, { Pagination } from 'swiper';
import "regenerator-runtime/runtime.js";


var sliderQuantity = 3
const swiper1 = new Swiper('.swiper_1', {

    modules: [Pagination],
    loop: true,

    autoplay: {
        delay: 3000,
        disableOnInteraction: true,
    },

    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },

    keyboard: {
        enabled: true,
        onlyInViewport: false,
    },

    mousewheel: {
        sensitivity: 1
    },

    slidesPerView: 1,
    spaceBetween: 45,

    autoHeight: true,
    loopAdditionalSlides: sliderQuantity,

    breakpoints: {
        1024: {
            slidesPerView: sliderQuantity,
        },
    }
});

const swiper2 = new Swiper('.swiper_2', {

    modules: [Pagination],
    loop: true,

    autoplay: {
        delay: 3000,
        disableOnInteraction: true,
    },

    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },

    keyboard: {
        enabled: true,
        onlyInViewport: false,
    },

    mousewheel: {
        sensitivity: 1
    },

    slidesPerView: 1,
    spaceBetween: 45,

    autoHeight: true,
    loopAdditionalSlides: sliderQuantity,

    breakpoints: {
        1024: {
            slidesPerView: sliderQuantity,
        },
    }
});


//!||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||





function calcRecommendations(gender) {
    let waterType = 0,
        calType = 0;
    if (gender === 'male') {
        waterType = 35
        calType = -5
    } else {
        waterType = 31
        calType = 161
    }

    // BMI
    if (localStorage[lsWeightType] === kg_C.name) {
        var BMI = (+localStorage[lsKg_C] / Math.pow((+localStorage[lsTall] / 100), 2)).toFixed(2)
    } else {
        var BMI = (+localStorage[lsLbs_C] / Math.pow(((localStorage.vean_tall / 100) * 39.37), 2) * 703).toFixed(2)
    }

    let leftW = BMI / 60 * 100,
        dataBim = BMI
        ;
    if (leftW >= 95) {
        leftW = 95
        dataBim = '60 <'
    }
    recommendation__BMI_input.style.cssText = `left: ${leftW}%`
    recommendation__BMI_input.dataset.bmi = dataBim

    if (BMI < 18.50) {
        healthyEl.textContent = underweight
    } else if (BMI >= 18.50 && BMI < 24.9) {
        healthyEl.textContent = healthy
    } else if (BMI >= 25 && BMI < 29.9) {
        healthyEl.textContent = overweight
    } else {
        healthyEl.textContent = obese
    }


    // Water
    let normalConsumption = (+localStorage[lsKg_C] * waterType / 1000).toFixed(1)
    water.textContent += normalConsumption
    normalConsumption /= 0.5

    normalConsumption < 10 ? normalConsumption : normalConsumption = 10
    for (let i = 0; i < Math.round(normalConsumption); i++) {
        const recommendation__glas = recommendation__glasses[i];
        recommendation__glas.classList.add('_filled')
    }


    // Cal
    const recommendedCal = ((10 * localStorage[lsKg_C]) + (6.25 * localStorage[lsTall]) - (5 * localStorage[lsAge]) - calType).toFixed(0)
    cal.textContent = recommendedCal + cal.textContent
    let leftC = recommendedCal / 5000 * 100;
    if (leftC >= 95) {
        leftC = 95
    }
    recommendation__calories_input.style.cssText = `left: ${leftC}%`
    recommendation__calories_input.dataset.calories = `${(recommendedCal * 0.9).toFixed(0)} - ${(recommendedCal * 1.1).toFixed(0)}`
}


function writeWeight(test_unit_first, lbs, kg) {
    if (test_unit_first.classList.contains('_show')) {
        localStorage.setItem(localPredix + lbs.id, lbs.value)
        localStorage.setItem(localPredix + kg.id, (lbs.value * 0.45).toFixed(0))
        localStorage.setItem(lsWeightType, lbs.name)
    } else {
        localStorage.setItem(localPredix + lbs.id, (kg.value * 2.2).toFixed(0))
        localStorage.setItem(localPredix + kg.id, kg.value)
        localStorage.setItem(lsWeightType, kg.name)
    }
}



function calcGoalDate(date, numb, el) {
    date.setMonth(date.getMonth() + numb)
    let month = date.toLocaleString(langByDate, { month: 'long' });
    month = month.charAt(0).toUpperCase() + month.slice(1);
    el.textContent += month + ' ' + date.getFullYear()
}



function calcGraphDate(date, numb, el, isYear) {
    date.setMonth(date.getMonth() + numb)
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()

    if (day < 10 && month < 10) {
        el.forEach(el => {
            isYear
                ? el.textContent += '0' + day + '/0' + month + '/' + year
                : el.textContent += '0' + day + '/0' + month
        })
    } else if (day < 10) {
        el.forEach(el => {
            isYear
                ? el.textContent += '0' + day + '/' + month + '/' + year
                : el.textContent += '0' + day + '/' + month
        })
    } else if (month < 10) {
        el.forEach(el => {
            isYear
                ? el.textContent += day + '/0' + month + '/' + year
                : el.textContent += day + '/0' + month
        })
    } else {
        el.forEach(el => {
            isYear
                ? el.textContent += day + '/' + month + '/' + year
                : el.textContent += day + '/' + month
        })
    }
}



function checkGoalType() {

    function setGoalWeight(unit_C, unit_G) {

        if (+localStorage[unit_G] > +localStorage[unit_C]) {

            // Набираем массу
            plan__graph_up.classList.add('_show')

            if ((localStorage[unit_G] - localStorage[unit_C]) > 10) {
                localStorage.setItem(unit_G, (localStorage[unit_C] + 10))
            }

            let j = 2
            for (let i = 0; i < goal_weights.length; i++) {
                const goal_weight = goal_weights[i];
                goal_weight.textContent = localStorage[unit_G] - j
                j--
            }

        } else {

            // Худеем
            plan__graph_doun.classList.add('_show')

            if ((localStorage[unit_C] - localStorage[unit_G]) > 10) {
                localStorage.setItem(unit_G, (localStorage[unit_C] - 10))
            }

            let j = -2
            for (let i = 0; i < goal_weights.length; i++) {
                const goal_weight = goal_weights[i];
                goal_weight.textContent = localStorage[unit_G] - j
                j++
            }
        }

        plan__start_weight.forEach(el => el.textContent = localStorage[unit_C])
    }


    if (localStorage[lsWeightType] === kg_C.name) {
        setGoalWeight(lsKg_C, lsKg_G)
        swiper__value.forEach(el => el.textContent = Math.round(el.textContent * 0.45))
        swiper__unit.forEach(el => el.textContent = localStorage[lsWeightType])

    } else {
        setGoalWeight(lsLbs_C, lsLbs_G)
    }


    plan__unit_type.textContent = localStorage[lsWeightType]
    plan__start_weight_type.forEach(el => el.textContent = localStorage[lsWeightType])
}



function calcTall(ft, in_) {
    return ((0.3048 * +ft + 0.0254 * +in_) * 100).toFixed(0)
}



function validCheck(input) {
    var
        valid = input.value.replace(/[^0-9]/g, '');
    input.value = valid;
}



function loaderStart(sectionNext, index) {
    loader.classList.add('_show')
    rights.classList.remove('_show')
    reserved.classList.remove('g')
    email.classList.remove('g')
    terms_el.classList.remove('g')
    privacy.classList.remove('g')
    cookie.classList.remove('g')
    var
        bar = new ldBar(".myBar", {
            "stroke-trail": strokeColor,
            "stroke-trail-width": 1,
            "stroke": 'data:ldbar/res,gradient(90, 0, #F8C476, #F4955F, #F34E4E)',
            "stroke-width": 1,
            "preset": "circle",
            "transition-in": 2,
            "duration": 2,
            "value": 10
        }),
        shots = [20, 45, 65, 85, 100],
        i = 0
        ;
    var
        baseline = loader.querySelector('.baseline'),
        mainline = loader.querySelector('.mainline')
        ;
    baseline.setAttribute('stroke-width', 7)
    mainline.setAttribute('stroke-width', 7)

    var animation = setInterval(() => {
        anim(i);
        i++
    }, 2000);


    function anim(i) {
        if (i === shots.length) {
            setTimeout(() => {
                test_header.classList.add('_plan')
                checkGoalType()
                calcRecommendations(gender)

                sectionNext.classList.add('_show')
                loader.classList.remove('_show')
                rights.classList.add('_show')
                localStorage.setItem(lsProgress, index + 1)

                clearInterval(animation);
                return
            }, 1000);

        } else {

            bar.set(shots[i]);
            loaderTitls.forEach(el => {
                if (+el.dataset.pos > -3) {
                    el.dataset.pos = +el.dataset.pos - 1
                }
            });
        }
    }
};



function timer() {
    let deadline = new Date().getTime() + (900 * 1000)
    // id таймера
    let
        timerId = null;
    // склонение числительных
    function declensionNum(num, words) {
        return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
    }
    // вычисляем разницу дат и устанавливаем оставшееся времени в качестве содержимого элементов
    function countdownTimer() {
        // сейчас
        let
            now = new Date().getTime();
        let
            diff = deadline - now;
        //console.log(now);
        if (diff <= 0) {
            clearInterval(timerId);
        }
        let
            minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0,
            seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
        //console.log(diff);
        //console.log(hours,minutes,seconds);
        $minutes.textContent = minutes < 10 ? '0' + minutes : minutes;
        $seconds.textContent = seconds < 10 ? '0' + seconds : seconds;
        $minutes.dataset.title = declensionNum(minutes, ['минута', 'минуты', 'минут']);
        $seconds.dataset.title = declensionNum(seconds, ['секунда', 'секунды', 'секунд']);
    }
    // получаем элементы, содержащие компоненты даты
    const
        $minutes = document.querySelector('.minutes__value'),
        $seconds = document.querySelector('.seconds__value');
    // вызываем функцию countdownTimer
    countdownTimer();
    // вызываем функцию countdownTimer каждую секунду
    timerId = setInterval(countdownTimer, 1000);
}




//!||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||




// DOM елементы

var
    sections = document.querySelectorAll('.container section'),
    footer = document.querySelector('footer'),
    overlay = document.querySelector('.js-overlay-modal'),
    buttonB = document.querySelector('.test__buttonB'),
    progress = document.querySelector('.test_header__progress_bar'),
    test_header = document.querySelector('.test_header'),
    header_progress = document.querySelector('.test_header__progress_container'),
    _index = document.querySelector('._index'),
    loader = document.querySelector('.loader'),
    loaderTitls = loader.querySelectorAll('.loader__title'),
    test__uncorrect = document.querySelector('.test__uncorrect'),
    cm = document.querySelector('#cm'),
    ft = document.querySelector('#ft'),
    in_ = document.querySelector('#in'),
    kg_C = document.querySelector('#kg_C'),
    lbs_C = document.querySelector('#lbs_C'),
    kg_G = document.querySelector('#kg_G'),
    lbs_G = document.querySelector('#lbs_G'),
    goal_weights = document.querySelectorAll('[data-goal_weight]'),
    plan__goal_date = document.querySelector('.plan__goal_date'),
    plan__unit_type = document.querySelector('.plan__unit_type'),
    plan__start_weight = document.querySelectorAll('.plan__start_weight'),
    plan__start_weight_type = document.querySelectorAll('.plan__start_weight_type'),
    plan__graph_up = document.querySelector('.plan__graph_up'),
    plan__graph_doun = document.querySelector('.plan__graph_doun'),
    plan__graph_date_1 = document.querySelectorAll('.plan__graph_date_1'),
    plan__graph_date_2 = document.querySelectorAll('.plan__graph_date_2'),
    plan__graph_date_3 = document.querySelectorAll('.plan__graph_date_3'),
    recommendation__BMI_input = document.querySelector('.recommendation__BMI_input'),
    recommendation__glasses = document.querySelectorAll('.recommendation__glass'),
    recommendation__calories_input = document.querySelector('.recommendation__calories_input'),
    healthyEl = document.querySelector('.healthy'),
    water = document.querySelector('.water'),
    cal = document.querySelector('.cal'),
    swiper_elements = document.querySelectorAll('.swiper'),
    checkout__FQA = document.querySelectorAll('.checkout__FQA'),
    m1__tarif_coast = document.querySelector('.m1__tarif_coast'),
    m1__total_coast = document.querySelector('.m1__total_coast'),
    trial__currenncy = document.querySelector('.trial__currenncy'),
    note__cost = document.querySelector('.note__cost'),
    m1__close = document.querySelector('.m1__close'),
    m2__close = document.querySelector('.m2__close'),
    overlay = document.querySelector('.js-overlay-modal'),
    m2 = document.querySelector('.m2'),
    modalThx = document.querySelector('.m3'),
    m1__order_sale = document.querySelector('.m1__order_sale'),
    m1__sale_amount = document.querySelector('.m1__sale_amount'),
    m1__saved = document.querySelector('.m1__saved'),
    m1__saved_amount = document.querySelector('.m1__saved_amount'),
    tarif__old_price = document.querySelector('.tarif__old_price'),
    scroll = document.querySelectorAll('.scroll'),
    target = document.querySelector('.target'),
    test_header__lang = document.querySelector('.test_header__lang'),
    wrapper_loader = document.querySelector('.wrapper-loader'),
    checkout__tarif = document.querySelector('.checkout__tarif'),
    init_checkout = document.querySelector('[data-modal="1"]'),
    data_pusher = document.querySelector('.data_pusher'),
    swiper__value = document.querySelectorAll('.swiper__value'),
    swiper__unit = document.querySelectorAll('.swiper__unit'),
    order__error = document.querySelector('.order__error'),
    order__error_M = document.querySelector('.order__error_M'),
    rights = document.querySelector('.rights'),
    reserved = document.querySelector('.reserved'),
    email = document.querySelector('.email'),
    terms_el = document.querySelector('.terms_el'),
    privacy = document.querySelector('.privacy'),
    cookie = document.querySelector('.cookie'),
    m1__pay = document.querySelector('.m1__pay'),
    m1__pay_pal = document.querySelector('.m1__pay_pal'),
    m1__pay_method = document.querySelectorAll('.m1__pay_method'),
    m1__email = document.querySelector('.m1__email'),
    stripe_button = document.querySelector('.stripe-button'),
    langs = document.querySelectorAll('.lang')
    ;


// Текстовые переменные

var lang = document.documentElement.lang,
    quiz_id = 'fitnessquiz',
    bundle_id = 'com.vean.app',
    country = document.documentElement.dataset.country,
    gender = document.documentElement.dataset.gender,
    amount = document.querySelector('[data-price]').dataset.price,
    total = {
        label: 'Vean',
        amount: amount * 100,
    }
    ;


switch (country) {
    case 'US':
        var mark = '$',
            stripeErrorMessage = 'Your card number is invalid.',
            currency = 'usd'
        break;

    case 'RO':
        var mark = 'lei',
            stripeErrorMessage = 'Numărul cardului dvs. este nevalid.',
            currency = 'ron'
        break;

    case 'CZ':
        var mark = 'Kč',
            stripeErrorMessage = 'Číslo vaší karty je neplatné.',
            currency = 'czk'
        break;

    case 'PL':
        var mark = 'zł',
            stripeErrorMessage = 'Twój numer karty jest nieprawidłowy.',
            currency = 'pln'
        break;

    default:
        var mark = '$',
            stripeErrorMessage = 'Your card number is invalid.',
            currency = 'usd'
        break;
}

// prod
window.endPoint = 'https://api.vean.io/web/';
const redirect = 'https://personal.vean.io/'
const paypalTarif = 'P-0C749418NV016082EMHF6J3Q'
// dev
// window.endPoint = 'https://api-dev.myedusystem.com/web/';
// const redirect = 'https://lk-dev.myedusystem.com/'
// const paypalTarif = 'P-8K907337DS105793GMEPTRLI'

const PUBLISHABLE_KEY = 'pk_live_51IYW2IIaWhvqi0diNai6LP9uR7LXyY8QAwEuSyF3gCvAD1SN6wJUgEFkZkOQNBpj0KPJK6xCRyNT8CYXFmNFprCe00svp9lGT1';
const course_id = 5167


var
    ageSection = 1,                                                     //! Возраст
    tallSection = 3,                                                    //! Рост
    currentWeightSection = 4,                                           //! Текущий вес
    goalWeightSection = 5,                                              //! Цель
    questionsLenght = 17,
    planSection = 18,                                                   //! plan
    paySection = 19,                                                    //! pay
    localPredix = 'vean_',                                              //! Локальный перфикс и значения для localStorage
    lsProgress = localPredix + 'progress',
    lsEmail = localPredix + 'email',
    lsTall = localPredix + cm.name,
    lsAge = localPredix + 'age',
    lsFt = localPredix + ft.id,
    lsIn = localPredix + in_.id,
    lsLbs_C = localPredix + lbs_C.id,
    lsKg_C = localPredix + kg_C.id,
    lsLbs_G = localPredix + lbs_G.id,
    lsKg_G = localPredix + kg_G.id,
    lsWeightType = localPredix + 'weight_type',
    lsTarifId = localPredix + 'tarif_id',
    lsLoadQuiz = localPredix + 'loadQuiz',
    lsCode = localPredix + 'code',
    lsId = localPredix + 'id',
    lsUtm = localPredix + 'utm',
    underweight = 'Underweight',
    healthy = 'Healthy',
    overweight = 'Overweight',
    obese = 'Obese',
    strokeColor = '',
    langByDate = lang + '-' + country
    ;

// в методе toLocaleString() параметр locale принимает значение, иногда отличающееся от общепринятого
if (lang === 'cz') {
    langByDate = 'cs' + '-' + country
}

gender === 'male' ? strokeColor = '#32384D' : strokeColor = '#CED4E4'

let utm_campaign,
    utm_source,
    utm_medium,
    test,
    utm_term,
    esub,
    pub_id,
    utm_content;

let iventPrefix = '',
    iventPrefix2 = ''
    ;
gender === 'male' ? iventPrefix = 'm_' : iventPrefix = 'f_'
gender === 'male' ? iventPrefix2 = 'male_' : iventPrefix2 = 'female_'

var ftSum = 0,
    ftValue = 0,
    inValue
    ;




//!||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||




// Инициализация

test_header__lang.textContent = lang + test_header__lang.textContent

localStorage.setItem('home', window.location.href)

if (!+localStorage[lsProgress]) {
    localStorage.setItem(lsProgress, 0);
    buttonB.classList.remove('_show');
} else {
    progress.setAttribute(`value`, +localStorage[lsProgress] + 1);
}

var section = sections[+localStorage[lsProgress]];
if (+localStorage[lsProgress]) {
    (sections[0]).classList.remove('_show');
    section.classList.add('_show');
}

if (+localStorage[lsProgress] > questionsLenght) header_progress.classList.remove('_show');
if (+localStorage[lsProgress] === planSection) {
    test_header.classList.add('_plan')
    calcRecommendations(gender)
}
if (+localStorage[lsProgress] === paySection) {
    test_header.classList.add('_checkout')
}
if (+localStorage[lsProgress] > planSection) timer();

_index.innerHTML = +localStorage[lsProgress] + 1;

if (localStorage[lsTall]) cm.value = localStorage[lsTall]
if (localStorage[lsFt]) ft.value = localStorage[lsFt]
if (localStorage[lsIn]) in_.value = localStorage[lsIn]
if (localStorage[lsLbs_C]) lbs_C.value = localStorage[lsLbs_C]
if (localStorage[lsKg_C]) kg_C.value = localStorage[lsKg_C]
if (localStorage[lsLbs_G]) lbs_G.value = localStorage[lsLbs_G]
if (localStorage[lsKg_G]) kg_G.value = localStorage[lsKg_G]

checkGoalType()
calcGoalDate(new Date(), 2, plan__goal_date)
calcGraphDate(new Date(), 0, plan__graph_date_1, false)
calcGraphDate(new Date(), 1, plan__graph_date_2, true)
calcGraphDate(new Date(), 2, plan__graph_date_3, true)

var bar2 = new ldBar(".staticBar", {
    "stroke-trail": strokeColor,
    "stroke-trail-width": 1,
    "stroke": 'data:ldbar/res,gradient(0, 0, #F8C476, #F4955F, #F34E4E)',
    "stroke-width": 1,
    "preset": "circle",
    "transition-in": 2,
    "duration": 2,
    "value": 90
})

var
    staticBar = document.querySelector('.staticBar'),
    baseline = staticBar.querySelector('.baseline'),
    mainline = staticBar.querySelector('.mainline')
    ;
baseline.setAttribute('stroke-width', 4)
mainline.setAttribute('stroke-width', 4)

m1__tarif_coast.innerHTML = mark + '&#160;' + amount
m1__total_coast.innerHTML = mark + '&#160;' + amount
trial__currenncy.textContent = mark
note__cost.textContent = mark
tarif__old_price.innerHTML = mark + '&#160;' + amount




//!||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||




// Главный цикл

for (let index = 0; index < sections.length; index++) {
    const
        section = sections[index],
        sectionNext = sections[+index + 1]
        ;

    const
        test__button_next = section.querySelectorAll('.test__button_next')
        ;

    const
        test__nothing = section.querySelector('.test__nothing'),
        test__inputs = section.querySelectorAll('.test__input'),
        test__labels = section.querySelectorAll('.test__label'),
        test_unit_first = section.querySelector('.test_unit_f'),
        test_unit_fecond = section.querySelector('.test_unit_s'),
        test__unit_type = section.querySelectorAll('.test__unit_type input')
        ;



    // Инпуты

    for (const input of test__inputs) {


        if (input.value > 0) test__button_next.forEach(el => el.disabled = false)


        input.addEventListener('input', () => {

            if (input.getAttribute('type') === 'tel') {
                validCheck(input)

                if (/kg/.test(input.id)) {
                    if (input.value >= 40 && input.value <= 250) {

                        test__button_next.forEach(el => el.disabled = false);

                    } else {

                        test__button_next.forEach(el => el.disabled = true);
                    }

                } else if (/lbs/.test(input.id)) {
                    if (input.value >= 88 && input.value <= 550) {

                        test__button_next.forEach(el => el.disabled = false);

                    } else {

                        test__button_next.forEach(el => el.disabled = true);
                    }

                } else if (/cm/.test(input.id)) {
                    if (input.value >= 90 && input.value <= 220) {

                        test__button_next.forEach(el => el.disabled = false);

                    } else {

                        test__button_next.forEach(el => el.disabled = true);
                    }
                } else if (/ft/.test(input.id)) {
                    ftValue = input.value
                    ftSum = (ftValue * 12) + +inValue
                    if (ftSum >= 42 && ftSum <= 90) {

                        test__button_next.forEach(el => el.disabled = false);

                    } else {

                        test__button_next.forEach(el => el.disabled = true);
                    }
                } else if (/in/.test(input.id)) {
                    inValue = input.value
                    ftSum = (ftValue * 12) + +inValue
                    if (ftSum >= 42 && ftSum <= 90) {

                        test__button_next.forEach(el => el.disabled = false);

                    } else {

                        test__button_next.forEach(el => el.disabled = true);
                    }
                }


            } else {

                for (let p = 0; p < test__inputs.length; p++) {
                    const input = test__inputs[p];

                    if (input.checked) {
                        test__button_next.forEach(el => el.disabled = false);
                        break
                    } else {
                        test__button_next.forEach(el => el.disabled = true);
                    }
                }

                if (test__nothing) test__nothing.checked = false
            }
        });
    }



    // Сброс выбранных чекбоксов

    if (test__nothing) {

        test__nothing.addEventListener('input', () => {
            if (test__nothing.checked) {
                test__button_next.forEach(el => el.disabled = false);
            } else {
                test__button_next.forEach(el => el.disabled = true);
            }

            test__inputs.forEach(el => {
                el.checked = false
            })
        })
    }



    // Переход к следующему блоку. Инпуты

    test__labels.forEach(radio => {
        radio.addEventListener('click', () => {
            if (index === ageSection) {
                localStorage.setItem(lsAge, radio.dataset.age)
            }


            setTimeout(() => {
                section.classList.remove('_show');

                if (+localStorage[lsProgress] === questionsLenght) header_progress.classList.remove('_show');
                if (+localStorage[lsProgress] === 0) buttonB.classList.add('_show');

                if (index !== questionsLenght) {
                    sectionNext.classList.add('_show');
                    localStorage.setItem(lsProgress, (+index + 1));
                    progress.setAttribute(`value`, +localStorage[lsProgress] + 1);
                    _index.innerHTML = +localStorage[lsProgress] + 1;

                    dataLayer.push({
                        'event': `${iventPrefix}question_${+localStorage[lsProgress] + 1}`,
                        'category': `quiz`,
                        'action': `click`,
                        'label': `${iventPrefix}question_${+localStorage[lsProgress] + 1}`
                    });

                } else {
                    loaderStart(sectionNext, index);

                    dataLayer.push({
                        'event': `${iventPrefix}question_${+localStorage[lsProgress] + 2}`,
                        'category': `quiz`,
                        'action': `click`,
                        'label': `${iventPrefix}question_${+localStorage[lsProgress] + 2}`
                    });
                }

                window.scrollTo(0, 0);
            }, 400);
        })
    })



    // Переход к следующему блоку. Кнопки

    test__button_next.forEach((el, i) =>

        el.addEventListener('click', () => {
            if (index === tallSection) {                        //! Рост


                if (test_unit_first.classList.contains('_show')) {
                    localStorage.setItem(lsTall, calcTall(ft.value, in_.value))
                    localStorage.setItem(lsFt, ft.value)
                    localStorage.setItem(lsIn, in_.value)
                } else {
                    localStorage.setItem(lsTall, cm.value)
                }


            } else if (index === currentWeightSection) {        //! Текущий вес


                writeWeight(test_unit_first, lbs_C, kg_C)


            } else if (index === goalWeightSection) {           //! Цель


                writeWeight(test_unit_first, lbs_G, kg_G)


            } else if (index === planSection) {                   //! plan


                test_header.classList.add('_checkout')
                timer()

                if (i === 0) {
                    dataLayer.push({
                        'event': `${iventPrefix}results_get_my_plan`,
                        'category': `${iventPrefix2}quiz_results`,
                        'action': `click`,
                        'label': `${iventPrefix}results_get_my_plan`
                    });

                } else {
                    dataLayer.push({
                        'event': `${iventPrefix}results_continue`,
                        'category': `${iventPrefix2}quiz_results`,
                        'action': `click`,
                        'label': `${iventPrefix}results_continue`
                    });
                }


            } else if (index === paySection) {                   //! pay


            }


            setTimeout(() => {
                if (index !== questionsLenght) {
                    sectionNext.classList.add('_show');
                }
                section.classList.remove('_show');
                localStorage.setItem(lsProgress, (+index + 1));
                _index.innerHTML = +localStorage[lsProgress] + 1;
                progress.setAttribute(`value`, +localStorage[lsProgress] + 1);
                window.scrollTo(0, 0);

                if (index < planSection) {
                    dataLayer.push({
                        'event': `${iventPrefix}question_${+localStorage[lsProgress] + 1}`,
                        'category': `quiz`,
                        'action': `click`,
                        'label': `${iventPrefix}question_${+localStorage[lsProgress] + 1}`
                    });
                }
            }, 400);
        })
    )




    // Переключатель едениц измерения
    test__unit_type.forEach(el => {
        el.onclick = () => {
            test_unit_first.classList.toggle('_show');
            test_unit_fecond.classList.toggle('_show');
        }
    })
}




//!||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||




// Дополнительные циклы

for (let index = 0; index < swiper_elements.length; index++) {

    const
        swiper_el = swiper_elements[index],
        swiper__more = swiper_el.querySelectorAll('.swiper__more'),
        swiper__button = swiper_el.querySelectorAll('.swiper__button'),
        swiper_slide = swiper_el.querySelectorAll('.swiper-slide'),
        swiper__letter = swiper_el.querySelectorAll('.swiper__letter'),
        swiper__letter_container = swiper_el.querySelectorAll('.swiper__letter_container')
        ;

    for (let i = 0; i < sliderQuantity; i++) {

        function showLetter(j) {
            swiper__more[j].classList.remove('_show')
            swiper__button[j].classList.remove('_show')
            swiper_slide[j].classList.add('_show')
            swiper__letter_container[j].classList.add('_show')
            swiper__letter[j].classList.add('_show')
        }

        function targetSlide(k) {
            swiper__button[k].onclick = () => {
                showLetter(i)
                showLetter(i + sliderQuantity)
                showLetter(i + (sliderQuantity * 2))

                setTimeout(() => {
                    swiper1.updateAutoHeight(1000)
                    swiper1.update()
                }, 50);
                setTimeout(() => {
                    swiper2.updateAutoHeight(1000)
                    swiper2.update()
                }, 50);
                setTimeout(() => {
                    swiper1.updateAutoHeight(1000)
                    swiper1.update()
                }, 1500);
                setTimeout(() => {
                    swiper2.updateAutoHeight(1000)
                    swiper2.update()
                }, 1500);
            }
        }

        targetSlide(i)
        targetSlide(i + sliderQuantity)
        targetSlide(i + (sliderQuantity * 2))
    }
}
swiper1.updateAutoHeight(1000)
swiper1.update()
swiper2.updateAutoHeight(1000)
swiper2.update()

for (let index = 0; index < checkout__FQA.length; index++) {
    const
        FQA = checkout__FQA[index],
        FQA__arrow = FQA.querySelector('.FQA__arrow'),
        FQA__opened = FQA.querySelector('.FQA__opened')
        ;

    FQA.onclick = () => {
        FQA__arrow.classList.toggle('_opened')
        FQA__opened.classList.toggle('_opened')
    }
}



langs.forEach(el => {
    if (gender === 'male') {
        var g = 'men/'
    } else if (gender === 'female') {
        var g = 'women/'
    } else {
        var g = ''
    }
    el.href = 'https://vean.io/ext/tt_v1_vean/' + el.dataset.lang + '/' + g
})




//!||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||




// Отдельные ивенты

buttonB.addEventListener('click', () => {
    setTimeout(() => {
        if (+localStorage[lsProgress] === 1) buttonB.classList.remove('_show');

        sections[+localStorage[lsProgress]].classList.remove('_show');
        sections[+localStorage[lsProgress] - 1].classList.add('_show');

        progress.setAttribute(`value`, +localStorage[lsProgress]);
        _index.innerHTML = localStorage[lsProgress];
        localStorage.setItem(lsProgress, +localStorage[lsProgress] - 1);
        window.scrollTo(0, 0);
    }, 200);
})



var once = 0;
overlay.addEventListener('click', function () {
    if (once) {
        document.querySelector('.modal._active').classList.remove('_active');
        m2.classList.add('_active')

    } else {
        document.querySelector('.modal._active').classList.remove('_active');
        document.documentElement.style.cssText = 'overflow-y: visible;'
        overlay.classList.remove('_active');
    }

    once = 0

    dataLayer.push({
        'event': `${iventPrefix}popup_close`,
        'category': `${iventPrefix2}checkout`,
        'action': 'click',
        'label': `${iventPrefix}popup_close`
    });
});



m1__close.addEventListener('click', () => {
    if (once) {
        document.querySelector('.modal._active').classList.remove('_active');
        m2.classList.add('_active')

    } else {
        document.querySelector('.modal._active').classList.remove('_active');
        document.documentElement.style.cssText = 'overflow-y: visible;'
        overlay.classList.remove('_active');
    }
    dataLayer.push({
        'event': `${iventPrefix}popup_close`,
        'category': `${iventPrefix2}checkout`,
        'action': 'click',
        'label': `${iventPrefix}popup_close`
    });
})



m2__close.addEventListener('click', () => {
    once = 0
})



scroll.forEach(el => {
    el.addEventListener('click', () => {
        target.scrollIntoView({ block: "center", behavior: "smooth" })

        dataLayer.push({
            'event': `${iventPrefix}checkout_get_my_plan`,
            'category': `${iventPrefix2}checkout`,
            'action': 'click',
            'label': `${iventPrefix}checkout_get_my_plan`
        });
    })
})

init_checkout.addEventListener('click', () => {
    dataLayer.push({
        'event': `${iventPrefix}init_checkout`,
        'category': `${iventPrefix2}checkout`,
        'action': 'click',
        'label': `${iventPrefix}init_checkout`
    });
})



checkout__tarif.addEventListener('click', () => {
    localStorage.setItem(lsTarifId, checkout__tarif.dataset.tarifId)
})
localStorage.setItem(lsTarifId, checkout__tarif.dataset.tarifId)

data_pusher.addEventListener('click', () => {
    dataLayer.push({
        'event': `${iventPrefix}click_proceed_payment`,
        'category': `${iventPrefix2}checkout`,
        'action': 'click',
        'label': `${iventPrefix}click_proceed_payment`
    });
})



m1__pay_method.forEach(el => {
    el.addEventListener('input', () => {
        m1__pay.classList.toggle('_show')
        m1__pay_pal.classList.toggle('_show')
    })
})



m1__email.addEventListener('input', (e) => {
    test__uncorrect.classList.remove('_show');

    if (EmailValidator.validate(m1__email.value) === false) {

        setTimeout(() => {
            test__uncorrect.classList.add('_show');
        }, 1500);

        data_pusher.classList.add('_email_block')
        stripe_button.classList.add('_email_block')

    } else {
        setTimeout(() => {
            test__uncorrect.classList.remove('_show');
        }, 1500);

        test__uncorrect.classList.remove('_show');
        localStorage.setItem(lsEmail, m1__email.value)

        data_pusher.classList.remove('_email_block')
        stripe_button.classList.remove('_email_block')

        putData(planSection, localStorage[lsEmail])
    }
})





//!||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//!||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||




//! STRIPE

// разбиваем get параметры на ключи
let params = window
    .location
    .search
    .replace('?', '')
    .split('&')
    .reduce(
        function (p, e) {
            let a = e.split('=');
            p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
            return p;
        }, {}
    );
// это нужно для отбива и передачи utm в самом vean
for (const item in params) {
    switch (item) {
        case 'utm_campaign':
            utm_campaign = params['utm_campaign'];
            localStorage.setItem('utm_campaign', `${utm_campaign}`)
            break;
        case 'utm_source':
            utm_source = params['utm_source'];
            localStorage.setItem('utm_source', `${utm_source}`)
            break;
        case 'utm_medium':
            utm_medium = params['utm_medium'];
            localStorage.setItem('utm_medium', `${utm_medium}`)
            break;
        case 'utm_term':
            utm_term = params['utm_term'];
            localStorage.setItem('utm_term', `${utm_term}`)
            break;
        case 'utm_content':
            utm_content = params['utm_content'];
            localStorage.setItem('utm_content', `${utm_content}`)
            break;
        case 'esub':
            esub = params['esub'];
            localStorage.setItem('esub', `${esub}`)
            document.cookie = `esub=${esub}`
            break;
        case 'pub_id':
            pub_id = params['pub_id'];
            localStorage.setItem('pub_id', `${pub_id}`)
            document.cookie = `pub_id=${pub_id}`
            break;
        case 'test':
            test = params['test'];
            localStorage.setItem('test', `${test}`)
            break;
    }
}



let cardElement;
let cardElement2;
let cardElement3;
var spinner = document.querySelector('.m1__loading')

const stripe = Stripe(PUBLISHABLE_KEY, {
    locale: country,
    apiVersion: '2020-08-27',
});

// создаем объект запроса платежа
var paymentRequest = stripe.paymentRequest({
    country: country,
    currency: currency,
    total,
    requestPayerEmail: true,
});

// создаем нашу кнопку оплаты
const elements = stripe.elements();
const prButton = elements.create('paymentRequestButton', {
    paymentRequest: paymentRequest,
    allow: 'paymentmethod',
});

//АВТОВЫПОЛНЯЕТСЯ <---------------------------------------------------!!!!!!!!!!!!!!!!!!!!!
(function initStripe() {
    const elements = stripe.elements();

    cardElement = elements.create('cardNumber');
    cardElement2 = elements.create('cardExpiry');
    cardElement3 = elements.create('cardCvc');

    cardElement.mount('#card-element');
    cardElement2.mount('#card-element2');
    cardElement3.mount('#card-element3');

    cardElement.on('change', function (event) {
        const displayError = document.getElementById('card-errors');
        if (event.error) {
            displayError.textContent = stripeErrorMessage;
            Object.assign(displayError.style, {
                color: '#f00',
                fontSize: '13px',
                marginBottom: '5px',
            });
            stripe_button.disabled = true;
            data_pusher.classList.add('_show')

        } else {
            displayError.textContent = '';
            Object.assign(displayError.style, {
                color: '#fa755a',
                iconColor: '#fa755a',
            });
            // stripe_button.innerHTML = 'Get your free 14-day trial';
            stripe_button.disabled = false;
            data_pusher.classList.remove('_show')
        }
    });

    cardElement.on('focus', function (event) {
        dataLayer.push({
            'event': `${iventPrefix}input_card_number`,
            'category': `${iventPrefix2}checkout`,
            'action': 'click',
            'label': `${iventPrefix}input_card number`
        });
    });
    cardElement2.on('focus', function (event) {
        dataLayer.push({
            'event': `${iventPrefix}input_mm_yy`,
            'category': `${iventPrefix2}checkout`,
            'action': 'click',
            'label': `${iventPrefix}input_mm_yy`
        });
    });
    cardElement3.on('focus', function (event) {
        dataLayer.push({
            'event': `${iventPrefix}input_cvc`,
            'category': `${iventPrefix2}checkout`,
            'action': 'click',
            'label': `${iventPrefix}input_cvc`
        });
    });
})();

stripe_button.addEventListener('click', () => {
    onPayClick();

    dataLayer.push({
        'event': `${iventPrefix}click_proceed_payment`,
        'category': `${iventPrefix2}checkout`,
        'action': 'click',
        'label': `${iventPrefix}click_proceed_payment`
    });
});

if (localStorage[lsLoadQuiz] !== 'load') {
    getResponse();
}

localStorage.setItem(lsUtm, window.location.search);



// начальный запрос к серверу и получение id
async function getResponse() {
    const url = `${window.endPoint}open_test?bundle_id=${bundle_id}&lang=${lang}`;
    let response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            price: +amount,
            quiz_id: quiz_id,
            site: window.location.href,
            utm_campaign: utm_campaign,
            utm_source: utm_source,
            utm_medium: utm_medium,
            utm_term: utm_term,
            utm_content: utm_content,
            pub_id: pub_id,
            esub: esub
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((resp) => resp.json())
        .catch((error) => {
            console.error('Error:', error);
        });
    localStorage.setItem(lsCode, `${response.data.code}`);
    localStorage.setItem(lsId, ` ${response.data.id}`);
    localStorage.setItem(lsLoadQuiz, 'load');
    console.log(response);
}

// send email on vean
async function putData(currentPageNo, email) {

    let quizId = localStorage[lsId].trim()
    let url = `${window.endPoint}open_test/${quizId}?bundle_id=${bundle_id}&lang=${lang}`;

    let response = await fetch(url, {
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify({
            answers: {
                currentPageNo: currentPageNo,
                email: email,
            },
            lang: lang,
            tariff_id: 'default',
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8;'
        },
    })
        .then((resp) => {
            resp.json()
            console.log(resp);

            dataLayer.push({
                'event': `${iventPrefix}email_sent`,
                'category': `${iventPrefix2}quiz_results`,
                'action': 'click',
                'label': `${iventPrefix}email_sent`
            });
        })
        .catch((error) => {
            console.log('Error:', error);
        });
}

async function quizCheckoutPayment(paymentMethod) {
    order__error_M.classList.remove('_show')
    order__error.classList.remove('_show')

    const code = localStorage[lsCode];
    const url = `${window.endPoint}open_test/${code}/subscriptions/stripe`;

    let response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            is_agree_research_policy: true,
            locale: lang,
            stripe_payment_method_id: paymentMethod,
            tariff_id: localStorage[lsTarifId],
            site: window.location.href,
            course_id: course_id,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then((resp) => {
        console.log(resp);

        return resp.json()
    }).catch((error) => {
        console.error('Error:', error);

        if (window.innerWidth < 1024) {
            order__error_M.classList.add('_show')
        } else {
            order__error.classList.add('_show')
        }
    });

    console.log(response);

    const paymentIntent = response?.stripe?.subscription?.latest_invoice;
    response.status = response?.stripe?.subscription?.status;
    response.client_secret = paymentIntent?.client_secret;

    return response;
}

async function onPayClick() {
    stripe_button.style.display = 'none'
    spinner.style.display = 'block'
    order__error_M.classList.remove('_show')
    order__error.classList.remove('_show')

    try {
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: {
                email: localStorage[lsEmail],
            },
        });

        if (error) {
            localStorage.setItem('error', error.message)
        } else {
            localStorage.removeItem('error')
        }
        const response = await quizCheckoutPayment(paymentMethod.id)

        if (response.status === 'requires_action') {
            const authResponse = await stripe.confirmCardPayment(response.client_secret, {
                payment_method: paymentMethod.id,
            });

            if (authResponse.error) {
                throw new Error('error');
            }
        }

        localStorage.setItem('resp', JSON.stringify(response));

        if (response.status === 'trialing') {
            dataLayer.push({
                'event': `${iventPrefix}subscribe_success`,
                'category': `${iventPrefix2}checkout`,
                'action': 'payment',
                'label': `${iventPrefix}subscribe_success`
            });
            let data = JSON.parse(localStorage.getItem("resp"));
            const link = `${redirect}outer-verify?token=${data?.token
                }&price=${data?.stripe.subscription.plan.amount / 100
                }&subscriptionId=${data?.subscription_id}&courseId=${data?.course_id
                }&${localStorage[lsUtm].replace("?", "")}&lang=${lang}`;

            setTimeout(() => {
                document.querySelector('.modal._active').classList.remove('_active');
                modalThx.classList.add('_active')
            }, 1000);

            setTimeout(() => {
                window.location.href = link;
            }, 3000);
        }

        stripe_button.style.display = 'block';
        spinner.style.display = 'none'

        console.log(response);

    } catch (error) {
        stripe_button.style.display = 'block';
        spinner.style.display = 'none'

        if (window.innerWidth < 1024) {
            order__error_M.classList.add('_show')
        } else {
            order__error.classList.add('_show')
        }

        console.log(error);

        dataLayer.push({
            'event': `${iventPrefix}subscribe_failed`,
            'category': `${iventPrefix2}checkout`,
            'action': 'payment',
            'label': `${iventPrefix}subscribe_failed`
        });
    }
}

// функция с запросом на подписку и оплату
async function getMobile(ev) {
    order__error_M.classList.remove('_show')
    order__error.classList.remove('_show')

    try {
        const response = await quizCheckoutPayment(ev.paymentMethod.id);

        if (response.status === 'requires_action') {
            const authResponse = await stripe.confirmCardPayment(response.client_secret, {
                payment_method: paymentMethod.id,
            });

            if (authResponse.error) {
                throw new Error('error');
            }
        }
        if (response.status === 'trialing') {
            dataLayer.push({
                'event': `${iventPrefix}subscribe_success`,
                'category': `${iventPrefix2}checkout`,
                'action': 'payment',
                'label': `${iventPrefix}subscribe_success`
            });
            let data = JSON.parse(localStorage.getItem("resp"));
            const link = `${redirect}outer-verify?token=${data?.token
                }&price=${data?.stripe.subscription.plan.amount / 100
                }&subscriptionId=${data?.subscription_id}&courseId=${data?.course_id
                }&${localStorage[lsUtm].replace("?", "")}&lang=${lang}`;

            setTimeout(() => {
                document.querySelector('.modal._active').classList.remove('_active');
                modalThx.classList.add('_active')
            }, 1000);

            setTimeout(() => {
                window.location.href = link;
            }, 3000);
        }
        ev.complete('success');
        localStorage.setItem('resp', JSON.stringify(response));

    } catch (error) {
        ev.complete('fail');
        console.log(error);
        stripe_button.style.display = 'block';
        spinner.style.display = 'none'

        if (window.innerWidth < 1024) {
            order__error_M.classList.add('_show')
        } else {
            order__error.classList.add('_show')
        }

        dataLayer.push({
            'event': `${iventPrefix}subscribe_failed`,
            'category': `${iventPrefix2}checkout`,
            'action': 'payment',
            'label': `${iventPrefix}subscribe_failed`
        });
    }
}

paymentRequest.on('paymentmethod', async function (ev) {
    stripe_button.style.display = 'none';
    spinner.style.display = 'none';
    getMobile(ev);
});


// проверка на возможность оплаты и подлкюченную карту оплаты скрываем открываем кнопку
paymentRequest.canMakePayment().then(function (result) {
    if (result && result.applePay == true) {
        prButton.mount('#payment-request-button-apple');
        prButton.on('click', () => {
            dataLayer.push({
                event: 'apay/gpay',
                category: 'quiz checkout',
                action: 'click',
                label: 'apay/gpay',
            });
        });
    } else if (result && result.googlePay == true) {
        prButton.mount('#payment-request-button');
        prButton.on('click', () => {
            dataLayer.push({
                event: 'apay/gpay',
                category: 'quiz checkout',
                action: 'click',
                label: 'apay/gpay',
            });
        });
    }
});




//!||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||




// Pay Pal

function subscriptionPayPal(data) {
    const esubParam = localStorage.getItem('esub');
    const code = localStorage[lsCode]
    const url = `${window.endPoint}open_test/${code}/subscriptions/paypal`

    return fetch(url, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            email: localStorage[lsEmail],
            bundle_id: bundle_id,
            tariff_id: paypalTarif,
            site: window.location.href,
            is_agree_research_policy: true,
            locale: lang,
            ps_subscription_id: data.subscriptionID,
            ...(esubParam ? { esub: esubParam } : {}),
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
}


paypal.Buttons({
    createSubscription: function (data, actions) {
        return actions.subscription.create({
            /* Creates the subscription */
            plan_id: paypalTarif
        });
    },
    onApprove: async function (data, actions) {

        try {
            let response = await subscriptionPayPal(data)
            console.log(response);

            if (response.ok) {
                localStorage.setItem('resp', JSON.stringify(response));
                dataLayer.push({
                    'event': `${iventPrefix}subscribe_success`,
                    'category': `${iventPrefix2}checkout`,
                    'action': 'payment',
                    'label': `${iventPrefix}subscribe_success`
                });

                let data = JSON.parse(localStorage.getItem("resp"));
                const link = `${redirect}outer-verify?token=${data?.facilitatorAccessToken
                    }&price=${+amount
                    }&subscriptionId=${data?.subscription_id}&courseId=${course_id
                    }&${localStorage[lsUtm].replace("?", "")}&lang=${lang}`;

                setTimeout(() => {
                    document.querySelector('.modal._active').classList.remove('_active');
                    modalThx.classList.add('_active')
                }, 1000);
                setTimeout(() => {
                    window.location.href = link;
                }, 3000);
            } else {
                throw new Error('error');
            }

        } catch (error) {
            console.error('Error:', error);
            if (window.innerWidth < 1024) {
                order__error_M.classList.add('_show')
            } else {
                order__error.classList.add('_show')
            }
            dataLayer.push({
                'event': `${iventPrefix}subscribe_failed`,
                'category': `${iventPrefix2}checkout`,
                'action': 'payment',
                'label': `${iventPrefix}subscribe_failed`
            });
        }
    },

    onError: function (err) {
        // Show an error page here, when an error occurs
        console.log('Here is error');
        console.log(err);
        if (window.innerWidth < 1024) {
            order__error_M.classList.add('_show')
        } else {
            order__error.classList.add('_show')
        }
        dataLayer.push({
            'event': `${iventPrefix}subscribe_failed`,
            'category': `${iventPrefix2}checkout`,
            'action': 'payment',
            'label': `${iventPrefix}subscribe_failed`
        });
    },

    onCancel: function (data) {
        // Show a cancel page, or return to cart
        console.log('payment is canceled')
        console.log(data)
    }
}).render('#paypal-button-container'); // Renders the PayPal button

