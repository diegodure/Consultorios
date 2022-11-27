angular.module('consultas',['angularModalService', '720kb.datepicker'])

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

.controller('ConsultasCtrl', function($scope, $http, ModalService){
	angular.element(document).ready(function () {
	    var states;

	    $scope.getConsultas();
	    $scope.getStates();
        
	});

	$scope.getStates = function(){
	  $http.get('../models/selectStates.php').success(function(data){
	    states = data;
	  });
  	}

  	$scope.getConsultas = function(){
	  $http.get('../models/agendConsult.php').success(function(data){
	  	$scope.consultas = data;
	    console.log(data)
	  });
  	}

  	$scope.searchConsult = function(){

  	}

  	$scope.showConsult = function(consulta){
  		console.log(consulta)
  		// Debes proveer un controlador y una plantilla.
		ModalService.showModal({
			templateUrl: "cerrarConsulta.html",
      		controller: "cerrarConsultaCtrl",
      		inputs: {consulta: consulta}
		}).then(function(modal){
			modal.close.then(function(result){
				// Una vez que el modal sea cerrado, la libreria invoca esta función
        		// y en result tienes el resultado.
        		if(result){
        			$scope.getConsultas();
        		}
			})
		})
  	}

})

.controller('cerrarConsultaCtrl', function($scope, close, $http, consulta,flash){
	$scope.pacienteNombre = consulta.title;
	$scope.pacienteApellido = consulta.pacienteApellido;
	$scope.motivoConsulta = consulta.Motivo;

	$scope.cerrarModal = function(){
		close();
	}

	$scope.saveConsult = function(){

	}
})


