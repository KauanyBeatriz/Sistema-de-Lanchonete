<?php
header("Access-Control-Allow-Origin: *");
$conn = new mysqli('localhost','root','usbw','sistema');

if(isset($_GET['login']) && isset($_GET['senha'])){
	//vamos fazer a consulta no banco
	$sql = 'SELECT * FROM user WHERE email="'.$_GET['login'].'" AND senha="'.$_GET['senha'].'"';
	$resultado = $conn->query($sql);
	
	if($resultado->num_rows > 0){
		$dados['user'] = $resultado->fetch_object();
		$dados['erro'] = false;
	}else{
		$dados['erro'] = $sql;
	}
	echo json_encode($dados);
}
else if(isset($_POST['nm_cat'])){
	$sql = 'INSERT INTO categoria (nome) VALUES ("'.$_POST['nm_cat'].'")';
	$resultado = $conn->query($sql);
	if($resultado){
		echo "Cadastrado com sucesso";
	}else{
		echo "Erro:".$conn->error;
	}
}
else if(isset($_GET['listar'])){
	$sql = 'SELECT * FROM categoria';
	$resultado = $conn->query($sql);
	$dados = [];
	while ($c=$resultado->fetch_object()) {
		$dados[] = $c;
	}
	echo json_encode($dados);
}

else if(isset($_POST['nm_prod'])){
	$destino = 'fotos/'.$_FILES['fotos']['name'];
	$sql = 'INSERT INTO produto (nome, descricao, valor, id_categoria, foto) VALUES ("'.$_POST['nm_prod'].'", "'.$_POST['descricao'].'", '.$_POST['valor'].', '.$_POST['id_categoria'].', "'.$destino.'")';
	if(move_uploaded_file($_FILES['fotos']['tmp_name'], $destino)){
		$resultado = $conn->query($sql);
		if($resultado){
			echo "Cadastrado com sucesso";
		}else{
			echo "Erro:".$sql;
		}
		
	}else{
		echo "Erro ao salvar foto";
	}

	
}
else if(isset($_GET['listarProduto'])){
	$sql = 'SELECT * FROM produto';
	if($_GET['listarProduto'] >0){
		$sql.= ' WHERE id_categoria='. $_GET['listarProduto'];
	}
	$resultado = $conn->query($sql);
	$dados = [];
	while ($c=$resultado->fetch_object()) {
		$dados[] = $c;
	}
	echo json_encode($dados);
}

else if(isset($_GET['delCat'])){
	$sql = 'DELETE FROM categoria WHERE cd='.$_GET['delCat'];
	$resultado = $conn->query($sql);
	if ($resultado) {
		echo "Excluido com sucesso";
	}else{
		echo "Erro ao excluir:\n\Existem produtos vínculados";
	}
}

else if(isset($_POST['cadproduto'])){
	$sql = 'INSERT INTO pedido (nome, qtd, obs, total) VALUES ("'.$_POST['nome'].'", '.$_POST['qtd'].', "'.$_POST['obs'].'", "'.$_POST['total'].'")';
	$resultado = $conn->query($sql);
	if($resultado){
		echo "Cadastrado com sucesso";
	}else{
		echo "Erro:".$conn->error;
	}
}

else if(isset($_GET['delpedido'])){
	$sql = 'DELETE FROM item WHERE cd='.$_GET['delpedido'];
	$resultado = $conn->query($sql);
	if ($resultado) {
		echo "Excluido com sucesso";
	}else{
		echo "Erro ao excluir:\n\Existem produtos vínculados";
	}
}
else if(isset($_POST['cd_produto'])){
	echo $_POST['qt_produto'];

		$sql = 'INSERT INTO item (id_pedido, id_produto, qt_produto, obs_produto) VALUES (1,'.$_POST['cd_produto'].', '.$_POST['qt_produto'].', "'.$_POST['obs_produto'].'")';
		$resultado = $conn->query($sql);
		if($resultado){
			echo "Cadastrado com sucesso";
		}else{
			echo "Erro:".$conn->error;
		}
}


?>