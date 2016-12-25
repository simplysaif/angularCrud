<?php
class TableRows extends RecursiveIteratorIterator{
	function __construct($iterator){
		parent::__construct($iterator,SELF::LEAVES_ONLY);
	}

} 