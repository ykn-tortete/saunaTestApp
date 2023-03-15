'use strict';
{
  const url = new URL(window.location.href);
  const  params = url.searchParams;
  const id = params.get('id'); 

  document.querySelector('header > div.logo > a > h1').addEventListener('click', () =>{
    location.href = `index.html?id=${id}`;
  });

  document.querySelector('.pc-menu a.facility').addEventListener('click', () =>{
    location.href = `facility.html?id=${id}`;
  });
  document.querySelector('.overray a.facility').addEventListener('click', () =>{
    location.href = `facility.html?id=${id}`;
  });

  

  document.querySelector('.pc-menu a.saulog').addEventListener('click', () =>{
    location.href = `saulog.html?id=${id}`;
  });
  document.querySelector('.overray a.saulog').addEventListener('click', () =>{
    location.href = `saulog.html?id=${id}`;
  });

  document.querySelector('.pc-menu a.saudiary').addEventListener('click', () =>{
    location.href = `saudiary.html?id=${id}`;
  });
  document.querySelector('.overray a.saudiary').addEventListener('click', () =>{
    location.href = `saudiary.html?id=${id}`;
  });
}