  <?php
    session_start();
    include("../conect.php");
    
    if(isset($_SESSION['user'])){
        $title = "Impulse"
  ?>
  <!DOCTYPE html>
<html>

<?php
    include("head.php");
?>

<body ng-app="reportes" style="overflow-x: hidden;overflow-y: auto;">
<?php
    include("navbar.php");
?>

<div class="container">
    <div ng-controller="reportesCtrl" class="container">
        <div class="panel panel-info">
            <div class="panel-heading">
                
                <h4><i class='glyphicon glyphicon-search'></i> Buscar Balance</h4>
            </div>
            <div class="panel-body">
                <div class="row">
                        
                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                        <label for="q" class="col-md-4 control-label">Fecha desde</label>
                        <div class="col-md-6">

                            <datepicker ng-click="calendar()" date-format="yyyy-MM-dd" selector="form-control" button-prev-title="previous month" button-next-title="next month">
                                <div class="input-group">
                                    <input class="form-control" placeholder="Fecha de la Venta" ng-model="date1" style="cursor: pointer"/>
                                    <span class="input-group-addon">
                                    <i class="fa fa-lg fa-calendar"></i>
                                    </span>
                                </div>
                            </datepicker>


                        </div>

                    </div>

                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                        <label for="q" class="col-md-4 control-label">Fecha hasta</label>
                        <div class="col-md-6">

                            <datepicker ng-click="calendar()" date-format="yyyy-MM-dd" selector="form-control" button-prev-title="previous month" button-next-title="next month">
                                <div class="input-group">
                                    <input class="form-control" placeholder="Fecha de la Venta" ng-model="date2" style="cursor: pointer"/>
                                    <span class="input-group-addon">
                                    <i class="fa fa-lg fa-calendar"></i>
                                    </span>
                                </div>
                            </datepicker>


                        </div>

                    </div>

                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                    <button type='button' class="btn btn-info" ng-click="createReport(date1,date2)"><span class="glyphicon glyphicon-plus"></span> Buscar</button>
                    <button type='button' ng-show="etiquetas.length > 0" class="btn btn-info" ng-click="downloadReport()"><span class="glyphicon glyphicon-download-alt"></span> Descargar</button>

                    </div>
                </div>

                <div class="row" id="reportContainer">
                    <div class="col col-md-12 col-lg-12 col-xl-12">
                        <h4 style="text-align: center;">Consultas realizadas {{totalConsultasRealizadas-1}}</h4>
                        <div class="table-responsive">
                            <table class="table">
                                <tr class="info">
                                    <th>Nombre del Servicio</th>
                                    <th>Costo del servicio</th>
                                    <th>Profesional</th>
                                    <th>Motivo</th>
                                </tr>
                                <tr ng-repeat="maxP in maxProducts">
                                    <td>{{maxP.Servicio_nombre}}</td>
                                    <td>{{maxP.Servicio_costo | currency :'₲':0}}</td>
                                    <td>{{maxP.Profesional_nombre}} {{maxP.Profesional_apellido}}</td>
                                    <td>{{maxP.Motivo}}{{totalConsultas(maxP.Servicio_costo)}}</td>
                                </tr>
                            </table>
                            Total: {{totalC | currency :'₲':0}}
                        </div>
                    </div>
                    <div class="col col-md-12 col-lg-6 col-xl-6" >
                     <canvas id="pie" class="chart chart-pie" chart-options="options" chart-colors="colors" chart-data="data" chart-labels="labels"></canvas>
                      
                    </div>
                    <div class="col col-md-12 col-lg-6 col-xl-6">
                        <canvas id="barChart" class="chart chart-bar" chart-colors="colors" chart-data="datos" chart-labels="labels" chart-series="data" chart-legend="options"></canvas>
                    </div>
                </div>
                    
                </div>

            </div>
        </div>
    </div>
</div>
<!-- <div ng-controller="ctrl">

        <button ng-click="mostrarModal()">Ver Modal</button>
        <br>{{ resultadoModal }}

    </div> -->
<br>
<br>
<br>
<?php
    include("footer.php");
?>
<!-- <script type="text/javascript" src="bower_components/angular/angular.min.js"></script>

<script type="text/javascript" src="bd2.js"></script> -->
</body>
</html>
<?php
        if($_SESSION['user'] == 'Professional'){
            echo '<script>
                getUserRolForMenu("professional");
            </script>';
        }else if($_SESSION['user'] == 'Recepcionista'){
            echo '<script>
                getUserRolForMenu("receptionist");
            </script>';
        }
     }else{
        echo '<script> alert("User o password incorrectos");</script>';
        echo '<script> window.location="../login.php";</script>';
    }

?>