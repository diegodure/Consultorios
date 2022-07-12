<?php

	session_start();
?>
<!DOCTYPE html>
<html>
<head>
	<title>Validando..</title>
	<meta charset="utf-8">
	<link href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="css/general.css">
</head>
<body>
	<?php

		include("conect.php");
		if(isset($_POST['login'])){

			$usuario = $_POST['user'];
			$pass = $_POST['pass'];
			$sql = "select Usuarios.User, Usuarios.Pass, Roles.Nombre as rol from Usuarios inner join Roles on Usuarios.Roles_idRol=Roles.idRol where User='$usuario' and Pass='$pass'";
			
			
			if($result = $con->query($sql)){
				$row = $result->fetch_array();
				$_SESSION["user"] = $row['rol'];
				echo '<div class="logoLogin"><i class="fas fa-spinner"></i></div>';
				echo '<script> window.location="views/agenda.php"; </script>';
			}else{
				 echo '<script> alert("User o password incorrectos");</script>';
				 echo '<script> window.location="login.php"; </script>';
			}
		}
	?>
</body>
</html>