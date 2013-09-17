<?php

$file = 'saved.txt';

if($_POST["action"]=="read")
{
	$current = file_get_contents($file);
	$current = unserialize($current);
	$current = json_encode($current);
	echo $current;
}
else if($_POST["action"]=="write")
{
	$current = json_decode($_POST["data"]);
	if(count($current)>0)
	{
		
		$current = serialize($current);
		$fp = fopen($file, 'w+');
		fwrite($fp, $current);
		fclose($fp);
	}
	else
	{
		echo $_POST["data"];
	}

	// echo "saved successfully";
	// echo $current;
}

