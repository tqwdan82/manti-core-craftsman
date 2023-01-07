// const dbUtil = require('../../../../server/util/utilsDB');

const operation = {
    loadOperation: function(serviceManager, inputs, callback, mcHeader){

        let loadFormHandler = function(response){

            if(typeof response.data !== 'undefined' 
                && response.data.length > 0){ // if there is data
                let form = response.data[0];
                let pageIds = [form.pageId];

                let inCrit = {
                    where:{
                        pageId: pageIds
                    },
                    order:[
                        ["order", 'ASC']
                    ]
                };

                
                let loadFormFieldsHandler = function(ffResponse){
                    let rformFields = ffResponse.data;
                    let frformFields = [];
                    rformFields.forEach( (ff) => {
                        const cloneFf = { ...ff };
                        cloneFf.config = JSON.parse(ff.config);
                        frformFields.push(cloneFf);
                    });

                    frformFields.sort((a, b) => (a.order > b.order) ? 1 : -1)
                    form.pageComponents = frformFields;

                    callback({
                        status: 'OK',
                        details: 'Query completed',
                        data: form
                    });

                }

                serviceManager.callOperation("craftsman2", "craftsman2PageComponent", "findOperation", 
                {inputCriteria:inCrit}, loadFormFieldsHandler, mcHeader);
            }else{
                callback({
                    status: 'OK',
                    details: 'Query completed',
                    data: {}
                });
            }
            
        }
        
        serviceManager.callOperation("craftsman2", "craftsman2Page", "findOperation", 
            inputs, loadFormHandler, mcHeader);


    }
}
module.exports = operation;