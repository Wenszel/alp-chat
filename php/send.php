<?php
  $messagesFile = dirname(__FILE__)."/data.txt";
  $requestTime = isset($_GET["time"]) ? $_GET["time"] : 0;
  $currentModify = filemtime($messagesFile);
  // Ajax long polling while file age is smaller then last request time and the file isn't empty
  while ($currentModify <= intval($requestTime) && file_get_contents($messagesFile) == "" ) {
    usleep(1000);
    clearstatcache();
    $currentModify = filemtime($messagesFile);
  }
  // Open file
  $file = fopen($messagesFile,"r");  
  // Array of all messages in data file
  $response = [];
  // Read every line of the file and for each send to client message JSON
  while(! feof($file))  {
    $line = fgets($file);
    $line = unserialize($line);
    if ($line != false) {
      array_push($response, $line);
    }
  }
  // Close file
  fclose($file);
  // Clear file
  file_put_contents($messagesFile, "");
  // Send response to client
  echo json_encode($response);
?>