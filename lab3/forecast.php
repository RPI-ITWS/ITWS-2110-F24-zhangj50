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
    $data = file_get_contents('php://input');

// Output the received data for debugging
error_log("Received data: " . $data);

// Convert JSON string to PHP object/array
$jsonData = json_decode($data, true);

// Debug output
error_log(print_r($jsonData, true)); // Log the decoded data

// Respond back with the data (for testing purposes)
echo json_encode($jsonData);
    $body = [
      'content' => $_POST
    ];
    $query = 'update weather set data=(?) where api = "forecast"';
    $statement = $db->prepare($query);
         // bind our variable to the question mark
   $statement->bind_param("s", $_POST["body"]);
   // make it so:
   $statement->execute();
   $statement->close();
   $db->close();

?>