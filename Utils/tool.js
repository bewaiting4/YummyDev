/**
 * isEmpty object or array
 * @param obj
 * @returns {boolean}
 */
exports.isEmpty= function(obj){

    var hasOwnProperty = Object.prototype.hasOwnProperty;

    if (obj == null) return true;
    if (obj.length && obj.length > 0) return false;
    if (obj.length === 0) return true;

    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }
    return true;
};

/**
 * Object Merge (reference)
 * @param o
 * @param n
 * @param map {'id': 'idFood'}
 * @returns {*}
 */
exports.mergeCover = function(o, n, map){
    o = o || {};
    for(var k in n){
        if(n.hasOwnProperty(k)) {
            o[map&& map[k] || k] = n[k];
        }
    }
    return o;
};

/**
 * Every thing show in url has higher priority, path> querystring>form
 * @param request
 * @param paramMap
 * @returns {null} or {Object}
 */
exports.getQuery = function(request, paramMap){

    var params = {};

    if(!this.isEmpty(request.body)){

        params = this.mergeCover(params, request.body)

    }

    if(!this.isEmpty(request.Query)) {

        params = this.mergeCover(params, request.Query);

    }

    params = this.mergeCover(params, request.params, paramMap)

    return this.isEmpty(params)? null : params;

};


/**
 * Get input parameters and validate type
 * @returns {Function}
 */
exports.validateParameters = function(){

    var ps = arguments[0],
        pv = arguments[1];

    if(ps && pv && ps.constructor == Array){

        return function(){

            for(var i = 0; i < ps.length; i++){

                var pn = ps[i];
                if(pn && pv[i]){
                    if((pn.n && pn.t && pn.n.constructor == String && pv[i].constructor == pn.t) ||
                        (pn.constructor == String)){

                        pn = pn.n || pn;
                        this[pn] = pv[i];

                    } else{
                        return false;
                    }

                }
            }

            return true;
        };

    }

    return  function(){ return false;};

};

exports.validateEntry = function(){

};

