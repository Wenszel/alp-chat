<?php
    // File contains all informations about sender and message
    $result = array (
        'nick' => $_POST['nick'],
        'time' => $_POST['time'],
        'color' => $_POST['color'],
        'message' => $_POST['message'],
    );
    file_put_contents('data.txt', serialize($result)."\n", FILE_APPEND);
?>