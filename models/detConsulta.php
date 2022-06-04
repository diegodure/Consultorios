<?php
	$data = json_decode(file_get_contents("php://input"), true);

	//print_r($data);

	include("../conect.php");

    //Realizamos una consulta para saber el ultimo id de la venta

	$sql = "select max(idVenta) as idV from Ventas";
        $result = $con->query($sql);

        //echo ($result->insert_id);
        if($row = mysqli_fetch_row($result)){
            $idV = trim($row[0]);

        }
     //Recorremos e insertamos los datos del json en el detalle de la venta

	foreach($data as $obj){
        $idP = $obj['id'];
        $precio = $obj['precio'];
        $cantidad = $obj['cantidad'];
        $subT = $obj['subT'];
        $iva = $obj['iva'];
        $sql2 = "insert into det_ventas (Ventas_idVenta, Productos_idProducto, Cantidad, Precio, subtotal, iva)
        values ('$idV', '$idP', '$cantidad', '$precio', '$subT', '$iva')";
	    //print ($iva);
	    $con->query($sql2);
	}

	if($con -> connect_errno){
        	    die("Error de conexión: " . $con->mysqli_connect_errno() . ", " . $con->mysqli_connect_error());
            }
            else{
                echo "Venta registrada correctamente";
            }

	$con->close();

?>