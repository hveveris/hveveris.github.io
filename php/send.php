<?php

    if (isset($_POST['to']) && isset($_POST['from']) && isset($_POST['greeting']) && isset($_POST['img'])) {

        define('UPLOAD_DIR', '../img/');
        $img = $_POST['img'];
        $img = str_replace('data:image/png;base64,', '', $img);
        $img = str_replace(' ', '+', $img);
        $data = base64_decode($img);
        $file = UPLOAD_DIR . uniqid() . '.png';
        $success = file_put_contents($file, $data);

        $lang = $_POST['lang'] || 'lv';
        $to = $_POST['to'];
        $from = $_POST['from'];
        $greeting = $_POST['greeting'];
        $subject = "Ziemassvētku sveiciens!";
        $url = "https://squalio.com/christmas-greeting/?from=" . $from . "&greeting=" . $greeting . "&img=" . $file;
        $promoImgSrc = "https://squalio.com/christmas-greeting/email/ginger-receiver-" . $lang . ".jpg";

        $htmlContent = '
                <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                <html xmlns="http://www.w3.org/1999/xhtml">
                    <head>
                        <title>Happy Holidays from DPA SQUALIO</title>
                        <meta name="viewport" content="width=1920">
                        <meta content="text/html; charset=UTF-8" http-equiv="content-type">
                        <meta http-equiv="Content-Type">
                    </head>
                    <body style="background-color: #FFFFFF; margin: 0; padding: 0;" bgcolor="#FFFFFF">
                        <table cellspacing="0" border="0" align="center" cellpadding="0" width="100%">
                        <tr>
                            <td align="center" bgcolor="#FFFFFF" style="background-color: #FFFFFF; padding:0px; margin:0px;">
                                <a href="' . $url . '" target="_blank">
                                    <img src="' . $promoImgSrc . '" width="1920" height="1080" alt="Click here!" title="Click here!" usemap="#link" style="font-family: Georgia; color: #FFFFFF; font-size: 18px;" />
                                </a>
                            </td>
                        </tr>
                        </table>
                    </body>
                </html>
            ';

        // Set content-type header for sending HTML email
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

        // Additional headers
        $headers .= 'From: Cocóra Coffee Roasters<info@cocoracoffee.es>' . "\r\n";
        //$headers .= 'Cc: welcome@example.com' . "\r\n";
        //$headers .= 'Bcc: welcome2@example.com' . "\r\n";

        // Send email
        if(mail($to, $subject, $htmlContent, $headers)):
            $response = 'ok';
        else:
            $response = 'error';
        endif;

    } else {
        $response = 'error';
    }

    echo $response;

?>