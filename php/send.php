<?php

if (isset($_POST['to']) && isset($_POST['from']) && isset($_POST['greeting']) && isset($_POST['img'])) {

    $lang = $_POST['lang'] == 'en' ? 'en' : 'lv';
    $to = $_POST['to'];
    $from = urlencode($_POST['from']);
    $greeting = urlencode($_POST['greeting']);
    $subject = 'SQUALIO sveic Tevi gada gaišākajos svētkos un novēl saticību un mieru katrās mājās!';
    $fromAddress = 'SQUALIO <squalio@squalio.com>';
    $altText = 'Gaišām pārslām virmo Ziemassvētku gaidīšanas sajūta. Kāds ļoti īpašs rūķis sirsnīgi sveic Tevi svētkos! Atver apsveikumu un apskati tieši Tev veidotu sveicienu! Spied šeit!';

    if ($lang == 'en') {
        $subject = $altText = "SQUALIO wishes you and your family bright, prosperous and happiest time ahead!";
    }


    // save image
    define('UPLOAD_DIR', '../img/');
    $img = $_POST['img'];
    $img = str_replace('data:image/png;base64,', '', $img);
    $img = str_replace(' ', '+', $img);
    $data = base64_decode($img);
    $fileName = uniqid() . '.png';
    $file = UPLOAD_DIR . $fileName;
    $success = file_put_contents($file, $data);

    $url = "https://www.squalio.com/christmas-greeting/?from=" . $from . "&greeting=" . $greeting . "&img=" . $fileName . "&lang=".$lang;
    $promoImgSrc = "https://www.squalio.com/christmas-greeting/email/images/ginger-receive-" . $lang ."_";
    $r = time();

    $fontSize = strlen($_POST['from']) > 26 ? 10 : 14;
    $htmlContent = '
        <html>
        <head>
        <title>'.$subject.'</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        </head>
        <body style="background-color: #f2f2f2; margin: 0; padding: 0;">
        <table id="Table_01" width="1024" height="576" border="0" cellpadding="0" cellspacing="0">
            <tr>
                <td colspan="3">
                <a href="' . $url . '" target="_blank">
                    <img src="' . $promoImgSrc . '01.png"'.$r.' style="line-height: 0; vertical-align: middle;" width="1024" height="159" alt="' . $altText . '"></a></td>
            </tr>
            <tr>
                <td rowspan="2">
                <a href="' . $url . '" target="_blank">
                    <img src="' . $promoImgSrc . '02.png"'.$r.' style="line-height: 0; vertical-align: middle;" width="282" height="417" alt="' . $altText . '"></a></td>
                <td width="90" height="45" bgColor="#a2845a">
                    <div width="90" height="45" style="font-family: Helvetica; font-size:'.$fontSize.'px"><font color="#ffeda9">'.$_POST['from'].'</font></td>                    
                <td rowspan="2">
                <a href="' . $url . '" target="_blank">
                    <img src="' . $promoImgSrc . '04.png"'.$r.' style="line-height: 0; vertical-align: middle;" width="652" height="417" alt="' . $altText . '"></a></td>
            </tr>
            <tr>
                <td>
                <a href="' . $url . '" target="_blank">
                    <img src="' . $promoImgSrc . '05.png"'.$r.' style="line-height: 0; vertical-align: middle;" width="90" height="372" alt="' . $altText . '"></a></td>
            </tr>
        </table>
        </body>
        </html>
    ';


    // To send HTML mail, the Content-type header must be set
    $headers  = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=UTF-8' . "\r\n";
     
    // Create email headers
    $headers .= 'From: '.$fromAddress."\r\n" . 'Reply-To: '.$fromAddress."\r\n" . 'X-Mailer: PHP/' . phpversion();
     
     
    // Sending email
    if(mail($to, $subject, $htmlContent, $headers)){
        echo 'ok';
    } else{
        echo 'error1';
    }
} else {
    echo 'error2';
}

?>