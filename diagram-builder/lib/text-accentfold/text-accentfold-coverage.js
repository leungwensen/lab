if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/text-accentfold/text-accentfold.js']) {
   __coverage__['build/text-accentfold/text-accentfold.js'] = {"path":"build/text-accentfold/text-accentfold.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0},"b":{"1":[0,0],"2":[0,0],"3":[0,0],"4":[0,0]},"f":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":27},"end":{"line":1,"column":46}}},"2":{"name":"(anonymous_2)","line":75,"loc":{"start":{"line":75,"column":13},"end":{"line":75,"column":31}}},"3":{"name":"(anonymous_3)","line":102,"loc":{"start":{"line":102,"column":13},"end":{"line":102,"column":35}}},"4":{"name":"(anonymous_4)","line":128,"loc":{"start":{"line":128,"column":12},"end":{"line":128,"column":38}}},"5":{"name":"(anonymous_5)","line":129,"loc":{"start":{"line":129,"column":39},"end":{"line":129,"column":55}}},"6":{"name":"(anonymous_6)","line":144,"loc":{"start":{"line":144,"column":10},"end":{"line":144,"column":27}}},"7":{"name":"(anonymous_7)","line":151,"loc":{"start":{"line":151,"column":32},"end":{"line":151,"column":57}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":162,"column":72}},"2":{"start":{"line":59,"column":0},"end":{"line":157,"column":2}},"3":{"start":{"line":76,"column":8},"end":{"line":76,"column":19}},"4":{"start":{"line":78,"column":8},"end":{"line":83,"column":9}},"5":{"start":{"line":79,"column":12},"end":{"line":82,"column":13}},"6":{"start":{"line":81,"column":16},"end":{"line":81,"column":28}},"7":{"start":{"line":85,"column":8},"end":{"line":85,"column":21}},"8":{"start":{"line":103,"column":8},"end":{"line":104,"column":41}},"9":{"start":{"line":106,"column":8},"end":{"line":106,"column":69}},"10":{"start":{"line":129,"column":8},"end":{"line":131,"column":11}},"11":{"start":{"line":130,"column":12},"end":{"line":130,"column":47}},"12":{"start":{"line":145,"column":8},"end":{"line":147,"column":9}},"13":{"start":{"line":146,"column":12},"end":{"line":146,"column":54}},"14":{"start":{"line":149,"column":8},"end":{"line":149,"column":36}},"15":{"start":{"line":151,"column":8},"end":{"line":153,"column":11}},"16":{"start":{"line":152,"column":12},"end":{"line":152,"column":49}},"17":{"start":{"line":155,"column":8},"end":{"line":155,"column":21}},"18":{"start":{"line":159,"column":0},"end":{"line":159,"column":29}}},"branchMap":{"1":{"line":79,"type":"if","locations":[{"start":{"line":79,"column":12},"end":{"line":79,"column":12}},{"start":{"line":79,"column":12},"end":{"line":79,"column":12}}]},"2":{"line":79,"type":"binary-expr","locations":[{"start":{"line":79,"column":16},"end":{"line":79,"column":47}},{"start":{"line":80,"column":20},"end":{"line":80,"column":58}}]},"3":{"line":106,"type":"cond-expr","locations":[{"start":{"line":106,"column":22},"end":{"line":106,"column":46}},{"start":{"line":106,"column":49},"end":{"line":106,"column":68}}]},"4":{"line":145,"type":"if","locations":[{"start":{"line":145,"column":8},"end":{"line":145,"column":8}},{"start":{"line":145,"column":8},"end":{"line":145,"column":8}}]}},"code":["(function () { YUI.add('text-accentfold', function (Y, NAME) {","","/**"," * Text utilities."," *"," * @module text"," * @since 3.3.0"," */","","/**"," * Provides a basic accent folding implementation that converts common accented"," * letters (like \"á\") to their non-accented forms (like \"a\")."," *"," * @module text"," * @submodule text-accentfold"," */","","/**"," * <p>"," * Provides a basic accent folding implementation that converts common accented"," * letters (like \"á\") to their non-accented forms (like \"a\")."," * </p>"," *"," * <p>"," * This implementation is not comprehensive, and should only be used as a last"," * resort when accent folding can't be done on the server. A comprehensive"," * accent folding implementation would require much more character data to be"," * sent to the browser, resulting in a significant performance penalty. This"," * implementation strives for a compromise between usefulness and performance."," * </p>"," *"," * <p>"," * Accent folding is a destructive operation that can't be reversed, and may"," * change or destroy the actual meaning of the text depending on the language."," * It should not be used on strings that will later be displayed to a user,"," * unless this is done with the understanding that linguistic meaning may be"," * lost and that you may in fact confuse or insult the user by doing so."," * </p>"," *"," * <p>"," * When used for matching, accent folding is likely to produce erroneous matches"," * for languages in which characters with diacritics are considered different"," * from their base characters, or where correct folding would map to other"," * character sequences than just stripped characters. For example, in German"," * \"ü\" is a character that's clearly different from \"u\" and should match \"ue\""," * instead. The word \"betrügen\" means \"to defraud\", while \"betrugen\" is the past"," * tense of \"to behave\". The name \"Müller\" is expected to match \"Mueller\", but"," * not \"Muller\". On the other hand, accent folding falls short for languages"," * where different base characters are expected to match. In Japanese, for"," * example, hiragana and katakana characters with the same pronunciation (\"あ\""," * and \"ア\") are commonly treated as equivalent for lookups, but accent folding"," * treats them as different."," * </p>"," *"," * @class Text.AccentFold"," * @static"," */","","var YArray   = Y.Array,","    Text     = Y.Text,","    FoldData = Text.Data.AccentFold,","","AccentFold = {","    // -- Public Static Methods ------------------------------------------------","","    /**","     * Returns <code>true</code> if the specified string contains one or more","     * characters that can be folded, <code>false</code> otherwise.","     *","     * @method canFold","     * @param {String} string String to test.","     * @return {Boolean}","     * @static","     */","    canFold: function (string) {","        var letter;","","        for (letter in FoldData) {","            if (FoldData.hasOwnProperty(letter) &&","                    string.search(FoldData[letter]) !== -1) {","                return true;","            }","        }","","        return false;","    },","","    /**","     * Compares the accent-folded versions of two strings and returns","     * <code>true</code> if they're the same, <code>false</code> otherwise. If","     * a custom comparison function is supplied, the accent-folded strings will","     * be passed to that function for comparison.","     *","     * @method compare","     * @param {String} a First string to compare.","     * @param {String} b Second string to compare.","     * @param {Function} func (optional) Custom comparison function. Should","     *   return a truthy or falsy value.","     * @return {Boolean} Results of the comparison.","     * @static","     */","    compare: function (a, b, func) {","        var aFolded = AccentFold.fold(a),","            bFolded = AccentFold.fold(b);","","        return func ? !!func(aFolded, bFolded) : aFolded === bFolded;","    },","","    /**","     * <p>","     * Returns a copy of <em>haystack</em> containing only the strings for which","     * the supplied function returns <code>true</code>.","     * </p>","     *","     * <p>","     * While comparisons will be made using accent-folded strings, the returned","     * array of matches will contain the original strings that were passed in.","     * </p>","     *","     * @method filter","     * @param {Array} haystack Array of strings to filter.","     * @param {Function} func Comparison function. Will receive an accent-folded","     *   haystack string as an argument, and should return a truthy or falsy","     *   value.","     * @return {Array} Filtered copy of <em>haystack</em>.","     * @static","     */","    filter: function (haystack, func) {","        return YArray.filter(haystack, function (item) {","            return func(AccentFold.fold(item));","        });","    },","","    /**","     * Accent-folds the specified string or array of strings and returns a copy","     * in which common accented letters have been converted to their closest","     * non-accented, lowercase forms.","     *","     * @method fold","     * @param {String|Array} input String or array of strings to be folded.","     * @return {String|Array} Folded string or array of strings.","     * @static","     */","    fold: function (input) {","        if (Y.Lang.isArray(input)) {","            return YArray.map(input, AccentFold.fold);","        }","","        input = input.toLowerCase();","","        Y.Object.each(FoldData, function (regex, letter) {","            input = input.replace(regex, letter);","        });","","        return input;","    }","};","","Text.AccentFold = AccentFold;","","","}, 'patched-v3.18.0', {\"requires\": [\"array-extras\", \"text-data-accentfold\"]});","","}());"]};
}
var __cov_cvaboJVbsSHhirz7LcJjyg = __coverage__['build/text-accentfold/text-accentfold.js'];
__cov_cvaboJVbsSHhirz7LcJjyg.s['1']++;YUI.add('text-accentfold',function(Y,NAME){__cov_cvaboJVbsSHhirz7LcJjyg.f['1']++;__cov_cvaboJVbsSHhirz7LcJjyg.s['2']++;var YArray=Y.Array,Text=Y.Text,FoldData=Text.Data.AccentFold,AccentFold={canFold:function(string){__cov_cvaboJVbsSHhirz7LcJjyg.f['2']++;__cov_cvaboJVbsSHhirz7LcJjyg.s['3']++;var letter;__cov_cvaboJVbsSHhirz7LcJjyg.s['4']++;for(letter in FoldData){__cov_cvaboJVbsSHhirz7LcJjyg.s['5']++;if((__cov_cvaboJVbsSHhirz7LcJjyg.b['2'][0]++,FoldData.hasOwnProperty(letter))&&(__cov_cvaboJVbsSHhirz7LcJjyg.b['2'][1]++,string.search(FoldData[letter])!==-1)){__cov_cvaboJVbsSHhirz7LcJjyg.b['1'][0]++;__cov_cvaboJVbsSHhirz7LcJjyg.s['6']++;return true;}else{__cov_cvaboJVbsSHhirz7LcJjyg.b['1'][1]++;}}__cov_cvaboJVbsSHhirz7LcJjyg.s['7']++;return false;},compare:function(a,b,func){__cov_cvaboJVbsSHhirz7LcJjyg.f['3']++;__cov_cvaboJVbsSHhirz7LcJjyg.s['8']++;var aFolded=AccentFold.fold(a),bFolded=AccentFold.fold(b);__cov_cvaboJVbsSHhirz7LcJjyg.s['9']++;return func?(__cov_cvaboJVbsSHhirz7LcJjyg.b['3'][0]++,!!func(aFolded,bFolded)):(__cov_cvaboJVbsSHhirz7LcJjyg.b['3'][1]++,aFolded===bFolded);},filter:function(haystack,func){__cov_cvaboJVbsSHhirz7LcJjyg.f['4']++;__cov_cvaboJVbsSHhirz7LcJjyg.s['10']++;return YArray.filter(haystack,function(item){__cov_cvaboJVbsSHhirz7LcJjyg.f['5']++;__cov_cvaboJVbsSHhirz7LcJjyg.s['11']++;return func(AccentFold.fold(item));});},fold:function(input){__cov_cvaboJVbsSHhirz7LcJjyg.f['6']++;__cov_cvaboJVbsSHhirz7LcJjyg.s['12']++;if(Y.Lang.isArray(input)){__cov_cvaboJVbsSHhirz7LcJjyg.b['4'][0]++;__cov_cvaboJVbsSHhirz7LcJjyg.s['13']++;return YArray.map(input,AccentFold.fold);}else{__cov_cvaboJVbsSHhirz7LcJjyg.b['4'][1]++;}__cov_cvaboJVbsSHhirz7LcJjyg.s['14']++;input=input.toLowerCase();__cov_cvaboJVbsSHhirz7LcJjyg.s['15']++;Y.Object.each(FoldData,function(regex,letter){__cov_cvaboJVbsSHhirz7LcJjyg.f['7']++;__cov_cvaboJVbsSHhirz7LcJjyg.s['16']++;input=input.replace(regex,letter);});__cov_cvaboJVbsSHhirz7LcJjyg.s['17']++;return input;}};__cov_cvaboJVbsSHhirz7LcJjyg.s['18']++;Text.AccentFold=AccentFold;},'patched-v3.18.0',{'requires':['array-extras','text-data-accentfold']});