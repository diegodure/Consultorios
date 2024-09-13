<?php
	$data = json_decode(file_get_contents("php://input"));
	$idService = $data->{"idService"};
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

	$sql = "insert into Pacientes (idPaciente, Nombres, Apellidos, Ci, Ciudad, Barrio, Telefono, Generos_idGenero, Descripcion, empresaServicio_id) values (null, '$nombre', '$apellido', '$ci', '$ciudad',  '$barrio', '$telefono', '$genero', '$descripcion','$idService')";
	$results = $con->query($sql);

	if(!$results){ 
    	echo "error";
    }
    else{
    	echo "Paciente registrado correctamente!";
    }

	$con->close();
?>