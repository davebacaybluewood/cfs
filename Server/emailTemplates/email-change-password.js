const emailChangePasswordMail = (email, name, id) => {
  const hostName = "http://localhost:3000";
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
        <title>Change Password Confirmation</title>
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
                  src="	https://www.gocfs.pro/assets/logos/comfort-life-new-logo.png"
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
          <h5
            style="
              margin: 0;
              font-family: 'Roboto', sans-serif;
              font-weight: 900;
              font-size: 20px;
            "
          >
            Hi ${name}!
          </h5>
          <p
            style="
              margin-bottom: 0;
              border-bottom: 1px solid #eeeeee;
              padding-bottom: 10px;
            "
          >
            We received a request to resett the password of your CFS Portal account.
          </p>
          <p
            style="
              margin-bottom: 0;
              border-bottom: 1px solid #eeeeee;
              padding-bottom: 10px;
            "
          >
            To reset your password, click the button below.
          </p>
          <a
            href="${hostName}/cfs-a/login/true?passwordId=${id}"
            target="_blank"
            style="
              background-color: #333333;
              font-size: 15px;
              line-height: 22px;
              margin-bottom: 0;
              font-family: 'Helvetica', Arial, sans-serif;
              font-weight: normal;
              text-decoration: none;
              text-align: center;
              width: 100%;
              padding: 5px 0;
              color: #ffffff;
              border-radius: 5px;
              display: inline-block;
              mso-padding-alt: 0;
            "
          >
            <!--[if mso]>
              <i
                style="
                  letter-spacing: 25px;
                  mso-font-width: -100%;
                  mso-text-raise: 30pt;
                "
                >&nbsp;</i
              >
            <![endif]-->
            <span>Change Password</span>
            <!--[if mso]>
              <i style="letter-spacing: 25px; mso-font-width: -100%">&nbsp;</i>
            <![endif]-->
          </a>
          <p style="margin-bottom: 0; padding-bottom: 5px">
            Or copy and paste the URL below into your browser
          </p>
          <a
            href="${hostName}/cfs-a/login/true?passwordId=${id}"
            style="font-family: 'Helvetica', Arial, sans-serif"
            >${hostName}/cfs-a/login/true?passwordId=${id}</a
          >
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
                    href="https://comfortfinancialsolution.com"
                  >
                    www.comfortfinancialsolution.com
                  </a>
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- End footer -->
        <!-- Start unsubscribe section -->
        <table
          align="center"
          style="
            text-align: center;
            vertical-align: top;
            width: 600px;
            max-width: 600px;
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
                  padding-top: 30px;
                  padding-bottom: 30px;
                "
                width="596"
              >
                <p
                  style="
                    font-size: 12px;
                    line-height: 12px;
                    font-family: 'Helvetica', Arial, sans-serif;
                    font-weight: normal;
                    text-decoration: none;
                    color: #000000;
                  "
                >
                  If this email is not intended, please disregard.
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- End unsubscribe section -->
      </body>
    </html>
    `;
};

export default emailChangePasswordMail;
