angular.module('agenda',['angularModalService'])

.controller('AgendaCtrl', function($scope, $http, ModalService){
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
			},
			
		},
    	  events: [
      {
        title: 'All Day Event',
        start: '2021-09-01'
      },
      {
        title: 'Long Event',
        start: '2021-09-07',
        end: '2021-09-10'
      },
      {
        groupId: '999',
        title: 'Repeating Event',
        start: '2021-09-09T16:00:00'
      },
      {
        groupId: '099',
        title: 'Repeating Event2',
        start: '2021-09-16T16:00:00'
      },
      {
        title: 'Conference',
        start: '2021-09-11',
        end: '2021-09-13'
      },
      {
        title: 'Meeting',
        start: '2021-09-12T10:30:00',
        end: '2021-09-12T12:30:00'
      },
      {
        title: 'Lunch',
        start: '2021-09-12T12:00:00'
      },
      {
        title: 'Meeting',
        start: '2021-09-12T14:30:00'
      },
      {
        title: 'Birthday Party',
        start: '2021-09-13T07:00:00'
      },
      {
        title: 'Click for Google',
        url: 'http://google.com/',
        start: '2021-09-28'
      }
    ]
    });

        calendar.render();
        var topbar = angular.element($(".navbar-default")).innerHeight();
        var navbar = angular.element($(".navbar-fixed-bottom")).innerHeight();
        var formGroup = angular.element($(".form-group")).innerHeight();
        var calendar = angular.element($(".fc-view-harness.fc-view-harness-active"));
        var heightTable = window.outerHeight - topbar - navbar  - formGroup - 150;
        calendar.css("maxHeight", heightTable);
        
	});
})