'use strict';

{
  // firestoreとの接続
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: 'AIzaSyA5Ic_gfWQr49WbBhGau_j1XXDxe5Wso_4',
      projectId: 'sauna-test-app',
    });
 }
  const db = firebase.firestore();

  // visitとsaulogのコレクションを取得
  let visitRef = db.collection('visit');
  let saulogRef = db.collection('saulog')

  // URLのログインidをgetパラメータから取得
  const url = new URL(window.location.href);
  const  params = url.searchParams;
  const id = params.get('id'); 

  // saulogデータの各レコードを取得
  saulogRef.where('userid','==',id)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        //該当のsaulogのvisitデータを取得
        let visitIdRef = visitRef.doc(doc.data().visitID)

        // テーブルの作成
        // tr要素の作成
        let row = document.createElement('tr');

        // td要素の作成
        let cellSet = document.createElement('td');
        let cellSaunaTemp = document.createElement('td');
        let cellSaunaTime = document.createElement('td');
        let cellSaunaHr = document.createElement('td');
        let cellBathTemp = document.createElement('td');
        let cellBathTime = document.createElement('td');
        let cellScore = document.createElement('td');
        let cellDate = document.createElement('td');
        let cellFacility = document.createElement('td');
        let cellPref = document.createElement('td');

        // saulogの各データの取得
        let cellSetText = document.createTextNode(doc.data().set);
        let cellSaunaTempText = document.createTextNode(doc.data().sauna_temp);
        let cellSaunaTimeText = document.createTextNode(doc.data().sauna_time);
        let cellSaunaHrText = document.createTextNode(doc.data().sauna_hr);
        let cellBathTempText = document.createTextNode(doc.data().bath_temp);
        let cellBathTimeText = document.createTextNode(doc.data().bath_time);
        let cellScoreText = document.createTextNode(doc.data().score);
        // visitの各データの取得
        let cellDateText = document.createTextNode(visitIdRef.date);
        let cellFacilityText = document.createTextNode(visitIdRef.facility);
        let cellPrefText = document.createTextNode(visitIdRef.prefecture);

        // td要素へのsaulog各データの追加
        cellSet.appendChild(cellSetText);
        cellSaunaTemp.appendChild(cellSaunaTempText);
        cellSaunaTime.appendChild(cellSaunaTimeText);
        cellSaunaHr.appendChild(cellSaunaHrText);
        cellBathTemp.appendChild(cellBathTempText);
        cellBathTime.appendChild(cellBathTimeText);
        cellScore.appendChild(cellScoreText);
        cellDate.appendChild(cellDateText);
        cellFacility.appendChild(cellFacilityText);
        cellPref.appendChild(cellPrefText);

        // 行の追加
        row.appendChild(cellSet);
        row.appendChild(cellSaunaTemp);
        row.appendChild(cellSaunaTime);
        row.appendChild(cellSaunaHr);
        row.appendChild(cellBathTemp);
        row.appendChild(cellBathTime);
        row.appendChild(cellScore);
        row.appendChild(cellDate);
        row.appendChild(cellFacility);
        row.appendChild(cellPref);

        // tbody要素へのテーブルの追加
        document.querySelector('tbody').appendChild(row);

        //散布図で描きなおし


        // let data_date_score = [];
        // let data_date_score_obj = {
        //   x: visitIdRef.date.toTimeString(),
        //   y: document.createTextNode(doc.data().score)
        // };
        

        // let cellScoreText = 

        var data = {
          labels: ['2023-03-15', '2023-03-15'],
          series: [98, 98],
        }
        var options = {
          fullWidth: true,
          height: 200
        };
        new Chartist.Line('#chart', data, options);
      });
    });
    // var data = {
    //   labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    //   series: [
    //     [5, 2, 4, 2, 0],
    //   ]
    // };
    // var options = {
    //   fullWidth: true,
    //   height: 200
    // };
    // new Chartist.Line('#chart', data, options);
}