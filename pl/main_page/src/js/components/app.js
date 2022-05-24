/*
    * Переменные в camelCase хранят данные из JS
    * Переменные в under_score хранят данные из DOM
    * Переменные с приставкой "ls" хрнят значения для localStorage
    * Значение всех "тестовых" переменных назначено в начале файла
    * Ссылка на исходник в корневой дирректории в README
*/




//!||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||




"use.strict"



//!||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||



const
    lang_C = document.querySelector('.lang_C'),
    male = document.querySelector('.male'),
    female = document.querySelector('.female'),
    terms_el = document.querySelector('.terms_el'),
    privacy = document.querySelector('.privacy'),
    cookie = document.querySelector('.cookie'),
    langs = document.querySelectorAll('.lang')
    ;

const
    lang = document.documentElement.lang,
    gender = document.documentElement.dataset.gender
    ;


//!||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||



lang_C.textContent = lang + lang_C.textContent



//!||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||



male.onclick = () => {
    dataLayer.push({
        'event': 'm_question_1',
        'category': 'quiz',
        'action': 'click',
        'label': 'm_question_1'
    });
}
female.onclick = () => {
    dataLayer.push({
        'event': 'f_question_1',
        'category': 'female_quiz',
        'action': 'click',
        'label': 'f_question_1'
    });
}
terms_el.onclick = () => {
    dataLayer.push({
        'event': 'terms_click',
        'category': 'other',
        'action': 'click',
        'label': 'terms_click'
    });
}
privacy.onclick = () => {
    dataLayer.push({
        'event': 'policy_click',
        'category': 'other',
        'action': 'click',
        'label': 'policy_click'
    });
}
cookie.onclick = () => {
    dataLayer.push({
        'event': 'our_cookies',
        'category': 'other',
        'action': 'click',
        'label': 'our_cookies'
    });
}



//!||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||



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
