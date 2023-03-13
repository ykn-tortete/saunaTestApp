'use strict';

{
  firebase.initializeApp({
    apiKey: 'AIzaSyA5Ic_gfWQr49WbBhGau_j1XXDxe5Wso_4',
    projectId: 'sauna-test-app',
  });

  const db = firebase.firestore();

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

    const set = document.getElementById('set');
    const setValue = set.value;

    if (setValue > 0) {
      let tmplNode = document.querySelector('div.tmpl-node');
      let mergeElement = document.createElement('div');
      mergeElement.className = 'loop'
      for (let i=0; i<setValue; i++) {
        let newNode = tmplNode.cloneNode(true);
        newNode.style.display ='block';
        //idは正しく入ってる？？
        newNode.id = 'box' + i;
        //セット数を変更
        newNode.firstElementChild.innerText = `${i + 1}セット`;
        mergeElement.appendChild(newNode);
      }
      let diaryNode = document.querySelector('.diary');
      diaryNode.append(mergeElement);

      const btnNode = document.querySelector('button');
      const newBtnNode = btnNode.cloneNode(true);
      newBtnNode.style.display = 'block';
      newBtnNode.className = 'button2';
      diaryNode.append(newBtnNode);
    }
  });
  
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