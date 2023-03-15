'use strict';

{
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: 'AIzaSyA5Ic_gfWQr49WbBhGau_j1XXDxe5Wso_4',
      projectId: 'sauna-test-app',
    });
 }

  const db = firebase.firestore();

  document.querySelector('button').addEventListener('click', () =>{
    const id = document.querySelector('.id').value;
    const pw = document.querySelector('.pw').value;
    db.collection("users").where('id', "==", id).where('password','==',pw).get().then(snapshot => {
      snapshot.forEach(doc => {
        console.log('ログイン完了');
        location.href = `index.html?id=${id}`;
      })
    })
  });
}

// {
//   //ログインボタン押下で作動

//   /*** 登録しているユーザーを検索する */
//   function findUser(searchId,searchPassword) {
//     // 該当データを取得する
//     const targetData = 
//     userDataList.find((data) => data.id === searchId) &&
//     userDataList.find((data) => data.password === searchPassword);
//     // 該当データが存在しなかったら、「該当者なし」と表示して終了
//     if (targetData == null) {
//       searchResult.textContent = 'IDまたはパスワードが違います';
//       return;
//     }
    
//     // 該当データの名前を表示する
//     searchResult.textContent = targetData.name + 'がログインしました。';

//     //トップ画面へ遷移
//     window.open('https://emotopi.com/', '_blank');
//   }
// }