'use strict';

{
  let dataAry = [];

  // firestoreとの接続
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: 'AIzaSyA5Ic_gfWQr49WbBhGau_j1XXDxe5Wso_4',
      projectId: 'sauna-test-app',
    });
 }
  const db = firebase.firestore();

  // URLのログインidをgetパラメータから取得
  const url = new URL(window.location.href);
  const  params = url.searchParams;
  const id = params.get('id'); 

    // saulogデータの各レコードを取得
  db.collection('saulog').where('userid','==',id)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {

        // テーブルの作成
        // tr要素の作成
        let row = document.createElement('tr');
        
        // saulogデータのテーブルへの追加
        // td要素の作成
        let cellSet = document.createElement('td');
        let cellSaunaTemp = document.createElement('td');
        let cellSaunaTime = document.createElement('td');
        let cellSaunaHr = document.createElement('td');
        let cellBathTemp = document.createElement('td');
        let cellBathTime = document.createElement('td');
        let cellScore = document.createElement('td');

        // saulogの各データの取得
        let cellSetText = document.createTextNode(doc.data().set);
        let cellSaunaTempText = document.createTextNode(doc.data().sauna_temp);
        let cellSaunaTimeText = document.createTextNode(doc.data().sauna_time);
        let cellSaunaHrText = document.createTextNode(doc.data().sauna_hr);
        let cellBathTempText = document.createTextNode(doc.data().bath_temp);
        let cellBathTimeText = document.createTextNode(doc.data().bath_time);
        let cellScoreText = document.createTextNode(doc.data().score);

        // td要素へのsaulog各データの追加
        cellSet.appendChild(cellSetText);
        cellSaunaTemp.appendChild(cellSaunaTempText);
        cellSaunaTime.appendChild(cellSaunaTimeText);
        cellSaunaHr.appendChild(cellSaunaHrText);
        cellBathTemp.appendChild(cellBathTempText);
        cellBathTime.appendChild(cellBathTimeText);
        cellScore.appendChild(cellScoreText);
        
        // saulogデータのテーブルへの追加
        row.appendChild(cellSet);
        row.appendChild(cellSaunaTemp);
        row.appendChild(cellSaunaTime);
        row.appendChild(cellSaunaHr);
        row.appendChild(cellBathTemp);
        row.appendChild(cellBathTime);
        row.appendChild(cellScore);

        // saulogデータに対応するvisitデータを取得
        let visitRef = db.collection('visit');
        let visitIdRef = visitRef.doc(doc.data().visitID)
        visitIdRef.get().then(docSnapshot => {

          // saulogデータのテーブルへの追加
          // td要素の作成
          let cellDate = document.createElement('td');
          let cellFacility = document.createElement('td');
          let cellPref = document.createElement('td');

          // visitの各データの取得
          let cellDateText = document.createTextNode(docSnapshot.data().date);
          let cellFacilityText = document.createTextNode(docSnapshot.data().facility);
          let cellPrefText = document.createTextNode(docSnapshot.data().prefecture);

          // td要素へのvisit各データの追加
          cellDate.appendChild(cellDateText);
          cellFacility.appendChild(cellFacilityText);
          cellPref.appendChild(cellPrefText);

        // visitデータのテーブルへの追加
          row.appendChild(cellDate);
          row.appendChild(cellFacility);
          row.appendChild(cellPref);
          
          let dateNum = new Date(docSnapshot.data().date).getTime();
          let scoreNum = Number(doc.data().score);

          let dataObj ={};
          dataObj.x = dateNum;
          dataObj.y = scoreNum;

          dataAry.push(dataObj);

          const ctx = document.getElementById('chart');
          const myChart = new Chart(ctx, {
            type: 'scatter',
            data: {
              datasets: [{
                // 実際のデータ
                data: dataAry,
              }],
            },
            // options: {}, ...
          });

        });
        document.querySelector('tbody').appendChild(row);
      });
    });
}