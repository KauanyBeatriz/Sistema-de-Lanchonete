window.onload = function(){

    let url = 'http://localhost:1001/10_11_2022_atualizada/api.php';
    AtualizarTabela();
    
    let produto = document.querySelector('#produto');
    let nm_prod = document.querySelector('#nm_prod');
    let descricao = document.querySelector('#descricao');
    let valor = document.querySelector('#valor');
    let cat = document.querySelector('#id_categoria');
    let fotos = document.querySelector('#fotos');


        fetch(url+'?listar')
        .then(function(data){
            return data.json();
        })
        .then(function(data){
            var tab = document.querySelector('#listaCategoria');
            //montando as linhas da tabela (uma a uma)
            linhas="";
            for(i=0; i < data.length; i++){
                linhas+='<option value="'+data[i].cd+'">';
                linhas+=data[i].nome;
                linhas+='</option>';
            }
            //colocando as linhas na tabela
            cat.innerHTML = linhas;
            
        });
    
    produto.addEventListener('click',function(){
    
        let form = new FormData();
        form.append('nm_prod',nm_prod.value);
        form.append('descricao',descricao.value);
        form.append('valor',valor.value);
        form.append('id_categoria',cat.value);
        form.append('fotos',fotos.files[0]);
    
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
        
        function AtualizarTabela(){
        //buscar os registros
        fetch(url+'?listarProduto')
        .then(function(data){
            return data.json();
        })
        .then(function(data){
            var tab = document.querySelector('#listaProduto');
            //montando as linhas da tabela (uma a uma)
            linhas="";
            for(i=0; i < data.length; i++){
                linhas+='<tr>';
                linhas+='<td>'+data[i].cd+'</td>';
                linhas+='<td>'+data[i].nome+'</td>';
                linhas+='<td>'+data[i].descricao+'</td>';
                linhas+='<td>'+data[i].valor+'</td>';
                linhas+='<td>'+data[i].id_categoria+'</td>';
                linhas+='<td></td>';
                linhas+='<td></td>';
                linhas+='<tr>';
            }
            //colocando as linhas na tabela
            tab.innerHTML = linhas;
            
        });
        }
        input=document.getElementById("busca");
        busca.addEventListener('keyup', function(){
            Filtrar();
        })
        function Filtrar() {
          // Declare variables
          var input, filter, table, tr, td, i, txtValue;
          input = document.getElementById("busca");
          filter = input.value.toUpperCase();
          table = document.getElementById("listaProduto");
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