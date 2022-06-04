angular.module('pacientes',['angularModalService'])

.factory("flash", function($rootScope) {

  return {

    pop: function(message) {
      switch(message.type) {
        case 'success':
          toastr.success(message.body, message.title);
          break;
        case 'info':
          toastr.info(message.body, message.title);
          break;
        case 'warning':
          toastr.warning(message.body, message.title);
          break;
        case 'error':
          toastr.error(message.body, message.title);
          break;
      }
    }
  };
})



.controller('PacientesCtrl', function($scope, $http, ModalService, flash){
	angular.element(document).ready(function () {

    	$scope.selectPacientes();

	});

	$scope.mostrarModal = function(){
		// Debes proveer un controlador y una plantilla.
		ModalService.showModal({
			templateUrl: "nuevoPaciente.html",
      		controller: "modalCtrl"
		}).then(function(modal){
			modal.close.then(function(result){
				// Una vez que el modal sea cerrado, la libreria invoca esta función
        		// y en result tienes el resultado.
        		
        		$scope.resultadoModal = result;
        		$scope.selectPacientes();
			})
		})
	};

	$scope.selectPacientes = function(){
		//La parte del select donde mostramos los datos en la tabla
		angular.element($("#spinerContainer")).css("display", "block");
		$http.get('../models/selectPacientes.php').success(function(data){
			angular.element($("#spinerContainer")).css("display", "none");
			$scope.pacientes = data;
		});
	}
	

	
	//Ordenamos de forma ascendente o descendente los datos
	$scope.ordenarPor = function(orden){
		$scope.ordenSeleccionado = orden;
	};

	//Abrimos el modal para modificar y recibimos los datos a ser modificados
	$scope.modificar = function(paciente){
		var paciente = paciente;
		//alert(cliente);
		ModalService.showModal({
			templateUrl: "modificarPaciente.html",
			controller: "modificarCtrl",
			 inputs: {
				id: paciente.idPaciente,
    			nombre: paciente.Nombres,
    			apellido: paciente.Apellidos,
    			ci: paciente.ci,
				 telefono: paciente.Telefono
  			}
		}).then(function(modal){
			modal.close.then(function(result){
				// $scope.resultadoModal = result;
				$scope.selectPacientes();
			})
		})
		
	};

	//Funcion que se encarga de eliminar un registro
	$scope.eliminar = function(paciente){
		var paciente = paciente;
		//alert(cliente);
		ModalService.showModal({
			templateUrl: "eliminarPaciente.html",
			controller: "eliminarCtrl",
			inputs: {
				id: paciente.idPaciente,
				ci: paciente.Nombre
			}
		}).then(function(modal){
			modal.close.then(function(result){
				$scope.selectPacientes();
			})
		})
	};

	
})

.controller('eliminarCtrl', function($scope, close, $http, id, ci,flash){

	$scope.cerrarModal = function(){
		close();
	};
	

		var model = {
			id: id,
			ci: ci
		};


		$http.post("../models/eliminarPacientes.php", model)
		.success(function(res){
			$scope.historial = res;
			
			//close();
		});
	
})

	//El controller del modal modificar totalmente independiente de la pagina principal
.controller('modificarCtrl', function($scope, close, $http, id, nombre, apellido, ci, telefono,flash){
	$scope.nombre = nombre;
	$scope.apellido = apellido;
	$scope.ci = ci;
	$scope.telefono = telefono;
	$scope.cerrarModal = function(){
		close();
	};
	$scope.modificarPaciente = function(){
		var model = {
			nombre: $scope.nombre,
			apellido: $scope.apellido,
			ci: $scope.ci,
			id: id,
			telefono: telefono
		};
		angular.element($("#spinerContainer")).css("display", "block");
		$http.post("../models/modificarPacientes.php", model)
		.success(function(res){
			angular.element($("#spinerContainer")).css("display", "none");
			if(res == "error"){
				$scope.msgTitle = 'Error';
		    	$scope.msgBody  = 'Ha ocurrido un error!';
		    	$scope.msgType  = 'error';
		 		flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
			}else{
				$scope.msgTitle = 'Exitoso';
		    	$scope.msgBody  = res;
		    	$scope.msgType  = 'success';
		 		flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});				
			}
			$scope.nombre = null;
			$scope.apellido = null;
			$scope.ci = null;
			$scope.telefono = null;
			close();

		});
	};
})


	//El controller del modal nuevo totalmente independiente de la pagina principal (clientes)
.controller('modalCtrl', function($scope, close, $http,flash){
	$scope.cerrarModal = function(){
		close();
	};
	$scope.guardarPaciente = function(){
		var model = {
			nombre: $scope.nombre,
			apellido: $scope.apellido,
			ci: $scope.ci,
			telefono : $scope.telefono
		};

		 
		console.log(model);
		angular.element($("#spinerContainer")).css("display", "block");
		$http.post("../models/insertPacientes.php", model)
		.success(function(res){
			angular.element($("#spinerContainer")).css("display", "none");
			if(res == "error"){
				$scope.msgTitle = 'Error';
		    	$scope.msgBody  = 'Ha ocurrido un error!';
		    	$scope.msgType  = 'error';
		 		flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
			}else{
				$scope.msgTitle = 'Exitoso';
		    	$scope.msgBody  = res;
		    	$scope.msgType  = 'success';
		 		flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});				
			}
			$scope.nombre = null;
			$scope.apellido = null;
			$scope.ci = null;
			$scope.telefono = null;
			close();
		});
	}
})
