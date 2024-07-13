import { appCommonTypes } from '../../../@types/app-common';
import MailTextConfig = appCommonTypes.MailTextConfig;

export default function mail_template({message, phone}: any) {
    return `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome Email</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        body {
            margin: 0;
            padding: 0;
            overflow: auto;
        }

        .wrapper {
            background-color: #F5F5F5;
            width: 80%;
            margin-bottom: 70px;
            /* height: 100vh; */
            padding-bottom: 60px;
            padding-top: 30px;
        }

        .wrapper2 {
            width: 80%;
            margin-bottom: 70px;
            /* height: 100vh; */
            padding-bottom: 60px;
            padding-top: 30px;
        }

        .message {
            font-size: 40px;
            font-weight: 900;
        }

        .subtext {
            font-size: 14px;
            font-weight: 300;
            padding-left: 10px;
            padding-right: 10px;
        }

        .headerText {
            font-size: 14px;
            font-weight: 600;
            padding-left: 10px;
            padding-right: 10px;
            text-align: left;
        }

        @media(max-width:700px) {

            .wrapper {
                width: 90% !important;
                padding-top: 50px !important;
            }

            .wrapper2 {
                width: 90% !important;
                padding-top: 50px !important;
            }

        }
    </style>
</head>

<body>
    <div class='wrapper2'>
        <p class="headerText">
          Phone number: ${phone}
        <p>
    </div>
    <center class="wrapper">
        <p class="subtext">${message}</p>
    </center>

</body>

</html>
    `;
}
