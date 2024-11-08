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
    $query = 'select * from weather where api = "current"';
    $statement = $db->prepare($query);
    $statement->execute();
    $result = $statement->get_result();
    $row = $result->fetch_assoc();
    $data = $row["data"];
    
   $num  = file_get_contents('php://input');
   $jsonData = json_decode($data, true);
   $jsonNum = json_decode($num, true);
   $jsonData["main"]["temp"] = $jsonNum["num"];
   $changedEncode = json_encode($jsonData, true);

   $query = 'update weather set data=(?) where api = "current"';
   $statement = $db->prepare($query);
   $statement->bind_param("s", $changedEncode);
   $statement->execute();
   $statement->close();
   $db->close();
?>