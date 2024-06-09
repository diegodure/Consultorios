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
    var states;
    $scope.selectConsultas(IdUser,roleUser);
    $scope.getStates();
        
	});

  $scope.getStates = function(){
      $http.get('../models/selectStates.php').success(function(data){
        states = data;
      });
  }

  $scope.selectConsultas = function(idUser,roleUser){
    var calendarEl = document.getElementById('calendar');

    var actualDate = new Date();
    $scope.calendar = new FullCalendar.Calendar(calendarEl, {
      locale: 'es',
      initialDate:actualDate,
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
      eventDrop: function(info) {
        $scope.openModalDragConfirm(info);
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
    var data = {
      "idUser":idUser
    }
    angular.element($("#spinerContainer")).css("display", "block");
    console.log(roleUser)
    if(roleUser == 'Profesional'){
      $http.post('../models/agendConsult.php',data).success(function(data){
        angular.element($("#spinerContainer")).css("display", "none");
        $scope.consultas = data;
        for(var i = 0; i < data.length; i++){
          $scope.calendar.addEvent(data[i]);
        }
      });
    }else{
      $http.post('../models/agendConsultAdmin.php',data).success(function(data){
        angular.element($("#spinerContainer")).css("display", "none");
        $scope.consultas = data;
        for(var i = 0; i < data.length; i++){
          $scope.calendar.addEvent(data[i]);
        }
      });
    }
    
    $scope.calendar.render();
    var topbar = angular.element($(".navbar-default")).innerHeight();
    var navbar = angular.element($(".navbar-fixed-bottom")).innerHeight();
    var formGroup = angular.element($(".form-group")).innerHeight();
    var calendar = angular.element($(".fc-view-harness.fc-view-harness-active"));
    var heightTable = window.outerHeight - topbar - navbar  - formGroup - 180;
    calendar.css("maxHeight", heightTable);
  }

  $scope.tooltipHTML = function(info){
    var tooltipClass;
    var libreArea = window.outerWidth - info.jsEvent.clientX;
    var dividedArea = window.outerWidth / 2;
    if(libreArea < dividedArea){
      tooltipClass = "tooltipConsultLeft";
    }else{
      tooltipClass = "tooltipConsultRight";
    }
    var html = "";
    html += '<div id='+info.event._def.defId+' class="'+tooltipClass+'">';
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
      inputs: {info: info, isEdit:isEdit,states:states}
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

  $scope.openModalDragConfirm = function(info){
    var dateToSplit = info.event.end.toISOString().split("T");
    var dateToShow = dateToSplit[0];
    var timeToShow = dateToSplit[1].split(".");
    var dateToSum = new Date(dateToShow);
    dateToSum.setDate(dateToSum.getDate() + 1);
    if(new Date() > new Date(dateToSum)){
      flash.pop({title: 'Atención', body: 'La hora y/o fecha debe ser mayor o igual que hoy', type: 'warning'});
      info.revert();
    }else if(info.event._def.extendedProps.idEstado == "1" || info.event._def.extendedProps.idEstado == 1){
      ModalService.showModal({
        templateUrl: "modalDrag.html",
        controller: "modalDragCtrl",
        inputs: {info: info}
      }).then(function(modal){
        modal.close.then(function(result){
          if(result){
            $scope.selectConsultas();
          }
        })
      })
    }else{
      var consultState;
      if(info.event._def.extendedProps.idEstado == "2" || info.event._def.extendedProps.idEstado == 2){
        consultState = "Realizada";
      }else if(info.event._def.extendedProps.idEstado == "3" || info.event._def.extendedProps.idEstado == 3){
        consultState = "Cancelada";
      }
      $scope.msgTitle = 'Atención';
      $scope.msgBody  = 'La consulta ya fue '+consultState;
      $scope.msgType  = 'error';
      flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
      info.revert();
    }
  }
})

.controller('modalDragCtrl', function($scope, close, $http, info,flash){
  var dateToSplit = info.event.start.toISOString().split("T");
  var dateToShow = dateToSplit[0];
  var timeToShow = dateToSplit[1].split(".");
  
  $scope.messageModal = "Confirma pasar la consulta a la fecha: "+dateToShow+" y hora: "+timeToShow[0]+" hs";

  $scope.cancelDrag = function(){
    close();
    info.revert();
  }

  $scope.update = function(){
    var dateToSplit2 = info.event.end.toISOString().split("T");
    var timeSplited = dateToSplit2[1].split(".");
    var model = {
      idConsulta: info.event._def.extendedProps.idConsulta,
      fecha: dateToShow+" "+timeToShow[0],
      fecha2: dateToSplit2[0]+" "+timeSplited[0]
    }
    $http.post("../models/dragUpdate.php", model)
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
    });
    angular.element($("#spinerContainer")).css("display", "none");
  }

})

