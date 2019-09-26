<?php
header('Content-Type: application/json');

// -------
// ini_set('display_errors', 1); ini_set('display_startup_errors', 1); error_reporting(E_ALL);
// -------

include_once('db-conn.php');

DB::query('SET NAMES utf8');

function getError($msg) {
  $resp = array();
  $resp["error"] = true;
  $resp["message"] = $msg;
  return json_encode($resp);
}

if (isset($_GET['portion'])) {
  $portion = $_GET['portion'];
} else {
  $portion = '1:1-3';
}

if (isset($_GET['look'])){
  $book = $_GET['look'];
} else {
  $book = 470;
}


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

// http://localhost:8888/interlinealtool/src/svc/getverses.php?portion=1:1-2&look=470

$prev_sql_ini = "SELECT word_id from book_".$book."
                  where chapter = $chapterIni
                        and verse = $verseIni
                  order by word_id asc
                  limit 1";

$prev_sql_end = "SELECT word_id from book_".$book."
                  where chapter = $chapterEnd
                        and verse = $verseEnd
                  order by word_id desc
                  limit 1";

$res_ini = DB::queryFirstRow($prev_sql_ini) or die(getError(" Error getting info from DB: Init"));
$res_end = DB::queryFirstRow($prev_sql_end) or die(getError("Error getting info from DB: End"));

$sql = "SELECT * FROM book_".$book." 
        where
        word_id >= ".$res_ini['word_id']." and word_id <= ".$res_end['word_id']."
        order by word_id";

$results = DB::query($sql) or die(getError("SQL error on get all info"));

// -------------

$arr_verses = array();

$arr_words = array();
$currentVerse = $verseIni;

// ----------------------------------------------------------

$extra_verses = array();
$arr_morpho_description = array();

foreach ($results as $row) {

  if (!isset($extra_verses[strval($row['verse'])]) || !is_array( $extra_verses[ strval($row['verse']) ] ) ) {
    $extra_verses[strval($row['verse'])] = array();
  }

  $puntuacion_arr = explode("|", $row['punctuation']);
  $puntuacion = str_replace('¶', '', strip_tags($puntuacion_arr[1]));
  
  $tmpWord = array();
  $tmpWord["word"] = $row['greek_word'].$puntuacion;
  $tmpWord["str"] = $row['strong_id'];
  $tmpWord["esp"] = $row['spanish'];
  $tmpWord["fon"] = $row['fonetica'];
  $tmpWord["mor"] = $row['morpho'];
  
  if (isset($arr_morpho_description[$tmpWord["mor"]])) {
    $desc = $arr_morpho_description[$tmpWord["mor"]];
  } else {
    $sql_morpho = "SELECT description from book_morpho where rmac = '" . $tmpWord["mor"] . "'";
    $res_morpho = DB::queryFirstRow($sql_morpho) or die(getError(" Error getting info from DB: Init"));  
    $desc = $res_morpho["description"];
    $arr_morpho_description[$tmpWord["mor"]] = $desc;
  }
  $tmpWord["mordesc"] = $desc;

  array_push($extra_verses[strval($row['verse'])], $tmpWord); 
}

foreach ($extra_verses as $key => $value) {
  $arr_verse = array();
  $arr_verse["verse"] = $key;

  // TO DO UNCOMMENT!!!
  $prev_text_verse = "SELECT text from lbla_verses 
                    where book_number = $book
                          and chapter = $chapterIni
                          and verse = $key";
  $res_text_verse = DB::queryFirstRow($prev_text_verse) or die(getError(" Error getting info from DB: Init"));
  $arr_verse["full"] = $res_text_verse['text'];
  // $arr_verse["full"] = "asdfasdfa asdf asdf asdf asf ";

  $arr_verse["words"] = $value;
  array_push($arr_verses, $arr_verse);
}

$arr_selection = array();
$arr_selection["book"] = $book;
// leaving out $chapterEnd since we show verses in same chapter
$arr_selection["chapter"] = $chapterIni;
$arr_selection["verseIni"] = $verseIni;
$arr_selection["verseEnd"] = $verseEnd;

// TO DO: UNCOMMENT HERE!!!!!!!!!!!!!
$sql_book_name = "SELECT long_name from lbla_books where book_number = '".$book."'";
$row_book_name = DB::queryFirstRow($sql_book_name);
$bookName = $row_book_name['long_name'];
// $bookName = 'Mateo';

$arr_portion = array();
$arr_portion["passage"] = $bookName . ' ' . $portion;
$arr_portion["passageSelection"] = $arr_selection;
$arr_portion["verses"] = $arr_verses;

echo json_encode($arr_portion);
?>