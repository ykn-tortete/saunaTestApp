'use strict';

{
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: 'AIzaSyA5Ic_gfWQr49WbBhGau_j1XXDxe5Wso_4',
      projectId: 'sauna-test-app',
    });
 }

  const db = firebase.firestore();

  const url = new URL(window.location.href);
  const  params = url.searchParams;
  const id = params.get('id'); 

  const open = document.getElementById('open');
  const overray = document.querySelector('.overray');
  const close = document.getElementById('close');

  db.collection("users").where('id', "==", id).get().then(snapshot => {
    snapshot.forEach(doc => {
      if (doc.length == 0) {
        location.href = 'login.html';
      }
    });
  })

  open.addEventListener('click', () => {
    overray.classList.add('show')
    open.classList.add('hide')
   });

  close.addEventListener('click', () => {
    overray.classList.remove('show')
    open.classList.remove('hide')
  })
}