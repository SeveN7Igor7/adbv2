// Adicione esta parte para verificar o estado de autenticação ao carregar a página
var firebaseConfig = {
    apiKey: "AIzaSyAw9n9jg4qgpzuLrEPFiT7MpmmNRCWuYOE",
    authDomain: "appnew-ebec8.firebaseapp.com",
    databaseURL: "https://appnew-ebec8-default-rtdb.firebaseio.com",
    projectId: "appnew-ebec8",
    storageBucket: "appnew-ebec8.appspot.com",
    messagingSenderId: "1025339994725",
    appId: "1:1025339994725:web:79d498356638776f040c8c",
    measurementId: "G-C32RJKN3MR"
};

// Inicializa o Firebase App
firebase.initializeApp(firebaseConfig);

// Obtém a referência para o módulo de autenticação
var auth = firebase.auth();
var database = firebase.database();

// Adiciona o retorno de chamada para o estado de autenticação
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // Usuário autenticado, você pode acessar as informações do usuário
    var userIdSisdm = user.uid;

    // Obtém a referência para o nó de usuários no banco de dados
    var usuariosRef = database.ref('usuarios');

    // Procura o usuário no banco de dados com base no ID SISDM
    usuariosRef.child(userIdSisdm).once('value')
      .then(function(snapshot) {
        // Obtém o nome do usuário do snapshot
        var userName = snapshot.val().nome;

        // Exibe o nome do usuário na página
        exibirNomeDoUsuario(userName);
      })
      .catch(function(error) {
        console.error('Erro ao obter dados do usuário:', error);
      });
  } else {
    // Nenhum usuário autenticado, você pode redirecionar ou tomar outras ações
    console.log("Nenhum usuário autenticado");
  }
});

// Função para exibir o nome do usuário na página
function exibirNomeDoUsuario(userName) {
  var elementoNomeUsuario = document.getElementById("nomeDoUsuario");

  if (elementoNomeUsuario) {
    elementoNomeUsuario.textContent = "Bem-vindo, " + userName + "!";
  }
}

// Outras funções e lógica do seu script...