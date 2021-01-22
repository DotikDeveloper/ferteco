'use string';

document.addEventListener("DOMContentLoaded", () => {

    //Animation init    
    new WOW().init();

    function closeMod(selector) {
        const modal = document.querySelectorAll(selector);
        modal.forEach(modalItem => {
            modalItem.addEventListener('click', (e) => {
                if (e.target.dataset.btn === "closeModal") {
                    modalItem.classList.add("fade");
                    modalItem.classList.remove("show");
                    setTimeout(() => {
                        modalItem.style.display = "none";
                    }, 500);
                }
            });
        });
    }

    closeMod('[data-modal=body]');

    function date(selector) {
        const date = new Date().getFullYear();
        document.querySelector(selector).innerHTML = date;
    }
    date('.date');

    function openForm(selectorBtn, selectorModal) {
        const btn = document.querySelectorAll(selectorBtn);
        const modal = document.querySelector(selectorModal);
        btn.forEach(btnItem => {
            btnItem.addEventListener('click', () => {
                modal.classList.add('show');
                modal.classList.remove('fade');
                modal.style.display = 'block';
            });
        });
    }

    openForm('[data-btn=openModal]', '#exampleModal');

    


});