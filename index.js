const express = require("express");
const request = require("request");

const app = express();
const port = 3000;
const restApiUrl = process.env.API_URL;

app.get("/", function (req, res) {
  request(
    restApiUrl,
    {
      method: "GET",
    },
    function (err, resp, body) {
      if (!err && resp.statusCode === 200) {
        var objData = JSON.parse(body);
        var responseString = `<h1 style="text-align: center">DevOps Belt exam results</h1><table style="margin-left: auto; margin-right: auto;" border="1"><tr><td>username</td><td>Cohort</td><td>Belt1 marks</td><td>Belt2 marks</td></tr>`;

        for (var i = 0; i < objData.length; i++)
          responseString =
            responseString +
            `<tr><td>${objData[i].textField1}</td><td>${objData[i].textField2}</td><td>${objData[i].intField1}</td><td>${objData[i].intField2}</td></tr>`;

        responseString = responseString + `</table>`;
        res.send(responseString);
      } else {
        console.log(err);
      }
    }
  );
});

app.listen(port, () => console.log(`Frontend app listening on port ${port}!`));
