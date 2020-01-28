const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1"
});

let docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    
    let payload = {
        status: null,
        data: null
    };
    
    let paramsVerifyExist = {
        TableName: event.database,
        Key: {'email': event.email}
    };
    
    let paramsCreateUser = {
        TableName: event.database,
        Item: {
            email: event.email,
            password: event.password
        }
    };
    
     docClient.get(paramsVerifyExist, function (err, data) {
         if(err){
            payload.status = "error";
            payload.data = {err};
            console.log("Unable to put. Error:", payload);
            callback(payload, null);
         }
         else{
             console.log(data.Item);
             if(data.Item == null){ // user not exist
                console.log('not exist');
                docClient.put(paramsCreateUser, function (err, data) {
                    if (err) {
                        payload.status = "error";
                        payload.data = {err};
                        callback(payload, null);
                    } else {
                        payload.status = "success";
                        payload.data = event.email;
                        callback(null, payload);
                    }
                });
             } else{ // user exist
                console.log('exist');
                payload.status = "error";
                payload.data = {
                    message: 'user exist'
                };
                callback(null, payload);
             }
         }
     });
};