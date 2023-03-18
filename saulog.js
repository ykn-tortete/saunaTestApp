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

  // URLのログインidをgetパラメータから取得
 const url = new URL(window.location.href);
 const  params = url.searchParams;
 const id = params.get('id'); 

  // 施設のoptionを追加
  db.collection('facility')
  .get()
  .then(querySnapshot => {
    querySnapshot.forEach(doc => {

      let option = document.createElement('option');

      let optionText = document.createTextNode(doc.data().name);
      option.appendChild(optionText);

      document.getElementById('facility').appendChild(option);
    });
  });

  // セット数に応じて表示する入力領域を変動
  set.addEventListener('change', () => {
    //入力フォームのリセット
    if (document.getElementsByClassName('loop').length) {
      const loop = document.querySelector('.loop');
      loop.remove();
    }
    //送信ボタンのリセット
    if (document.getElementsByClassName('button2').length) {
      const btn = document.querySelector('.button2');
      btn.remove();
    }

    // 入力されたセット数を取得
    const set = document.getElementById('set');
    const setValue = set.value;

    // 入力されたセット数に応じ、入力フォームを複製
    if (setValue > 0) {
      // テンプレートノードを取得
      let tmplNode = document.querySelector('div.tmpl-node');

      // 複製したテンプレートノードを割り当てるdiv要素を作成
      let mergeElement = document.createElement('div');
      mergeElement.className = 'loop'

      // 入力されたセット数分ループを実行
      for (let i=0; i<setValue; i++) {
        // テンプレートノードを複製・表示
        let newNode = tmplNode.cloneNode(true);
        newNode.style.display ='block';

        //複製後のテンプレートノードにセット数ごとのユニークなidを付与
        newNode.id = 'box' + i;

        //入力フォーム内のセット数表示を修正
        newNode.firstElementChild.innerText = `${i + 1}セット`;

        // 複製したテンプレートノードをmergeElementにappend
        mergeElement.appendChild(newNode);
      }

      // htmlの該当箇所にmergeElementを追加
      let diaryNode = document.querySelector('.diary .saulog');
      diaryNode.append(mergeElement);

      // ボタンを表示
      document.querySelector('button').style.display ='block';
    }
  });
  
  // ボタンが押下された後のfirestoreへのデータ送信
  document.querySelector('button').addEventListener('click', () => {

    // 参照するfirestoreのコレクションを指定
    const visitCollection = db.collection('visit');
    const saulogCollection = db.collection('saulog');

    // 新規追加されるvisitテーブルのレコードのドキュメントIDを事前に取得
    const newVisitDoc = visitCollection.doc().id;
    
    //optionで選択した施設名を取得
    const facilityOption = document.querySelector('div.facility #facility')

    // フォームに入力された日付と施設をvisitのテーブルに送信
    visitCollection.doc(newVisitDoc).set({
      date: document.querySelector('div.date input').value,
      facility: facility.options[facilityOption.selectedIndex].value,
    })

    // htmlのフォームの要素数を取得
    const boxNum = document.querySelector('div.saulog .loop').childElementCount;
    console.log(boxNum);
    
    // フォームに入力されたサウログをsaulogテーブルに送信
    for (let j=0; j<boxNum; j++) {
      console.log(j);
      saulogCollection.add({
        visitID: newVisitDoc,
        set: j + 1,
        sauna_temp: document.querySelector(`#box${j} div.sauna-temp input`).value,
        sauna_time: document.querySelector(`#box${j} div.sauna-time input`).value,
        sauna_hr: document.querySelector(`#box${j} div.sauna-hr input`).value,
        bath_temp: document.querySelector(`#box${j}  div.bath-temp input`).value,
        bath_time: document.querySelector(`#box${j} div.bath-time input`).value,
        score: document.querySelector(`#box${j} div.score input`).value,
        userid: id,
      })
      .then(function(docRef) {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
    }
  });
}