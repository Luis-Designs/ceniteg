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
