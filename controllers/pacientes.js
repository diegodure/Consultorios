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

    	$scope.selectPacientes(idService);

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
        		if(result){
        			$scope.selectPacientes(idService);
        		}	
			})
		})
	};

	$scope.selectPacientes = function(idService){
		//La parte del select donde mostramos los datos en la tabla
		angular.element($("#spinerContainer")).css("display", "block");
		$http.get('../models/selectPacientes.php', { params: { idService: idService } }).success(function(data){
			angular.element($("#spinerContainer")).css("display", "none");
			$scope.pacientes = data;
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
	$scope.modificar = function(paciente){
		var paciente = paciente;
		//alert(cliente);
		ModalService.showModal({
			templateUrl: "modificarPaciente.html",
			controller: "modificarCtrl",
			 inputs: {
				paciente: paciente
  			}
		}).then(function(modal){
			modal.close.then(function(result){
				if(result){
					$scope.selectPacientes();
				}
				
			})
		})
		
	};

	//Funcion que se encarga de eliminar un registro
	$scope.historial = function(paciente){
		var paciente = paciente;
		//alert(cliente);
		ModalService.showModal({
			templateUrl: "historialPaciente.html",
			controller: "historialCtrl",
			inputs: {
				id: paciente.idPaciente,
				ci: paciente.Nombre
			}
		}).then(function(modal){
			modal.close.then(function(result){
				if(result){
					$scope.selectPacientes();
				}
				
			})
		})
	};

	
})

.controller('historialCtrl', function($scope, close, $http, id, ci,flash){

	$scope.cerrarModal = function(){
		close();
	};
	

	var model = {
		id: id,
		ci: ci
	};


	$http.post("../models/historialPacientes.php", model)
	.success(function(res){
		console.log(res)
		$scope.historial = res;
		
		//close();
	});

	$scope.showHistoric = function(idConsulta){
		if(angular.element($("#historic-"+idConsulta)).css("display") == "none"){
			angular.element($("#historic-"+idConsulta)).css("display", "block");
		}else{
			angular.element($("#historic-"+idConsulta)).css("display", "none");
		}
	}
	
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
	$http.get('../models/selectGenders.php').success(function(data){
		var modalHeader = angular.element($(".modal-header")).innerHeight();
	 	var navbar = angular.element($(".navbar-fixed-bottom")).innerHeight();
	 	var modalFooter = angular.element($(".modal-footer")).innerHeight();
	    var modalBody = angular.element($(".modal-body"));
		var contentHeight = window.outerHeight - modalHeader - modalFooter  - navbar - 250;
		modalBody.css("maxHeight", contentHeight);
		$scope.generos = data;
		miGenero = {"idGenero":paciente.idGender, "Nombre":paciente.genderName};
		$scope.miGen = miGenero;
		angular.element($("#spinerContainer")).css("display", "none");
	});
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
		if(model.nombre == undefined || model.apellido == undefined || model.ci == undefined 
			|| model.telefono == undefined || model.genero == undefined){
			$scope.msgTitle = 'Atención';
		  	$scope.msgBody  = 'Debe completar los campos obligatorios!';
		  	$scope.msgType  = 'warning';
		 	flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
		}else{
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
		}		
	};
})


	//El controller del modal nuevo totalmente independiente de la pagina principal (clientes)
.controller('modalCtrl', function($scope, close, $http,flash){
	angular.element($("#spinerContainer")).css("display", "block");
	$http.get('../models/selectGenders.php').success(function(data){
		var modalHeader = angular.element($(".modal-header")).innerHeight();
	 	var navbar = angular.element($(".navbar-fixed-bottom")).innerHeight();
	 	var modalFooter = angular.element($(".modal-footer")).innerHeight();
	    var modalBody = angular.element($(".modal-body"));
		var contentHeight = window.outerHeight - modalHeader - modalFooter  - navbar - 250;
		modalBody.css("maxHeight", contentHeight);
		$scope.genders = data;
		angular.element($("#spinerContainer")).css("display", "none");
	});

	$scope.cerrarModal = function(){
		close();
	};
	$scope.guardarPaciente = function(){
		var model = {
			nombre: $scope.nombre,
			apellido: $scope.apellido,
			ci: $scope.ci,
			telefono: $scope.telefono,
			ciudad : $scope.ciudad,
			barrio : $scope.barrio,
			genero : $scope.genero,
			descripcion : $scope.descripcion,
			idService:idService
		};

		if(model.nombre == undefined || model.apellido == undefined || model.ci == undefined 
			|| model.telefono == undefined || model.genero == undefined){
			$scope.msgTitle = 'Atención';
		  	$scope.msgBody  = 'Debe completar los campos obligatorios!';
		  	$scope.msgType  = 'warning';
		 	flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
		}else{
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
		}
	}
})
