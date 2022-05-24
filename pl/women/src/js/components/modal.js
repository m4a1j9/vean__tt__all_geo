!function (e) { "function" != typeof e.matches && (e.matches = e.msMatchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector || function (e) { for (var t = this, o = (t.document || t.ownerDocument).querySelectorAll(e), n = 0; o[n] && o[n] !== t;)++n; return Boolean(o[n]) }), "function" != typeof e.closest && (e.closest = function (e) { for (var t = this; t && 1 === t.nodeType;) { if (t.matches(e)) return t; t = t.parentNode } return null }) }(window.Element.prototype);


document.addEventListener('DOMContentLoaded', function () {

    var modalButtons = document.querySelectorAll('.js-open-modal'),
        overlay = document.querySelector('.js-overlay-modal'),
        closeButtons = document.querySelectorAll('.js-modal-close');


    modalButtons.forEach(function (item) {

        item.addEventListener('click', function (e) {


            e.preventDefault();

            var modalId = this.getAttribute('data-modal'),
                modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');

            document.documentElement.style.cssText = 'overflow-y: hidden;'
            modalElem.classList.add('_active');
            overlay.classList.add('_active');

            // /* localStorage.clear() */;
        }); // end click

    }); // end foreach


    closeButtons.forEach(function (item) {

        item.addEventListener('click', function (e) {
            var parentModal = this.closest('.modal');

            document.documentElement.style.cssText = 'overflow-y: visible;'
            parentModal.classList.remove('_active');
            overlay.classList.remove('_active');
        });

    }); // end foreach


    document.body.addEventListener('keyup', function (e) {
        var key = e.keyCode;

        if (key == 27) {

            document.documentElement.style.cssText = 'overflow-y: visible;'
            document.querySelector('.modal._active').classList.remove('_active');
            document.querySelector('.overlay').classList.remove('_active');
        };
    }, false);


    // overlay.addEventListener('click', function () {
    //     document.documentElement.style.cssText = 'overflow-y: visible;'
    //     document.querySelector('.modal._active').classList.remove('_active');
    //     this.classList.remove('_active');
    // });




}); // end ready
