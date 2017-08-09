/**
 * Created by txl-pc on 2017/8/8.
 */
import $ from 'jquery'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export const export_image = (element) => {
  const eleWidth = element.offsetWidth
  const eleHeight = element.offsetHeight
  html2canvas(element, {
    background: '#fff',
    width: eleWidth,
    height: eleHeight,
    onrendered: function(canvas) {
      // canvas is the final rendered <canvas> element
      console.log(canvas)
       var type = 'jpg'
      var pageData = canvas.toDataURL(type, 1.0);
      var fixtype=function(type){
        type=type.toLocaleLowerCase().replace(/jpg/i,'jpeg');
        var r=type.match(/png|jpeg|bmp|gif/)[0];
        return 'image/'+r;
      };
      pageData=pageData.replace(fixtype(type),'image/octet-stream');
      if ($('body').find('#download_a').length) {

      }
      else {
        // const downLoad = $('<img/>');
        const downLoad = $('<a></a>');
        // downLoad.attr('href', pageData)
        downLoad.attr('href', pageData)
        downLoad.attr('download', 'down.' + type)
        $('body').append(downLoad)
        downLoad.get(0).click()
        console.log(downLoad)
      }
    }
  });
}

export const export_pdf = (element) => {
  const eleWidth = element.offsetWidth
  const eleHeight = element.offsetHeight
  html2canvas(element, {
    background: '#fff',
    width: eleWidth,
    height: eleHeight,
    onrendered: function(canvas) {
      var contentWidth = canvas.width;
      var contentHeight = canvas.height;

      //一页pdf显示html页面生成的canvas高度;
      var pageHeight = contentWidth / 592.28 * 841.89;
      //未生成pdf的html页面高度
      var leftHeight = contentHeight;
      //页面偏移
      var position = 0;
      //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
      var imgWidth = 595.28;
      var imgHeight = 592.28/contentWidth * contentHeight;

      var pageData = canvas.toDataURL('image/jpeg', 1.0);

      var pdf = new jsPDF('', 'pt', 'a4');

      //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
      //当内容未超过pdf一页显示的范围，无需分页
      if (leftHeight < pageHeight) {
        pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight );
      } else {
        while(leftHeight > 0) {
          pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
          leftHeight -= pageHeight;
          position -= 841.89;
          //避免添加空白页
          if(leftHeight > 0) {
            pdf.addPage();
          }
        }
      }

      pdf.save('content.pdf');
    }
  });
}