// const dbUtil = require('../../../../server/util/utilsDB');

const operation = {
    loadOperation: function(serviceManager, inputs, callback, mcHeader){

        let formData = {
            page: inputs.page,
            pageName: inputs.pageName,
        };

        if(typeof inputs.pageId === 'undefined' || inputs.pageId === '' ){ //creating new record

            //create form 
            let createFormHandler = function(fResponse){
                let newPageData = fResponse.data;
                let newPageId = newPageData.pageId;

                let creates = [];
                inputs.pageComponents.forEach( (input) => {
                    let fieldData = {
                        pageId:newPageId,
                        order:input.order,
                        componentType: input.componentType,
                        config: JSON.stringify(input.config)
                    }
                    let create = {
                        'model': "craftsman2PageComponent",
                        'data':fieldData,
                        'type':'create'
                    }
                    creates.push(create);
                });

                //create form fields
                let createFormFieldHandler = function(ffResponse){
                    let newFieldData = ffResponse.data;
                    console.log(newFieldData)
                    let fNewFieldData = [];
                    newFieldData.forEach( (newField) => {
                        let cloneNewField = { ...newField };
                        cloneNewField.config = JSON.parse(newField.config);
                        fNewFieldData.push(cloneNewField);
                    })
                    newPageData.pageComponents = fNewFieldData;

                    let returnData = {};
                    returnData["status"] = "OK";
                    returnData["details"] = "Create completed";
                    returnData["data"] = newPageData;
                    callback(returnData);
                }

                serviceManager.callDBOperation.transact(creates, createFormFieldHandler, mcHeader);
            }
            serviceManager.callDBOperation.create("craftsman2Page", formData, createFormHandler, mcHeader);

        } else { //update

            //retrieve existing to check if there is any form fields that require delete
            let retrieveFormHander = function(recForm){
                formData.pageId = inputs.pageId;

                //update form 
                let updateFormHandler = function(fResponse){
                    let updates = [];
                    let inputFields = inputs.pageComponents;
                    let recInputFields = recForm.data.pageComponents;
                    
                    //add deleted fields to be deleted in the transaction
                    recInputFields.forEach( (dField) => {
                        let toDelete = {
                            'model': "craftsman2PageComponent",
                            'type':'destroy',
                            'criteria': {
                                'where':{
                                    'pageComponentId': dField.pageComponentId
                                }
                            }
                        }
                        updates.push(toDelete);
                    });
                    
                    //add created/updated fields in the transaction
                    inputFields.forEach( (input) => {
                        let fieldData = {
                            pageId:inputs.pageId,
                            order:input.order,
                            componentType: input.componentType,
                            config: JSON.stringify(input.config)
                        }

                        let create = {
                            'model': "craftsman2PageComponent",
                            'data':fieldData,
                            'type':'create'
                        };

                        updates.push(create);

                    });

                    //update form fields
                    let updateFormFieldHandler = function(ffResponse){

                        let returnData = {};
                        returnData["status"] = "OK";
                        returnData["details"] = "Update completed";
                        callback(returnData);
                    }

                    serviceManager.callDBOperation.transact(updates, updateFormFieldHandler, mcHeader);

                }
                let query = {
                    pageId:inputs.pageId
                };
                serviceManager.callDBOperation.update("craftsman2Page", query, formData, updateFormHandler, mcHeader);
            }

            let inCrit = {
                where:{
                    pageId: inputs.pageId
                }
            };
            serviceManager.callOperation("craftsman2", "PageService", "retrievePageOperation", 
                {inputCriteria:inCrit}, retrieveFormHander, mcHeader);
        };

        

    }
}
module.exports = operation;