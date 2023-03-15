'use strict';
{
  const url = new URL(window.location.href);
  const  params = url.searchParams;
  const id = params.get('id'); 

  document.querySelector('header > div.logo > a > h1').addEventListener('click', () =>{
    location.href = `index.html?id=${id}`;
  });

  //もう一つのnavリンク用
  document.querySelector('nav > ul > li > a.facility').addEventListener('click', () =>{
    location.href = `facility.html?id=${id}`;
  });

  document.querySelector('nav > ul > li > a.saulog').addEventListener('click', () =>{
    location.href = `saulog.html?id=${id}`;
  });

  document.querySelector('nav > ul > li > a.saudiary').addEventListener('click', () =>{
    location.href = `saudiary.html?id=${id}`;
  });
}