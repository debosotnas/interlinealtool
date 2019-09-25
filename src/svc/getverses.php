<?php
header('Content-Type: application/json');

// -------
ini_set('display_errors', 1); ini_set('display_startup_errors', 1); error_reporting(E_ALL);
// -------

include_once('db-conn.php');

DB::query('SET NAMES utf8');

function getError($msg) {
  $resp = array();
  $resp["error"] = true;
  $resp["message"] = $msg;
  return json_encode($resp);
}


if (isset($_GET['look'])){
  $book = $_GET['look'];
} else {
  $book = 470;
}

// ----------------------------------------

$arr_word = array();
$arr_word["word"] = "";
$arr_word["str"] = "";
$arr_word["esp"] = "";
$arr_word["fon"] = "";
$arr_word["mor"] = "";

$arr_words = array();
array_push($arr_words, $arr_word);
array_push($arr_words, $arr_word);
array_push($arr_words, $arr_word);

$arr_verses = array();
$arr_verses["verse"] = 1;
$arr_verses["full"] = "asdfa sdfasfasfasdf as";
$arr_verses["words"] = $arr_words;

$arrRender = array();
$arrRender["passage"] = "Mateo 1:1";
$arrRender["verses"] = $arr_verses;

// ----------------------------------------
$chap_look = 1;
$verse_look = 1;

$sql = "SELECT * from 
          book_".$book."
        WHERE 
          chapter = '".$chap_look."'
          and
          verse = '".$verse_look."'
        order by word_id";


  $results = DB::query($sql) or die(getError("SQL error on get all info"));

  $firstIteration = true;
  $arrVerses = array();
  
  foreach ($results as $row) {
    
  }

echo json_encode($arrRender);
die;


$arrRender = array();
// $currentChap = 0;
// $chapToshow = 0;

// Gen 2:4-3:2
// Gen 1:1-5
// Gen 1:1

$showSingleChapter = false;
if (isset($_GET['portion'])) {
  $portion = $_GET['portion'];
} else {
  $portion = '1:23-2:4';
}
if (isset($_GET['look'])){
  $book = $_GET['look'];
} else {
  $book = 10;
}

// echo "portion: $portion\n\n";
$title = $portion;
$arrSplitPortion = explode('-', $portion);

// print_r($arrSplitPortion);

if (count($arrSplitPortion) > 1) { // case more 1 verse ('2:4-3:2' or '1:1-5')
  $portionIni = $arrSplitPortion[0];
  $portionEnd = $arrSplitPortion[1];

  $arrSplitPortionIni = explode(':', $portionIni);
  $arrSplitPortionEnd = explode( ':', $portionEnd);

  if(count($arrSplitPortionIni) > 1) { // has format 1:1
    $chapterIni = $arrSplitPortionIni[0];
    $verseIni = $arrSplitPortionIni[1];

  } else { // has just chapter '1' (need add first verse)
    $chapterIni = $arrSplitPortionIni[0];
    $verseIni = 1;

  }

  if (count($arrSplitPortionEnd) > 1) { // case diff chapter '3:2' (from '2:4-3:2')
    $chapterEnd = $arrSplitPortionEnd[0];
    $verseEnd = $arrSplitPortionEnd[1];

  } else { // case same chapter '1:1-5' => '1:1-1:5'
    $chapterEnd = $chapterIni;
    $verseEnd = $arrSplitPortionEnd[0];

  }

} else { // case single verse '1:1' or chapter '1'
  $arrSplitVerseChapFirst = explode(':', $arrSplitPortion[0]);
  if (count ($arrSplitVerseChapFirst) > 1) { // case single verse (x ej. 1:1)
    $chapterIni = $chapterEnd = $arrSplitVerseChapFirst[0];
    $verseIni = $verseEnd = $arrSplitVerseChapFirst[1];
  } else { // case single chap
    $chapterIni = $arrSplitVerseChapFirst[0];
    $showSingleChapter = true;
  }
}

/*
$chapterIni = 1;
$chapterEnd = 1;
$verseIni = 1;
$verseEnd = 5;
*/
if ($showSingleChapter) {
  $sql = "SELECT book_number, chapter, verse, text FROM lbla_verses 
              where
                book_number = $book
                and chapter = $chapterIni
              order by verse";
} else {

  $prev_sql_ini = "SELECT primkey from lbla_verses 
                  where book_number = $book
                        and chapter = $chapterIni
                        and verse = $verseIni";

  $prev_sql_end = "SELECT primkey from lbla_verses 
                  where book_number = $book
                        and chapter = $chapterEnd
                        and verse = $verseEnd";
  
  $res_ini = DB::queryFirstRow($prev_sql_ini) or die(getError(" Error getting info from DB: Init"));
  $res_end = DB::queryFirstRow($prev_sql_end) or die(getError("Error getting info from DB: End"));

  $sql = "SELECT book_number, chapter, verse, text FROM lbla_verses 
              where
                primkey >= ".$res_ini['primkey']." and primkey <= ".$res_end['primkey']."
              order by primkey";

}

$results = DB::query($sql) or die(getError("SQL error on get all info"));

$firstIteration = true;
$arrVerses = array();

foreach ($results as $row) {

  if ($row['chapter'] != $currentChap && !$firstIteration) {
    $chapToshow = $currentChap = $row['chapter'];
    $extraChapClass = 'chap';
  } else {
    $chapToshow = $row['verse'];
    $extraChapClass = 'vers';
  }

  if ($firstIteration) {
    $currentChap = $row['chapter'];
    $firstIteration = false;
  } 

  $tmpArr = array();
  $tmpArr['verse'] = $chapToshow;
  $tmpArr['verseClass'] = $extraChapClass;
  $tmpArr['text'] = $row['text'];

  array_push($arrVerses, $tmpArr);
}

$arrRender['portion'] = $title;
$arrRender['passages'] = $arrVerses;
$arrRender['error'] = false;
$arrRender['message'] = "";

// print_r($arrRender);
echo json_encode($arrRender);
?>