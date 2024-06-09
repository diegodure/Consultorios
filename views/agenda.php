<?php
  	session_start();
    include("../conect.php");
    
    if(isset($_SESSION['user'])){
    	$title = "Agenda";
    	$idUser = $_SESSION['idUser'];
    	$roleUser = $_SESSION['user'];
  ?>
 <!DOCTYPE html>
<html>

<?php
	include("head.php");

?>

<body ng-app="agenda" >
<?php
	include("navbar.php");
?>

<div class="container">
	<div ng-controller="AgendaCtrl" class="container">
		<div id='calendar'></div>
	</div>
</div>


<br>
<br>
<br>
<?php
	include("footer.php");
?>
<!-- <script type="text/javascript" src="bower_components/angular/angular.min.js"></script>

<script type="text/javascript" src="bd2.js"></script> -->
</body>
</html>
<?php
		if($_SESSION['user'] == 'Profesional'){
			echo '<script>
	            getUserRolForMenu("Profesional");
	        </script>';
		}else if($_SESSION['user'] == 'Recepcionista'){
			echo '<script>
	            getUserRolForMenu("Recepcionista");
	        </script>';
		}else if($_SESSION['user'] == 'Administrador'){
			echo '<script>
	            getUserRolForMenu("Administrador");
	        </script>';
		}
	 }else{
	 	echo '<script> alert("User o password incorrectos");</script>';
        echo '<script> window.location="../login.php";</script>';
    }

?>