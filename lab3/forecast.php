<?php 
    $dbOk = false;
    @$db = new mysqli('localhost', 'phpmyadmin', 'Password123', 'weather');
    if ($db->connect_error) { 
      echo '
      <div class="messages">
        Could not connect to the database. Error: '; echo $db->connect_errno . ' -
        ' . $db->connect_error . '
      </div>';
    } else {
      $dbOk = true;
    }
    $body = [
      'content' => $_POST["body"]
    ];
    echo json_encode($body);
    $query = 'update weather set data=(?) where api = "forecast"';
    $statement = $db->prepare($query);
         // bind our variable to the question mark
   $statement->bind_param("s", $_POST["body"]);
   // make it so:
   $statement->execute();
   $statement->close();
   $db->close();

?>