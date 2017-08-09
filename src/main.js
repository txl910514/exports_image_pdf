/**
 * Created by txl-pc on 2017/8/8.
 */
import './css/index.css'
import $ from 'jquery'
import * as echartSub from './js/echarts_sub'
import * as exportSub from './js/export'
const export_con = document.querySelector('.echart_con')
for (let i= 1; i < 16; i++) {
  const query = document.querySelector('#query' + i)
  echartSub.bar_chart(query)
}

$('.export').click(function () {
  exportSub.export_image(export_con)
  // exportSub.export_pdf(export_con)
})