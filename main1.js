document.addEventListener('DOMContentLoaded', () => {
  // ** Variables **
  const navMenu = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  const navClose = document.getElementById('nav-close');
  const navLinks = document.querySelectorAll('.nav--link');
  const header = document.getElementById('header');
  const contactForm = document.getElementById('contact-form');
  const contactMessage = document.getElementById('contact-message');
  const sliders = document.querySelectorAll('.slider--container');
  const sections = document.querySelectorAll('section[id]');
  const scrollUpBtn = document.getElementById('scroll-up');

  // ** Navigation Menu Toggle **
  if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
          navMenu.classList.add('show-menu');
      });
  }

  if (navClose && navMenu) {
      navClose.addEventListener('click', () => {
          navMenu.classList.remove('show-menu');
      });
  }

  // ** Remove Menu on Link Click **
  navLinks.forEach(link => {
      link.addEventListener('click', () => {
          navMenu.classList.remove('show-menu');
          navLinks.forEach(link => link.classList.remove('active-link'));
          link.classList.add('active-link');
      });
  });

  // ** Blur Header on Scroll **
  const blurHeader = () => {
      if (header) {
          if (window.scrollY >= 50) {
              header.classList.add('blur-header');
          } else {
              header.classList.remove('blur-header');
          }
      }
  };

  // ** Scroll Sections Active Link **
  const scrollActive = () => {
      const scrollY = window.scrollY;

      sections.forEach(current => {
          const sectionHeight = current.offsetHeight;
          const sectionTop = current.offsetTop - 58;
          const sectionId = current.getAttribute('id');
          const sectionLink = document.querySelector(`.nav--link[href*="${sectionId}"]`);

          if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
              navLinks.forEach(link => link.classList.remove('active-link'));
              if (sectionLink) sectionLink.classList.add('active-link');
          }
      });
  };

  // ** Show Scroll Up Button **
  const showScrollUp = () => {
      if (scrollUpBtn) {
          if (window.scrollY >= 350) {
              scrollUpBtn.classList.add('show-scroll');
          } else {
              scrollUpBtn.classList.remove('show-scroll');
          }
      }
  };

  // ** EmailJS Send Email **
  const sendEmail = (e) => {
      e.preventDefault();

      emailjs.sendForm('service_m0wjeqz', 'template_5f860yn', '#contact-form', 'qXweAv15-4pqPB1v9')
          .then(() => {
              if (contactMessage) {
                  contactMessage.textContent = 'Message sent successfully ✅';
                  setTimeout(() => { contactMessage.textContent = ''; }, 5000);
              }
              if (contactForm) contactForm.reset();
          })
          .catch(() => {
              if (contactMessage) {
                  contactMessage.textContent = 'Message not sent (service error) ❌';
              }
          });
  };

  if (contactForm) contactForm.addEventListener('submit', sendEmail);

  // ** Initialize Sliders **
  const initSliders = () => {
      sliders.forEach(slider => {
          const wrapper = slider.querySelector('.slider--wrapper');
          const slides = wrapper ? wrapper.children : [];
          const dotsContainer = document.createElement('div');
          dotsContainer.className = 'slider--dots';
          let currentIndex = 0;

          // Create dots
          Array.from(slides).forEach((_, i) => {
              const dot = document.createElement('div');
              dot.className = `slider--dot ${i === 0 ? 'active' : ''}`;
              dot.addEventListener('click', () => {
                  currentIndex = i;
                  updateSlider();
              });
              dotsContainer.appendChild(dot);
          });

          slider.appendChild(dotsContainer);

          // Update slider
          const updateSlider = () => {
              if (wrapper) wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
              dotsContainer.querySelectorAll('.slider--dot').forEach((dot, index) => {
                  dot.classList.toggle('active', index === currentIndex);
              });
          };

          // Add navigation buttons
          const nextBtn = slider.querySelector('.slide-next');
          const prevBtn = slider.querySelector('.slide-prev');

          if (nextBtn) {
              nextBtn.addEventListener('click', () => {
                  currentIndex = (currentIndex + 1) % slides.length;
                  updateSlider();
              });
          }

          if (prevBtn) {
              prevBtn.addEventListener('click', () => {
                  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                  updateSlider();
              });
          }
      });
  };

  // ** Event Listeners **
  window.addEventListener('scroll', () => {
      blurHeader();
      scrollActive();
      showScrollUp();
  });

  // Initialize sliders
  initSliders();
});
