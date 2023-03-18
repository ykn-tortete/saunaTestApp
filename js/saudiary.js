'use strict';

{
  let dataAry = [];
  let dataAry2 = [];

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
          
          let dateNum = new Date(docSnapshot.data().date); // getTime()

          let scoreNum = Number(doc.data().score);

          let dataObj = {};
          dataObj.x = dateNum;
          dataObj.y = scoreNum;

          dataAry.push(dataObj);

          let set = document.querySelectorAll('[data-id="set"]');
          let saunaTemp = document.querySelectorAll('[data-id="sauna_temp"]');
          let saunaTime = document.querySelectorAll('[data-id="sauna_time"]');
          let saunaHr = document.querySelectorAll('[data-id="sauna_hr"]');
          let bathTemp = document.querySelectorAll('[data-id="bath_temp"]');
          let bathTime = document.querySelectorAll('[data-id="bath_time"]');
          let score = document.querySelectorAll('[data-id="score"]');
          let date = document.querySelectorAll('[data-id="date"]');
          let facility = document.querySelectorAll('[data-id="facility"]');
          let prefecture = document.querySelectorAll('[data-id="prefecture"]');


          let dataObj2 = {};
          dataObj2.set = doc.data().set
          dataObj2.saunaTemp = doc.data().sauna_temp
          dataObj2.saunaTime = doc.data().sauna_time
          dataObj2.saunaHr = doc.data().sauna_hr
          dataObj2.bathTemp = doc.data().bath_temp
          dataObj2.bathTime = doc.data().bath_time
          dataObj2.score = doc.data().score
          dataObj2.score = docSnapshot.data().date
          dataObj2.facility = docSnapshot.data().facility
          dataObj2.prefecture = docSnapshot.data().prefecture

          dataAry2.push(dataObj2);

          // chart.jsを使いグラフを描画
          const ctx = document.getElementById('chart');
          const myChart = new Chart(ctx, {
            // 散布図を設定
            // saulogデータの取り込み
            type: 'scatter',
            data: {
              datasets: [{
                data: dataAry,
              }],
            },
            options: {
              scales: {
                // x軸を日付に変更
                xAxes: [{
                  type: 'time',
                  time: {
                    displayFormats: {
                       'millisecond': 'MMM dd',
                       'second': 'MMM dd',
                       'minute': 'MMM dd',
                       'hour': 'MMM dd',
                       'day': 'MMM dd',
                       'week': 'MMM dd',
                       'month': 'MMM dd',
                       'quarter': 'MMM dd',
                       'year': 'MMM dd',
                    }
                  }
                }],
                // y軸の最大・最小値を設定
                yAxes: [{
                  ticks: {     // 目盛り        
                    min: 0,      // 最小値
                      // beginAtZero: true でも同じ
                    max: 120,     // 最大値
                    stepSize: 5  // 間隔
                  }
                }]
              }
            }
          });
          // chart.jsを使いグラフを描画
          const ctx2 = document.getElementById('chart2');
          const myChart2 = new Chart(ctx2, {
            // 散布図を設定
            // saulogデータの取り込み
            type: 'scatter',
            data: {
              datasets: [{
                data: dataAry2,
              }],
            }
          });

        });
        document.querySelector('tbody').appendChild(row);

        const sortableTable = new SortableTable();

        // set table element
        sortableTable.setTable(document.querySelector('#my-table1'));
        // set data to be sorted
        sortableTable.setData(dataAry2);
        // handling events
        sortableTable.events()
            .on('sort', (event) => {
              console.log(`[SortableTable#onSort]
            event.colId=${event.colId}
            event.sortDir=${event.sortDir}
            event.data=\n${JSON.stringify(event.data)}`);
            });
      });
    });
}