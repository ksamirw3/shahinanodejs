exports.init = function (Cons, Http) {
    var _this = this;
    _this.opt = {host: Cons.baseServerHost}
    return {
        insertOrGetCategory: function (data, result, error) {
            console.log('11111111111111111111111111');
            console.log('11111111111111111111111111');
            console.log('11111111111111111111111111');
            console.log(Cons.urls.shared.insertOrGetCategory + "?category_id=" + data.categoryId + "&custome_category=" + data.customeCategory);
            console.log('11111111111111111111111111');
            console.log('11111111111111111111111111');
            console.log('11111111111111111111111111');
            
            _this.opt.path = encodeURI(Cons.urls.shared.insertOrGetCategory + "?category_id=" + data.categoryId + "&custome_category=" + data.customeCategory),
                Http.get(_this.opt, function (res) {
                    if (result != undefined)
                        result(res.data);
                }, function (err) {
                    if (error != undefined)
                        error(err);
                })
        }
    }
}
