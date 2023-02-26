window.onload = function(){

  const entrar = document.querySelector('#entrar');

  entrar.addEventListener('click',function(){
  	 let login = document.querySelector('#login');
  	 let senha = document.querySelector('#senha');

  	 let url = 'http://localhost:1001/10_11_2022_atualizada/';
  	 url+='api.php?login='+login.value+'&senha='+senha.value;
  	 console.log(url);
  	 fetch(url)
	  	 .then(resposta =>{
	  	 	return resposta.json();
	  	 })
	  	 .then(function (json){
	  	 	//aqui vem nossa acao
	  	 	if(json.erro){
	  	 		alert("Usuário e/ou senha inválidos.");
	  	 	}else{
	  	 		//alert(json.user.nome);
	  	 		//armazenando dados no navegador com js
	  	 		localStorage.setItem('nome',json.user.nome);
	  	 		//redirecionamento para página 
	  	 		window.location = 'home.html';
	  	 	}
	  	 })
	  	 .catch();
  });
}