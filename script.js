const menuButton = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('#site-nav');
const navLinks = [...document.querySelectorAll('.nav-link')];
const sections = [...document.querySelectorAll('main section[id]')];
const revealElements = [...document.querySelectorAll('.reveal')];
const backToTop = document.querySelector('#backToTop');
const copyEmailButton = document.querySelector('.copy-email');
const toast = document.querySelector('.toast');
const currentYear = document.querySelector('#current-year');

let toastTimer;

function setMenuState(isOpen) {
  if (!menuButton || !siteNav) return;

  siteNav.classList.toggle('is-open', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? '关闭导航菜单' : '打开导航菜单');
}

function setActiveNav(sectionId) {
  navLinks.forEach((link) => {
    const isCurrent = link.getAttribute('href') === `#${sectionId}`;
    link.classList.toggle('is-active', isCurrent);
  });
}

function showToast(message) {
  if (!toast) return;

  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('is-visible');
  toastTimer = window.setTimeout(() => {
    toast.classList.remove('is-visible');
  }, 2800);
}

function updateActiveSection() {
  const marker = window.scrollY + window.innerHeight * 0.32;
  let currentSection = sections[0]?.id;

  sections.forEach((section) => {
    if (section.offsetTop <= marker) currentSection = section.id;
  });

  if (currentSection) setActiveNav(currentSection);
}

function updateBackToTop() {
  if (!backToTop) return;

  backToTop.classList.toggle('is-visible', window.scrollY > 520);
}

async function copyEmail() {
  const email = copyEmailButton?.dataset.email;
  if (!email) return;

  if (!navigator.clipboard?.writeText) {
    showToast('当前浏览器不支持复制，请点击邮箱链接。');
    return;
  }

  try {
    await navigator.clipboard.writeText(email);
    showToast('邮箱地址已复制，可以发邮件给我啦 ✦');
  } catch {
    showToast('复制没有成功，请点击邮箱链接发送邮件。');
  }
}

if (menuButton && siteNav) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    setMenuState(!isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => setMenuState(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenuState(false);
  });
}

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 },
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

if (copyEmailButton) {
  copyEmailButton.addEventListener('click', copyEmail);
}

window.addEventListener('scroll', () => {
  updateActiveSection();
  updateBackToTop();
}, { passive: true });

updateActiveSection();
updateBackToTop();

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}
