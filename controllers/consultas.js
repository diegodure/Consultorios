angular.module('consultas',['angularModalService', '720kb.datepicker','moment-picker'])

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
  console.log(consulta)
	$scope.profesionalNombre = consulta.Nombres;
	$scope.profesionalApellido = consulta.profesionalApellido;
	$scope.pacienteNombre = consulta.title;
	$scope.pacienteApellido = consulta.pacienteApellido;
	$scope.motivoConsulta = consulta.Motivo;
	$scope.observacionConsulta = consulta.Observacion;

  if(consulta.idEstado == "2" || consulta.idEstado == 2){
    var model = {
      idConsult: consulta.idConsulta,
      idState: consulta.idEstado
    }
    angular.element($("#spinerContainer")).css("display", "block");
    $http.post("../models/getConsultResult.php", model)
    .success(function(data){
      angular.element($("#spinerContainer")).css("display", "none");
      if(data == "error"){
          $scope.msgTitle = 'Error';
            $scope.msgBody  = 'Ha ocurrido un error!';
            $scope.msgType  = 'error';
          flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
      }else{
          console.log(data)
          $scope.receta = data[0].Receta;
          $scope.indicaciones = data[0].Indicaciones;
          $scope.analisis = data[0].Analisis;
          $scope.observacion = data[0].Observacion;
          $scope.nextCosult = data[0].Siguiente_Consulta;
          angular.element($(".displayInput")).css("pointer-events", "none");
      }
    });
  }

	$scope.cerrarModal = function(){
		close();
	}

	$scope.saveConsult = function(){
    if($scope.indicaciones == "" || $scope.indicaciones == undefined || $scope.indicaciones == null){
      $scope.msgTitle = 'Atención!';
      $scope.msgBody  = 'Debe agregar por lo menos las indicaciones';
      $scope.msgType  = 'warning';
      flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
    }else{
      model = {
        idConsulta: consulta.idConsulta,
        receta: $scope.receta,
        indicaciones: $scope.indicaciones,
        analisis: $scope.analisis,
        observacion: $scope.observacion,
        nextCosult: "2023-06-09 18:00:00"
      }
      angular.element($("#spinerContainer")).css("display", "block");
      $http.post('../models/closeConsult.php',model).success(function(res){
        angular.element($("#spinerContainer")).css("display", "none");
        console.log(res)
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
	}
})


