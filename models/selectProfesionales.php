<?php

	include("../conect.php");

	$sql = "select Usuarios.idUsuario, Usuarios.Ci, Usuarios.Telefono, Usuarios.idUsuario, Usuarios.Nombres, Usuarios.Apellidos, Usuarios.User, Usuarios.Pass, Roles.Nombre as Rol, Roles.idRol as rolId from Usuarios inner join Roles on Usuarios.Roles_idRol=Roles.idRol where Roles.idRol = 2";
	
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