.controller('consultaCtrl', function($scope, close, $http, info,isEdit,flash,states){
  $scope.isEdit = false;
  $scope.idPaciente;
  if(isEdit){
    $scope.states = states;
    let claves = Object.keys(info.event.extendedProps);
    for(let i = 0; i < claves.length; i++){
      let clave = claves[i];
      if(clave == 2 || clave == "2"){
        var DateTimeSplit = info.event.extendedProps[clave].split(" "); 
      }else if(clave == 3 || clave == "3"){
        var DateTimeSplit2 = info.event.extendedProps[clave].split(" ");
      }
    }
    console.log(info.event.extendedProps.idEstado)
    $scope.modalTitle = "Editar consulta";
    $scope.modalIcon = "glyphicon glyphicon-edit";
    $scope.isEdit = true;
    $scope.idConsulta = info.event.extendedProps.idConsulta;
    $scope.actualState = info.event.extendedProps.idEstado;
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
      angular.element($("#paciente option[value="+info.event.extendedProps.idPaciente+"]")).attr("selected","selected") 
    }
  });
  angular.element($("#spinerContainer")).css("display", "block");
  $http.get('../models/selectProfesionales.php').success(function(data){
    angular.element($("#spinerContainer")).css("display", "none");
    $scope.profesionales = data;
    if($scope.isEdit){
      angular.element($("#profesional option[value="+info.event.extendedProps.idProfesionale+"]")).attr("selected","selected")
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
      angular.element($("#servicio option[value="+info.event.extendedProps.idServicio+"]")).attr("selected","selected")
    }
  });

  $scope.checkedInputRadio = function(id){
    angular.element($("input[type='radio']")).prop("checked",false);
    angular.element($("input[name="+id+"]")).prop("checked",true);
  }
  
  $scope.cerrarModal = function(){
    close();
  };

  $scope.guardarConsulta = function(){
    var model = {};
    if($scope.isEdit){
      model = {
        idConsulta: $scope.idConsulta,
        idPaciente: angular.element($("#paciente")).val(),
        profesional: angular.element($("#profesional")).val(),
        servicio: angular.element($("#servicio")).val(),
        fecha: $scope.fecha,
        fecha2: $scope.fecha,
        motivo : $scope.motivo,
        observacion : $scope.observacion,
        estado: angular.element($("input[type='radio']:checked")).val(),
        color: "#3788d8"
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
      if(new Date(model.fecha) < new Date(actualDate) && 
        angular.element($("input[type='radio']:checked")).val() == "1"){
        $scope.msgTitle = 'Atención';
        $scope.msgBody  = 'La fecha no puede ser menor a la fecha actual: '+actualDate;
        $scope.msgType  = 'warning';
        flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
      }else if(time < actualTime && new Date(model.fecha) <= new Date(actualDate) && 
        angular.element($("input[type='radio']:checked")).val() == "1"){
        $scope.msgTitle = 'Atención';
        $scope.msgBody  = 'La hora no puede ser menor a la hora actual: '+actualTime;
        $scope.msgType  = 'warning';
        flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
      }else if(time2 <= time && 
        angular.element($("input[type='radio']:checked")).val() == "1"){
        $scope.msgTitle = 'Atención';
        $scope.msgBody  = 'La hora fin no puede ser menor o igual a la hora de inicio: '+time;
        $scope.msgType  = 'warning';
        flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
      }else{
        if(model.idPaciente == undefined || model.servicio == undefined || model.fecha == undefined
         || time == undefined || model.motivo == undefined || model.profesional == undefined){
          $scope.msgTitle = 'Atención';
          $scope.msgBody  = 'Debe completar los campos requeridos (*)';
          $scope.msgType  = 'warning';
          flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
        }else{
          time += ":00";
          time2 += ":00";
          model.fecha += " "+time;
          model.fecha2 += " "+time2;
          angular.element($("#spinerContainer")).css("display", "block");
          if($scope.isEdit){
            console.log(model)
            if(model.estado == 2 || model.estado == "2"){
              model.color = "#2f6010";
            }else if(model.estado == 3 || model.estado == "3"){
              model.color = "#601510";
            }
            $http.post("../models/modificarConsulta.php", model)
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
            });
            angular.element($("#spinerContainer")).css("display", "none");
          }else{
            console.log(model)
            $http.post("../models/insertConsulta.php", model)
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
            });
          }
        }
      }
    }
  }
  
})