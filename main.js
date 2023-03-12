'use strict';

{
  const open = document.getElementById('open');
  const overray = document.querySelector('.overray');
  const close = document.getElementById('close');

  open.addEventListener('click', () => {
    overray.classList.add('show')
    open.classList.add('hide')
   });

  close.addEventListener('click', () => {
    overray.classList.remove('show')
    open.classList.remove('hide')
  })
}