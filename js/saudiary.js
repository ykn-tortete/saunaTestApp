'use strict';

{
  firebase.initializeApp({
    apiKey: 'AIzaSyA5Ic_gfWQr49WbBhGau_j1XXDxe5Wso_4',
    projectId: 'sauna-test-app',
    });
  
    const db = firebase.firestore();

    // document.querySelector('#get').addEventListener('click', function() {
      db.collection('saulog')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {

            // const dataJson = JSON.stringify(doc.data())
            // document.querySelector('td.no').textContent = index;

            let row = document.createElement('tr');

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

            row.appendChild(cellSaunaTemp);
            row.appendChild(cellSaunaTime);
            row.appendChild(cellSaunaHr);
            row.appendChild(cellBathTemp);
            row.appendChild(cellBathTime);
            row.appendChild(cellScore);

            document.querySelector('tbody').appendChild(row);
            });
            
            // document.querySelector('td.sauna-temp').textContent = doc.data().sauna_temp;
            // document.querySelector('td.sauna-time').textContent = doc.data().sauna_time;
            // document.querySelector('td.sauna-hr').textContent = doc.data().sauna_hr;
            // document.querySelector('td.bath-temp').textContent = doc.data().sauna_temp;
            // document.querySelector('td.bath-time').textContent = doc.data().sauna_temp;
            // document.querySelector('td.score').textContent = doc.data().sauna_temp;
            

            // const p = document.createElement('p');
            // const result = document.createTextNode(
            //   `${doc.id} => ${JSON.stringify(doc.data())}`,
            // );
            // p.appendChild(result);
            // document.body.appendChild(p);
        });
    // });
}