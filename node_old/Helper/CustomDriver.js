exports.customDriverDAta = function (driverData, amount) {
    var data = {
        full_name: '',
        rate: 0,
        presonal_image: '',
        plate_no: '',
        phone: '',
        driverToken: ''
    }

    if (driverData == undefined)
        return data;


    data.full_name = ( driverData.full_name == undefined) ? '' : driverData.full_name;
    data.phone = ( driverData.phone == undefined) ? '' : driverData.phone;
    data.rate = ( driverData.rate == undefined) ? 0 : parseInt(driverData.rate);
    data.presonal_image = ( driverData.presonal_image == undefined) ? '' : driverData.presonal_image;
    data.plate_no = ( driverData.plate_no == undefined) ? '' : driverData.plate_no;
    data.driverToken = ( driverData.driverToken == undefined) ? '' : driverData.driverToken;

    if (amount != undefined)
        data.amount = amount;
    return data;
}


{


}