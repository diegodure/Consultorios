  <?php
  	session_start();
    include("../conect.php");
    
    if(isset($_SESSION['user'])){
    	$title = "Servicios";
		$idUser = $_SESSION['idUser'];
    	$roleUser = $_SESSION['user'];
		$idService = $_SESSION['idService'];
  ?>
  <!DOCTYPE html>
<html>

<?php
	include("head.php");
?>

<body ng-app="servicios" >
<?php
	include("navbar.php");
?>

<div class="container">

<div ng-controller="ServiciosCtrl" class="container">

		<div class="panel panel-info">
			<div class="panel-heading">
				<div class="btn-group pull-right">
					<button type='button' class="btn btn-info" ng-click="mostrarModal()"><span class="glyphicon glyphicon-plus"></span> Nuevo Servicio</button>
					

				</div>

				<h4><i class='glyphicon glyphicon-search'></i> Buscar Servicio</h4>
			</div>
					<div class="panel-body">
						<form class="form-horizontal" role="form">
				
							<div class="form-group row">
								<label for="q" class="col-md-2 control-label">Buscar Servicio</label>
								<div class="col-md-5">
									<input type="text" class="form-control" id="q" placeholder="Buscar Servicio" ng-model="buscar.$">
								</div>
								<div class="col-md-3">
									<button type="button" class="btn btn-default">
									<span class="glyphicon glyphicon-search"></span> Buscar</button>
									<span></span>
								</div>
							
							</div>
				
						</form>
						<div class="table-responsive">
							<table class="table">
								<tr class="info">
									<th>Código</th>
									<th><span class="caret" style="cursor: pointer;" ng-click="ordenarPor('Nombre')"></span>Nombre<span class="caret" style="cursor: pointer;" ng-click="ordenarPor('-Nombre')"></span></th>
									<th>Descripción</th>
									<th>Costo</th>
									<th class='text-right'>Acciones</th>
								</tr>
								
								<tr ng-repeat="servicio in servicios | orderBy:ordenSeleccionado | filter:buscar:strict">
									<td>{{servicio.idServicio}}</td>
									<td>{{servicio.Nombre}}</td>
							
									<!-- Filtro lowercase para letras en minusculas -->
									<td>{{servicio.Descripcion | lowercase}}</td>
							
									<td>{{servicio.Costo | currency :'₲':0}}</td>

									<td><span class="pull-right">
									<a href="#" class='btn btn-default' title='Editar Paciente' ng-click="modificar(servicio)" data-toggle="modal"><i class="glyphicon glyphicon-edit"></i></a>
									<a href="#" class='btn btn-default' title='Ver historial' ng-click="eliminar(servicio)" data-toggle="modal"><i class="glyphicon glyphicon-trash"></i> </a></span></td>
								</tr>
								
							</table>
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