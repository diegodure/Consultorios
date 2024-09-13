<?php

	include("../conect.php");
	$idService = $_GET['idService'];

	$sql = "select Servicios.idServicio, Servicios.Nombre, Servicios.Descripcion, 
	Servicios.Costo from Servicios where Active='0' and Servicios.empresaServicio_id='$idService'";
	
	$results = $con->query($sql);

	$rawdata = array();

	$i = 0;


	if (!$results) {
   		echo "error";
	}else{
		while ($row = mysqli_fetch_array($results)) {
			$rawdata[$i] = $row;
			$i++;

		}
		$myArray = $rawdata;
		echo json_encode($myArray, JSON_UNESCAPED_UNICODE);
	}
	$con->close();

?>