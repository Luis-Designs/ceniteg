// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

import AOS from 'aos';
// import 'aos/dist/aos.css'; // You can also use <link> for styles
// let aosStyles = document.getElementById('aosStylesheet');
AOS.init();

const btnActiveModal = document.querySelectorAll(
  'button[data-bs-toggle="modal"]'
);

let aosStylesheet = document.getElementById('aosStylesheet');

const createStylesheetAOS = () => {
  aosStylesheet = document.createElement('link');
  aosStylesheet.rel = 'stylesheet';
  aosStylesheet.href = 'https://unpkg.com/aos@2.3.1/dist/aos.css';
  aosStylesheet.id = 'aosStylesheet';
  document.head.appendChild(aosStylesheet);
};

const removeStylesheetAOS = () => {
  if (aosStylesheet) {
    aosStylesheet.remove();
    aosStylesheet = null;
  }
};

const clickOut = (element) => {
  element.addEventListener('click', (e) => {
    createStylesheetAOS();
  });
};

btnActiveModal.forEach((btnModal) =>
  btnModal.addEventListener('click', () => {
    removeStylesheetAOS();
    clickOut(btnModal.nextElementSibling.firstElementChild.firstElementChild);
  })
);
