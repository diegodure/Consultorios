 <?php
 include("../conect.php");

 $sql = "select max(idHistorial) as idH from Historial";
 $result = $con->query($sql);

 if($row = mysqli_fetch_row($result)){
 	$idH = trim($row[0]);
 }

foreach ($_FILES as $archivo) {
	$nombre = $_FILES['file']["name"];
    $datos = base64_encode(file_get_contents($_FILES['file']['tmp_name']));
    $sql = "update Historial set Imagen='$datos' where idHistorial='$idH'";
    $con->query($sql);
}
	if($con -> connect_errno){
        die("Error de conexión: " . $con->mysqli_connect_errno() . ", " . $con->mysqli_connect_error());
    }else{
    	echo "Consulta registrada correctamente";
    }
	$con->close();

?>