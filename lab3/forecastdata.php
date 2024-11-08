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
    $query = 'select * from weather where api = "forecast"';
    $statement = $db->prepare($query);
    $statement->execute();
    $result = $statement->get_result();
    $row = $result->fetch_assoc();
    echo json_encode($row["data"])
?>