angular.module('reportes',['720kb.datepicker','chart.js'])

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

.controller("reportesCtrl", function ($scope, $http, flash) {

  angular.element(document).ready(function () {
      var actualDate = new Date();
      var mes= actualDate.getMonth()+1;
      var dia= actualDate.getDate();
      var mes = (mes < 10) ? ("0" + mes) : mes;
      var dia = (dia < 10) ? ("0" + dia) : dia;
      var year = actualDate.getFullYear();
      actualDate = year+"-"+mes+"-"+dia;
      $scope.createReport(actualDate, actualDate);
      $scope.date1 = actualDate;
      $scope.date2 = actualDate;
  });

	$scope.labels = ["Cancelado", "Realizado", "Pendiente"];
  	$scope.data = [];
  	var compras = [];
  	var ventas = [];
  	var sumCompra = 0;
  	var sumVenta = 0; 
  	var resBalance = 0;
    var dateBackup = 0;

	       $scope.etiquetas = [];
        $scope.series = ['Compras', 'Ventas'];


        $scope.datos = [];
       // $scope.datos = [
          //  [65, 59, 80, 81],
          //  [28, 48, 40, 19]
       // ];
	$scope.downloadReport = function(){
    html2canvas(document.getElementById('reportContainer'), {
      onrendered: function(canvas) {
        var data = canvas.toDataURL();
        var docDefinition = {
          content: [{
            image: data,
            width: 500,
          }]
        };
        pdfMake.createPdf(docDefinition).open();
        // pdfMake.createPdf(docDefinition).download("test.pdf");
      }
    });
  }
  var sumToTotal = 0;
  $scope.totalConsultas = function(costo){
    costo = parseInt(costo);
    console.log(costo)
    $scope.totalC = sumToTotal + costo;
  }

  $scope.createReport = function(date1, date2){
    sumToTotal = 0;
    $scope.totalConsultasRealizadas = 0;
    $scope.datos = [];
    $scope.data = [];
    $scope.etiquetas = [];
    $scope.colors = ['#601510','#2f6010','#3788d8'];
    $scope.options = {legend:{display:true,position:"top"}}
    cancelado = [];
    realizado = [];
    pendiente = [];

    sumCompra, sumTotalCompra = 0;
    sumVenta, sumTotalVenta = 0; 
    resBalance = 0;
    dateBackup = 0;
    var fechas = {
      fecha1: date1+" 00:00:00",
      fecha2: date2+" 00:00:00"
    };
    if (fechas.fecha1 == undefined || fechas.fecha2 == undefined) {
      $scope.msgTitle = 'Atención';
      $scope.msgBody  = 'Debe seleccionar el rango de fechas!';
      $scope.msgType  = 'warning';
      flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
    }else{
      angular.element($("#spinerContainer")).css("display", "block");
      $http.post("../models/maxService.php", fechas)
      .success(function(data){
        console.log(data)
        angular.element($("#spinerContainer")).css("display", "none");
        if(data == "error"){
          $scope.msgTitle = 'Error';
          $scope.msgBody  = 'Ha ocurrido un error!';
          $scope.msgType  = 'error';
          flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
        }else{
          $scope.maxProducts = data;
          $scope.totalConsultasRealizadas = data.length;
          $scope.consultForGraphic = data[data.length-1];
          for (var i = 0; $scope.consultForGraphic.length > i; i++) {
            if($scope.consultForGraphic[i].idEstado == "2" || $scope.consultForGraphic[i].idEstado == 2){
              realizado.push($scope.consultForGraphic[i]);
            }else if($scope.consultForGraphic[i].idEstado == "1" || $scope.consultForGraphic[i].idEstado == 1){
              pendiente.push($scope.consultForGraphic[i]);
            }else{
              cancelado.push($scope.consultForGraphic[i]);
            }
          }
          $scope.datos.push(cancelado.length,realizado.length,pendiente.length)
          
          $scope.data.push(cancelado.length,realizado.length,pendiente.length);
          
        }
      });
            
    }
  }   

  $scope.report = function (date1,date2) {
      var line = document.getElementById("mylineGraph").getContext("2d");
      var barChart = document.getElementById("barChart")
        $scope.datos = [];
        $scope.data = [];
        $scope.etiquetas = [];
        $scope.colors = ['#ff0000','#3498DB','#717984','#F1C40F'];
        $scope.options = {legend:{display:true,position:"top"}}
        compras = [];
        ventas = [];
        sumCompra, sumTotalCompra = 0;
        sumVenta, sumTotalVenta = 0; 
        resBalance = 0;
        dateBackup = 0;
        var fechas = {
          fecha1: date1,
          fecha2: date2
        };
        if (fechas.fecha1 == undefined || fechas.fecha2 == undefined) {
          $scope.msgTitle = 'Atención';
          $scope.msgBody  = 'Debe seleccionar el rango de fechas!';
          $scope.msgType  = 'warning';
          flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
        }else{
          angular.element($("#spinerContainer")).css("display", "block");
          $http.post("../models/maxProducts.php", fechas)
          .success(function(data){
            if(data == "error"){
                $scope.msgTitle = 'Error';
                  $scope.msgBody  = 'Ha ocurrido un error!';
                  $scope.msgType  = 'error';
                flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
            }else{
                $scope.maxProducts = data;
            }
          });
          $http.post('../models/selectVentasCompras.php', fechas).success(function (data) {
            angular.element($("#spinerContainer")).css("display", "none");
            var num = 0;
            var dateCompare = 0;
            console.log(data)
            var lengthVentas = data.length-1
            $scope.compras = data[lengthVentas];
            $scope.ventas = data;
            $scope.toalVentas = [];
            $scope.toalCompras = [];                  
            for(var i = 0; i < $scope.ventas.length-1; i++){
              $scope.etiquetas.push($scope.ventas[i]["Fecha"]);
              num = parseInt($scope.ventas[i]["totalVentas"]);
              $scope.toalVentas.push(num);
              sumVenta = sumVenta + num;
            }
            for(var i = 0; i < $scope.compras.length; i++){
              var igual=false;
              for (var j = 0; j < $scope.etiquetas.length & !igual; j++) {
                if($scope.compras[i]['Fecha'] == $scope.etiquetas[j]){
                  igual=true;
                }
              }
              if(!igual){
                $scope.etiquetas.push($scope.compras[i]['Fecha']); 
                num = parseInt($scope.compras[i]["totalCompras"]);
                $scope.toalCompras.push(num);
                sumCompra = sumVenta + num;
              }else{
                num = parseInt($scope.compras[i]["totalCompras"]);
                $scope.toalCompras.push(num);
                sumCompra = sumVenta + num;
              }
            }
            console.log($scope.toalVentas);
            console.log($scope.toalCompras);
            console.log($scope.etiquetas);

            resBalance = sumVenta - sumCompra;
            $scope.data.push(sumCompra,sumVenta,resBalance);
            $scope.datos.push($scope.toalCompras,$scope.toalVentas);
            var a = $scope.etiquetas;
            $scope.toalCompras.push(0);
            $scope.toalVentas.push(0);
        
            var mylineGraph = new Chart(line, {
              type: "line",
              data: {
                labels: a/*La linea de tiempo a mostrarse en el grafico*/,
                datasets: [
                  {
                    label: "COMPRAS",
                    data: $scope.toalCompras,
                    fill: false,
                    borderColor: "rgba(245, 35, 56, .65)",
                    lineTension: 0,
                    pointBorderWidth: 2,
                    borderDash: [5, 5],
                    pointStyle: "rectRounded"
                  },
                  {
                    label: "VENTAS",
                    data: $scope.toalVentas,
                    fill: false,
                    borderColor: "rgba(55, 130, 220, .65)",
                    backgroundColor: "rgba(55, 130, 220, 0.1)",
                    lineTension: 0,
                    pointBorderWidth: 2,
                    borderDash: [5, 5],
                    pointStyle: "rectRounded"
                  }
                ]
              },
              options: {
                title: {
                  display: true,
                  text: "Gráficos de compras y ventas del "+fechas.fecha1+" al "+fechas.fecha2,
                  fontSize: 26,
                },
                legend:{
                  display: true,
                  position: 'top',
                  labels: {
                    boxWidth:80,
                    fontColor: 'black'
                  }
                },
                plugins: {
                 datalabels: {
                   display: false
                 }
                }
              }
            });


          });
      }
        
  };

});



