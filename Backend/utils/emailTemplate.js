const otpTemplate = (otp) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
      <style>
          body{
              font-family:Arial,sans-serif;
              background:#f4f4f4;
              padding:40px;
          }

          .container{
              max-width:600px;
              margin:auto;
              background:#fff;
              padding:30px;
              border-radius:10px;
              box-shadow:0 2px 10px rgba(0,0,0,.1);
          }

          h2{
              color:#2b6cb0;
              text-align:center;
          }

          .otp{
              font-size:34px;
              font-weight:bold;
              color:#e53e3e;
              text-align:center;
              margin:30px 0;
              letter-spacing:8px;
          }

          p{
              color:#555;
              line-height:1.7;
          }

          .footer{
              margin-top:30px;
              text-align:center;
              color:#888;
              font-size:12px;
          }
      </style>
  </head>

  <body>

      <div class="container">

          <h2>SOC Log Analyzer</h2>

          <p>Hello,</p>

          <p>
              We received a request to reset your password.
          </p>

          <p>
              Use the following One-Time Password (OTP):
          </p>

          <div class="otp">
              ${otp}
          </div>

          <p>
              This OTP will expire in
              <strong>10 minutes</strong>.
          </p>

          <p>
              If you didn't request this,
              simply ignore this email.
          </p>

          <div class="footer">
              © 2026 SOC Log Analyzer
          </div>

      </div>

  </body>

  </html>
  `;
};

module.exports = otpTemplate;