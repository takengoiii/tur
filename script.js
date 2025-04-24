// Динамикалық эффектілер, сатып алынған турлар мен пікірлерді сақтау

// Байланыс беті: Контейнерді басқанда сілтемеге өту, fade-in staggered
if (document.querySelector('.contact-cards')) {
  document.querySelectorAll('.contact-card').forEach((card, i) => {
    setTimeout(() => {
      card.style.animationDelay = (i * 90) + 'ms';
      card.classList.add('fade-in-contact');
    }, 60);
    card.addEventListener('click', function(e) {
      const link = card.getAttribute('data-link');
      if (link && link !== 'none') {
        if (link.startsWith('http') || link.startsWith('mailto:') || link.startsWith('tel:')) {
          window.open(link, '_blank');
        }
      }
    });
  });
}

// Турлар тізімі (id, title, price, days, icon)
const TOUR_DATA = [

// Hamburger menu logic for mobile navigation
window.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.getElementById('hamburger-menu');
  const nav = document.querySelector('header nav');
  let overlay = document.querySelector('.nav-overlay');

  // Create overlay if not present
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);
  }

  function closeMenu() {
    nav.classList.remove('open');
    overlay.classList.remove('active');
  }

  if (hamburger && nav) {
    hamburger.addEventListener('click', function() {
      nav.classList.toggle('open');
      overlay.classList.toggle('active');
    });

    overlay.addEventListener('click', closeMenu);

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }
});

  { id: 'almaty', title: 'Алматы - Шымбұлақ', desc: '3 күн, 2 түн. Бағасы: 120 000 ₸', icon: 'https://cdn-icons-png.flaticon.com/512/197/197484.png' },
  { id: 'astana', title: 'Астана - Бурабай', desc: '2 күн, 1 түн. Бағасы: 90 000 ₸', icon: 'https://cdn-icons-png.flaticon.com/512/197/197570.png' },
  { id: 'turkistan', title: 'Түркістан - Қожа Ахмет Ясауи', desc: '1 күндік тур. Бағасы: 50 000 ₸', icon: 'https://cdn-icons-png.flaticon.com/512/197/197408.png' },
  { id: 'dubai', title: 'Дубай - City Tour', desc: '4 күн, 3 түн. Бағасы: 250 000 ₸', icon: 'https://cdn-icons-png.flaticon.com/512/197/197374.png' },
  { id: 'istanbul', title: 'Ыстамбұл - Босфор', desc: '5 күн, 4 түн. Бағасы: 270 000 ₸', icon: 'https://cdn-icons-png.flaticon.com/512/197/197419.png' },
  { id: 'antalya', title: 'Анталия - Демалыс', desc: '7 күн, 6 түн. Бағасы: 320 000 ₸', icon: 'https://cdn-icons-png.flaticon.com/512/197/197518.png' },
  { id: 'prague', title: 'Прага - Еуропа туры', desc: '6 күн, 5 түн. Бағасы: 500 000 ₸', icon: 'https://cdn-icons-png.flaticon.com/512/197/197591.png' },
  { id: 'egypt', title: 'Шарм-эль-Шейх - Египет', desc: '5 күн, 4 түн. Бағасы: 350 000 ₸', icon: 'https://cdn-icons-png.flaticon.com/512/197/197422.png' },
  { id: 'bali', title: 'Бали - Индонезия', desc: '8 күн, 7 түн. Бағасы: 900 000 ₸', icon: 'https://cdn-icons-png.flaticon.com/512/197/197507.png' },
  { id: 'maldives', title: 'Мальдив - Luxury', desc: '7 күн, 6 түн. Бағасы: 1 200 000 ₸', icon: 'https://cdn-icons-png.flaticon.com/512/197/197386.png' }
];

