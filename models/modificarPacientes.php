<?php
	$data = json_decode(file_get_contents("php://input"));
	$id = $data->{"id"};
	$nombre = $data->{"nombre"};
	$apellido = $data->{"apellido"};
	$ci = $data->{"ci"};
	$telefono = $data->{"telefono"};
	if(!empty($data->{"ciudad"})){
		$ciudad = $data->{"ciudad"};
	}else{
		$ciudad = "";
	}
	if(!empty($data->{"barrio"})){
		$barrio = $data->{"barrio"};
	}else{
		$barrio = "";
	}
	$genero = $data->{"genero"};
	if(!empty($data->{"descripcion"})){
		$descripcion = $data->{"descripcion"};
	}else{
		$descripcion = "";
	}
	
	include("../conect.php");

	$sql = "update Pacientes set Nombres='$nombre', Apellidos='$apellido', Ci='$ci', Ciudad='$ciudad', Barrio='$barrio', Telefono='$telefono', Generos_idGenero='$genero', Descripcion='$descripcion' where idPaciente='$id'";
	$results = $con->query($sql);

	if(!$results){ 
    	echo "error";
    }
    else{
    	echo "Paciente modificado correctamente!";
    }

	$con->close();
?>