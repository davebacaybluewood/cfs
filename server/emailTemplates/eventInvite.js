const eventInvite = ({
  emailAddress,
  password,
  zoomLink,
  eventName,
  hasAccount,
  firstName,
}) => {
  return `<!-- Free to use, HTML email template designed & built by FullSphere. Learn more about us at www.fullsphere.co.uk -->
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html
          xmlns="http://www.w3.org/1999/xhtml"
          xmlns:v="urn:schemas-microsoft-com:vml"
          xmlns:o="urn:schemas-microsoft-com:office:office"
        >
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
            <link
              href="https://fonts.googleapis.com/css?family=Roboto:300,400,700,900"
              rel="stylesheet"
              type="text/css"
            />
            <!--<![endif]-->
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="x-apple-disable-message-reformatting" />
            <!--[if !mso]><!-->
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <!--<![endif]-->
            <!-- Your title goes here -->
            <title>Event Invitation</title>
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
            </style>
            <!-- End stylesheet -->
          </head>
          <!-- You can change background colour here -->
          <body
            style="
              text-align: center;
              margin: 0;
              padding-top: 10px;
              padding-bottom: 10px;
              padding-left: 0;
              padding-right: 0;
              -webkit-text-size-adjust: 100%;
              background-color: #f2f4f6;
              color: #000000;
            "
            align="center"
          >
            <!-- Start container for logo -->
            <table
              align="center"
              style="
                width: 600px;
                max-width: 600px;
                background-color: #ffffff;
                border-bottom: 1px solid #eeeeee;
              "
              width="600"
            >
              <tbody>
                <tr>
                  <td
                    style="
                      width: 596px;
                      vertical-align: top;
                      padding-left: 0;
                      padding-right: 0;
                      padding-top: 15px;
                      padding-bottom: 15px;
                    "
                    width="596"
                  >
                    <!-- Your logo is here -->
                    <img
                      style="
                        width: 180px;
                        max-width: 180px;
                        text-align: center;
                        color: #ffffff;
                      "
                      alt="Logo"
                      src="https://www.gocfs.pro/assets/images/logos/cfs-main-logo.png"
                      align="center"
                      width="180"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- End container for logo -->
            <div
              style="
                width: 570px;
                max-width: 570px;
                background-color: #ffffff;
                margin: auto;
                text-align: left;
                padding: 15px;
              "
              width="570"
            >
              <p style="padding-bottom: 0px; margin-top: 0">
                Hi ${firstName}, you are invited in the <b>${eventName}</b>.
              </p>
        
              <div>
                <a
                  style="
                    color: rgb(0, 105, 255);
                    font-size: 15px;
                    font-family: 'Helvetica', Arial, sans-serif;
                  "
                  href="${zoomLink}"
                  >Click here to attend in the meeting</a
                >
              </div>
        
              ${
                hasAccount
                  ? ""
                  : `<p style="margin-bottom: 0">
                  <span style="display: block; margin-bottom: 10px"
                    >As a token of appreciation and welcome, we are delighted to grant you an exclusive reward of 100 points. You can easily access these points through the CFS MyRewards dashboard. Your journey to exciting rewards begins here!</span
                  >
                  <span style="display: block; margin-bottom: 10px"
                    >Below, you'll find your temporary login details:</span
                  >
                  <span style="font-weight: 900; display: block"
                    >Subscriber Account:</span
                  >
                  <span style="font-size: 13px; display: block"
                    ><b>Email Address:</b> ${emailAddress}
                  </span>
                  <span style="font-size: 13px; display: block"
                    ><b>Password:</b> ${password}
                  </span>
                </p>`
              }
        
              <p style="margin-bottom: 0">
                Call the CFS assitance at +1 (702) 900-5666 to verify any requests or
                instructions from unsolicited callers or suspicious messages.
              </p>
            </div>
            <!-- Start footer -->
            <table
              align="center"
              style="
                text-align: center;
                vertical-align: top;
                width: 600px;
                max-width: 600px;
                background-color: #ffffff;
                border-top: 1px solid #eeeeee;
                margin-top: 0;
                padding-top: 0;
              "
              width="600"
            >
              <tbody>
                <tr>
                  <td
                    style="
                      width: 596px;
                      vertical-align: top;
                      padding-left: 30px;
                      padding-right: 30px;
                      padding-bottom: 10px;
                    "
                    width="596"
                  >
                    <p
                      style="
                        margin-bottom: 0;
                        font-size: 13px;
                        font-family: 'Helvetica', Arial, sans-serif;
                        font-weight: 400;
                        text-decoration: none;
                        color: #333333;
                      "
                    >
                      <a
                        target="_blank"
                        style="
                          text-decoration: underline;
                          color: #333333;
                          font-style: italic;
                        "
                        href="https://comfortfinancialsolutions.com"
                      >
                        www.gocfs.pro
                      </a>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- End footer -->
          </body>
        </html>
        `;
};

export default eventInvite;
