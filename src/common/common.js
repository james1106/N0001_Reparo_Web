export  default {
  /*动态加载css文件*/
  loadCss(file){
    var cssTag = document.getElementById('loadCss');
    var head = document.getElementsByTagName('head').item(0);
    if(cssTag) {
      head.removeChild(cssTag);
    }
    var css = document.createElement('link');
    css.href = file+".css";
    css.rel = 'stylesheet';
    css.type = 'text/css';
    css.id = 'loadCss';
    console.log(head)
    console.log(css)
    head.appendChild(css);
  }
}
