// --- Smooth scroll (Lenis) ---
try {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
} catch (e) {
    console.log("Native scroll used");
}

gsap.registerPlugin(ScrollTrigger);

document.body.style.overflow = 'hidden';

// --- Opening sequence ---
let invitationOpened = false;

function openInvitation() {
    if (invitationOpened) return;
    invitationOpened = true;
    document.body.style.overflow = '';

    const openingContent = document.querySelector("#opening-content");
    const bgOpening = document.querySelector("#bg-opening");
    const mainContent = document.querySelector("#main-content");
    const navbar = document.querySelector("#navbar");

    const audio = document.getElementById("bgMusic");
    audio?.play()
        .then(() => document.getElementById("musicBtn")?.classList.add("playing"))
        .catch(() => {});

    const tl = gsap.timeline();

    if (openingContent) {
        tl.to(openingContent, {
            y: -50,
            opacity: 0,
            duration: 0.8,
            ease: "power2.in",
            onComplete: () => {
                openingContent.style.pointerEvents = "none";
                openingContent.style.display = "none";
            }
        });
    }

    if (bgOpening) {
        tl.to(bgOpening, {
            opacity: 0,
            duration: 1.5,
            ease: "power2.inOut",
            onComplete: () => bgOpening.remove()
        }, "-=0.4");
    }

    if (mainContent) {
        tl.to(mainContent, { opacity: 1, pointerEvents: "all", duration: 0.5 }, "-=0.8");
    }

    tl.from(".gs-anim", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out"
    }, "-=0.5");

    if (navbar) {
        tl.to(navbar, { y: 0, opacity: 1, duration: 1 }, "-=0.8");
    }

    initParallax();
}

// --- Scroll-triggered parallax & reveals ---
function initParallax() {
    gsap.from(".gs-anim-left", {
        scrollTrigger: { trigger: ".mini-couple-grid", start: "top 85%" },
        x: -30, opacity: 0, duration: 1, ease: "back.out(1.2)"
    });

    gsap.from(".gs-anim-right", {
        scrollTrigger: { trigger: ".mini-couple-grid", start: "top 85%" },
        x: 30, opacity: 0, duration: 1, delay: 0.2, ease: "back.out(1.2)"
    });

    gsap.utils.toArray(".mini-img-wrapper img").forEach((img) => {
        gsap.to(img, {
            y: "10%",
            ease: "none",
            scrollTrigger: {
                trigger: img.closest(".mini-card"),
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });

    gsap.utils.toArray(".gs-gallery").forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: { trigger: item, start: "top 90%", toggleActions: "play none none none" },
            scale: 0.8,
            opacity: 0,
            y: 30,
            duration: 0.8,
            delay: index * 0.15,
            ease: "back.out(1.4)"
        });
    });
}

// --- Countdown ---
const targetDate = new Date(WEDDING_CONFIG.countdownTarget).getTime();
const countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        clearInterval(countdownInterval);
        const wrapper = document.querySelector(".countdown-wrapper");
        if (wrapper) wrapper.innerHTML = '<div class="countdown-done">Büyük Gün Geldi Çattı</div>';
        return;
    }

    const pad = (n) => (n < 10 ? "0" + n : n);
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("cd-days").innerText = pad(days);
    document.getElementById("cd-hours").innerText = pad(hours);
    document.getElementById("cd-minutes").innerText = pad(minutes);
    document.getElementById("cd-seconds").innerText = pad(seconds);
}, 1000);

// --- Bottom nav: highlight active section on scroll ---
const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-item");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 200) current = section.getAttribute("id");
    });
    navItems.forEach((item) => {
        item.classList.remove("active");
        if (item.getAttribute("href") === `#${current}`) item.classList.add("active");
    });
});

// --- Music toggle ---
const musicBtn = document.getElementById("musicBtn");
const bgMusic = document.getElementById("bgMusic");

musicBtn.addEventListener("click", () => {
    if (bgMusic.paused) {
        bgMusic.play().catch(() => {});
        musicBtn.classList.add("playing");
    } else {
        bgMusic.pause();
        musicBtn.classList.remove("playing");
    }
});

// --- Guest name personalization (?to=) ---
const params = new URLSearchParams(window.location.search);
if (params.has("to")) {
    document.getElementById("guestName").innerText = params.get("to");
}

// --- Open invitation button ---
document.getElementById("openBtn").addEventListener("click", openInvitation);
