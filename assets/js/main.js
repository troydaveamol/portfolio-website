/*==================== MENU SHOW & HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
navToggle = document.getElementById('nav-toggle'),
navClose = document.getElementById('nav-close');

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu');
  });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
  });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav-link');

const linkAction = () => {
  const navMenu = document.getElementById('nav-menu');

  navMenu.classList.remove('show-menu');
};

navLink.forEach((n) => n.addEventListener('click', linkAction));

/*==================== CHANGE BACKGROUND HEADER ====================*/
const scrollHeader = () => {
  const header = document.getElementById('header');

  this.scrollY >= 20 
    ? header.classList.add('scroll-header')
    : header.classList.remove('scroll-header');
};

window.addEventListener('scroll', scrollHeader);
/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
  const scroll = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight, 
    sectionTop = current.offsetTop - 58, 
    sectionId = current.getAttribute('id'),
    sectionClass = document.querySelector(
      '.nav-menu a[href*=' + sectionId + ']'
    );

    if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      sectionClass.classList.add('active-link');
    } else {
      sectionClass.classList.remove('active-link');
    }
  });  
};

window.addEventListener('scroll', scrollActive)

/*==================== SCROLL ABOUT ANIMATION ====================*/
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('.text-gradient').forEach((span) => {
  gsap.to(span, {
    backgroundSize: '100% 100%',
    ease: 'none',
    scrollTrigger: {
      trigger: span,
      start: 'top bottom',
      end: 'top center',
      scrub: true
    }
  });
});


/*==================== DARK LIGHT THEME ====================*/
window.addEventListener('DOMContentLoaded', () =>{
  const toggleBtn = document.getElementById('theme-toggle');

  function applyTheme(theme) {
    if(theme === 'light') {
      document.body.classList.add('light-theme');
      toggleBtn.classList.remove('ri-sun-line');
      toggleBtn.classList.add('ri-moon-line');
    } else {
      document.body.classList.remove('light-theme');
      toggleBtn.classList.add('ri-sun-line');
      toggleBtn.classList.remove('ri-moon-line');
    }

    localStorage.setItem('theme', theme);
  }

  const savedTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(savedTheme);

  toggleBtn.addEventListener('click', () => {
    const isLight = document.body.classList.contains('light-theme');
    applyTheme(isLight ? 'dark' : 'light');
  });
});
/*==================== MIXITUP FILTER PORTFOLIO ====================*/
var mixer = mixitup('.work-container', {
  selectors: {
    target: '.mix',
  },
  animation: {
    duration: 300,
  }
})

/* Active work */
const linkWork = document.querySelectorAll('.work-item')

function activeWork () {
  linkWork.forEach((a) => {
    a.classList.remove('active-work');
  });
  
  this.classList.add('active-work');
}

linkWork.forEach((a) => a.addEventListener('click', activeWork));

/*==================== EMAIL JS ====================*/
const contactForm = document.getElementById('contact-form'),
      contactName = document.getElementById('contact-name'),
      contactEmail = document.getElementById('contact-email'),
      contactMessage = document.getElementById('contact-message'),
      message = document.getElementById('message');

    const sendEmail = (e) => {
      e.preventDefault();


      if(
        contactName.value === '' || 
        contactEmail.value === '' || 
        contactMessage.value === ''
      ){
        message.textContent = 'Write all the input fields';

        setTimeout(() => {
          message.textContent = '';
        }, 3000);
      } else {
        emailjs.sendForm(
          'service_i89h71c', 
          'template_9vbbl0w', 
          '#contact-form', 
          '8o5Jq4qJy2BJ4EKsZ'
        )
        .then(
          () => {
            message.textContent = 'Message sent ✔';

            setTimeout(() => {
              message.textContent = '';
            }, 5000);
          },
          (error) => {
            alert('OOPs! SOMETHING WENT WRONG...', error);
          }
        );

        contactName.value = '';
        contactEmail.value = '';
        contactMessage.value = '';
      }
    };

    contactForm.addEventListener('submit', sendEmail);

/*==================== PORTFOLIO VIEWER MODAL ====================*/
const portfolioModal = document.getElementById('portfolio-modal'),
      portfolioIframe = document.getElementById('portfolio-iframe'),
      portfolioClose = document.getElementById('portfolio-modal-close'),
      portfolioSpinner = document.getElementById('portfolio-spinner');

let preloadTimeout = null;
let spinnerTimeout = null;

