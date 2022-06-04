  <?php
  	session_start();
    include("../conect.php");

    if(isset($_SESSION['user'])){
    	$title = "Facturas | Simple Invoice"
  ?>
  <!DOCTYPE html>
<html>

<?php
	include("head.php");
?>

<body ng-app="reportes" >
<?php
	include("navbar.php");
?>

<div class="container">


    <div ng-controller="ReportesCtrl" class="container">
        <div class="panel panel-info">
            <div class="panel-heading">

        	    <h4><i class='glyphicon glyphicon-search'></i> Ventas</h4>

        	</div>
            <div class="panel-body">
                <form class="form-horizontal" role="form">

            	    <div class="form-group row">
            		    <label for="q" class="col-md-4 control-label">Buscar Venta</label>
            		    <div class="col-md-5">

                            <datepicker ng-click="calendar(date)" date-format="yyyy-MM-dd" selector="form-control" button-prev-title="previous month" button-next-title="next month">
                                <div class="input-group">
                                    <input class="form-control" placeholder="Fecha de la Venta" ng-model="date" style="cursor: pointer"/>
                                    <span class="input-group-addon">
                                    <i class="fa fa-lg fa-calendar"></i>
                                    </span>
                                </div>
                            </datepicker>


                        </div>
                        <div class="col-md-5" ng-repeat="venta in ventas">
                            <li style="cursor: pointer" ng-click="factura(venta)">{{venta.Fecha}}</li>
                        </div>
                        <div class="col-md-5">
                            <table id="tblFactura" cellpadding="0" cellspacing="0">
                                <tr>
                                    <th>Fecha</th>
                                    <th>Total</th>
                                </tr>
                                <tbody>
                                    <tr>
                                        <td>{{fac.Fecha}}</td>
                                        <td>{{fac.Total}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
            		</div>
            	</form>
            </div>

        </div>
	</div>
</div>
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
	 }else{
	 	echo '<script> alert("User o password incorrectos");</script>';
        echo '<script> window.location="../login.php";</script>';
    }

?>