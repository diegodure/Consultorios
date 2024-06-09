  <?php
  	session_start();
    include("../conect.php");
    
    if(isset($_SESSION['user'])){
    	$title = "Consultas";
    	$idUser = $_SESSION['idUser'];
    	$roleUser = $_SESSION['user'];
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
				
				<h4><i class='glyphicon glyphicon-plus'></i>Consultas</h4>
			</div>
					<div class="panel-body">
						<form class="form-horizontal" role="form">
				
							<div class="form-group row">
								<label for="q" class="col-md-2 control-label">Buscar Consulta</label>
								<div class="col-md-5">
									<input type="text" class="form-control" placeholder="Buscar Consulta" ng-model="buscar.$">
								</div>
								<div class="col-md-3">
									<label><input type="radio" ng-model="consult.type" value="">Todos</label>
									<label><input type="radio" ng-model="consult.type" value="Pendiente">Pendiente</label>
									<label><input type="radio" ng-model="consult.type" value="Realizada">Realizada</label>
									<label><input type="radio" ng-model="consult.type" value="Cancelada">Cancelada</label>
								</div>
								<div class="col-md-3">
									<button type="button" class="btn btn-default" ng-click="searchConsult()">
									<span class="glyphicon glyphicon-search"></span> Buscar</button>
									<span></span>
								</div>
							
							</div>
						</form>
						<div class="table-responsive">
							<table class="table">
								<tr class="info">
									<th>Código</th>
									<th><span class="caret" style="cursor: pointer;" ng-click="ordenarPor('Nombre')"></span>Paciente<span class="caret" style="cursor: pointer;" ng-click="ordenarPor('-Nombre')"></span></th>
									<th>Motivo</th>
									<th>Observación</th>
									<th>Fecha/Hora</th>
									<th>Estado</th>
									<th>Profesional</th>
								</tr>
								<tr ng-repeat="consulta in consultas | orderBy:ordenSeleccionado | filter:buscar:strict | filter:{Estado:consult.type}" style="cursor: pointer;" ng-click="showConsult(consulta)">
									<td>{{consulta.idConsulta}}</td>
									<td>{{consulta.title}} {{consulta.pacienteApellido}}</td>
							
									<!-- Filtro lowercase para letras en minusculas -->
									<td>{{consulta.Motivo}}</td>
							
									<td>{{consulta.Observacion}}</td>
									<td>{{consulta.start}}</td>
									<td>
										{{consulta.Estado}}
										<i style="color: #3788d8" ng-if="consulta.idEstado == 1" class="glyphicon glyphicon-record"></i>
										<i style="color: #2f6010" ng-if="consulta.idEstado == 2" class="glyphicon glyphicon-record"></i>
										<i style="color: #601510" ng-if="consulta.idEstado == 3" class="glyphicon glyphicon-record"></i>
									</td>
									<td>{{consulta.Nombres}} {{consulta.profesionalApellido}}</td>

								</tr>
							</table>
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
		if($_SESSION['user'] == 'Profesional'){
			echo '<script>
	            getUserRolForMenu("Profesional");
	        </script>';
		}else if($_SESSION['user'] == 'Recepcionista'){
			echo '<script>
	            getUserRolForMenu("Recepcionista");
	        </script>';
		}else if($_SESSION['user'] == 'Administrador'){
			echo '<script>
	            getUserRolForMenu("Administrador");
	        </script>';
		}
	 }else{
	 	echo '<script> alert("User o password incorrectos");</script>';
        echo '<script> window.location="../login.php";</script>';
    }

?>