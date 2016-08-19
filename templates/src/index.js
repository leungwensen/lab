import $ from 'jquery';
import IncrementalDOM from 'incremental-dom';
import _ from 'underscore';
import echarts from 'echarts';
import react from 'react';
import reactDom from 'react-dom';
import tableTemplate from './table';

const types = [
    'injected',
    'as-module',
    'incremental-dom',
    'react',
];
const $canvas = $('#canvas');
const $renderTarget = {};
const data = {};
const time = {};
const cols = 5;
const rows = 300;
_.each(types, (type) => {
    $renderTarget[type] = $(`#render-${type}`);
    data[type] = [];
    time[type] = [];
    for (let i = 0; i < rows; i ++) {
        const arr = [];
        for (let i = 0; i < cols; i ++) {
            arr.push(Math.floor(Math.random()*100));
        }
        data[type].push(arr);
    }
});

function changeData(data) {
    for (let i = 0; i < 50; i ++) {
        for (let j = 0; j < cols; j ++) {
            data[i][j] = 100 - data[i][j];
        }
    }
}

// underscore template
const t0 = Date.now();
const $injectedTemplate = $('#injected-template');
const compiledUnderscoreTemplate = _.template($injectedTemplate.html());
// console.log(compiledUnderscoreTemplate.source);
const t1 = Date.now();
$renderTarget.injected.html(compiledUnderscoreTemplate({
    cols,
    products: data.injected,
}));
const t2 = Date.now();
time.injected = [t2 - t0, t2 - t1];

// template module
const t3 = Date.now();
$renderTarget['as-module'].html(tableTemplate({
    cols,
    products: data['as-module'],
}));
const t4 = Date.now();
time['as-module'] = [t4 - t3, t4 - t3];

// incremental-dom
const elementClose = IncrementalDOM.elementClose;
const elementOpen = IncrementalDOM.elementOpen;
const elementVoid = IncrementalDOM.elementVoid;
const patch = IncrementalDOM.patch;
const text = IncrementalDOM.text;
const t5 = Date.now();
function incrementalDomRender(products) {
    elementOpen('table');
    elementOpen('thead');
    elementOpen('tr');
    for (let i = 0; i < cols; i ++) {
        elementOpen('th');
        text('col' + i);
        elementClose('th');
    }
    elementClose('tr');
    elementClose('thead');
    for (let i = 0; i < products.length; i ++) {
        elementOpen('tbody');
        elementOpen('tr');
        for (let j = 0; j < cols; j ++) {
            elementOpen('td');
            text(products[i][j]);
            elementClose('td');
        }
        elementClose('tr');
        elementClose('tbody');
    }
    elementClose('table');
}
patch($renderTarget['incremental-dom'][0], function() {
    incrementalDomRender(data['incremental-dom']);
});
const t6 = Date.now();
changeData(data['incremental-dom']);
const t7 = Date.now();
patch($renderTarget['incremental-dom'][0], function() {
    incrementalDomRender(data['incremental-dom']);
});
const t8 = Date.now();
time['incremental-dom'] = [t6 - t5, t8 - t7];

const t9 = Date.now();
function Table() {
    const head = _.map(_.range(cols), (col, j) => (<th key={j}>
                {`col${col}`}
                </th>));

    const compiledStr = _.map(data.react, (product, index) => {
        const trCols = _.map(_.range(cols), (col, j) => (<td key={j}>
                    {product[col]}
                    </td>));
        return (<tr key={index}>
                {trCols}
                </tr>)
    });
    return (<table>
            <thead>
            <tr>
            {head}
            </tr>
            </thead>
            <tbody>
            {compiledStr}
            </tbody>
            </table>);
}
reactDom.render(<Table/>, $renderTarget.react[0], () => {
    const t10 = Date.now();
    changeData(data.react);
    const t11 = Date.now();
    reactDom.render(<Table/>, $renderTarget.react[0], () => {
        const t12 = Date.now();
        time.react = [t10 - t9, t12 - t11];
        renderChart(time);
    });
});

function renderChart(time) {
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer : {     // 坐标轴指示器，坐标轴触发有效
                type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data:['初始化', '更新']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
        {
            type : 'category',
            data : [
                'injected',
                'as-module',
                'incremental-dom',
                'react'
            ]
        }
        ],
        yAxis : [
        {
            type : 'value'
        }
        ],
        series : [
        {
            name:'初始化',
            type:'bar',
            data:[time.injected[0], time['as-module'][0], time['incremental-dom'][0], time.react[0]]
        },
        {
            name:'更新',
            type:'bar',
            data:[time.injected[1], time['as-module'][1], time['incremental-dom'][1], time.react[1]]
        }
        ]
    };
    const chart = echarts.init($canvas[0]);
    chart.setOption(option);
}
