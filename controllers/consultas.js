angular.module('consultas',['angularModalService', '720kb.datepicker'])

.controller('ConsultasCtrl', function($scope, $http, ModalService){
	var fd;
	$scope.SelectFile = function (e) {
          //console.log(e.target.files[0]);
         	// fx = new FormData();
          // for(var i = 0; i < e.target.files.length; i++){
          	
          // 	fx.append(e.target.files[i].name, e.target.files[0]);
          // 	console.log(e.target.files[i]);
          // }
          var imagen = e.target.files[0];
          fd = new FormData();
          fd.append('file', imagen);
          fd.append('name', e.target.files.name);
          
          var detImg = {
          		name : e.target.files[0].name,
		 		type: e.target.files[0].type,
		 		file: fd
		 	};
		 	 let configuracion = {
                            headers: {
                                "Content-Type": undefined,
                            },
                            transformRequest: angular.identity,
                        };
          console.log(fd);
          $http.post("../models/img.php", fd, configuracion)
		  		.success(function (res) {
		  			alert(res);
		  });
    };

	//Inicializamos las variables 
	 $scope.consultas = [];
	 

	$scope.modalPaciente = function(){
		// Debes proveer un controlador y una plantilla.
		ModalService.showModal({
			templateUrl: "pacienteConsulta.html",
      		controller: "pacienteConsultaCtrl"
		}).then(function(modal){
			modal.close.then(function(result){
				// Una vez que el modal sea cerrado, la libreria invoca esta función
        		// y en result tienes el resultado.
        		console.log(result);
        		$scope.paciente = result;
        		//location.reload();
			})
		})
	};

	$scope.calendar = function (date) {
		$scope.fecha = date;
	};

	//Parte del codigo donde agregamos los productos a la tabla
	$scope.agregarConsulta = function(){
		
		console.log(angular.element($("#imageFile").files));
		var file = document.getElementById("imageFile").files;
		console.log(document.getElementById("imageFile").files[0])
		// var fd = new FormData();
  //       fd.append('file', file);
  //       console.log(fd);
		//ubicamos los datos en el array para mostrarlos en la tabla
		$scope.consultas.push({fecha: $scope.fecha, motivo: $scope.motivo,
		 observacion: $scope.observacion});
		$scope.fecha = null;
		$scope.motivo = null;
		$scope.observacion = null;

		
	};

	$scope.eliminarConsulta = function(consulta){

		
		var pos = $scope.consultas.indexOf(consulta);
		console.log(pos);
		$scope.consultas.splice(pos, 1); //pasamos el indice a ser eliminado (pos) y luego la cantidad de elementos a ser eliminados
		
	};

	$scope.registrarConsulta = function(consulta, paciente){
		//Obtenemos la consulta
		var consultas = consulta;
		//console.log(consultas);
		//console.log(paciente);

		var length = consultas.length;

		var detCon = [];

		 for ( i=0; i < length; i++){
		 	 detCon.push({
		 		fecha : consultas[i].fecha,
		 		motivo: consultas[i].motivo,
		 		observacion : consultas[i].observacion,
		 		id: $scope.paciente.id,
		  });
		 }
		 console.log(detCon);
		 
		  var pos = 0;

		  let configuracion = {
                            headers: {
                                "Content-Type": undefined,
                            },
                            transformRequest: angular.identity,
                        };
		 
		  	$http.post("../models/insertConsultas.php", detCon)
		  		.success(function (res) {
		  			$http.post("../models/insertImage.php", fd, configuracion).success(function (res) {
		  				alert(res);
		  			});
		  		});
		  	$scope.paciente.id = null;
		  	$scope.paciente.nombre = null;
		  	$scope.paciente.apellido = null;
		  	$scope.paciente.ci = null;
		  	$scope.consultas.splice(pos);

	};

})

	//El controller del modal nuevo totalmente independiente de la pagina principal (pacientes)
.controller('pacienteConsultaCtrl', function($scope, close, $http){
	$scope.cerrarModal = function(){
		close();
	};

	//La parte del select donde mostramos los datos en la tabla
	$http.get('../models/selectPacientes.php').success(function(data){
		$scope.pacientes = data;
	});

	//La parte donde elegimos el paciente
	$scope.elegir = function(paciente){
		var pacientes = {
			nombre: paciente.Nombres,
			apellido: paciente.Apellidos,
			ci: paciente.ci,
			id: paciente.idPaciente,
			telefono: paciente.Telefono
		};
		 // serveData = clientes;
		 // $scope.obj = serveData;
		 //console.log($scope.obj);
		 //console.log(clientes);
		 close(pacientes);
	};
	// $scope.obj = serveData;
})

