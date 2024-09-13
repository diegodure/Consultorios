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
    	$scope.selectServicios(idService);

	});

	$scope.mostrarModal = function(){
		// Debes proveer un controlador y una plantilla.
		ModalService.showModal({
			templateUrl: "nuevoServicio.html",
      		controller: "modalCtrl"
		}).then(function(modal){
			modal.close.then(function(result){
        		if(result){
        			$scope.selectServicios(idService);
        		}	
			})
		})
	};

	$scope.selectServicios = function(idService){
		//La parte del select donde mostramos los datos en la tabla
		angular.element($("#spinerContainer")).css("display", "block");
		$http.get('../models/selectServicios.php', { params: { idService: idService } }).success(function(data){
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

	
})

.controller('eliminarCtrl', function($scope, close, $http, servicio,flash){

	$scope.cerrarModal = function(){
		close();
	};
	
	console.log(servicio)
	var model = {
		idServicio: servicio.idServicio,
		nombe: servicio.Nombre
	};

	$scope.eliminarServicio = function(){
		$http.post("../models/eliminarServicio.php", model)
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
.controller('modificarCtrl', function($scope, close, $http, servicio,flash){
	$scope.idServicio = servicio.idServicio;
	$scope.nombre = servicio.Nombre;
	$scope.descripcion = servicio.Descripcion;
	$scope.costo = servicio.Costo;

	$scope.cerrarModal = function(){
		close();
	};
	$scope.modificarServicio = function(){
		var model = {
			idServicio: $scope.idServicio,
			nombre: $scope.nombre,
			descripcion: $scope.descripcion,
			costo: $scope.costo,
			idService: idService
		};
		if(model.nombre == undefined || model.costo == undefined){
			$scope.msgTitle = 'Atención';
		  	$scope.msgBody  = 'Debe completar los campos obligatorios!';
		  	$scope.msgType  = 'warning';
		 	flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
		}else{
			angular.element($("#spinerContainer")).css("display", "block");
			$http.post("../models/modificarServicio.php", model)
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
	$scope.guardarServicio = function(){
		var model = {
			nombre: $scope.nombre,
			descripcion: $scope.descripcion,
			costo: $scope.costo,
			idService:idService
		};

		if(model.nombre == undefined || model.costo == undefined){
			$scope.msgTitle = 'Atención';
		  	$scope.msgBody  = 'Debe completar los campos obligatorios!';
		  	$scope.msgType  = 'warning';
		 	flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
		}else{
			console.log(model)
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
				$scope.costo = null;
			});
		}
	}
})
