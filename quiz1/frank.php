<?php 
    $dbOk = false;
    @$db = new mysqli('localhost', 'phpmyadmin', '', 'weather');
    if ($db->connect_error) { 
      echo '
      <div class="messages">
        Could not connect to the database. Error: '; echo $db->connect_errno . ' -
        ' . $db->connect_error . '
      </div>';
    } else {
      $dbOk = true;
    }
   $data = file_get_contents('php://input');
   $query = 'update weather set data=(?) where api = "frank"';
   $statement = $db->prepare($query);
   $statement->bind_param("s", $data);
   $statement->execute();
   $statement->close();
   $db->close();
?>