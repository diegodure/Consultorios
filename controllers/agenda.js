angular.module('agenda',['angularModalService','720kb.datepicker','moment-picker'])

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

.controller('AgendaCtrl', function($scope, $http, ModalService, flash){
	angular.element(document).ready(function () {

    var calendarEl = document.getElementById('calendar');


    $scope.calendar = new FullCalendar.Calendar(calendarEl, {
      locale: 'es',
      navLinks: true,
      editable: true,
      fixedWeekCount: false,
      timeZone: 'UTC',
      initialView: 'dayGridMonth',
      dayMaxEventRows: true, // for all non-TimeGrid views
      views: {
        dayGridMonth: {
          dayMaxEventRows: 4 // adjust to 6 only for timeGridWeek/timeGridDay
        }
      },
      dateClick: function(info) {
  			$scope.newDate(info);
  	  },
  	  eventClick: function(info) {
        $scope.showConsult(info);
      },
      eventMouseEnter: function(info) {
        var html = $scope.tooltipHTML(info);
        angular.element($(info.el)).append(html);
  	  },
  	  eventMouseLeave: function(info) {
        angular.element($("#"+info.event._def.defId)).remove();
      },
      headerToolbar: {
        left: 'prev,next, today, agregarConsulta',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
  	  },
   
  	  customButtons: {
  			agregarConsulta: {
  				text: 'Agregar consulta',
          click: function() {
            $scope.newDate();
          }
  			},
  			
  		},
  	  events: []
    });

    angular.element($("#spinerContainer")).css("display", "block");
    $http.get('../models/agendConsult.php').success(function(data){
      angular.element($("#spinerContainer")).css("display", "none");
      $scope.consultas = data;
      for(var i = 0; i < data.length; i++){
        $scope.calendar.addEvent(data[i]);
      }
    });

    $scope.calendar.render();
    var topbar = angular.element($(".navbar-default")).innerHeight();
    var navbar = angular.element($(".navbar-fixed-bottom")).innerHeight();
    var formGroup = angular.element($(".form-group")).innerHeight();
    var calendar = angular.element($(".fc-view-harness.fc-view-harness-active"));
    var heightTable = window.outerHeight - topbar - navbar  - formGroup - 180;
    calendar.css("maxHeight", heightTable);
        
	});

  $scope.tooltipHTML = function(info){
    var html = "";
    html += '<div id='+info.event._def.defId+' class="tooltipConsult">';
    html += '<div>';
    html += '<span class="bolder">Motivo: </span>'+info.event._def.extendedProps.Motivo;
    html += '</div>';
    html += '<div>';
    html += '<span class="bolder">Profesional: </span>'+info.event._def.extendedProps.Nombres;
    html += '</div>';
    html += '</div>';
    return html;
  }

  $scope.showConsult = function(info){
    $scope.openModal(info);
  }

  $scope.newDate = function(info){
    if(info){
      var dateToCalendar = info.dateStr;
      var actualDate = new Date();
      var mes= actualDate.getMonth()+1;
      var dia= actualDate.getDate();
      var mes = (mes < 10) ? ("0" + mes) : mes;
      var dia = (dia < 10) ? ("0" + dia) : dia;
      var year = actualDate.getFullYear();
      actualDate = year+"-"+mes+"-"+dia;
      if(new Date(dateToCalendar) < new Date(actualDate)){
        $scope.msgTitle = 'Atención';
        $scope.msgBody  = 'La fecha no puede ser menor a la fecha actual: '+actualDate;
        $scope.msgType  = 'warning';
        flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
      }else{
        $scope.openModal(info);
      }
    }else{
      $scope.openModal(info);
    }
    
  }

  $scope.openModal = function(info){
    var isEdit = false;
    if(info){
      if(info.event != undefined){
        isEdit = true;
      }
    }
    ModalService.showModal({
      templateUrl: "nuevaConsulta.html",
      controller: "consultaCtrl",
      inputs: {info: info, isEdit:isEdit}
    }).then(function(modal){
      modal.close.then(function(result){
        // Una vez que el modal sea cerrado, la libreria invoca esta función
            // y en result tienes el resultado.
            
        if(result){
          $scope.selectConsultas();
        }
        
      })
    })
  }


})

