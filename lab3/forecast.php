<?php 

    $env = file_get_contents(__DIR__."../.env");
    $lines = explode("\n",$env);

    foreach($lines as $line){
      preg_match("/([^#]+)\=(.*)/",$line,$matches);
      if(isset($matches[2])){
        putenv(trim($line));
      }
    }
    $password = getenv('PASSWORD');
    $dbOk = false;
    @$db = new mysqli('localhost', 'phpmyadmin', $password, 'weather');
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

    $query = 'update weather set data=(?) where api = "forecast"';
    $statement = $db->prepare($query);
         // bind our variable to the question mark
   $statement->bind_param("s", $data);
   // make it so:
   $statement->execute();
   $statement->close();
   $db->close();
    echo $data;
?>