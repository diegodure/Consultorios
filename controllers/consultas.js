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

  	angular.element($("#spinerContainer")).css("display", "block");
  	$scope.getConsultas = function(){
	  $http.get('../models/agendConsult.php').success(function(data){
	  	angular.element($("#spinerContainer")).css("display", "none");
	  	$scope.consultas = data;
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
	$scope.profesionalNombre = consulta.Nombres;
	$scope.profesionalApellido = consulta.profesionalApellido;
	$scope.pacienteNombre = consulta.title;
	$scope.pacienteApellido = consulta.pacienteApellido;
	$scope.motivoConsulta = consulta.Motivo;
	$scope.observacionConsulta = consulta.Observacion;

	$scope.cerrarModal = function(){
		close();
	}

	$scope.saveConsult = function(){
    if($scope.indicaciones == "" || $scope.indicaciones == undefined || $scope.indicaciones == null){
      $scope.msgTitle = 'Atención!';
      $scope.msgBody  = 'Debe agregar por lo menos la indicación';
      $scope.msgType  = 'warning';
      flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
    }else{
      model = {
        receta: $scope.receta,
        indicaciones: $scope.indicaciones,
        analisis: $scope.analisis,
        observacion: $scope.observacion,
        nextCosult: $scope.nextCosult
      }
      console.log(model);
      console.log(consulta)
    }
	}
})


