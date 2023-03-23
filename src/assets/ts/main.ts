import 'bootstrap';

import ScrollReveal from 'scrollreveal';

ScrollReveal().reveal('.card', {
  reset: true,
  delay: 200,
  interval: 200,
});

ScrollReveal().reveal('.slide-right', {
  origin: 'right',
  distance: '50%',
  duration: 1000,
  easing: 'ease-in-out',
  reset: true,
});

ScrollReveal().reveal('.flip', {
  reset: true,
  delay: 200,
  interval: 200,
  rotate: {
    x: 20,
    z: 20,
  },
});

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
