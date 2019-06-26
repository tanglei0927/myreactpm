
import echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'

export class Datalist extends Component{   

        // var myChart = echarts.init(document.getElementById('main'));
        getOtion(){
        const option = {
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['睡眠时长','入睡时间','起床时间']
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['bar', 'stack', 'tiled']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : ['周一','周二','周三','周四','周五','周六','周日']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'睡眠时长',
                    type:'line',
                    stack: '总量',
                    data:[,10.2, 11, , 12, 9.5, ]
                },
                {
                    name:'入睡时间',
                    type:'line',
                    stack: '总量',
                    data:[, 11, 11.2, , 8, 9.8, ]
                },
                {
                    name:'起床时间',
                    type:'line',
                    stack: '总量',
                    data:[, 10, 11, , 9, 9.5, ]
                }
            ]
        };

        return option;
    }
        
     
    render(){
        // let code = "<ReactEcharts " +
        // "    option={this.getOtion()} " +
        // "    style={{height: '350px', width: '1000px'}}  " +
        // "    className='react_for_echarts' />";
        return(
            <ReactEcharts option={this.getOtion()}
            style={{height: '350px', width: '90%',marginLeft:"5%",color:"#fff"}}
            className='react_for_echarts' /> 
                
           
        )
    }
}