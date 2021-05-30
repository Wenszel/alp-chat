<?php
  $messagesFile = dirname(__FILE__).'/data.txt';
  $requestTime = isset($_GET['time']) ? $_GET['time'] : 0;
  $currentModify = filemtime($messagesFile);
  while($currentModify <= intval($requestTime)) {
    usleep(1000);
    clearstatcache();
    $currentModify = filemtime($messagesFile);
  }
  // Get all data from txt file
  $data = file_get_contents($messagesFile);
  $data = unserialize($data);
  echo json_encode($data);
?>