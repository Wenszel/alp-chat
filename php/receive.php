<?php
    // File contains all informations about sender and message
    $file = fopen("data.txt", "a+");
    $text = $_POST['nick']."/".$_POST['time']."/".$_POST['color']."/".$_POST['message']."\n";
    fwrite($file, $text);
    fclose($file);
?>