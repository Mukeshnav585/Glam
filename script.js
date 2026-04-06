// Mobile menu toggle
function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
}

// Service selection
function selectService(service, btnId) {
    document.getElementById('selectedService').value = service;
    document.querySelectorAll('[id^="btn-"]').forEach(btn => btn.classList.remove('service-active'));
    document.getElementById(btnId).classList.add('service-active');
}

// Counter Animation
const counters = document.querySelectorAll('.counter');
const options = { threshold: 0.5 };
const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const increment = target / 200;
            const update = () => {
                count += increment;
                if(count < target){
                    counter.innerText = Math.ceil(count);
                    requestAnimationFrame(update);
                } else {
                    counter.innerText = target;
                }
            };
            update();
            obs.unobserve(counter);
        }
    });
}, options);
counters.forEach(counter => observer.observe(counter));

// Booking Form
const form = document.getElementById('bookingForm');
form.addEventListener('submit', function(e){
    e.preventDefault();
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('selectedService').value;
    const promo = document.getElementById('promo').value;

    // Construct WhatsApp link
    const message = `Hello Nutan, I want to book a ${service}.\nName: ${name}\nPhone: ${phone}\nPromo: ${promo}`;
    const whatsappLink = `https://wa.me/+919911642274?text=${encodeURIComponent(message)}`;

    form.classList.add('hidden');
    document.getElementById('successMsg').classList.remove('hidden');

    setTimeout(() => { window.location.href = whatsappLink; }, 3000);
});
