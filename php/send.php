<?php
  $messagesFile = dirname(__FILE__).'/data.txt';
  $lastModify = isset($_POST['time']) ? $_POST['time'] : null;
  $currentModify = filemtime($messagesFile);
  echo filemtime($messagesFile);
  while($currentModify < $lastModify) {
    usleep(1000);
    clearstatcache();
    $currentModify = filemtime($messagesFile);
  }
  $response = array();
  $response['message'] = "";
  $response['color'] = "";
  $response['time'] = "";
  $response['sender'] = "";

  echo json_encode($response);
?>