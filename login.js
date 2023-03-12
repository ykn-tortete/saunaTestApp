'use strict';

{
  firebase.initializeApp({
    apiKey: 'AIzaSyA5Ic_gfWQr49WbBhGau_j1XXDxe5Wso_4',
    projectId: 'sauna-test-app',
  });
  
  const provider = new firebase.auth.GoogleAuthProvider()

  const loginBtn = document.getElementById('login')


  loginBtn.addEventListener('click', () => {
    firebase.auth().signInWithPopup(provider).then(result => {
      // GoogleプロパイダのOAuthトークンを取得します。
      const token = result.credential.accessToken
      // ログインしたユーザーの情報を取得します。
      const user = result.user
    }).catch(function(err) {
      console.error(err)
      // エラー処理
    });
  });
}