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
      let diaryNode = document.querySelector('.diary .saulog');
      diaryNode.append(mergeElement);

      document.querySelector('button').style.display ='block';
    }
  });
  
  document.querySelector('button').addEventListener('click', () => {

    const visitCollection = db.collection('visit');
    const newVisitDoc = visitCollection.doc().id;
    
    const facilityOption = document.querySelector('div.facility #facility')

    visitCollection.doc(newVisitDoc).set({
      date: document.querySelector('div.date input').value,
      facility: facility.options[facilityOption.selectedIndex].value,
    })

    const saulogCollection = db.collection('saulog');

    const boxNum = document.querySelector('div.saulog').childElementCount;
    console.log(boxNum);
    
    for (let j=0; j<boxNum-1; j++) {
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