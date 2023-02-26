let url = 'http://localhost:1001/10_11_2022_atualizada/api.php';

fetch(url+'?listar')
.then(function(data){
	return data.json();

})
.then(function(data){
	var tab = document.querySelector('#id_categoria');
	var linhas = '<option>Categorias</option>';
	
	//montando as linhas da tabela (uma a uma)
	for(i=0; i< data.length; i++){				
		linhas+='<option value="'+data[i].cd+'">';
		linhas+=data[i].nome;
		linhas+='</option>';			
	}
	//colocando as linhas na tabela 
	tab.innerHTML = linhas;
});
// Dropdown produtos
var cat = document.querySelector('#id_categoria');

cat.addEventListener('change',function(e){

	var c = e.target.value;

	fetch(url+'?listarProduto='+c)
	.then(function(data){
		return data.json();

	})
	.then(function(data){
		var tab = document.querySelector('#produto');
		var linhas = '';

		//montando as linhas da tabela (uma a uma)
		for(i=0; i< data.length; i++){				
			linhas+='<option valor="'+data[i].valor+'" foto="'+data[i].foto+'" nome="'+data[i].nome+'" value="'+data[i].cd+'">';
			linhas+=data[i].nome;
			linhas+='</option>';				
		}

		//colocando as linhas na tabela 
		tab.innerHTML = linhas;
	});

});

var btnAdd = document.querySelector('#Adicionar');
var produto = document.querySelector('#produto');
var qtd = document.querySelector('#qtd');
var obs = document.querySelector('#obs');
var resumo = document.querySelector('#resumo');
var btnExcluir = document.querySelector('#btn-excluir');
var salvar = document.querySelector('#salvar');


btnAdd.addEventListener('click', function(){
		
		var url = 'http://localhost:1001/10_11_2022_atualizada/';
		var	foto=url+produto.options[produto.selectedIndex].getAttribute('foto');
		var nome = produto.options[produto.selectedIndex].getAttribute('nome');
		var valor = produto.options[produto.selectedIndex].getAttribute('valor');

		var item = '<tr>';
			item+='<td><img src="'+foto+'" width="30px"></td>';							
			item+='<td>'+nome+'</td>';							
			item+='<td>'+qtd.value+'</td>';							
			item+='<td>'+obs.value+'</td>';		
			item+='<td>'+valor+'</td>';		
			item+='<td>'+(qtd.value * parseFloat(valor))+'</td>';							
			item+='</tr>';
			Adicionar(produto.value, nome, qtd.value, obs.value, foto, valor);
			resumo.innerHTML += item;
			Excluir(2)	

});




function Adicionar(item, nome, qtd, obs, foto, valor){
	
	var novo = {
		cd: item,
		nome: nome,
		qtd: qtd,
		obs: obs,
		foto: foto,
		valor: valor
	};

	var dados = localStorage.pedido;

	//verificar se não existe e criar
	if(!dados){
		dados =[];
	}else{
		//caso ja existe, carregamos os dados
		dados = JSON.parse(dados);
	}	
		//antes de adicionar item novo
		var total = dados.length;
		var item = '';
		var existe = false;

		//vamos verificar se o mesmo ja existe no pedido
		for (var i=0; i< total; i++){

			//se ja existe, atualizamos a qtd
			if(dados[i].cd == novo.cd){
				var atual = parseInt(dados[i].qtd);
				var novo = parseInt(novo.qtd);
				dados[i].qtd = novo + atual;
				existe = true;
			}
		}

		if(!existe){
			//adicionar item novo
			dados.push(novo);	
		}
		//salvamos no armazenamento
		localStorage.setItem('pedido', JSON.stringify(dados));

		var form = new FormData();
		form.append('produto', produto);
	
		fetch(url, {
			body: form,
			method: 'post'
			})
			.then(function(dados){
				return dados.text();
			})
			.then(function(dados){
				alert(dados);
			});
	}


function Excluir(cd){
	var dados = localStorage.pedido;
	if(dados){
		dados = JSON.parse(dados);
		var total = dados.length;

        	 for (let i = 0; i < total; i++){
    
        	     if (dados[i].cd == cd){
        	        dados.splice(dados.indexOf(dados[i]),1);

        	     }
        	 }
    	}
	//salvamos no armazenamento
		localStorage.setItem('pedido', JSON.stringify(dados));

		var form = new FormData();
		form.append('produto', produto);
	
		fetch(url, {
			body: form,
			method: 'post'
			})
			.then(function(dados){
				return dados.text();
			})
			.then(function(dados){
				alert(dados);
			});
	}

	salvar.addEventListener('click', function(){
	//localStorage.getItem('pedido', JSON.stringify(dados));
	//alert(cd);
	var dados = localStorage.pedido;
	var total = dados.length;
	if(dados){
		dados = JSON.parse(dados);
		
		 for(var i=0; i<total; i++){
			console.table(dados[i].nome);
		let form = new FormData();
        form.append('cd_produto',dados[i].cd);
        form.append('qt_produto',dados[i].qtd);
        form.append('obs_produto',dados[i].obs);

			fetch(url,{
				body:form,
				method:'post'
			})
			.then(function(dados){
				return dados.text();
			})
			.then(function(dados){
				console.log(dados);
				//limpar tabela e localstorage
			});
	 }
}
});



//Carregamento
window.onload = function(){
	var resumo = document.querySelector('#resumo');
	var dados = localStorage.pedido;

	//verifica se existe e carregamos
	if(dados){
		dados = JSON.parse(dados);
		var total = dados.length;
		var item = '';

		for(var i=0; i< total; i++){
			item+= '<tr>';
			item+='<td><img src="'+dados[i].foto+'" width="30px"></td>';							
			item+='<td>'+dados[i].nome+'</td>';							
			item+='<td>'+dados[i].qtd+'</td>';							
			item+='<td>'+dados[i].obs+'</td>';		
			item+='<td>'+dados[i].valor+'</td>';		
			item+='<td>'+(parseFloat(dados[i].qtd) * parseFloat(dados[i].valor))+'</td>';	
			item += '<td><button onclick="Excluir('+dados[i].cd+')"  class="btn btn-primary" id="btn-excluir" >Excluir</button></td>';							
			item+='</tr>';
		}
		resumo.innerHTML += item;
	}

};
