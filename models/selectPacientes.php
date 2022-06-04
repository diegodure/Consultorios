<?php

	include("../conect.php");

	$sql = "select * from Pacientes";


	$results = mysqli_query($con,$sql);
	
	if (!$results) {
    echo( mysqli_error($con));
}

	$rawdata = array();

	$i = 0;

	while ($row = mysqli_fetch_array($results)) {
		$rawdata[$i] = $row;
		$i++;

		// $id = $row["idUsuarios"];
		// $no = $row["Nombre"];
		// $ape = $row["Apelido"];
		// $de = $row["user"];

		// $rawdata[] = array('idUsuarios'=>$id, 'Nombre'=>$no, 'Apelido'=>$ape, 'user'=>$de);

	}

	$con->close();

	$myArray = $rawdata;
	echo json_encode($myArray, JSON_UNESCAPED_UNICODE);


?>