document.addEventListener('DOMContentLoaded', function () {
  // Турпакет беті: Толығырақ -> blur-модаль ашу
  const detailsBtns = document.querySelectorAll('.details-btn');
  const modal = document.getElementById('tour-modal');
  const modalClose = document.querySelector('.modal-close');
  const modalTitle = document.getElementById('modal-tour-title');
  const tourForm = document.getElementById('tour-info-form');
  const modalSuccess = document.getElementById('modal-success');
  let selectedTour = null;

  if (detailsBtns.length) {
    detailsBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const tid = btn.getAttribute('data-tour');
        selectedTour = TOUR_DATA.find(t => t.id === tid);
        modalTitle.textContent = selectedTour ? selectedTour.title : '';
        modal.style.display = 'flex';
        modalSuccess.textContent = '';
        tourForm.reset();
        setTimeout(() => { modal.querySelector('.modal-content').style.transform = 'scale(1)'; }, 10);
      });
    });
    modalClose.onclick = function() {
      modal.style.display = 'none';
    };
    window.onclick = function(e) {
      if (e.target === modal) modal.style.display = 'none';
    };
    tourForm.onsubmit = function(e) {
      e.preventDefault();
      if (!selectedTour) return;
      const fd = new FormData(tourForm);
      const info = {
        tourId: selectedTour.id,
        tourTitle: selectedTour.title,
        tourDesc: selectedTour.desc,
        tourIcon: selectedTour.icon,
        name: fd.get('name'),
        phone: fd.get('phone'),
        email: fd.get('email'),
        comment: fd.get('comment'),
        purchasedAt: new Date().toISOString()
      };
      let purchased = JSON.parse(localStorage.getItem('purchasedTours') || '[]');
      purchased.push(info);
      localStorage.setItem('purchasedTours', JSON.stringify(purchased));
      modalSuccess.textContent = 'Тур сәтті алынды!';
      setTimeout(() => { modal.style.display = 'none'; }, 1100);
    };
  }

  // Алынған турларды көрсету (purchased.html, кесте түрінде)
  if(document.getElementById('purchased-tours')) {
    let purchased = JSON.parse(localStorage.getItem('purchasedTours') || '[]');
    let container = document.getElementById('purchased-tours');
    if(purchased.length === 0) {
      container.innerHTML = '<tr><td colspan="8">Сіз әлі ешқандай тур сатып алған жоқсыз.</td></tr>';
    } else {
      container.innerHTML = purchased.map(t =>
        `<tr class="fade-in-row">
          <td><img src="${t.tourIcon || ''}" alt="icon" /></td>
          <td>${t.tourTitle || '-'}</td>
          <td>${t.tourDesc || '-'}</td>
          <td>${t.name || '-'}</td>
          <td>${t.phone || '-'}</td>
          <td>${t.email || '-'}</td>
          <td>${t.comment || '-'}</td>
          <td><span style="font-size:0.97em;opacity:0.8">${t.purchasedAt ? (new Date(t.purchasedAt)).toLocaleString('kk-KZ') : ''}</span></td>
        </tr>`
      ).join('');
      // Fade-in/slide-up анимациясы
      setTimeout(() => {
        document.querySelectorAll('.fade-in-row').forEach((row, i) => {
          row.style.opacity = 0;
          row.style.transform = 'translateY(30px)';
          setTimeout(() => {
            row.style.transition = 'opacity 0.7s cubic-bezier(.4,2,.3,1), transform 0.7s cubic-bezier(.4,2,.3,1)';
            row.style.opacity = 1;
            row.style.transform = 'translateY(0)';
          }, 100 + i*90);
        });
      }, 10);
    }
  }

  // Байланыс формасы
  const contactForm = document.getElementById('contact-form');
  if(contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      document.getElementById('contact-success').textContent = 'Хабарламаңыз сәтті жіберілді!';
      contactForm.reset();
    });
  }

  // Пікірлерді сақтау және көрсету
  const reviewForm = document.getElementById('review-form');
  const reviewsList = document.getElementById('reviews-list');
  if(reviewForm && reviewsList) {
    function renderReviews() {
      let reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
      if(reviews.length === 0) {
        reviewsList.innerHTML = '<p>Пікірлер жоқ.</p>';
      } else {
        reviewsList.innerHTML = reviews.map(r => `
          <div class="review-item">
            <b>${r.name}</b>
            <p>${r.text}</p>
          </div>
        `).join('');
      }
    }
    renderReviews();
    reviewForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = reviewForm.reviewer.value.trim();
      const text = reviewForm.review.value.trim();
      if(name && text) {
        let reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
        reviews.unshift({name, text});
        localStorage.setItem('reviews', JSON.stringify(reviews));
        renderReviews();
        reviewForm.reset();
      }
    });
  }
});

// Гамбургер меню логикасы
const hamburger = document.getElementById('hamburger-menu');
const nav = document.querySelector('nav');
if (hamburger && nav) {
  hamburger.addEventListener('click', function() {
    if (nav.style.display === 'flex' || nav.style.display === '') {
      nav.style.display = 'none';
    } else {
      nav.style.display = 'flex';
      nav.style.flexDirection = 'column';
      nav.style.position = 'absolute';
      nav.style.top = '60px';
      nav.style.right = '10px';
      nav.style.background = '#fff';
      nav.style.boxShadow = '0 4px 16px rgba(30,136,229,0.13)';
      nav.style.padding = '1.2rem 1.4rem';
      nav.style.borderRadius = '14px';
      nav.style.zIndex = '100';
    }
  });
}

// Кәсіби динамикалық эффектілер (мысалы, fade-in, slide-up, letter-by-letter)
document.addEventListener('DOMContentLoaded', function () {
  // Fade-in/slide-up анимациясы пайдалы секциялар үшін
  document.querySelectorAll('.gradient-bg, .blur-bg, .benefit-card, .achievement-card, .tour-link, .link-btn').forEach(function(el, i) {
    el.style.opacity = 0;
    el.style.transform = 'translateY(40px)';
    setTimeout(() => {
      el.style.transition = 'opacity 0.8s cubic-bezier(.4,2,.3,1), transform 0.7s cubic-bezier(.4,2,.3,1)';
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    }, 200 + i*120);
  });

  // Hero секциясының тақырыбына әріп-by-әріп шығу
  const mainTitle = document.querySelector('.main-title.animated-title');
  if (mainTitle) {
    const text = mainTitle.textContent;
    mainTitle.textContent = '';
    let i = 0;
    function typeLetter() {
      if (i < text.length) {
        mainTitle.textContent += text[i];
        i++;
        setTimeout(typeLetter, text[i-1] === ' ' ? 30 : 55);
      }
    }
    setTimeout(typeLetter, 350);
  }
});
