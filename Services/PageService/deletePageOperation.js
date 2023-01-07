// const dbUtil = require('../../../../server/util/utilsDB');

const getKeyName = function(inputs){
     let table = inputs.modelDef;
 
     let dataPrimarykey;
     for( let key in table.rawAttributes ){
         let attrData = table.rawAttributes[key];
         if(typeof attrData.primaryKey !== 'undefined'
             && attrData.primaryKey){
                 dataPrimarykey = key;
                 break;
         }        
     }
     return dataPrimarykey;
};

const operation = {
     loadOperation: function(serviceManager, inputs, callback, mcHeader){
          let inCrit = {
               where:{
                   pageId: inputs.pageId
               }
           };

          const retrievePageComponentsHandler = (pageCompResponse) => {
               console.log(pageCompResponse);

               const pageCompIds = pageCompResponse.data.map( comp => comp.pageComponentId);
               const removeCompInCrit = {
                    pageComponentId: pageCompIds
               }

               const deletePageComponenetsHandler = () => {

                    let deleteCallback = function(deleteData){
                         callback(deleteData);
                     };

                    //delete page
                    serviceManager.callOperation("craftsman2", "craftsman2Page", "deleteOperation", 
                         {pageId: inputs.pageId}, deleteCallback, mcHeader);

               }

               //delete page components
               serviceManager.callOperation("craftsman2", "craftsman2PageComponent", "deleteOperation", 
                    removeCompInCrit, deletePageComponenetsHandler, mcHeader);
          };

          //retrieve all page component
          serviceManager.callOperation("craftsman2", "craftsman2PageComponent", "findOperation", 
                {inputCriteria:inCrit}, retrievePageComponentsHandler, mcHeader);
          
     }
}
module.exports = operation;
