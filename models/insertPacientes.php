<?php

	$data = json_decode(file_get_contents("php://input"));
	$nombre = $data->{"nombre"};
	$apellido = $data->{"apellido"};
	$ci = $data->{"ci"};
	$telefono = $data->{"telefono"};

	include("../conect.php");

	$sql = "insert into Pacientes (idPaciente, Nombres, Apellidos, ci, Telefono) values (null, '$nombre', '$apellido', '$ci', '$telefono')";
	$results = $con->query($sql);

	if(!$results){ 
    	echo "error";
    }
    else{
    	echo "Paciente registrado correctamente!";
    }

	$con->close();
?>