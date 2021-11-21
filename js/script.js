"use strict";

window.addEventListener('DOMContentLoaded', () => {

    const popupBG = document.querySelector('.popup__bg'),
        popup = document.querySelector('.popup__content'),
        closePopup = document.querySelector('.close-popup'),
        table = document.querySelector('.table'),
        form = document.querySelector('.popup__form'),
        movieTime = document.getElementById('select__time'),
        timeDB = [],
        btnOk = document.getElementById('button-ok'),
        btnCancel = document.getElementById('button-cencel');

    let result = document.getElementById('result'),
        reserved, seat;


    // ======== Create Movie Hall ========
    function createMovieHall(rows, seats) {
        for (let i = 1; i <= rows; i++) {
            const tr = document.createElement('tr');
            table.appendChild(tr);

            for (let j = 1; j <= seats; j++) {
                const td = document.createElement('td');
                td.className = 'table__seat';
                tr.appendChild(td);
            }
        }
    }
    createMovieHall(10, 10);

    let seats = document.querySelectorAll('.table__seat');
    seats = Array.from(seats);
    // ====================================

    // ======== Open/Close Modal ========
    function openModal() {
        popup.classList.add('active');
        popupBG.classList.add('active');
    }

    function closeModal() {
        popup.classList.remove('active');
        popupBG.classList.remove('active');
    }

    closePopup.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal();
    });

    document.addEventListener('click', (e) => {
        if (e.target === popupBG) {
            closeModal();
        }
    });
    // ==================================


    table.addEventListener('click', (event) => {
        seat = event.target;

        if (seat && seat.classList.contains('table__seat')) {
            reserved = seats.indexOf(seat);
            openModal();
        }
    });


    // ======== Modal Activity ========
    form.addEventListener('click', (e) => {
        e.preventDefault();
        let newTime = movieTime.value;

        if (e.target == btnOk) {
            timeDB[reserved] = newTime;
            seat.classList.add('active');
            closeModal();
            result.innerHTML += `Место №${reserved+1} забронированно на ${newTime} <br>`;
        }

        if (e.target == btnCancel) {
            seat.classList.remove('active');
            timeDB.splice(reserved, 1);
            console.log('Cancel!');
            closeModal();
            result.innerHTML += '';
            console.log(timeDB);
        }
        // form.reset();
    });
    // =================================
});