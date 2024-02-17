// Substitua com suas credenciais do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAw9n9jg4qgpzuLrEPFiT7MpmmNRCWuYOE",
    authDomain: "appnew-ebec8.firebaseapp.com",
    databaseURL: "https://appnew-ebec8-default-rtdb.firebaseio.com",
    projectId: "appnew-ebec8",
    storageBucket: "appnew-ebec8.appspot.com",
    messagingSenderId: "1025339994725",
    appId: "1:1025339994725:web:79d498356638776f040c8c",
    measurementId: "G-C32RJKN3MR"
};

function initializeFirebase() {
    try {
        firebase.initializeApp(firebaseConfig);

        console.log('Firebase inicializado com sucesso!')

        checkLoginAndRedirect();
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados Firebase:', error);
        displayMessage('Erro ao conectar ao banco de dados Firebase.');
    }
}

function handleLogin() {
    initializeFirebase();
}

async function checkLoginAndRedirect() {
    const sisdmId = document.getElementById('idsisdm').value;
    const senha = document.getElementById('senha').value;
    const db = firebase.database();
    const usuariosRef = db.ref('usuarios/' + sisdmId);

    try {
        const snapshot = await usuariosRef.once('value');
        const usuario = snapshot.val();

        if (usuario && usuario.senha === senha) {
            // Login bem-sucedido
            console.log('Login bem-sucedido!');
            window.location.href = 'principal.html';
        } else {
            // Usuário ou senha incorretos
            console.log('ID SISDM ou senha incorretos.');
            console.log('Dados de Acesso Incorretos:', { ID_SISDM: sisdmId, Senha: senha });
            displayMessage('ID SISDM ou senha incorretos. Tente novamente.');
        }
    } catch (error) {
        console.error('Erro ao verificar o login:', error);
        displayMessage('Erro ao verificar o login. Tente novamente.');
    }
}

function displayMessage(message) {
    // Exibe mensagens dinâmicas na página
    const messageElement = document.getElementById('message');
    messageElement.innerText = message;
}

function redirectAfterLogin() {
    // Adicione aqui lógica de redirecionamento após o login bem-sucedido
    console.log('Redirecionando após o login...');
    // Exemplo: window.location.href = 'caminho_da_pagina_apos_login.html';
    window.location.href = 'principal.html';
}

// Função para autenticar o usuário com o Firebase
function fazerLogin() {
    var idsisdm = document.getElementById('idsisdm').value;
    var senha = document.getElementById('senha').value;
  
    firebase.auth().signInWithEmailAndPassword(idsisdm + "@example.com", senha)
      .then((userCredential) => {
        // Login bem-sucedido
        var user = userCredential.user;
  
        // Salve o nome do usuário no Firebase Authentication
        salvarNomeUsuarioNoFirebase(user, idsisdm);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error("Erro ao fazer login:", errorMessage);
      });
  }
  
  // Função para salvar o nome do usuário no Firebase Authentication
  function salvarNomeUsuarioNoFirebase(user, idsisdm) {
    // Consulte o banco de dados para obter o nome do usuário usando o idsisdm
    // Supondo que você tenha uma referência ao banco de dados como 'database'
    var usuarioRef = database.ref('usuarios/' + idsisdm);
    usuarioRef.once('value')
      .then((snapshot) => {
        var usuario = snapshot.val();
        var nomeUsuario = usuario ? usuario.nome : "Usuário";  // Use um valor padrão se não encontrar o usuário
  
        // Atualize o perfil do usuário no Firebase Authentication
        user.updateProfile({
          displayName: nomeUsuario
        }).then(function() {
          console.log("Nome do usuário atualizado com sucesso!");
        }).catch(function(error) {
          console.error("Erro ao atualizar o nome do usuário:", error);
        });
  
        // Redirecione para a página principal
        window.location.href = "principal.html";
      })
      .catch((error) => {
        console.error("Erro ao obter o nome do usuário do banco de dados:", error);
      });
  }
  