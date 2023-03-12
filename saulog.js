'use strict';

{
  firebase.initializeApp({
    apiKey: 'AIzaSyA5Ic_gfWQr49WbBhGau_j1XXDxe5Wso_4',
    projectId: 'sauna-test-app',
  });

  const db = firebase.firestore();
  
  document.querySelector('button').addEventListener('click', () => {
    db.collection('saulog')
      .add({
        sauna_temp: document.querySelector('div.sauna-temp input').value,
        sauna_time: document.querySelector('div.sauna-time input').value,
        sauna_hr: document.querySelector('div.sauna-hr input').value,
        bath_temp: document.querySelector('div.bath-temp input').value,
        bath_time: document.querySelector('div.bath-time input').value,
        score: document.querySelector('div.score input').value,
      })
      .then(function(docRef) {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
  });
}