.controller('consultaCtrl', function($scope, close, $http, info,isEdit,flash){
  $scope.isEdit = false;
  $scope.idPaciente;
  if(isEdit){
    console.log(info.event.extendedProps)
    let claves = Object.keys(info.event.extendedProps);
    for(let i = 0; i < claves.length; i++){
      let clave = claves[i];
      if(clave == 2 || clave == "2"){
        var DateTimeSplit = info.event.extendedProps[clave].split(" "); 
      }else if(clave == 3 || clave == "3"){
        var DateTimeSplit2 = info.event.extendedProps[clave].split(" ");
      }
    }
    $scope.modalTitle = "Editar consulta";
    $scope.modalIcon = "glyphicon glyphicon-edit";
    $scope.isEdit = true;
    $scope.idConsulta = info.event.extendedProps.idConsulta;
  }else{
    $scope.modalTitle = "Nueva consulta";
    $scope.modalIcon = "glyphicon glyphicon-plus";
  }
  var actualDate = new Date();
  var mes= actualDate.getMonth()+1;
  var dia= actualDate.getDate();
  var mes = (mes < 10) ? ("0" + mes) : mes;
  var dia = (dia < 10) ? ("0" + dia) : dia;
  var year = actualDate.getFullYear();
  var hour = actualDate.getHours();
  var minute = actualDate.getMinutes();
  actualTime = hour+":"+minute
  actualDate = year+"-"+mes+"-"+dia;
  if(info != undefined){
    $scope.fecha = info.dateStr;
  }else{
    $scope.fecha = actualDate;
  }
  $scope.time = actualTime;
  $scope.time2 = actualTime;
  if($scope.isEdit){
    $scope.fecha = DateTimeSplit[0];
    $scope.time = DateTimeSplit[1];
    $scope.time2 = DateTimeSplit2[1];
    $scope.motivo = info.event.extendedProps.Motivo;
    $scope.observacion = info.event.extendedProps.Observacion;
  }
  angular.element($("#spinerContainer")).css("display", "block");
  $http.get('../models/selectPacientes.php').success(function(data){
    angular.element($("#spinerContainer")).css("display", "none");
    $scope.pacientes = data;
    if($scope.isEdit){
      $scope.paciente = {"Nombres":info.event.extendedProps.title,"idPaciente":info.event.extendedProps.idPaciente};
    }
  });
  angular.element($("#spinerContainer")).css("display", "block");
  $http.get('../models/selectProfesionales.php').success(function(data){
    angular.element($("#spinerContainer")).css("display", "none");
    $scope.profesionales = data;
    if($scope.isEdit){
      $scope.profesional = {"Nombres":info.event.extendedProps.Nombres,"idProfesionale":info.event.extendedProps.idProfesionale};
    }
  });
  angular.element($("#spinerContainer")).css("display", "block");
  $http.get('../models/selectServicios.php').success(function(data){
    angular.element($("#spinerContainer")).css("display", "none");
    var modalHeader = angular.element($(".modal-header")).innerHeight();
    var navbar = angular.element($(".navbar-fixed-bottom")).innerHeight();
    var modalFooter = angular.element($(".modal-footer")).innerHeight();
    var modalBody = angular.element($(".modal-body"));
    var contentHeight = window.outerHeight - modalHeader - modalFooter  - navbar - 250;
    modalBody.css("maxHeight", contentHeight);
    $scope.servicios = data;
    if($scope.isEdit){
      $scope.servicio = {"Nombre":info.event.extendedProps.Motivo,"idServicio":info.event.extendedProps.idPaciente};
    }
  });
  
  $scope.cerrarModal = function(){
    close();
  };

  $scope.guardarConsulta = function(){
    var model = {};
    if($scope.isEdit){
      model = {
        idConsulta: $scope.idConsulta,
        idPaciente: $scope.paciente.idPaciente,
        profesional: $scope.profesional.idProfesionale,
        servicio: $scope.servicio.idServicio,
        fecha: $scope.fecha,
        fecha2: $scope.fecha,
        motivo : $scope.motivo,
        observacion : $scope.observacion
      };
    }else{
      model = {
        idPaciente: angular.element($("#paciente")).val(),
        profesional: angular.element($("#profesional")).val(),
        servicio: angular.element($("#servicio")).val(),
        fecha: $scope.fecha,
        fecha2: $scope.fecha,
        motivo : $scope.motivo,
        observacion : $scope.observacion
      };
    }
    
    var time = $scope.time;
    var time2 = $scope.time2;
   
    if(new Date(model.fecha) < new Date(actualDate)){
      $scope.msgTitle = 'Atención';
      $scope.msgBody  = 'La fecha no puede ser menor a la fecha actual: '+actualDate;
      $scope.msgType  = 'warning';
      flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
    }else{
      var actualDate = new Date();
      var hour = actualDate.getHours();
      var minute = actualDate.getMinutes();
      var mes= actualDate.getMonth()+1;
      var dia= actualDate.getDate();
      var mes = (mes < 10) ? ("0" + mes) : mes;
      var dia = (dia < 10) ? ("0" + dia) : dia;
      var year = actualDate.getFullYear();
      var hour = actualDate.getHours();
      var minute = actualDate.getMinutes();
      var minute = (minute < 10) ? ("0" + minute) : minute;
      actualTime = hour+":"+minute
      actualDate = year+"-"+mes+"-"+dia;
      if(new Date(model.fecha) < new Date(actualDate)){
        $scope.msgTitle = 'Atención';
        $scope.msgBody  = 'La fecha no puede ser menor a la fecha actual: '+actualDate;
        $scope.msgType  = 'warning';
        flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
      }else if(time < actualTime){
        $scope.msgTitle = 'Atención';
        $scope.msgBody  = 'La hora no puede ser menor a la hora actual: '+actualTime;
        $scope.msgType  = 'warning';
        flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
      }else{
        console.log(model)
        if(model.idPaciente == undefined || model.servicio == undefined || model.fecha == undefined
         || time == undefined || model.motivo == undefined || model.profesional == undefined){
          $scope.msgTitle = 'Atención';
          $scope.msgBody  = 'Debe completar los campos requeridos';
          $scope.msgType  = 'warning';
          flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
        }else{
          time += ":00";
          time2 += ":00";
          model.fecha += " "+time;
          model.fecha2 += " "+time2;
          angular.element($("#spinerContainer")).css("display", "block");
          if($scope.isEdit){
            console.log(model);
            angular.element($("#spinerContainer")).css("display", "none");
          }else{
            $http.post("../models/insertConsulta.php", model)
            .success(function(res){
              console.log(res)
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
            });
          }
        }
      }
    }
  }
  
})