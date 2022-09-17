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
    html += '<span>Motivo: </span>';
    html += '<span>'+info.event._def.extendedProps.Motivo+'</span>';
    html += '</div>';
    html += '<div>';
    html += '<span>Profesional: </span>';
    html += '<span>'+info.event._def.extendedProps.Nombres+'</span>';
    html += '</div>';
    html += '</div>';
    return html;
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
    ModalService.showModal({
      templateUrl: "nuevaConsulta.html",
      controller: "consultaCtrl",
      inputs: {info: info}
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

.controller('consultaCtrl', function($scope, close, $http, info,flash){
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
  angular.element($("#spinerContainer")).css("display", "block");
  $http.get('../models/selectPacientes.php').success(function(data){
    angular.element($("#spinerContainer")).css("display", "none");
    $scope.pacientes = data;
  });
  angular.element($("#spinerContainer")).css("display", "block");
  $http.get('../models/selectProfesionales.php').success(function(data){
    angular.element($("#spinerContainer")).css("display", "none");
    $scope.profesionales = data;
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
  });
  
  $scope.cerrarModal = function(){
    close();
  };

  $scope.guardarConsulta = function(){
    var model = {
      idPaciente: $scope.paciente,
      profesional: $scope.profesional,
      servicio: $scope.servicio,
      fecha: $scope.fecha,
      fecha2: $scope.fecha,
      motivo : $scope.motivo,
      observacion : $scope.observacion
    };
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
      if(time < actualTime && new Date(model.fecha) <= new Date(actualDate)){
        $scope.msgTitle = 'Atención';
        $scope.msgBody  = 'La hora no puede ser menor a la hora actual: '+actualTime;
        $scope.msgType  = 'warning';
        flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
      }else{
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
  
})