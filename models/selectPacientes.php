<?php

	include("../conect.php");

	$sql = "select Pacientes.idPaciente, Pacientes.Nombres, Pacientes.Apellidos, Pacientes.Ci, Pacientes.Ciudad, Pacientes.Barrio, Pacientes.Descripcion, Pacientes.Telefono, Generos.idGenero as idGender, Generos.Nombre as genderName from Pacientes inner join Generos on Pacientes.Generos_idGenero=Generos.idGenero";


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