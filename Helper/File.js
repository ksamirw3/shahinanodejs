exports.toJson = function (file) {
    try {
        var fileSystem = require('fs');
        var streem = fileSystem.readFileSync(file);
        var jsonString = streem.toString();
        return JSON.parse(jsonString);
    } catch (e) {
        console.log(e.message)
    }
}