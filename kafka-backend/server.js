var connection  =  new require('./kafka/Connection');

var getjobpost  = require('./services/getjobpost.js');
var jobpost     = require('./services/jobpost.js');
var createUser  = require('./services/createuser');
var GetMinGraph = require('./services/getmingraph.js');
var loginUser   = require('./services/loginuser');
var getjobs   = require('./services/getjobs');
var applyjob   = require('./services/applyjob');
var getalljobsforrecruiter = require('./services/getalljobsforrecruiter');
var graphdata   = require('./services/graphdata');
var getusers = require('./services/getusers');
var profileviews = require('./services/userprofileview');
var getprofile = require('./services/profile/getprofile.js');
var geteducation =require('./services/profile/geteducation.js');
var getexperience = require('./services/profile/getexperience.js');
var getskills = require('./services/profile/getskills.js');
var addeducation = require('./services/profile/addeducation.js');
var addexperience = require('./services/profile/addexperience.js');
var addskills = require('./services/profile/addskills.js');
var editintro = require('./services/profile/editintro.js');
var editeducation = require('./services/profile/editeducation.js');
var editexperience = require('./services/profile/editexperience.js');
var deleteeducation = require('./services/profile/deleteeducation.js');
var deleteexperience = require('./services/profile/deleteexperience.js');
var deleteskill = require('./services/profile/deleteskill.js');

function handleTopicRequest(topic_name,fname){  
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
  
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
    
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
        
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log("Data: ",data);
            });
            return; 
        });  
    });
}

console.log("Kafka Backend");
handleTopicRequest("jobpost",jobpost);
handleTopicRequest("getjobpost",getjobpost);
handleTopicRequest("createuser", createUser);
handleTopicRequest("getmingraph",GetMinGraph);
handleTopicRequest("loginuser",loginUser);
handleTopicRequest("getjobs",getjobs);
handleTopicRequest("applyjob",applyjob);
handleTopicRequest("getalljobsforrecruiter",getalljobsforrecruiter);
handleTopicRequest("graphdata",graphdata);
handleTopicRequest("getusers", getusers);
handleTopicRequest("profileviews", profileviews);

handleTopicRequest("getprofile",getprofile); 
handleTopicRequest("getprofile_education",geteducation); 
handleTopicRequest("getprofile_experience",getexperience); 
handleTopicRequest("getprofile_skills",getskills); 
handleTopicRequest("add_education",addeducation); 
handleTopicRequest("add_experience",addexperience); 
handleTopicRequest("add_skills",addskills); 
handleTopicRequest("edit_intro",editintro); 
handleTopicRequest("edit_education",editeducation); 
handleTopicRequest("edit_experience",editexperience); 
handleTopicRequest("delete_education",deleteeducation); 
handleTopicRequest("delete_experience",deleteexperience); 
handleTopicRequest("delete_skill",deleteskill); 