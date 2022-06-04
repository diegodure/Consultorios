<?php
	$data = json_decode(file_get_contents("php://input"));
	$id = $data->{"id"};
	$nombre = $data->{"nombre"};
	$apellido = $data->{"apellido"};
	$ci = $data->{"ci"};
	$telefono = $data->{"telefono"};
	
	include("../conect.php");

	$sql = "update Pacientes set Nombres='$nombre', Apellidos='$apellido', ci='$ci', Telefono='$telefono' where idPaciente='$id'";
	$results = $con->query($sql);

	if(!$results){ 
    	echo "error";
    }
    else{
    	echo "Paciente modificado correctamente!";
    }

	$con->close();
?>