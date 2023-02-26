let url = 'http://localhost:1001/10_11_2022_atualizada/api.php';

function AtualizarTabela(){
	fetch(url+'?listar')
	.then(function(data){
		return data.json();
	})
	.then(function(data){
		var tab = document.querySelector('#listaCategoria');
		//montando as linhas da tabela (uma a uma)
		linhas="";
		for(i=0; i < data.length; i++){
			linhas+='<tr>';
			linhas+='<td>'+data[i].cd+'</td>';
			linhas+='<td>'+data[i].nome+'</td>';
			linhas+='<td></td>';
			linhas+='<td><button onclick="Excluir(this);" value = "'+data[i].cd+'">Excluir</button></td>';
			linhas+='<tr>';
		}
		//colocando as linhas na tabela
		tab.innerHTML = linhas;
	
	});
}
	
AtualizarTabela();

window.onload = function(){



let cadCat = document.querySelector('#cadCategoria');
let nm_cat = document.querySelector('#nm_cat');

cadCat.addEventListener('click',function(){

	let form = new FormData();
	form.append('nm_cat',nm_cat.value);

	fetch(url,{
		body:form,
		method:'post'
	})
	.then(function(data){
		return data.text();
		AtualizarTabela();
	})
	.then(function(data){
		alert(data);
		AtualizarTabela();
	});
});
	
	
	

	input=document.getElementById("busca");
	busca.addEventListener('keyup', function(){
		Filtrar();
	})
	function Filtrar() {
	  // Declare variables
	  var input, filter, table, tr, td, i, txtValue;
	  input = document.getElementById("busca");
	  filter = input.value.toUpperCase();
	  table = document.getElementById("listaCategoria");
	  tr = table.getElementsByTagName("tr");

	  // Loop through all table rows, and hide those who don't match the search query
	  for (i = 0; i < tr.length; i++) {
	    td = tr[i].getElementsByTagName("td")[1];
	    if (td) {
	      txtValue = td.textContent || td.innerText;
	      if (txtValue.toUpperCase().indexOf(filter) > -1) {
	        tr[i].style.display = "";
	      } else {
	        tr[i].style.display = "none";
	      }
	    }
	  }
	}
	
	}
	function Excluir(e){
		fetch(url+'?delCat='+e.value)
		.then(function(data){
			return data.text();
		})	
		.then(function(data){
			alert(data);
		});
		AtualizarTabela();
}