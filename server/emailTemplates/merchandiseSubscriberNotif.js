import { formatISODateOnly } from "../utils/dateFormatter.js";

const emailContent = ({
  dateRequested,
  shipDate,
  merchantName,
  merchantImage,
  merchantPoints,
}) => {
  return `<!DOCTYPE html
        PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
        xmlns:o="urn:schemas-microsoft-com:office:office">

    <head>
        <!--[if gte mso 9]>
        <xml>
            <o:OfficeDocumentSettings>
            <o:AllowPNG />
            <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
        <!-- Desktop Outlook chokes on web font references and defaults to Times New Roman, so we force a safe fallback font. -->
        <!--[if mso]>
        <style>
            * {
            font-family: "Roboto", sans-serif;
            }
        </style>
        <![endif]-->
        <!-- All other clients get the webfont reference; some will render the font and others will silently fail to the fallbacks. -->
        <!--[if !mso]><!-->
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,700,900" rel="stylesheet" type="text/css" />
        <!--<![endif]-->
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="x-apple-disable-message-reformatting" />
        <!--[if !mso]><!-->
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <!--<![endif]-->
        <!-- Your title goes here -->
        <title>Merchandise Redeemed</title>
        <!-- End title -->
        <!-- Start stylesheet -->
        <style type="text/css">
            a,
            a[href],
            a:hover,
            a:link,
            a:visited {
                /* This is the link colour */
                text-decoration: none !important;
                color: #0000ee;
            }

            .link {
                text-decoration: underline !important;
            }

            p,
            p:visited {
                /* Fallback paragraph style */
                font-size: 15px;
                line-height: 24px;
                font-family: "Helvetica", Arial, sans-serif;
                font-weight: 300;
                text-decoration: none;
                color: #000000;
            }

            h1 {
                /* Fallback heading style */
                font-size: 22px;
                line-height: 24px;
                font-family: "Helvetica", Arial, sans-serif;
                font-weight: normal;
                text-decoration: none;
                color: #000000;
            }

            .ExternalClass p,
            .ExternalClass span,
            .ExternalClass font,
            .ExternalClass td {
                line-height: 100%;
            }

            .ExternalClass {
                width: 100%;
            }

            .merchandise-card {
                margin-left: auto;
                margin-right: auto;
                background-color: #fff;
                box-shadow: 0 4px 6px -1px #eee, 0 2px 4px -1px #eee;
                border: 1px solid #eee;
                border-radius: 9px;
                max-width: 200px;
                width: 180px;
            }

            .merchandise-card>.merchandise-image {
                padding: 1rem;
                object-fit: contain;
            }

            .merchandise-card>.merchandise-image>img {
                width: 100%;
                border-radius: 9px;
            }

            .merchandise-card>.merchandise-captions {
                text-align: left;
                background-color: #e2e0e1;
                padding: 0.5rem;
            }

            .merchandise-card>.merchandise-captions>h2 {
                margin-top: 0;
                margin-bottom: 0;
                font-weight: 700;
                font-family: "Montserrat", sans-serif;
                margin-bottom: 0.1rem;
                font-size: 1rem;
            }

            .merchandise-card>.merchandise-captions>p {
                margin-top: 0;
                font-size: 0.8rem;
                font-weight: 400;
                font-family: "Montserrat", sans-serif;
            }
        </style>
        <!-- End stylesheet -->
    </head>
    <!-- You can change background colour here -->

    <body style="
        text-align: center;
        margin: 0;
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 0;
        padding-right: 0;
        -webkit-text-size-adjust: 100%;
        background-color: #f2f4f6;
        color: #000000;
        " align="center">
        <!-- Start container for logo -->
        <table align="center" style="
            width: 600px;
            max-width: 600px;
            background-color: #ffffff;
            border-bottom: 1px solid #eeeeee;
        " width="600">
            <tbody>
                <tr>
                    <td style="
                width: 596px;
                vertical-align: top;
                padding-left: 0;
                padding-right: 0;
                padding-top: 15px;
                padding-bottom: 15px;
                " width="596">
                        <!-- Your logo is here -->
                        <img style="
                    width: 180px;
                    max-width: 180px;
                    text-align: center;
                    color: #ffffff;
                " alt="Logo" src="	https://www.gocfs.pro/assets/images/logos/cfs-main-logo.png" align="center"
                            width="180" />
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- End container for logo -->
        <div style="
            width: 570px;
            max-width: 570px;
            background-color: #ffffff;
            margin: auto;
            text-align: left;
            padding: 15px;
        " width="570">
            <h5 style="
            margin: 0;
            font-family: 'Roboto', sans-serif;
            font-weight: 900;
            font-size: 20px;
            ">
                Thank you for redeeming your points.
            </h5>
            <p style="
                  margin-bottom: 0;
                  border-bottom: 1px solid #eeeeee;
                  padding-bottom: 10px;
                ">
              Keep sharing CFS materials to earn more points.
            </p>
            <div style="margin-bottom: 0; padding-bottom: 5px">
              <ul style="font-family: Roboto, sans-serif">
                <li style="font-size: 13px; margin-bottom: 10px">
                  <b>Date requested:</b> ${formatISODateOnly(dateRequested)}
                </li>
                <li style="font-size: 13px; margin-bottom: 10px">
                  <b>Estimated date to shipped:</b> ${formatISODateOnly(
                    shipDate
                  )}
                </li>
                <li style="font-size: 13px; margin-bottom: 10px">
                  <b>Redeemed Item:</b>
                </li>
              </ul>
              <div class="merchandise-card" style="text-align: center; font-family: Roboto, sans-serif">
                    <div class="merchandise-image">
                    <img class="merchandise-image" alt="Logo"
                        src="${merchantImage}"
                        alt="merchItem">
                    </div>

                    <div class="merchandise-captions">
                        <h2>${merchantName}</h2>
                        <p>${merchantPoints}</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- Start footer -->
        <table align="center" style="
            text-align: center;
            vertical-align: top;
            width: 600px;
            max-width: 600px;
            background-color: #ffffff;
            border-top: 1px solid #eeeeee;
        " width="600">
            <tbody>
                <tr>
                    <td style="
                width: 596px;
                vertical-align: top;
                padding-left: 30px;
                padding-right: 30px;
                padding-bottom: 10px;
                " width="596">
                        <p style="
                    margin-bottom: 0;
                    font-size: 13px;
                    font-family: 'Helvetica', Arial, sans-serif;
                    font-weight: 400;
                    text-decoration: none;
                    color: #333333;
                ">
                            <a target="_blank" style="
                    text-decoration: underline;
                    color: #333333;
                    font-style: italic;
                    " href="https://comfortfinancialsolutions.com">
                                www.gocfs.pro
                            </a>
                        </p>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- End footer -->
    </body>
    </html>`;
};

export default emailContent;
