<?php 

// Load environment variables from .env file
$envPath = __DIR__ . "/../.env";  // Adjust the path based on the actual location of your .env file

if (!file_exists($envPath)) {
    die("Error: .env file not found at $envPath");
}

// Read and parse the .env file
$env = file_get_contents($envPath);
$lines = explode("\n", $env);

foreach ($lines as $line) {
    // Skip empty lines and comments
    if (empty(trim($line)) || str_starts_with(trim($line), '#')) {
        continue;
    }

    // Use a more precise regex to extract key-value pairs
    if (preg_match("/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/", $line, $matches)) {
        $key = trim($matches[1]);
        $value = trim($matches[2]);
        putenv("$key=$value");
    }
}

// Fetch password from environment variables
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