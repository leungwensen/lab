/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _incrementalDom = __webpack_require__(2);

	var _incrementalDom2 = _interopRequireDefault(_incrementalDom);

	var _underscore = __webpack_require__(3);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _echarts = __webpack_require__(4);

	var _echarts2 = _interopRequireDefault(_echarts);

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(6);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _table = __webpack_require__(7);

	var _table2 = _interopRequireDefault(_table);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var types = ['injected', 'as-module', 'incremental-dom', 'react'];
	var $canvas = (0, _jquery2.default)('#canvas');
	var $renderTarget = {};
	var data = {};
	var time = {};
	var cols = 5;
	var rows = 300;
	_underscore2.default.each(types, function (type) {
	    $renderTarget[type] = (0, _jquery2.default)('#render-' + type);
	    data[type] = [];
	    time[type] = [];
	    for (var i = 0; i < rows; i++) {
	        var arr = [];
	        for (var _i = 0; _i < cols; _i++) {
	            arr.push(Math.floor(Math.random() * 100));
	        }
	        data[type].push(arr);
	    }
	});

	function changeData(data) {
	    for (var i = 0; i < 50; i++) {
	        for (var j = 0; j < cols; j++) {
	            data[i][j] = 100 - data[i][j];
	        }
	    }
	}

	// underscore template
	var t0 = Date.now();
	var $injectedTemplate = (0, _jquery2.default)('#injected-template');
	var compiledUnderscoreTemplate = _underscore2.default.template($injectedTemplate.html());
	// console.log(compiledUnderscoreTemplate.source);
	var t1 = Date.now();
	$renderTarget.injected.html(compiledUnderscoreTemplate({
	    cols: cols,
	    products: data.injected
	}));
	var t2 = Date.now();
	time.injected = [t2 - t0, t2 - t1];

	// template module
	var t3 = Date.now();
	$renderTarget['as-module'].html((0, _table2.default)({
	    cols: cols,
	    products: data['as-module']
	}));
	var t4 = Date.now();
	time['as-module'] = [t4 - t3, t4 - t3];

	// incremental-dom
	var elementClose = _incrementalDom2.default.elementClose;
	var elementOpen = _incrementalDom2.default.elementOpen;
	var elementVoid = _incrementalDom2.default.elementVoid;
	var patch = _incrementalDom2.default.patch;
	var text = _incrementalDom2.default.text;
	var t5 = Date.now();
	function incrementalDomRender(products) {
	    elementOpen('table');
	    elementOpen('thead');
	    elementOpen('tr');
	    for (var i = 0; i < cols; i++) {
	        elementOpen('th');
	        text('col' + i);
	        elementClose('th');
	    }
	    elementClose('tr');
	    elementClose('thead');
	    for (var _i2 = 0; _i2 < products.length; _i2++) {
	        elementOpen('tbody');
	        elementOpen('tr');
	        for (var j = 0; j < cols; j++) {
	            elementOpen('td');
	            text(products[_i2][j]);
	            elementClose('td');
	        }
	        elementClose('tr');
	        elementClose('tbody');
	    }
	    elementClose('table');
	}
	patch($renderTarget['incremental-dom'][0], function () {
	    incrementalDomRender(data['incremental-dom']);
	});
	var t6 = Date.now();
	changeData(data['incremental-dom']);
	var t7 = Date.now();
	patch($renderTarget['incremental-dom'][0], function () {
	    incrementalDomRender(data['incremental-dom']);
	});
	var t8 = Date.now();
	time['incremental-dom'] = [t6 - t5, t8 - t7];

	var t9 = Date.now();
	function Table() {
	    var head = _underscore2.default.map(_underscore2.default.range(cols), function (col, j) {
	        return React.createElement(
	            'th',
	            { key: j },
	            'col' + col
	        );
	    });

	    var compiledStr = _underscore2.default.map(data.react, function (product, index) {
	        var trCols = _underscore2.default.map(_underscore2.default.range(cols), function (col, j) {
	            return React.createElement(
	                'td',
	                { key: j },
	                product[col]
	            );
	        });
	        return React.createElement(
	            'tr',
	            { key: index },
	            trCols
	        );
	    });
	    return React.createElement(
	        'table',
	        null,
	        React.createElement(
	            'thead',
	            null,
	            React.createElement(
	                'tr',
	                null,
	                head
	            )
	        ),
	        React.createElement(
	            'tbody',
	            null,
	            compiledStr
	        )
	    );
	}
	_reactDom2.default.render(React.createElement(Table, null), $renderTarget.react[0], function () {
	    var t10 = Date.now();
	    changeData(data.react);
	    var t11 = Date.now();
	    _reactDom2.default.render(React.createElement(Table, null), $renderTarget.react[0], function () {
	        var t12 = Date.now();
	        time.react = [t10 - t9, t12 - t11];
	        renderChart(time);
	    });
	});

	function renderChart(time) {
	    var option = {
	        tooltip: {
	            trigger: 'axis',
	            axisPointer: { // 坐标轴指示器，坐标轴触发有效
	                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
	            }
	        },
	        legend: {
	            data: ['初始化', '更新']
	        },
	        grid: {
	            left: '3%',
	            right: '4%',
	            bottom: '3%',
	            containLabel: true
	        },
	        xAxis: [{
	            type: 'category',
	            data: ['injected', 'as-module', 'incremental-dom', 'react']
	        }],
	        yAxis: [{
	            type: 'value'
	        }],
	        series: [{
	            name: '初始化',
	            type: 'bar',
	            data: [time.injected[0], time['as-module'][0], time['incremental-dom'][0], time.react[0]]
	        }, {
	            name: '更新',
	            type: 'bar',
	            data: [time.injected[1], time['as-module'][1], time['incremental-dom'][1], time.react[1]]
	        }]
	    };
	    var chart = _echarts2.default.init($canvas[0]);
	    chart.setOption(option);
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = IncrementalDOM;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = _;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = echarts;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	(function (root, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
	        module.exports = factory();
	    } else {
	        root['table'] = factory();
	    }
	})(undefined, function () {
	    'use strict';

	    return function (data, helper) {
	        data = data || {};
	        helper = helper || {};
	        var __t;
	        var __p = '';
	        var __j = Array.prototype.join;
	        var print = function print() {
	            __p += __j.call(arguments, '');
	        };
	        return function (i, cols, products) {
	            __p += '<table>\n    <thead>\n        <tr>\n        ';
	            for (var i = 0; i < cols; i++) {
	                __p += '\n            <th>' + ((__t = 'col' + i) == null ? '' : __t) + '</th>\n        ';
	            }
	            __p += '\n        </tr>\n    </thead>\n    <tbody>\n    ';
	            products.forEach(function (product) {
	                __p += '\n        <tr>\n        ';
	                for (var i = 0; i < cols; i++) {
	                    __p += '\n            <td>' + ((__t = product[i]) == null ? '' : __t) + '</td>\n        ';
	                }
	                __p += '\n        </tr>\n    ';
	            });
	            __p += '\n    </tbody>\n</table>\n';;
	            return __p;
	        }(data.i, data.cols, data.products);
	    };
	});

/***/ }
/******/ ]);