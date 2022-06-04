  <?php
  	session_start();
    include("../conect.php");
    
    if(isset($_SESSION['user'])){
    	$title = "Consultas"
  ?>
  <!DOCTYPE html>
<html>

<?php
	include("head.php");
?>

<body ng-app="consultas" >
<?php
	include("navbar.php");
?>

<div class="container">


<div ng-controller="ConsultasCtrl" class="container">

		<div class="panel panel-info">
			<div class="panel-heading">
				
				<h4><i class='glyphicon glyphicon-plus'></i> Nueva Consulta</h4>
			</div>
					<div class="panel-body">
						<form class="form-vertical" role="form" margin='0' style="display: inline; float: left; width: 45%;">

						    <div class="form-group row">
						        
                                	    <button type="button" class="col-md-6 btn btn-info" ng-click="modalPaciente()">
                                		<span class="glyphicon glyphicon-search"></span>Buscar Paciente</button>
                                	
						    </div>
				
							

                                <label for="q" class="col-md-5 control-label">Codigo del Paciente</label>
                                
                                <input type="text" class="col-md-3 form-control" required placeholder="Codigo del paciente" ng-model="paciente.id"  readonly>
                                

								<label for="q" class="col-md-5 control-label">Nombres del Paciente</label>
								
									<input type="text" class="col-md-3 form-control" required placeholder="Nombre del paciente" ng-model="paciente.nombre"  readonly>
								
							

							
								<label for="q" class="col-md-5 control-label">Apellidos del Paciente</label>
								
									<input type="text" class="col-md-3 form-control" required placeholder="Apellido del paciente" ng-model="paciente.apellido" readonly>
								
								
								<label for="q" class="col-md-5 control-label">Ci del Paciente</label>
								
									<input type="text" class="col-md-3 form-control" required placeholder="Info del paciente" ng-model="paciente.ci"  readonly>
								
							
				
						</form>

						<form class="form-vertical" enctype='multipart/form-data' method="post" role="form" ng-submit="agregarConsulta()" margin='0' style="display: inline; float: left; width: 45%; margin-left: 1.5%;">

							<div class="form-group row">
								<label for="q" class="col-md-6 control-label" style="margin-left: 35%; color: #41b2f3; font-weight:bold;  font-size:1.5em; ">Datos de la consulta</label>
								

							</div>
							
							

								<label for="q" class="col-md-5 control-label">Fecha de la consulta</label>
								
									<datepicker class="col-md-5" ng-click="calendar(date)" date-format="yyyy-MM-dd" selector="form-control" button-prev-title="previous month" button-next-title="next month">
										<input class="form-control" placeholder="Fecha de la Venta" ng-model="date" style="cursor: pointer"/>
									</datepicker>
								

								<label for="q" class="col-md-5 control-label">Motivo de la consulta</label>
								
									<input type="text" class="col-md-3 form-control" required placeholder="Motivo de la consulta" ng-model="motivo">
								
							
							
								<label for="q" class="col-md-6 control-label">Observación de la consulta</label>
								
									<textarea type="text" class="col-md-3 form-control" placeholder="Observación de la consulta" ng-model="observacion">
									</textarea>
								
								
								<label for="imageFile" class="col-md-6 control-label">Choose a picture:</label>

								<input  onchange="angular.element(this).scope().SelectFile(event)"  type="file" id="imageFile" name="file" accept="image/*" multiple ng-model="imageFile">
								
								<div class="col-md-5">
									<button type="submit" class="btn btn-info" style="margin-left: 220%; margin-top: 20%;">
									<span class="glyphicon glyphicon-plus"></span> Agregar</button>
									<span></span>
								</div>

							

						</form>


						<div class="table-responsive" style="display: inline-block; margin-left: 20%; margin-top: 8%; width: 50%;">
							<table class="table">
								<tr class="info">
									<th>Fecha</th>
									<th>Motivo</th>
									<th>Observación</th>
									<th class='text-right'>Acciones</th>
								</tr>
								
								<tr ng-repeat="consulta in consultas | orderBy:ordenSeleccionado | filter:buscar">
									<td>{{consulta.fecha | date}}</td>

									<td>{{consulta.motivo}}</td>
									<!-- Filtro lowercase para letras en minusculas -->
									<td>{{consulta.observacion |  uppercase}}</td>


									<td><span class="pull-right"> 
									<a href="#" class='btn btn-default' title='Borrar producto' ng-click="eliminarConsulta(consulta)"><i class="glyphicon glyphicon-trash"></i> </a></span></td>
								</tr>
								
							</table>
							
						</div>
						<div class="form-group row">
								
								
								
								<div class="col-md-4">
									<button style="margin-left: 225%;" type="submit" class="btn btn-info" ng-click="registrarConsulta(consultas, paciente)">
									<span class="glyphicon glyphicon-plus"></span>Registrar</button>
									<span></span>
								</div>

							</div>
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