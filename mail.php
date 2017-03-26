<?php

//pega os dados do $http do Angular
$meuPost = file_get_contents("php://input");

//para acessar os dados: $json.nome ou $Json.email e etc.

if($meuPost){
	$json= json_decode( $meuPost );

	$nome = $json->nome;
    $email = $json->email;
    $opcao = $json->opcao;

    //Lista de jogos
    $jogos = $json->jogos;
    $total = $json->total;

	//Detalhes para pagamento
    $conta = $json->conta;
	$banco = $json->banco;
	$agencia = $json->agencia;
    $cpf = $json->cpf;
	



	$assunto = 'Solicitação de Cotação';
	$message = "
    <style type='text/css'>
    body {
    margin:0px;
    font-family: arial;
    font-size:14px;
    }
    .compra{
    	color:red;
    }
    </style>
    <html>
        Recebemos uma Solicitação de cotação de $nome<br>
    </html>
    ";

}

$to = 'felipennunes@hotmail.com';

$headers = 'Content-type: text/html; charset=utf-8' . "\r\n";

if(mail($to, $assunto, $message, $headers)){
  echo "<p class='text-success'>Mensagem Enviada Com Sucesso!</p>";
  echo json_encode(array(

                        "nome"=>$json->nome,
                        "email"=>$json->email,
                        

                    ));
}else{
  echo "<p class='text-danger'>Sua Mensagem Não Foi Enviada!</p>";
}

//retorna os dados para o success do Angular
