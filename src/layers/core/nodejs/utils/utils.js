exports.fieldToBool = function (obj, value) {
    if (!obj)
        return null
    
    return obj[value] ? JSON.parse(obj[value]) : null
};