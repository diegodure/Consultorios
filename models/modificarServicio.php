<?php
	$data = json_decode(file_get_contents("php://input"));
	$idServicio = $data->{"idServicio"};
	$nombre = $data->{"nombre"};
	$idService = $data->{"idService"};
	if(!empty($data->{"descripcion"})){
		$descripcion = $data->{"descripcion"};
	}else{
		$descripcion = "";
	}
	$costo = $data->{"costo"};
	
	include("../conect.php");

	$sql = "update Servicios set Nombre='$nombre', Descripcion='$descripcion', Costo='$costo' 
	where idServicio='$idServicio' and empresaServicio_id='$idService'";
	$results = $con->query($sql);

	if(!$results){ 
    	echo "error";
    }
    else{
    	echo "Servicio modificado correctamente!";
    }

	$con->close();
?>