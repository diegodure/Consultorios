angular.module('profesionales',['angularModalService'])

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



.controller('ProfesionalesCtrl', function($scope, $http, ModalService, flash){
	angular.element(document).ready(function () {

    	$scope.selectProfesional();

	});

	$scope.mostrarModal = function(){
		// Debes proveer un controlador y una plantilla.
		ModalService.showModal({
			templateUrl: "nuevoProfesional.html",
      		controller: "modalCtrl"
		}).then(function(modal){
			modal.close.then(function(result){
        		if(result){
        			$scope.selectProfesional();
        		}	
			})
		})
	};

	$scope.selectProfesional = function(){
		//La parte del select donde mostramos los datos en la tabla
		angular.element($("#spinerContainer")).css("display", "block");
		$http.get('../models/selectProfesionales.php').success(function(data){
			angular.element($("#spinerContainer")).css("display", "none");
			$scope.profesionales = data;
			var topbar = angular.element($(".navbar-default")).innerHeight();
 			var navbar = angular.element($(".navbar-fixed-bottom")).innerHeight();
 			var formGroup = angular.element($(".form-group")).innerHeight();
    		var table = angular.element($(".table-responsive"));
			var heightTable = window.outerHeight - topbar - navbar  - formGroup - 250;
			table.css("maxHeight", heightTable);
		});
	}
	

	
	//Ordenamos de forma ascendente o descendente los datos
	$scope.ordenarPor = function(orden){
		$scope.ordenSeleccionado = orden;
	};

	//Abrimos el modal para modificar y recibimos los datos a ser modificados
	$scope.modificar = function(profesional){
		var profesional = profesional;
		//alert(cliente);
		ModalService.showModal({
			templateUrl: "modificarProfesional.html",
			controller: "modificarCtrl",
			 inputs: {
				profesional: profesional
  			}
		}).then(function(modal){
			modal.close.then(function(result){
				if(result){
					$scope.selectProfesional();
				}
				
			})
		})
		
	};

	//Funcion que se encarga de eliminar un registro
	$scope.eliminar = function(profesional){
		var profesional = profesional;
		ModalService.showModal({
			templateUrl: "eliminarProfesional.html",
			controller: "eliminarCtrl",
			inputs: {
				profesional: profesional
			}
		}).then(function(modal){
			modal.close.then(function(result){
				if(result){
					$scope.selectProfesional();
				}
				
			})
		})
	};

	
})

.controller('eliminarCtrl', function($scope, close, $http, profesional,flash){

	$scope.cerrarModal = function(){
		close();
	};
	var model = {
		idProfesional: profesional.idProfesionale,
		nombe: profesional.Nombres
	};

	$scope.eliminarProfesional = function(){
		$http.post("../models/eliminarProfesional.php", model)
		.success(function(res){
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
		 		close(true);				
			}
		});
	}
	
})

	//El controller del modal modificar totalmente independiente de la pagina principal
.controller('modificarCtrl', function($scope, close, $http, profesional,flash){
	$scope.idProfesionale = profesional.idProfesionale;
	$scope.nombre = profesional.Nombres;
	$scope.apellido = profesional.Apellidos;
	$scope.ci = profesional.Ci;
	$scope.telefono = profesional.Telefono;

	$scope.cerrarModal = function(){
		close();
	};
	$scope.modificarProfesional = function(){
		var model = {
			idProfesionale: $scope.idProfesionale,
			nombre: $scope.nombre,
			apellido: $scope.apellido,
			ci: $scope.ci,
			telefono: $scope.telefono
		};
	
		if(model.nombre == undefined || model.apellido == undefined || model.ci == undefined 
			|| model.telefono == undefined){
			$scope.msgTitle = 'Atención';
		  	$scope.msgBody  = 'Debe completar los campos obligatorios!';
		  	$scope.msgType  = 'warning';
		 	flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
		}else{
			angular.element($("#spinerContainer")).css("display", "block");
			$http.post("../models/modificarProfesional.php", model)
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
			 		close(true);				
				}
				$scope.nombre = null;
				$scope.descripcion = null;
				$scope.costo = null;
			});
		}
	};
})


	//El controller del modal nuevo totalmente independiente de la pagina principal (clientes)
.controller('modalCtrl', function($scope, close, $http,flash){

	$scope.cerrarModal = function(){
		close();
	};
	$scope.guardarProfesional = function(){
		var model = {
			nombre: $scope.nombre,
			apellido: $scope.apellido,
			ci: $scope.ci,
			telefono: $scope.telefono,
		};

		if(model.nombre == undefined || model.apellido == undefined || model.ci == undefined 
			|| model.telefono == undefined){
			$scope.msgTitle = 'Atención';
		  	$scope.msgBody  = 'Debe completar los campos obligatorios!';
		  	$scope.msgType  = 'warning';
		 	flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
		}else{
			angular.element($("#spinerContainer")).css("display", "block");
			$http.post("../models/insertProfesionales.php", model)
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
			 		close(true);				
				}
				$scope.nombre = null;
				$scope.apellido = null;
				$scope.ci = null;
				$scope.telefono = null;
			});
		}
	}
})
