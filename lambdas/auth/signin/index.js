const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1"
});

let docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    
    var params = {
        TableName: event.database,
        Key: {'email': event.email}
    };
    
    let payload = {
        status: null,
        data: { }
    };
    
    docClient.get(params, function (err, data) {
        if (err) {
            payload.status = "error";
            payload.data = {err};
            console.log("Unable to query. Error:", payload);
            callback(payload, null);
        } else {
            console.log(data);
            
            if(data.Item == null || data.Item.password != event.password)
            {
                payload.status = "error";
                payload.data = null;    
            }
            else
            {
                payload.status = "success";
                payload.data = {
                    email:  data.Item.email
                }
            }
            
            callback(null, payload);
        }
    });
};