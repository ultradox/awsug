var AWS = require("aws-sdk");
var ses = new AWS.SES();

var RECEIVER = "enquiries@awsug.nz";
var BCC = "carlos@cloudbased.nz";
var SENDER = "admin@awsug.nz";

var response = {
  isBase64Encoded: false,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  },
  statusCode: 200,
  body: '{"result": "Success"}'
};

exports.handler = function(event, context, callback) {
  console.log("Received event:", event);
  sendEmail(event, function(err, data) {
    context.done(err, null);
  });
  callback(null, response);
};

function sendEmail(event, done) {
  let body = JSON.parse(event.body);
  console.log("BODY ==============>");
  console.log(body);
  var params = {
    Destination: {
      ToAddresses: [RECEIVER],
      BccAddresses: [BCC]
    },
    Message: {
      Body: {
        Html: {
          Data:
            "<p>Great news!</p><p><b>" +
            body.name +
            "</b> submitted an EOI to give a " +
            body.estimatedLength +
            " talk at an event.</p><p><i>" +
            body.description +
            "</i></p>The following preferred dates were given: <b>" +
            body.dateOption1 +
            "</b> or alternatively <b>" +
            body.dateOption2 +
            "</b>.</p><p>Please email them on <b>" +
            body.email +
            "</b>, or call <b>" +
            body.mobile +
            "</b></p>",
          Charset: "UTF-8"
        }
      },
      Subject: {
        Data: body.name + " would like to speak at an AWSUG event",
        Charset: "UTF-8"
      }
    },
    Source: SENDER
  };
  ses.sendEmail(params, done);
  return "Email notification has been sent.";
}
