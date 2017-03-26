/*
	Autor: Felipe Nunes
	Data: 26/03/2017
 */

// Retorna lista de jogos e Solicita Cotação
app.controller("cotacaoCtrl",["$scope","$http",
 function($scope,$http){
	
	$scope.appname = "Solicitar Cotação";

	$scope.preco = $scope.jogo;

	$scope.lista_jogos = [];


	var carregarJogos = function () {

		$http({ method: 'GET', url: 'http://127.0.0.1:8000/jogos/' })	
		  .success(function (data) {
		      $scope.jogos = data;
		  })
		  .error(function (data, status, headers, config) {

		  });

	};
	carregarJogos();

	function toFixed(number){
	    number = parseFloat(number);
	    if(number % 1 != 0){
	        return parseFloat(number.toFixed(2));
	    }else{
	        return number;
	    }
	} 

	function pegaData() {
		var date = new Date();
		var month = (date.getMonth()+1) > 9 ? (date.getMonth()+1) : "0" + (date.getMonth()+1);
		var day = (date.getDate()) > 9 ? (date.getDate()) : "0" + (date.getDate());
		var hours = (date.getHours()) > 9 ? (date.getHours()) : "0" + (date.getHours());
		var minutes = (date.getMinutes()) > 9 ? (date.getMinutes()) : "0" + (date.getMinutes());
		var seconds = (date.getSeconds()) > 9 ? (date.getSeconds()) : "0" + (date.getSeconds());

		var dateString = 
		    day + "/" + 
		    month + "/" + 
		    date.getFullYear() + " - " + 
		    hours + ":" + 
		    minutes + ":" + 
		    seconds;
		return dateString;
	}
	
	$scope.adicionarJogo = function (jogo) {
		var jogo = {nome:"",quantidade:0,subTotal:0};
		jogo.nome = $scope.jogo.nome.fields.nome;
		jogo.quantidade = $scope.jogo.quantidade;
		jogo.subTotal = $scope.jogo.quantidade * $scope.jogo.nome.fields.preco;
		$scope.lista_jogos.push(jogo);
		$scope.jogo.quantidade = "";
		$scope.jogo.nome = "";
		var total = 0;
		for (var i = $scope.lista_jogos.length - 1; i >= 0; i--) {
			 total += $scope.lista_jogos[i].subTotal;
		}
		$scope.totalGeral=total;

	}

	$scope.apagarJogo = function(jogo){
    	var pos = $scope.lista_jogos.indexOf(jogo);
    	$scope.lista_jogos.splice(pos,1);
    	var total = 0;
		for (var i = $scope.lista_jogos.length - 1; i >= 0; i--) {
			 total += $scope.lista_jogos[i].subTotal;
		}
		$scope.totalGeral=total;

    }

	$scope.enviarSolicitacao = function(cliente, lista_jogos){
		nome_cliente = cliente.nome;
		email_cliente = cliente.email;
		opcao_cliente = cliente.opcao;
		if (opcao_cliente == "dinheiro") {
			banco_cliente = cliente.banco;
			agencia_cliente = cliente.agencia;
			conta_cliente = cliente.conta;
			cpf_cliente = cliente.cpf;
		}else{
			banco_cliente = "";
			agencia_cliente = "";
			conta_cliente = "";
			cpf_cliente = "";
		}
		var total = 0;
		for (var i = lista_jogos.length - 1; i >= 0; i--) {
			total+=lista_jogos[i].subTotal;
		}

		$http({
          url: 'mail.php',
          method: 'POST',
          data: {
            'jogos': lista_jogos,
            'total': total,
            'nome': nome_cliente,
            'email': email_cliente,
            'opcao': opcao_cliente, 

            //Detalhes para pagamento em dinheiro
            'banco': banco_cliente, 
            'agencia': agencia_cliente,
            'conta': conta_cliente, 
            'cpf': cpf_cliente,         
            
          },
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            
          }
          
	        }).
	        success(function (data) {
	            $scope.success = true;
	            
	            $scope.lista_jogos = [];
				$scope.cliente.email = '';
				$scope.cliente.nome = '';
				$scope.cliente.opcao = '';
				$scope.cliente.conta = '';
				$scope.cliente.banco = '';
				$scope.cliente.agencia = '';
				$scope.cliente.cpf = '';

				// valor total
				$scope.totalGeral = '';

				//$scope.formularioContato.$setPristine();
				
				alert("Cotação enviada com Sucesso! Verifique seu e-mail nos próximos dias. Após análise, entraremos em contato.");
	            
	        }).
	        error(function (data) {
	            $scope.error = true;
	            
	        });


	};

}]);


