const eventInvitation = ({
  referenceId,
  eventId,
  eventName,
  eventDate,
  eventDescription,
  eventImage,
  fullName,
  mobileNumber,
  emailAddress,
  agentNumber,
  invitee,
  remarks,
  invitationLink,
}) => {
  return `<!-- Free to use, HTML email template designed & built by FullSphere. Learn more about us at www.fullsphere.co.uk -->
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    
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
      <title>Newsletter</title>
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
      <!-- Fallback force center content -->
      <div style="text-align: center">
    
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
                   src="https://res.cloudinary.com/dkjjkr88j/image/upload/v1670628557/comfort-life-new-logo_rnmgep.png"
                   align="center"
                   width="180"
                 />
               </td>
             </tr>
           </tbody>
         </table>
         <!-- End container for logo -->
    
          <div
            style="width: 570px;
                    max-width: 570px;
                    background-color: #ffffff;
                    margin: auto;
                    text-align: left;
                    padding: 15px;"
            width="570"
            >
            <h5 style="margin: 0; font-family: 'Roboto', sans-serif; font-weight: 900; font-size: 20px;">
                Hi ${fullName}!
            </h5>
            <p style="margin-bottom: 0; border-bottom: 1px solid #eeeeee; padding-bottom: 10px;">
                You have been invited to join the event - ${eventName} on
                <b>${eventDate}.</b> You can use the ticket in the file attached
                below in this email. We hope you enjoy the event! See you there! 
            </p>
            
            <div>
                <h1 style="font-weight: 900; font-family: 'Roboto', sans-serif; font-size: 18px;">Form Submitted</h1>
                <div>
                    <h5 style="margin-bottom: 10px; margin-top: 0; font-family: 'Roboto', sans-serif;">Fullname: <span style="font-weight: 300; font-family: 'Roboto', sans-serif">${fullName}</span></h5>
                    <h5 style="margin-bottom: 10px; margin-top: 0; font-family: 'Roboto', sans-serif;">Mobile Number: <span style="font-weight: 300; font-family: 'Roboto', sans-serif">${mobileNumber}</span></h5>
                    <h5 style="margin-bottom: 10px; margin-top: 0; font-family: 'Roboto', sans-serif;">Email Address: <span style="font-weight: 300; font-family: 'Roboto', sans-serif">${emailAddress}</span></h5>
                    <h5 style="margin-bottom: 10px; margin-top: 0; font-family: 'Roboto', sans-serif;">Agent ID Number: <span style="font-weight: 300; font-family: 'Roboto', sans-serif">${agentNumber}</span></h5>
                    <h5 style="margin-bottom: 10px; margin-top: 0; font-family: 'Roboto', sans-serif;">Invited by: <span style="font-weight: 300; font-family: 'Roboto', sans-serif">${invitee}</span></h5>
                    <h5 style="margin-bottom: 10px; margin-top: 0; font-family: 'Roboto', sans-serif;">Remarks: <span style="font-weight: 300; font-family: 'Roboto', sans-serif">${remarks}</span></h5>
                </div>
    
                  <!-- Start button (You can change the background colour by the hex code below) -->
                  <a
                    href="#"
                    target="_blank"
                    style="
                      background-color: #eeeeee;
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
                      color: #333333;
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
    
                    <span>${invitationLink}</span>
                    <!--[if mso]>
                      <i style="letter-spacing: 25px; mso-font-width: -100%"
                        >&nbsp;</i
                      >
                    <![endif]-->
                  </a>
                  <!-- End button here -->
                  <p style="
                      font-size: 15px;
                      line-height: 24px;
                      font-family: 'Helvetica', Arial, sans-serif;
                      font-weight: 400;
                      text-decoration: none;
                      color: #919293;
                      text-align: center;
                      margin-top: 0;
                    "> Share read-only reference ID link to invite an audience or friends in this event. </p>
            </div>
          </div>
    
          <div style="text-align: center; font-weight: 900; font-family: 'Roboto', sans-serif; font-size: 20px; background-color: #ffffff; width: 600px; max-width: 600px; margin: auto; border-bottom: 5px solid #eee; padding-bottom: 10px;">Event Details</div>
          <!-- Hero image -->
          <img
            style="width: 600px; max-width: 600px; text-align: center"
            alt="Event image"
            src="${eventImage}"
            align="center"
            width="600"
          />
          <!-- Hero image -->
    
          <!-- Start single column section -->
          <table
            align="center"
            style="
              text-align: center;
              vertical-align: top;
              width: 600px;
              max-width: 600px;
              background-color: #ffffff;
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
                    padding-right: 20px;
                    padding-top: 20px;
                    padding-bottom: 40px;
                    text-align: left;
                  "
                  width="596"
                >
                  <h1
                    style="
                      font-size: 20px;
                      line-height: 24px;
                      font-family: 'Roboto', Arial, sans-serif;
                      font-weight: 800;
                      text-decoration: none;
                      color: #000000;
                      margin-bottom: 0;
                    "
                  >
                  ${eventName}
                  </h1>
                  <p style="margin: 0; font-weight: 300;">${eventDate}</p>
    
                  <p
                    style="
                      font-size: 15px;
                      line-height: 24px;
                      font-family: 'Helvetica', Arial, sans-serif;
                      font-weight: 400;
                      text-decoration: none;
                      color: #919293;
                    "
                  >
                  ${eventDescription}
                  </p>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- End single column section -->
    
        <!-- End heading for double column section -->
        </table>
        <!-- End double column section -->
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
                    padding-top: 10px;
                    padding-bottom: 10px;
                  " width="596">
                <!-- Your inverted logo is here -->
                            <img style="
                      width: 180px;
                      max-width: 180px;
                      text-align: center;
                      color: #ffffff;
                    " alt="Logo" src="https://res.cloudinary.com/dkjjkr88j/image/upload/v1670628557/comfort-life-new-logo_rnmgep.png" align="center" width="180" />
                    <div style="border-bottom: 3px solid #333333; width: 100px; margin: auto; margin-top: 15px;"></div>
                <p style="
                      margin-bottom: 0;
                      font-size: 13px;
                      line-height: 24px;
                      font-family: 'Helvetica', Arial, sans-serif;
                      font-weight: 400;
                      text-decoration: none;
                      color: #333333;
                    "> <a target="_blank" style="text-decoration: underline; color: #333333; font-style: italic;" href="https://comfortlifefinancial.com">
                      www.comfortlifefinancial.com
                    </a> </p>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- End footer -->
        <!-- Start unsubscribe section -->
        <table align="center" style="
              text-align: center;
              vertical-align: top;
              width: 600px;
              max-width: 600px;
            " width="600">
          <tbody>
            <tr>
              <td style="
                    width: 596px;
                    vertical-align: top;
                    padding-left: 30px;
                    padding-right: 30px;
                    padding-top: 30px;
                    padding-bottom: 30px;
                  " width="596">
                <p style="
                      font-size: 12px;
                      line-height: 12px;
                      font-family: 'Helvetica', Arial, sans-serif;
                      font-weight: normal;
                      text-decoration: none;
                      color: #000000;
                    "> If this email is not intended, please disregard. </p>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- End unsubscribe section -->
      </div>
    </body>
    
    </html>`;
};

export default eventInvitation;
