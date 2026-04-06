function toggleMenu() { document.getElementById('mobileMenu').classList.toggle('hidden'); }

function selectService(val, id) {
    const btns = ['btn-bridal','btn-engagement','btn-reception','btn-party'];
    btns.forEach(b => document.getElementById(b).classList.remove('service-active'));
    document.getElementById(id).classList.add('service-active');
    document.getElementById('selectedService').value = val;
}

// FORM SUBMISSION LOGIC
const form = document.getElementById('bookingForm');
const scriptURL = 'https://script.google.com/macros/s/AKfycbxl0bS4c2iwGvhrpet3RE7cD8lmOxJ6QqrimvK4HuzUHyvbLdvOjaqRN2Y9sCQRxqo2qQ/exec';

form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    btn.disabled = true;
    btn.innerText = "Processing...";

    const data = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('selectedService').value,
        promo: document.getElementById('promo').value
    };

    fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'text/plain;charset=utf-8'},
    })
    .then(() => {
        form.classList.add('hidden');
        document.getElementById('successMsg').classList.remove('hidden');
        setTimeout(() => {
            window.top.location.href = "https://chat.whatsapp.com/Ezs5S2YF99T0VYeAfAJi1d?mode=gi_t";
        }, 1500);
    })
    .catch(() => {
        alert("Something went wrong. Please try again.");
        btn.disabled = false;
        btn.innerText = "Confirm Booking";
    });
});
