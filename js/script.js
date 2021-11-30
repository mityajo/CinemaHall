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

    let result = document.querySelector('.result__list'),
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
    createMovieHall(10, 20);

    let seats = document.querySelectorAll('.table__seat');
    seats = Array.from(seats);
    // ====================================

    // ======== Open/Close Modal ========
    function openModal() {
        popup.classList.add('active');
        popupBG.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        popup.classList.remove('active');
        popupBG.classList.remove('active');
        document.body.style.overflow = '';
    }

    closePopup.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal();
    });

    popupBG.addEventListener('click', (e) => {
        if (e.target === popupBG) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && popupBG.classList.contains('active')) {
            closeModal();
        }
    });
    // ==================================

    // ======== Get Activ Seat ========
    table.addEventListener('click', (e) => {
        seat = e.target;

        if (seat && seat.classList.contains('table__seat')) {
            reserved = seats.indexOf(seat);
            openModal();
        }
    });
    // ============================

    // ======== Modal Activity ========
    form.addEventListener('click', (e) => {
        e.preventDefault();
        let newTime = movieTime.value;

        if (e.target === btnOk) {
            timeDB[reserved] = newTime;
            seat.classList.add('active');
            createBookingList(timeDB, result);
            closeModal();
        }

        if (e.target === btnCancel) {
            seat.classList.remove('active');
            timeDB[reserved] = 'Отменено';
            createBookingList(timeDB, result);
            closeModal();
        }
    });
    // =================================

    // ======== Create Booking List ========
    function createBookingList(timeDB, parent) {
        parent.innerHTML = '';

        timeDB.forEach((time, seat) => {
            parent.innerHTML += `<li>Место №${seat + 1} - ${time}</li>`;
        });
    }
    createBookingList(timeDB, result);
});