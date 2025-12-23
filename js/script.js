document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu
    const sidenav = document.getElementById('sidenav');
    const sidenavToggle = document.getElementById('sidenavToggle');
    
    if (sidenavToggle && sidenav) {
        sidenavToggle.addEventListener('click', () => {
            sidenav.classList.toggle('active');
            const icon = sidenavToggle.querySelector('i');
            if (sidenav.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });
    }

    // Reading Progress
    const progressBar = document.querySelector('.reading-progress');
    const progressFill = document.querySelector('.reading-progress-fill');
    
    if (progressBar && progressFill) {
        const updateProgress = () => {
            const scrollPosition = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progress = maxScroll > 0 ? (scrollPosition / maxScroll) * 100 : 0;
            
            progressFill.style.width = `${Math.min(100, progress)}%`;
            
            if (scrollPosition > 100) {
                progressBar.style.opacity = '1';
                progressBar.style.visibility = 'visible';
            } else {
                progressBar.style.opacity = '0';
                progressBar.style.visibility = 'hidden';
            }
        };

        updateProgress();
        
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateProgress();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // Smooth Copy
    document.querySelectorAll('.series-mantra').forEach(quote => {
        quote.addEventListener('click', async function() {
            const text = this.innerText;
            try {
                await navigator.clipboard.writeText(text);
                const originalOpacity = this.style.opacity;
                this.style.opacity = '0.7';
                setTimeout(() => {
                    this.style.opacity = originalOpacity || '1';
                }, 500);
            } catch (err) {
                console.log('Copy failed');
            }
        });
    });

    // Escape to Close Menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidenav?.classList.contains('active')) {
            sidenav.classList.remove('active');
            const icon = sidenavToggle?.querySelector('i');
            if (icon) {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        }
    });

    // Close Menu When Clicking Outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) {
            const isClickInsideSidenav = sidenav?.contains(e.target);
            const isClickOnToggle = sidenavToggle?.contains(e.target);
            
            if (sidenav?.classList.contains('active') && 
                !isClickInsideSidenav && 
                !isClickOnToggle) {
                sidenav.classList.remove('active');
                const icon = sidenavToggle?.querySelector('i');
                if (icon) {
                    icon.classList.replace('fa-times', 'fa-bars');
                }
            }
        }
    });
});
