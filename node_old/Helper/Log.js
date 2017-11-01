//noinspection JSUnresolvedFunction
var fs = require('fs');
// exports.write = (statement) => {

var FILE_PATH = 'log';
//noinspection JSUnresolvedVariable
module.exports = function () {
    var $this = this;
    /**
     *  write to file
     * @param statement
     */
    $this.write = function (type, statement) {
        //noinspection JSUnresolvedFunction
        var data = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
        fs.appendFileSync(FILE_PATH, type + ":" + data + ":" + statement + '\r\n')
        console.log(statement);
    }

    return {
        error: function (stm) {
            $this.write('Error   ', stm)
        },
        success: function (stm) {
            $this.write('Success ', stm)
        },
        warning: function (stm) {
            $this.write('Warning ', stm)
        },
        info: function (stm) {
            $this.write('info    ', stm)
        }


    }
}