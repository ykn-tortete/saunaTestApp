'use strict';

{
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: 'AIzaSyA5Ic_gfWQr49WbBhGau_j1XXDxe5Wso_4',
      projectId: 'sauna-test-app',
    });
  }

  const url = new URL(window.location.href);
  const  params = url.searchParams;
  const id = params.get('id'); 

  const db = firebase.firestore();

  const facilityCollection = db.collection('facility');

  document.querySelector('button').addEventListener('click', () => {

    console.log('test')
    facilityCollection.add({
      name: document.querySelector('div.facility input').value,
      prefecture: document.querySelector('div.prefecture select').value,
    })
    .then(function(docRef) {
      console.log('Document written with ID: ', docRef.id);
    })
    .catch(function(error) {
      console.error('Error adding document: ', error);
    });
  });
}