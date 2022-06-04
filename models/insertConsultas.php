<?php
	$data = json_decode(file_get_contents("php://input"), true);

	 include("../conect.php");

    
	 foreach($data as $obj){
        $id = $obj['id'];
        $fecha = $obj['fecha'];
        $motivo = $obj['motivo'];
        $observacion = $obj['observacion'];
        $sql2 = "insert into Historial (idHistorial, Pacientes_idPaciente, Fecha, Motivo, Observacion, Imagen)
        values (null, '$id', '$fecha', '$motivo', '$observacion', null)";
	    $con->query($sql2);
	}

      if($con -> connect_errno){
      	    die("Error de conexión: " . $con->mysqli_connect_errno() . ", " . $con->mysqli_connect_error());
          }
          else{
              echo "Consulta registrada!";
          }

      $con->close();

?>