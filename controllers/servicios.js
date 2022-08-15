angular.module('servicios',['angularModalService'])

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



.controller('ServiciosCtrl', function($scope, $http, ModalService, flash){
	angular.element(document).ready(function () {

    	$scope.selectServicios();

	});

	$scope.mostrarModal = function(){
		// Debes proveer un controlador y una plantilla.
		ModalService.showModal({
			templateUrl: "nuevoServicio.html",
      		controller: "modalCtrl"
		}).then(function(modal){
			modal.close.then(function(result){
        		if(result){
        			$scope.selectServicios();
        		}	
			})
		})
	};

	$scope.selectServicios = function(){
		//La parte del select donde mostramos los datos en la tabla
		angular.element($("#spinerContainer")).css("display", "block");
		$http.get('../models/selectServicios.php').success(function(data){
			angular.element($("#spinerContainer")).css("display", "none");
			$scope.servicios = data;
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
	$scope.modificar = function(servicio){
		var servicio = servicio;
		//alert(cliente);
		ModalService.showModal({
			templateUrl: "modificarServicio.html",
			controller: "modificarCtrl",
			 inputs: {
				servicio: servicio
  			}
		}).then(function(modal){
			modal.close.then(function(result){
				if(result){
					$scope.selectServicios();
				}
				
			})
		})
		
	};

	//Funcion que se encarga de eliminar un registro
	$scope.eliminar = function(servicio){
		var servicio = servicio;
		ModalService.showModal({
			templateUrl: "eliminarServicio.html",
			controller: "eliminarCtrl",
			inputs: {
				idServicio: servicio.idServicio,
				nombe: servicio.Nombre
			}
		}).then(function(modal){
			modal.close.then(function(result){
				if(result){
					$scope.selectServicios();
				}
				
			})
		})
	};

	
})

.controller('eliminarCtrl', function($scope, close, $http, idServicio, nombe,flash){

	$scope.cerrarModal = function(){
		close();
	};
	

	var model = {
		idServicio: idServicio,
		nombe: nombre
	};


	$http.post("../models/eliminarServicio.php", model)
	.success(function(res){
		
	});
	
})

	//El controller del modal modificar totalmente independiente de la pagina principal
.controller('modificarCtrl', function($scope, close, $http, paciente,flash){
	$scope.nombre = paciente.Nombres;
	$scope.apellido = paciente.Apellidos;
	$scope.ci = paciente.Ci;
	$scope.telefono = paciente.Telefono;
	$scope.ciudad = paciente.Ciudad;
	$scope.barrio = paciente.Barrio;
	$scope.descripcion = paciente.Descripcion;
	var miGenero;
	angular.element($("#spinerContainer")).css("display", "block");
	
	$scope.cerrarModal = function(){
		close();
	};
	$scope.modificarPaciente = function(){
		var model = {
			nombre: $scope.nombre,
			apellido: $scope.apellido,
			ci: $scope.ci,
			id: paciente.idPaciente,
			telefono: $scope.telefono,
			ciudad: $scope.ciudad,
			barrio: $scope.barrio,
			genero: $scope.miGen.idGenero,
			descripcion: $scope.descripcion
		};
		console.log(model)
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
		 		close(true);				
			}
			$scope.nombre = null;
			$scope.apellido = null;
			$scope.ci = null;
			$scope.telefono = null;
			$scope.ciudad = null;
			$scope.barrio = null;
			$scope.genero = null;
			$scope.descripcion = null;
		});
	};
})


	//El controller del modal nuevo totalmente independiente de la pagina principal (clientes)
.controller('modalCtrl', function($scope, close, $http,flash){

	$scope.cerrarModal = function(){
		close();
	};
	$scope.guardarServicio = function(){
		var model = {
			nombre: $scope.nombre,
			descripcion: $scope.descripcion,
			costo: $scope.costo
		};

		if(model.nombre == undefined || model.costo == undefined){
			$scope.msgTitle = 'Atención';
		  	$scope.msgBody  = 'Debe completar los campos requeridos!';
		  	$scope.msgType  = 'warning';
		 	flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
		}else{
			angular.element($("#spinerContainer")).css("display", "block");
			$http.post("../models/insertServicio.php", model)
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
				$scope.costo = null;;
			});
		}
	}
})
