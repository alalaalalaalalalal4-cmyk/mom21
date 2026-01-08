document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal Animation using Intersection Observer
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Elements to animate on scroll
    const animateElements = document.querySelectorAll('.photo-card, .message-card, .main-quote');

    // Add initial hidden state in CSS
    const revealStyle = document.createElement('style');
    revealStyle.textContent = `
        .photo-card, .message-card, .main-quote {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease-out;
        }
        .photo-card.visible, .message-card.visible, .main-quote.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(revealStyle);

    animateElements.forEach(el => observer.observe(el));

    // Easter Egg: Confetti on Click
    const title = document.querySelector('.title');
    title.addEventListener('click', () => {
        createConfetti();
    });

    function createConfetti() {
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 70%)`;
            confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
            confetti.style.opacity = Math.random();
            document.body.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    }

    // Confetti CSS
    const confettiStyle = document.createElement('style');
    confettiStyle.textContent = `
        .confetti {
            position: fixed;
            top: -10px;
            width: 10px;
            height: 10px;
            z-index: 9999;
            animation: fall linear forwards;
        }
        @keyframes fall {
            to {
                transform: translateY(100vh) rotate(360deg);
            }
        }
    `;
    document.head.appendChild(confettiStyle);

    // Gift and Video Logic
    const openGiftBtn = document.getElementById('open-gift');
    const videoModal = document.getElementById('video-modal');
    const closeModal = document.querySelector('.close-modal');
    const giftVideo = document.getElementById('gift-video');
    const prevBtn = document.getElementById('prev-video');
    const nextBtn = document.getElementById('next-video');

    let currentVideoIndex = 0;
    let videoList = ['video 1.mp4', 'video 2.mp4'];

    function updateVideo() {
        if (videoList.length > 0) {
            giftVideo.src = `assets/${videoList[currentVideoIndex]}`;
            giftVideo.play();
        }
    }

    openGiftBtn.addEventListener('click', () => {
        if (videoList.length === 0) {
            alert("Vídeos não encontrados! 🎁");
            return;
        }
        videoModal.style.display = 'flex';
        updateVideo();
    });

    closeModal.addEventListener('click', () => {
        videoModal.style.display = 'none';
        giftVideo.pause();
    });

    prevBtn.addEventListener('click', () => {
        currentVideoIndex = (currentVideoIndex - 1 + videoList.length) % videoList.length;
        updateVideo();
    });

    nextBtn.addEventListener('click', () => {
        currentVideoIndex = (currentVideoIndex + 1) % videoList.length;
        updateVideo();
    });

    window.addEventListener('click', (event) => {
        if (event.target == videoModal) {
            videoModal.style.display = 'none';
            giftVideo.pause();
        }
    });
});
