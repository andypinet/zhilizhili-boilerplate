function supportcalc(id) {
    function isObjectLike(value) {
        return !!value && typeof value == 'object';
    }

    var numberTag = '[object Number]';

    /** Used for native method references. */
    var objectProto = Object.prototype;

    var objToString = objectProto.toString;

    function isNumber(value) {
        return typeof value == 'number' || (isObjectLike(value) && objToString.call(value) == numberTag);
    }

    var str = "";
    var style = document.getElementById("supportCalc");
    var sheet = false;

    for (var i = 0; i < document.styleSheets.length; i++) {
        if (document.styleSheets[i].owningElement.id == id) {
            sheet = document.styleSheets[i];
        }
    }

    console.log(sheet.owningElement.id);

    var viewportwidth = 0;
    var viewportheight = 0;

    var content = window.getComputedStyle(
        document.querySelector('meta[name="support-calc"]')
    ).fontFamily.replace(/\\/g, "").replace(/'/g, '');
    content = content.slice(1, content.length - 1);

    var parseobj = {};

    try {
        parseobj = new Function('return (' + content + ');')();
    } catch (e) {
        console.log("calc:没有什么要兼容的 intersting");
        return false;
    }

    var pxReg = /\d*(?=px)/g;
    var percentValueReg = /[\d.]*(?=vw)/g;
    var parentReg = /[\d.]*(?=%)/g;
    var precentValueArr = [];
    var pxValueArr = [];

    var PARSEL = "parsel";

    function cal(cssprop, cssdelcare) {
        var ret = cssprop;
        if (cssprop.match(parentReg)) {
            if (!cssdelcare["parwidth"]) {
                var parentElement = document.querySelector(cssdelcare[PARSEL]);

                if (parentElement) {
                    var parentWidth = parentElement.offsetWidth;
                    precentValueArr = cssprop.trim().match(parentReg).filter(function(ele) {
                        if (ele.trim() != "" && isNumber(parseInt(ele))) {
                            return parseInt(ele);
                        }
                    });
                    pxValueArr = cssprop.trim().match(pxReg).filter(function(ele) {
                        if (ele.trim() != "" && isNumber(parseInt(ele))) {
                            return parseInt(ele);
                        }
                    });
                    precentValueArr.forEach(function(percent) {
                        ret = ret.replace(percent+"%", percent * parentWidth / 100);
                    });
                }
            } else {
                var parentWidth = parseFloat(cssdelcare["parwidth"].replace("vw", "")) / 100 * viewportwidth - parseFloat(cssdelcare["pargutter"]) * 2;
                precentValueArr = cssprop.trim().match(parentReg).filter(function(ele) {
                    if (ele.trim() != "" && isNumber(parseInt(ele))) {
                        return parseInt(ele);
                    }
                });
                pxValueArr = cssprop.trim().match(pxReg).filter(function(ele) {
                    if (ele.trim() != "" && isNumber(parseInt(ele))) {
                        return parseInt(ele);
                    }
                });
                precentValueArr.forEach(function(percent) {
                    ret = ret.replace(percent+"%", percent * parentWidth / 100);
                });
            }            
        } else {
            var parentWidth = viewportwidth;
            precentValueArr = cssprop.trim().match(percentValueReg).filter(function(ele) {
                if (ele.trim() != "" && isNumber(parseInt(ele))) {
                    return parseInt(ele);
                }
            });
            pxValueArr = cssprop.trim().match(pxReg).filter(function(ele) {
                if (ele.trim() != "" && isNumber(parseInt(ele))) {
                    return parseInt(ele);
                }
            });
            precentValueArr.forEach(function(percent) {
                ret = ret.replace(percent+"vw", percent * parentWidth / 100);
            });
        }
        pxValueArr.forEach(function(px) {
            ret = ret.replace(px+"px", px);
        });
        return eval(ret) + "px";
    }

    function setCalc(csspropkey, cssprop, cssdelcare) {
        if (csspropkey === "transform") {
            return "";
        } else {
            return csspropkey + ": " + cal(cssprop, cssdelcare) + ";";
        }
    }

    function setCssText() {
        viewportwidth = Math.max(document.documentElement.clientWidth, window.outerWidth || 0) + window.scrollBarWidth;
        viewportheight = Math.max(document.documentElement.clientHeight, window.outerHeight  || 0);
        window.documentElementCurrentclientWidthWithScrollBar = viewportwidth;
        for (cssdelcarekey in parseobj) {
            cssdelcare = parseobj[cssdelcarekey];

            str = str + (" " + cssdelcarekey + " {");
            for (key in cssdelcare) {
                if (key != "parsel" && key != "parwidth" && key != "pargutter") {
                    cssprop = cssdelcare[key];
                    str = str + setCalc(key, cssprop, cssdelcare);
                }
            }
            str = str + "}";
        }
        sheet.cssText = str;
    }

    // setCssText();

    window.addEventListener("resize", function() {
        setCssText();
    });
}