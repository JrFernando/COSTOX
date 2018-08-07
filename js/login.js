// Initialize Firebase
var config = {
  apiKey: "API_KEY",
  authDomain: "costox-br.firebaseapp.com",
  databaseURL: "https://costox-br.firebaseio.com",
  projectId: "costox-br",
  storageBucket: "costox-br.appspot.com",
  messagingSenderId: "512966491595"
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user) {
  if(user){
    //console.log("Logado");
    // Materialize.toast("Toast teste", 4000);
    setNameDisplay(user.displayName, user.photoURL);

    var lis = document.getElementById('dropdownLogin').getElementsByTagName("li");
    lis[0].style.display = "none";
    lis[1].style.display = "none";
    lis[2].style.display = "block";
    //PARA O MENU MOBILE
    lis = document.getElementById('dropdownLogin2').getElementsByTagName("li");
    lis[0].style.display = "none";
    lis[1].style.display = "none";
    document.getElementById("btnSairMobile").style.display = "block";

    // if (user.emailVerified) {
    //     // User is signed in
    //     var email = user.email;
    //     alert("logado: " + email);
    //
    // } else {
    //     // User is not signed in
    //     alert("Verifique o email para continuar!");
    // }
  } else {
    //console.log("Não logado");
    setNameDisplay("Login", "");

    var lis = document.getElementById('dropdownLogin').getElementsByTagName("li");
    lis[0].style.display = "block";
    lis[1].style.display = "block";
    lis[2].style.display = "none";
    //PARA MENU MOBILE
    lis = document.getElementById('dropdownLogin2').getElementsByTagName("li");
    lis[0].style.display = "block";
    lis[1].style.display = "block";
    document.getElementById("btnSairMobile").style.display = "none";
  }
});

// LOGAR COM A CONTA DO GOOGLE
function loginGoogle(){
  var provider = new firebase.auth.GoogleAuthProvider();
  //provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  // firebase.auth().useDeviceLanguage();

  firebase.auth().signInWithPopup(provider).then(function(result) {
    var token = result.credential.accessToken;
    var user = result.user;

  }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;

    showModalMessageError(errorCode);
    console.error(errorCode);
    console.error(errorMessage);
  });
}

// LOGAR COM A CONTA DO FACEBOOK
function loginFacebook(){
  //console.log("loginFacebook()");
  var provider = new firebase.auth.FacebookAuthProvider();
  provider.setCustomParameters({
    'display': 'popup'
  });
  //firebase.auth().useDeviceLanguage();

  firebase.auth().signInWithPopup(provider).then(function(result) {
    var token = result.credential.accessToken;
    var user = result.user;

    //console.log(user.displayName + token);
  }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;

    showModalMessageError(errorCode);
    console.error(errorCode);
    console.error(errorMessage);
  });
}

function showModalMessageError(errorCode){
  var message;
  switch (errorCode) {
    case "auth/network-request-failed":
    message = "Erro na conexão! Por favor verifique sua conexão com a internet e tente novamente."
    break;
    case "auth/user-disabled":
    message = "Usuário bloqueado! Entre contato para solucionar o problema."
    break;
    case "auth/internal-error":
    message = "Ops! Encontramos um problema, tente mais uma vez. Caso o erro persista entre em contato."
    break;
    case "auth/account-exists-with-different-credential":
    message = "Uma conta já existe com o mesmo endereço de e-mail, mas credenciais de login diferentes. Faça login usando um provedor associado a este endereço de e-mail.";
    break;
    case "auth/cancelled-popup-request":
    message = "Operação cancelada devido a outro popup conflitante que está aberto.";
    break;
    default:
    message = "Feche para continuar!"
  }

  var p = document.getElementById("#messageModalErro");
  p.innerHTML = message;
  $("#modalErro").modal("open");
}

function setNameDisplay(name, url){
  var userDisplay = document.getElementById("displayName");
  var html = "<div class=\"valign-wrapper\">";
  // SE O USUÁRIO NÃO ESTIVER LOGADO É MOSTRADO UM ICONE
  // CASO CONTRÁRIO E MOSTRADO A FOTO DO USUÁRIO
  if (url == null || url == "") html += "<i class=\"material-icons left\">account_circle</i>";
  else html += "<img id=\"userPhoto\" src=\"" + url + "\" class=\"circle responsive-img\" width=\"24px\" heigth=\"24px\">"

  html += name + "<i class=\"material-icons right\">arrow_drop_down</i></div>";
  userDisplay.innerHTML = html;

  var userDisplay;
  var html = "<div class=\"valign-wrapper\">";
  // SE O USUÁRIO NÃO ESTIVER LOGADO É MOSTRADO UM ICONE
  // CASO CONTRÁRIO E MOSTRADO A FOTO DO USUÁRIO
  if (url == null || url == ""){
    html += "<i class=\"material-icons left\">account_circle</i>";
    html += "<p class=\"truncate name\">" + name + "</p><i class=\"material-icons right\">arrow_drop_down</i></div>";

    document.getElementById("displayNameMobileLogado").style.display = "none";
    document.getElementById("displayNameMobile").style.display = "block";
    userDisplay = document.getElementById("displayNameMobile");
  } else {
    html = "<div class=\"user-view\"><div class=\"background\"><img src=\"images/office.jpg\"></div>";
    html += "<a><img class=\"circle\" src=\"" + url + "\"></a>";
    html += "<span class=\"lighten-4 white-text name truncate\">" + name +"</span></div>";

    document.getElementById("displayNameMobile").style.display = "none";
    document.getElementById("displayNameMobileLogado").style.display = "block";
    userDisplay = document.getElementById("displayNameMobileLogado");
  }

  userDisplay.innerHTML = html;
}


//FUNÇÃO PARA EFETUAR O LOGOUT
function logout() {
  firebase.auth().signOut().then(function() {
    // Logout efetuado com sucesso.
    //alert("Logout efetuado!");
  }).catch(function(error) {
  });
}