// Convert Google Drive URL to embeddable format
function convertDriveUrl(url) {
  // File URL: /file/d/ID/view -> /file/d/ID/preview
  const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch) {
    return `https://drive.google.com/file/d/${fileMatch[1]}/preview`;
  }

  // Folder URL: /folders/ID or /drive/folders/ID -> embeddedfolderview
  const folderMatch = url.match(/\/folders\/([a-zA-Z0-9_-]+)/);
  if (folderMatch) {
    return `https://drive.google.com/embeddedfolderview?id=${folderMatch[1]}#grid`;
  }

  return null;
}

function openPortfolioModal(embedUrl) {
  if (portfolioIframe.src !== embedUrl) {
    portfolioSpinner.classList.remove('hidden');
    portfolioIframe.src = embedUrl;
  }
  
  portfolioModal.classList.add('show-portfolio-modal');
  document.body.style.overflow = 'hidden';

  // Safety fallback: hide spinner after 8 seconds of modal opening if loading is slow
  if (!portfolioSpinner.classList.contains('hidden')) {
    clearTimeout(spinnerTimeout);
    spinnerTimeout = setTimeout(() => {
      portfolioSpinner.classList.add('hidden');
    }, 8000);
  }
}

function closePortfolioModal() {
  portfolioModal.classList.remove('show-portfolio-modal');
  portfolioIframe.src = '';
  portfolioSpinner.classList.remove('hidden');
  document.body.style.overflow = '';
  if (spinnerTimeout) {
    clearTimeout(spinnerTimeout);
    spinnerTimeout = null;
  }
}

// Hide spinner when iframe finishes loading
portfolioIframe.addEventListener('load', () => {
  if (portfolioIframe.src) {
    portfolioSpinner.classList.add('hidden');
    if (spinnerTimeout) {
      clearTimeout(spinnerTimeout);
      spinnerTimeout = null;
    }
  }
});

// Intercept work-link clicks
document.querySelectorAll('.work-link').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');

    // Only intercept Google Drive links
    if (href && href.includes('drive.google.com')) {
      const isFolder = href.includes('/folders/') || href.includes('/drive/folders/');

      if (isFolder) {
        // Folders (Emails & Scripts) open directly in a new tab
        e.preventDefault();
        window.open(href, '_blank');
      } else {
        // Files open inside the in-app modal
        e.preventDefault();
        const embedUrl = convertDriveUrl(href);
        if (embedUrl) {
          openPortfolioModal(embedUrl);
        } else {
          window.open(href, '_blank');
        }
      }
    }
  });
});

// Preload on hovering over portfolio cards (gives iframe a head start before clicking View)
document.querySelectorAll('.work-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    const link = card.querySelector('.work-link');
    if (!link) return;

    const href = link.getAttribute('href');
    if (href && href.includes('drive.google.com')) {
      const isFolder = href.includes('/folders/') || href.includes('/drive/folders/');
      // Only preload files (folders open directly in a new tab)
      if (!isFolder) {
        const embedUrl = convertDriveUrl(href);
        // Only preload if it's different from the currently loaded/loading URL
        if (embedUrl && portfolioIframe.src !== embedUrl) {
          clearTimeout(preloadTimeout);
          // Debounce 150ms to prevent preloading during rapid mouse movement/scrolling
          preloadTimeout = setTimeout(() => {
            portfolioSpinner.classList.remove('hidden');
            portfolioIframe.src = embedUrl;
          }, 150);
        }
      }
    }
  });

  card.addEventListener('mouseleave', () => {
    clearTimeout(preloadTimeout);
  });
});

// Close via X button
portfolioClose.addEventListener('click', closePortfolioModal);

// Close on clicking outside the content
portfolioModal.addEventListener('click', (e) => {
  if (e.target === portfolioModal) {
    closePortfolioModal();
  }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && portfolioModal.classList.contains('show-portfolio-modal')) {
    closePortfolioModal();
  }
});

/*==================== SCROLL REVEAL ANIMATION ====================*/
const sr = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 2500,
  delay: 400,
});


sr.reveal('.home-data');
sr.reveal('.home-img-wrapper', { delay: 500 });
sr.reveal('.home-social', { delay: 600 });
sr.reveal('.services-card, .mix', { interval: 100 });
sr.reveal('.proof-card', { interval: 100 });
sr.reveal('.skills-developer, .resume-left, .contact-group', { 
  origin: 'left', 
});
sr.reveal('.skills-designer, .resume-right, .contact-form', { 
  origin: 'right', 
});