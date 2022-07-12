angular.module('agenda',['angularModalService','720kb.datepicker'])

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


        var calendar = new FullCalendar.Calendar(calendarEl, {
          locale: 'es',
          initialView: 'dayGridMonth',
          dayMaxEventRows: true, // for all non-TimeGrid views
          views: {
          timeGrid: {
            dayMaxEventRows: 4 // adjust to 6 only for timeGridWeek/timeGridDay
          }
        },
        dateClick: function(info) {
    			$scope.newDate(info);
  		  },
  		  eventClick: function(info) {
           
        },
        eventMouseEnter: function(info) {
      		            
  		  },
  		  eventMouseLeave: function(info) {
			
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
    	  events: [
      {
        title: 'All Day Event',
        start: '2021-07-01'
      },
      {
        title: 'Long Event',
        start: '2021-07-07',
        end: '2021-07-10'
      },
      {
        groupId: '999',
        title: 'Repeating Event',
        start: '2021-07-09T16:00:00'
      },
      {
        groupId: '099',
        title: 'Repeating Event2',
        start: '2021-07-16T16:00:00'
      },
      {
        title: 'Conference',
        start: '2021-07-11',
        end: '2021-07-13'
      },
      {
        title: 'Meeting',
        start: '2022-07-12T10:30:00',
        end: '2022-07-12T12:30:00'
      },
      {
        title: 'Lunch',
        start: '2021-07-12T12:00:00'
      },
      {
        title: 'Meeting',
        start: '2022-07-12T14:30:00'
      },
      {
        title: 'Birthday Party',
        start: '2022-07-13T07:00:00'
      },
      {
        title: 'Click for Google',
        url: 'http://google.com/',
        start: '2022-07-28'
      }
    ]
    });

        calendar.render();
        var topbar = angular.element($(".navbar-default")).innerHeight();
        var navbar = angular.element($(".navbar-fixed-bottom")).innerHeight();
        var formGroup = angular.element($(".form-group")).innerHeight();
        var calendar = angular.element($(".fc-view-harness.fc-view-harness-active"));
        var heightTable = window.outerHeight - topbar - navbar  - formGroup - 180;
        calendar.css("maxHeight", heightTable);
        
	});

  $scope.newDate = function(info){
    ModalService.showModal({
      templateUrl: "nuevaConsulta.html",
      controller: "consultaCtrl",
      inputs: {info: info}
    }).then(function(modal){
      modal.close.then(function(result){
        // Una vez que el modal sea cerrado, la libreria invoca esta función
            // y en result tienes el resultado.
            
        $scope.resultadoModal = result;
        $scope.selectPacientes();
      })
    })
  }


})

.controller('consultaCtrl', function($scope, close, $http, info,flash){

  console.log(info)
  
})