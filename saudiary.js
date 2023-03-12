'use strict';

{
  firebase.initializeApp({
    apiKey: 'AIzaSyA5Ic_gfWQr49WbBhGau_j1XXDxe5Wso_4',
    projectId: 'sauna-test-app',
    });
  
  const db = firebase.firestore();

  db.collection('saulog')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {

        let row = document.createElement('tr');

        let cellSet = document.createElement('td');
        let cellSetText = document.createTextNode(doc.data().set);
        cellSet.appendChild(cellSetText);

        let cellSaunaTemp = document.createElement('td');
        let cellSaunaTempText = document.createTextNode(doc.data().sauna_temp);
        cellSaunaTemp.appendChild(cellSaunaTempText);

        let cellSaunaTime = document.createElement('td');
        let cellSaunaTimeText = document.createTextNode(doc.data().sauna_time);
        cellSaunaTime.appendChild(cellSaunaTimeText);

        let cellSaunaHr = document.createElement('td');
        let cellSaunaHrText = document.createTextNode(doc.data().sauna_hr);
        cellSaunaHr.appendChild(cellSaunaHrText);


        let cellBathTemp = document.createElement('td');
        let cellBathTempText = document.createTextNode(doc.data().bath_temp);
        cellBathTemp.appendChild(cellBathTempText);
        
        let cellBathTime = document.createElement('td');
        let cellBathTimeText = document.createTextNode(doc.data().bath_time);
        cellBathTime.appendChild(cellBathTimeText);

        let cellScore = document.createElement('td');
        let cellScoreText = document.createTextNode(doc.data().score);
        cellScore.appendChild(cellScoreText);

        row.appendChild(cellSet);
        row.appendChild(cellSaunaTemp);
        row.appendChild(cellSaunaTime);
        row.appendChild(cellSaunaHr);
        row.appendChild(cellBathTemp);
        row.appendChild(cellBathTime);
        row.appendChild(cellScore);

        let visitRef = db.collection('visit');
        let visitIdRef = visitRef.doc(doc.data().visitID)
        visitIdRef.get().then(docSnapshot => {

          let cellDate = document.createElement('td');
          let cellDateText = document.createTextNode(docSnapshot.data().date);
          cellDate.appendChild(cellDateText);
          row.appendChild(cellDate);

          let cellFacility = document.createElement('td');
          let cellFacilityText = document.createTextNode(docSnapshot.data().facility);
          cellFacility.appendChild(cellFacilityText);
          row.appendChild(cellFacility);

          let cellPref = document.createElement('td');
          let cellPrefText = document.createTextNode(docSnapshot.data().prefecture);
          cellPref.appendChild(cellPrefText);
          row.appendChild(cellPref);
        });

        document.querySelector('tbody').appendChild(row);
      });
    });
}