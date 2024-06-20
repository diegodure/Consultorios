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
	    $scope.getConsultas(IdUser,roleUser);
	    $scope.getStates();

      $scope.consult = {
        type : ""
      };
	});

	$scope.getStates = function(){
	  $http.get('../models/selectStates.php').success(function(data){
	    states = data;
	  });
  	}

  	angular.element($("#spinerContainer")).css("display", "block");
  	$scope.getConsultas = function(idUser,roleUser){
      if(roleUser == 'Administrador'){
        $http.get('../models/agendConsultAdmin.php').success(function(data){
          angular.element($("#spinerContainer")).css("display", "none");
          $scope.consultas = data;
        });
      }else{
        var data = {
          "idUser":idUser
        }

        $http.post('../models/agendConsult.php', data).success(function(data){
          angular.element($("#spinerContainer")).css("display", "none");
          $scope.consultas = data;
        });
      }
      
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
    $scope.totalConsult = 0;
    $scope.sumConsult = function(numForSum){
      return $scope.totalConsult = $scope.totalConsult + numForSum;
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
  $scope.idEstado = consulta.idEstado;

  $scope.printButton = false;

  if(consulta.idEstado == "2" || consulta.idEstado == 2){
    $scope.printButton = true;
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
        nextCosult: $scope.nextCosult
      }
      console.log(model)
      angular.element($("#spinerContainer")).css("display", "block");
      $http.post('../models/closeConsult.php',model).success(function(res){
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
          $scope.printConsult(true);        
        }
      });
    }
	}

  $scope.printConsult = function(closeModal){
    console.log(consulta)
    html2canvas(document.getElementById('consultToPrint'),{
      onrendered: function(canvas){
        var data = canvas.toDataURL();
        var docDefinition = {
          pageSize: 'A5',
          content: [
            {
              text: 'CONSULTA-'+consulta.idConsulta+'',
              style: 'header'
            },
            '\n',
            {
              
              columns: [
                {
                  text: [
                    {text: 'Paciente: ',
                    fontSize: 13,bold: true},
                    {text: ''+consulta.title+' '+consulta.pacienteApellido,
                    fontSize: 13,bold: false}
                  ]
                },
                {
                  text: [
                    {text: 'Fecha Hora: ',
                    fontSize: 11,bold: true},
                    {text: ''+consulta.end,
                    fontSize: 11,bold: false}
                  ]
                }
              ]
            },
            '\n',
            {text:[
              {text: 'Profesional: ',
              fontSize: 13,bold: true},
              {text: ''+consulta.Nombres+' '+consulta.profesionalApellido,
              fontSize: 13,bold: false}
            ]},
            '\n',
            {text:[
              {text: 'Motivo de consulta: ',
              fontSize: 13,bold: true},
              {text: ''+consulta.Motivo,
              fontSize: 12,bold: false}
            ]},
            '\n',
            {text:[
              {text: 'Observacion: ',
              fontSize: 13,bold: true},
              {text: ''+consulta.Observacion,
              fontSize: 13,bold: false}
            ]},
            '\n',
            {text: 'Recetas', style: 'header'},
            {
              ol: [
                $scope.receta,
                
              ]
            },
            '\n',
            {text: 'Indicaciones', style: 'header'},
            {
              ol: [
                $scope.indicaciones,
                
              ]
            },
            '\n',
            {text: 'Análisis', style: 'header'},
            {
              ol: [
                $scope.analisis,
                
              ]
            },
            '\n',
            {text: 'Observaciones', style: 'header'},
            {
              ol: [
                $scope.observacion,
                
              ]
            },
            '\n',
            {text:[
              {text: 'Siguiente consulta: ',
              fontSize: 14,bold: true},
              {text: ''+$scope.nextCosult,
              fontSize: 13,bold: false}
            ]}
          ],
            styles:{
              header: {
                fontSize: 16,
                bold: true,
                alignment: 'center'
              }
            } 
        };
        pdfMake.createPdf(docDefinition).open();
        if(closeModal){
          close(true);
        }
        //pdfMake.createPdf(docDefinition).download("consult.pdf");
      }
    });
  }
})


