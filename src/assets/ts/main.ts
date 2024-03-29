import 'bootstrap';

import ScrollReveal from 'scrollreveal';

ScrollReveal().reveal('.slide-right', {
  origin: 'right',
  distance: '50%',
  duration: 1000,
  easing: 'ease-in-out',
  reset: true,
});

ScrollReveal().reveal('#counter', {
  reset: false,
  delay: 200,
  interval: 200,
  afterReveal: counter,
});

function counter() {
  let counter = document.getElementById('counter') as HTMLElement;
  let i = 500;
  let delay = 1;

  function updateCounter() {
    counter.textContent = String(i);

    if (i < 600) {
      i++;
      delay += 1;
      setTimeout(updateCounter, delay);
    }
  }

  updateCounter();
}

const navbar = document.querySelector('nav.navbar') as HTMLElement;

window.onscroll = function () {
  'use strict';
  if (
    document.body.scrollTop >= 20 ||
    document.documentElement.scrollTop >= 20
  ) {
    navbar.classList.add('scroll');
    navbar.classList.remove('topnav');
  } else {
    navbar.classList.remove('scroll');
    navbar.classList.add('topnav');
  }
};

const links = document.querySelectorAll('.navbar-nav .nav-link');
for (const link of Array.from(links)) {
  link.classList.toggle('inactive');
}

if (location.pathname === '/ceniteg/' || location.pathname === '/') {
  Array.from(links)[0].classList.toggle('active');
}

for (const link of links) {
  const url = String(link?.getAttribute('href'));
  if (url === location.pathname) {
    link.classList.add('active');
    break;
  }
}

const inputElement = document.getElementById('phone') as HTMLInputElement;
const MAX_DIGITS = 9;

inputElement?.addEventListener('input', (e) => {
  const inputValue = inputElement.value.replace(/[^0-9]/g, ''); // eliminar cualquier carácter que no sea un número
  if (inputValue.length > MAX_DIGITS) {
    inputElement.value = inputValue.substring(0, MAX_DIGITS); // truncar el valor
  }
});

const validateSpaces = (inputValue: string): boolean => {
  return inputValue.trim().length !== 0;
};

const validateForm = (): boolean => {
  const formElement = document.getElementById(
    'formContactCeniteg'
  ) as HTMLFormElement;
  const inputElements = formElement.querySelectorAll('input');
  const textAreaElement = formElement.querySelector(
    'textarea'
  ) as HTMLTextAreaElement;
  for (let i = 0; i < inputElements.length; i++) {
    const inputValue = inputElements[i].value;
    if (!validateSpaces(inputValue)) {
      return false; // evitar el envío del formulario
    }
  }
  if (!validateSpaces(textAreaElement.value)) {
    return false; // evitar el envío del formulario
  }
  return true; // enviar el formulario
};

const form: HTMLFormElement = document.querySelector(
  '#formContactCeniteg'
) as HTMLFormElement;

form?.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!validateForm()) {
    alert('Por favor, llene todos los campos! :D');
    return;
  }

  const data = new FormData(form);
  const action = form.action;
  fetch(action, {
    method: 'POST',
    body: data,
  }).then(() => {
    alert('Gracias! Pronto estaremos en contacto!');
    form.reset();
  });
});
