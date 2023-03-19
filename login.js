'use strict';

{
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: 'AIzaSyA5Ic_gfWQr49WbBhGau_j1XXDxe5Wso_4',
      projectId: 'sauna-test-app',
    });
 }

  const login = document.querySelector('.trigger_login');
  const register = document.querySelector('.trigger_register');

  login.addEventListener('click', () => {

    document.querySelector('.login_form_key_name').classList.add('login_form_hide');
    document.querySelector('.login_form_span').classList.add('login_form_hide');
    login.classList.remove('unselected');
    login.classList.add('selected');
    register.classList.remove('selected');
    register.classList.add('unselected');
    document.querySelector('button').textContent = 'ログインする';
    document.querySelector('button').classList.remove('register_button');
  })

  register.addEventListener('click', () => {
    document.querySelector('.login_form_key_name').classList.remove('login_form_hide');
    document.querySelector('.login_form_span').classList.remove('login_form_hide');
    login.classList.remove('selected');
    login.classList.add('unselected');
    register.classList.remove('unselected');
    register.classList.add('selected');
    document.querySelector('button').textContent = '会員登録する';
    document.querySelector('button').classList.add('register_button');
  })

  const db = firebase.firestore();

  document.querySelector('button').addEventListener('click', () => {
    const id = document.querySelector('.login_form_id').value;
    const pw = document.querySelector('.login_form_pw').value;
    if (login.classList.contains('selected') == true) {
      db.collection("users").where('id', "==", id).where('password','==',pw).get().then(snapshot => {
        snapshot.forEach(doc => {
          console.log('ログイン完了');
          location.href = `top.html?id=${id}`;
        })
      })
    } else if (register.classList.contains('selected') == true) {
      const userName = document.querySelector('.login_form_name').value;
      if (userName && id && pw) {
        modal.classList.remove('hidden');
        mask.classList.remove('hidden');
        console.log(userName);
        console.log(id);
        console.log(pw);
        db.collection('users').add({
          name: userName,
          id: id,
          password: pw,
        })
      }
    }
  });

  const button = document.getElementById('button');
  const close = document.getElementById('close');
  const modal = document.getElementById('modal');
  const mask = document.getElementById('mask');



  close.addEventListener('click', () => {
    modal.classList.add('hidden');
    mask.classList.add('hidden');
  });

  mask.addEventListener('click', () => {
    close.click();
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