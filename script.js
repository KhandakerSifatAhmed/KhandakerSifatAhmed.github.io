document.addEventListener('DOMContentLoaded', () => {

    /* --- Navigation Scroll Effect --- */
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* --- Mobile Menu Toggle --- */
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    
    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileBtn.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        });
    });

    /* --- Scroll Animations using Intersection Observer --- */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const animateOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target); // Optional: animate only once
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.fade-in-up, .fade-in');
    elementsToAnimate.forEach(el => {
        animateOnScroll.observe(el);
    });

    /* --- Active Navigation Link Highlighting on Scroll --- */
    const sections = document.querySelectorAll('section, header');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Adjust offset to trigger actively earlier
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });

    /* --- Theme Toggle (Dark Mode / Light Mode) --- */
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
            themeToggleBtn.querySelector('i').className = 'fa-solid fa-sun';
        }

        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            const icon = themeToggleBtn.querySelector('i');
            if (document.body.classList.contains('light-mode')) {
                icon.className = 'fa-solid fa-sun';
                localStorage.setItem('portfolio-theme', 'light');
            } else {
                icon.className = 'fa-solid fa-moon';
                localStorage.setItem('portfolio-theme', 'dark');
            }
        });
    }
});
