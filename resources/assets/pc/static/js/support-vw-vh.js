function supportvwvh(id) {
//            var vwvhsupportready = new CustomEvent("vwvhsupportready");

    var str = "";
    var style = document.getElementById("supportVwVh");
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
        document.querySelector('meta[name="support-vw-vh"]')
    ).fontFamily.replace(/\\/g, "").replace(/'/g, '')
    content = content.slice(1, content.length - 1);

    var parseobj = {};

    try {
        parseobj = new Function('return (' + content + ');')();
    } catch (e) {
        console.log("vw vh:没有什么要兼容的 intersting");
        return false;
    }

    function rel(propval, unit) {
        return parseFloat(propval.replace(unit, ""));
    }

    function cal(propval) {
        if (typeof propval != "string") {
            return propval;
        }

        if (propval.indexOf('vw') > -1) {
            return viewportwidth * rel(propval, "vw") / 100 + "px";
        } else if (propval.indexOf('vh') > -1) {
            return viewportheight * rel(propval, "vh") / 100 + "px";
        } else {
            return propval;
        }
    }

    function setVwStyle(csspropkey, cssprop) {
        if (csspropkey === "transform") {
            var ret = cssprop;
            var transValues = ret.match(/[\w-]+(?:vw|vh)/g);
            for (var i = 0; i < transValues.length; i++) {
                ret = ret.replace(transValues[i], cal(transValues[i]));
            }
            return "-webkit-" + csspropkey + ": " + ret + "; " + csspropkey + ": " + ret + ";";
        } else {
            return csspropkey + ": " + cal(cssprop) + ";";
        }
    }

    function setCssText() {
        viewportwidth = Math.max(document.documentElement.clientWidth, window.outerWidth || 0) + window.scrollBarWidth;
        viewportheight = Math.max(document.documentElement.clientHeight, window.outerHeight || 0);
        window.documentElementCurrentclientWidthWithScrollBar = viewportwidth;
        for (var cssdelcarekey in parseobj) {
            var cssdelcare = parseobj[cssdelcarekey];
            str = str + (" " + cssdelcarekey + " {");
            for (var key in cssdelcare) {
                var cssprop = cssdelcare[key];
                str = str + setVwStyle(key, cssprop);
            }
            str = str + "}";
        }
        sheet.cssText = str;
    }

    setCssText();

    window.addEventListener("resize", function() {
        setCssText();
    });

}