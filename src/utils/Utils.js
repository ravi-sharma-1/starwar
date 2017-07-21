var _ = require("lodash");
var auInfo;
var obj={
    checkDuplicateInObject: function (propertyName, inputArray, value) {
        if(!inputArray.length){
            return;
        }else{
            var seenDuplicate = false;
            var arr = _.map(inputArray,propertyName);
            if(arr.indexOf(value)>-1){
                seenDuplicate = true;
            }
            return seenDuplicate;
        }
    },
    setAuthInfo: function(data){
        auInfo=data;
    },
    getAuInfor: function () {
        return auInfo;
    }
};
exports.util = obj;