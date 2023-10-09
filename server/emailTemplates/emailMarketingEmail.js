const emailMarketingEmail = (data) => {
  const blogEmail = data.blogEmail;
  const agentInfo = data.agentInfo;
  const body = data.body;
  const userGuid = data.userGuid;

  const host = "http://localhost:3000";

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
        <title>Email Marketing</title>
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
          }
          h1 {
            /* Fallback heading style */
            font-size: 22px;
            line-height: 24px;
            font-family: "Helvetica", Arial, sans-serif;
            font-weight: normal;
            text-decoration: none;
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
        "
        align="center"
      >
        <!-- Start container for logo -->
        <table
          style="
            width: 800px;
            margin: auto;
            max-width: 800px;
            background-color: #ffffff;
            border-bottom: 1px solid #eeeeee;
          "
          width="800"
        >
          <tbody>
            <tr>
              <td
                style="
                  width: 796px;
                  vertical-align: top;
                  padding-left: 0;
                  padding-right: 0;
                  padding-top: 15px;
                  padding-bottom: 15px;
                "
                width="796"
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
                  src="	https://www.gocfs.pro/assets/images/logos/cfs-main-logo.png"
                  align="center"
                  width="180"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <!-- End container for logo -->
    
        <!-- Start of email body -->
        <div
          style="
            width: 770px;
            max-width: 770px;
            background-color: #ffffff;
            margin: auto;
            text-align: left;
            padding: 15px;
            border-bottom: 1px solid #eee;
          "
          width="770"
        >
          <div style="margin-bottom: 20px; font-family: 'Roboto', sans-serif;" className="body-container">
            ${body}
          </div>
          <div style="margin-bottom: 20px; font-family: 'Roboto', sans-serif;" className="body-container">
              <div style="background: #e7e7e7; width: 382px; display: inline-block; text-align: center; padding-top: 13px; padding-bottom: 13px;">
                  <h2 style="margin: 0; font-size: 16px; color: #333333;">Register as an Agent</h2>
                  <a href="https://agent.comfortfinancialsolutions.com/signup">Click here to register</a>
              </div>
              <div style="background: #e7e7e7; width: 382px; display: inline-block; text-align: center; padding-top: 13px; padding-bottom: 13px;">
                  <h2 style="margin: 0; font-size: 16px; color: #333333;">Register as a Subscriber</h2>
                  <a href="${host}/subscribe?userGuid=${userGuid}">Click here to register</a>
              </div>
          </div>
    
          <div style="font-family: 'Roboto', sans-serif; color: #333">
            Sincerely, <br />
            <span
              style="
                color: #333;
                font-family: 'Roboto', sans-serif;
                font-weight: 800;
              "
              >${agentInfo.name}</span
            >
            <br />
            ${
              agentInfo.licenseNumber
                ? `License #${agentInfo.licenseNumber} <br />`
                : ""
            }
            ${agentInfo.position}
          </div>
        </div>
        <!-- End of email body -->
    
        <!-- Start of agent info section -->
        <div
          style="
            width: 770px;
            max-width: 770px;
            background-color: #ffffff;
            margin: auto;
            text-align: left;
            padding: 15px;
            display: flex;
            align-content: center;
            flex-wrap: wrap;
            align-items: center;
            vertical-align: middle;
            border-bottom: 1px solid #eee;   
          "
          width="770"
        >
          <div>
            <img
              src="${agentInfo.avatar}"
              alt="agent-image"
              style="
                width: 200px;
                border-radius: 50%;
                border: 1px solid #eee;
                box-shadow: 0 4px 6px -1px #eee, 0 2px 4px -1px #eee;
              "
            />
          </div>
          <div
            style="
              font-family: 'Roboto', sans-serif;
              margin-left: 10px;
              width: 100%;
            "
          >
            <h3 style="margin-bottom: 0; margin-top: 0; color: #333;">${
              agentInfo.name
            }</h3>
            ${
              agentInfo.bio
                ? `<p
            style="
              margin: 0;
              border-bottom: 1px solid #eee;
              font-weight: 300;
              color: #333;
              line-height: 17px;
              font-size: 12px;
              padding-bottom: 5px;
            "
          >
            ${agentInfo.bio}
          </p>`
                : ""
            }
            <div
              style="
                display: flex;
                vertical-align: middle;
                margin-top: 10px;
                align-items: center;
              "
            >
              <img
                src="https://res.cloudinary.com/dfm2vczpy/image/upload/v1691788376/icons/phone-call_2_uizjys.png"
                style="margin-right: 10px"
              />
              <div style="font-weight: 400; margin: 0; color: #333; position: relative; margin-top: 4px; font-size: 16px;">${
                agentInfo.phoneNumber ? agentInfo.phoneNumber : "-"
              }</div>
            </div>
            <div
              style="
                display: flex;
                align-items: center;
                vertical-align: middle;
                margin-top: 10px;
                align-items: center;
              "
            >
              <img
                src="https://res.cloudinary.com/dfm2vczpy/image/upload/v1691788486/icons/email_qfppzi.png"
                style="margin-right: 10px"
              />
              <div style="font-weight: 400; margin: 0; position: relative; margin-top: 4px; font-size: 16px;">${
                agentInfo.emailAddress
              }</div>
            </div>

            <div style="margin-top: 25px;">
              <a href="https://www.gocfs.pro/agents/${agentInfo.userGuid}" 
              style="
                background-color: #0057b7;
                color: #fff;
                padding: 10px 30px;
                border-radius: 2px;
                font-size: 15px; 
              ">
                <span>View Agent Website</span>
              </a>
            </div>
          </div>
        </div>
        <!-- End of agent info section -->
    
        <!-- Start of Blog section -->
        ${
          blogEmail
            ? `
            <div
              style="
            width: 770px;
            max-width: 770px;
            background-color: #ffffff;
            margin: auto;
            text-align: left;
            padding: 15px;
            border-bottom: 1px solid #eee;
            font-family: 'Roboto', sans-serif;
            margin-top: 7px;
            margin-bottom: 7px;
          "
              width="770"
            >
              ${blogEmail}
            </div>
          `
            : ""
        }
        <!-- End of Blog section -->
    
        <!-- Start footer -->
        <table
          align="center"
          style="
            text-align: center;
            vertical-align: top;
            width: 800px;
            max-width: 800px;
            background-color: #ffffff;
            border-top: 1px solid #eeeeee;
          "
          width="800"
        >
          <tbody>
            <tr>
              <td
                style="
                  width: 796px;
                  vertical-align: top;
                  padding-left: 30px;
                  padding-right: 30px;
                  padding-bottom: 10px;
                "
                width="796"
              >
                <div
                  style="
                    margin-bottom: 0;
                    font-size: 13px;
                    font-family: 'Helvetica', Arial, sans-serif;
                    font-weight: 400;
                    text-decoration: none;
                    color: #333333;
                  "
                >
                  <p style="margin: 0; font-weight: 400; font-size: 12px">
                    Have a question or need help? Email me:
                    <a href="mailto: spencerbacay@gmail.com"
                      >spencerbacay@gmail.com</a
                    >
                  </p>
                  <p style="margin: 0; font-weight: 400; font-size: 12px">
                    Copyright &#169; 2023 by Comfort Financial Solutions. All rights
                    reserved.
                  </p>
                  <a
                    target="_blank"
                    style="
                      text-decoration: underline;
                      color: #333333;
                      font-style: italic;
                      margin-top: 10px;
                    "
                    href="https://comfortfinancialsolutions.com"
                  >
                    www.gocfs.pro
                  </a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- End footer -->
      </body>
    </html>
    `;
};

export default emailMarketingEmail;
