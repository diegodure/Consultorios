  <?php
  	session_start();
    include("../conect.php");
    
    if(isset($_SESSION['user'])){
    	$title = "Profesionales"
  ?>
  <!DOCTYPE html>
<html>

<?php
	include("head.php");
?>

<body ng-app="profesionales" >
<?php
	include("navbar.php");
?>

<div class="container">

<div ng-controller="ProfesionalesCtrl" class="container">

		<div class="panel panel-info">
			<div class="panel-heading">
				<div class="btn-group pull-right">
					<button type='button' class="btn btn-info" ng-click="mostrarModal()"><span class="glyphicon glyphicon-plus"></span> Nuevo Profesional</button>
					

				</div>

				<h4><i class='glyphicon glyphicon-search'></i> Buscar Profesional</h4>
			</div>
					<div class="panel-body">
						<form class="form-horizontal" role="form">
				
							<div class="form-group row">
								<label for="q" class="col-md-2 control-label">Buscar Profesional</label>
								<div class="col-md-5">
									<input type="text" class="form-control"  placeholder="Buscar Profesional" ng-model="buscar.$">
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
									<th>Apellido</th>
									<th>Ci</th>
									<th>Teléfono</th>
									<th class='text-right'>Acciones</th>
								</tr>
								
								<tr ng-repeat="profesional in profesionales | orderBy:ordenSeleccionado | filter:buscar:strict">
									<td>{{profesional.idProfesionale}}</td>
									<td>{{profesional.Nombres}}</td>
							
									<!-- Filtro lowercase para letras en minusculas -->
									<td>{{profesional.Apellidos}}</td>
							
									<td>{{profesional.Ci}}</td>
									<td>{{profesional.Telefono}}</td>

									<td><span class="pull-right">
									<a href="#" class='btn btn-default' title='Editar Paciente' ng-click="modificar(profesional)" data-toggle="modal"><i class="glyphicon glyphicon-edit"></i></a>
									<a href="#" class='btn btn-default' title='Ver historial' ng-click="eliminar(profesional)" data-toggle="modal"><i class="glyphicon glyphicon-trash"></i> </a></span></td>
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