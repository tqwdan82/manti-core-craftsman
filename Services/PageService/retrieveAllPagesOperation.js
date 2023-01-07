// const dbUtil = require('../../../../server/util/utilsDB');

const operation = {
    loadOperation: function(serviceManager, inputs, callback, mcHeader){

        let loadFormHandler = function(response){

            if(typeof response.data !== 'undefined' 
                && response.data.length > 0){ // if there is data
                let pages = response.data;
                let pageIds = [];
                pages.forEach( (rd) => {
                    pageIds.push(rd.pageId);
                })

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
                    let returnData = [];
                    forms.forEach( (form) => {
                        let fields = [];
                        rformFields.forEach( (rFormField) => {
                            if(rFormField.formId === form.formId){
                                fields.push(rFormField);
                            }
                        })
                        fields.sort((a, b) => (a.order > b.order) ? 1 : -1)
                        form.pageComponents = fields;
                        returnData.push(form);
                    })

                    callback({
                        status: 'OK',
                        details: 'Query completed',
                        data: returnData
                    });

                }

                serviceManager.callOperation("craftsman2", "craftsman2PageComponent", "findOperation", 
                {inputCriteria:inCrit}, loadFormFieldsHandler, mcHeader);
            }else{
                callback({
                    status: 'OK',
                    details: 'Query completed',
                    data: []
                });
            }
            
        }

        serviceManager.callOperation("craftsman2", "craftsman2Page", "findOperation", 
            {inputCriteria:{}}, loadFormHandler, mcHeader);


    }
}
module.exports = operation;