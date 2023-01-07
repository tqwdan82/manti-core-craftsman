/** 
 * 
 **/

//server libraries
// const utils = require('../../../../../server/util/utils.js');
// const logger = utils.logger() // logger object

//operation object
const operation = {
    details : {
        description: "Form submission service"
    },
    /** 
     * 
     * Header configuration requirement
     * modify this based on the requirements
     * 
     * 
    */
    headerConfig : {},
    /** 
     * 
     * Input data validation
     * modify this based on the requirements
     * 
     * 
    */
    inputValidation : function(data)
    {
        var check = true;
        return check;
    },
    //operation object
    loadWebOperation: function(serviceManager, httpObj)
    {
        //operation implementation
        
        /** 
         * 
         * OPERATION IMPLEMENTATION STARTS HERE
         * 
         * 
        */

        // console.log(httpObj.request.body);
        // httpObj.responseData = {
        //     "status":"OK",
        //     "response": "Submitted",
        //     "data":{}
        // };
        // httpObj.completeHttpResponse(httpObj);

        var handler = function(response){
            httpObj.responseData = response; //set the response data
            httpObj.completeHttpResponse(httpObj); // respond to the http call   
        }

        console.log("-------->");
        console.log(httpObj.request.body)

        serviceManager.callOperation("craftsman2", "PageService", "savePageOperation", 
                httpObj.request.body, handler, httpObj.request.mcHeader);
        /** 
         * 
         * OPERATION IMPLEMENTATION ENDS HERE
         * 
         * 
        */
    }
    
}

module.exports = {
    operation:operation
};
