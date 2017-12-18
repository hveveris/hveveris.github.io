<?php

    require 'PHPMailer.php';

    if (isset($_POST['to']) && isset($_POST['from']) && isset($_POST['greeting']) && isset($_POST['img'])) {

        $lang = $_POST['lang'] || 'lv';
        $promoImgSrc = "https://squalio.com/christmas-greeting/email/ginger-receiver-" . $lang . ".jpg";
        $to = $_POST['to'];
        $from = $_POST['from'];
        $greeting = $_POST['greeting'];

        // save image
        define('UPLOAD_DIR', '../img/');
        $img = $_POST['img'];
        $img = str_replace('data:image/png;base64,', '', $img);
        $img = str_replace(' ', '+', $img);
        $data = base64_decode($img);
        $file = UPLOAD_DIR . uniqid() . '.png';
        $success = file_put_contents($file, $data);


        //send email
        $mail = new PHPMailer();
        
        $mail->From = "info@cocoracoffee.es";
        $mail->FromName = $_POST['from'];
        $mail->Sender = "info@cocoracoffee.es";
        $mail->AddAddress($to);
        $mail->Subject = "Ziemassvētku sveiciens";

        $mail->IsHTML(true);
        $mail->AltBody = "This is text only alternative body.";
        $mail->AddEmbeddedImage($promoImgSrc, 'promoImage', $promoImgSrc);
        
        $url = "https://squalio.com/christmas-greeting/?from=" . $from . "&greeting=" . $greeting . "&img=" . $file;
        $htmlContent = '
                <body style="background-color: #FFFFFF; margin: 0; padding: 0;" bgcolor="#FFFFFF">
                    <table cellspacing="0" border="0" align="center" cellpadding="0" width="100%">
                        <tr>
                            <td align="center" bgcolor="#FFFFFF" style="background-color: #FFFFFF; padding:0px; margin:0px;">
                                <a href="' . $url . '" target="_blank">
                                    <img src=\'cid:promoImage\' width="1920" height="1080" alt="Click here!" title="Click here!" usemap="#link" style="font-family: Georgia; color: #FFFFFF; font-size: 18px;" />
                                </a>
                            </td>
                        </tr>
                    </table>
                </body>            
            ';

        $mail->Body = $htmlContent;
        

        try {
            $mail->send();
            echo 'ok';
        } catch (Exception $e) {
            echo 'error';
        }

    } else {
        echo 'error';
    }


?>