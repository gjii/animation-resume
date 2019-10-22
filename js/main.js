/*把code写到#code和style标签里*/
function writeCode(prefix, code, fn) {
    let domCode = document.querySelector('#code')
    let n = 0
    var id = setInterval(() => {
        n += 1
        domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css);
        styleTag.innerHTML = prefix + code.substring(0, n);
        domCode.scrollTop = domCode.scrollHeight;
        console.log('一轮')
        if (n >= code.length) {
            window.clearInterval(id)
            fn.call()
        }
    }, 10)
}

function writeMarkdown(markdown, fn) {
    let domPaper = document.querySelector('#paper > .content')
    let n = 0
    var id = setInterval(() => {
        n += 1
        domPaper.innerHTML = markdown.substring(0, n)
        domPaper.scrollTop = domPaper.scrollHeight;
        console.log('一轮')
        if (n >= markdown.length) {
            window.clearInterval(id)
            fn.call()
        }
    }, 0)
}


var result = `/*
*面试官你好，我是郭江
*我将用动画的形式来介绍自己
*只用文字的形式太简单了
*我用代码来介绍
*首先准备一些样式
*
*
*
*
*/

*{transition: all 1s;
}
html{
  background: rgb(222,222,222);
  font-size: 16px;
}
#code{
  border: 1px solid red;
  padding: 16px;
}

/*增加高亮代码*/
.token.property{
    color: #905
}
.token.selector{
    color: #690
}
.token.function{
    color: #DD4A68
}

/*增加一张白纸*/
#code{
    width: 50%;
    height: 100%;
    left: 0;
    position: fixed;
}
#paper{
    position: fixed;
    right: 0;
    width: 50%;
    height: 100%;
    display: flex;
    background: #ddd;
    justify-content: center;
    align-items: center;
    padding: 16px;
}
#paper > .content{
    width: 100%;
    height: 100%;
    background: white;
    padding: 16px;
}`
var result2 = `
#paper{

}
/*接下来把markdown变成Html*/`
var result3 = `
<div id = "resume">
<p>#自我介绍
我叫郭江
西南石头大学毕业
目前自学前端半年

#技能介绍
熟悉javascript
掌握HTML5/CSS3
了解VUE框架

#项目作品
1.简历网站
2.无缝轮播
3.画板

#联系方式
QQ:1119157955
手机：18328671178
邮箱：1119157955@qq.com
</p>
</div>
<style>
/*给Html添加样式*/
#resume{
    border: 1px solid black;
    font-szie: 16px;
    font-family: monospace;
    padding-left: 16px;
}
</style>
`


var md = 
writeCode('', result, () => {
    createPaper(() => {
        writeCode(result, result2,()=>{
            writeMarkdown(result3,()=>{
                markdownToHtml(()=>{
                    writeCode(result + result2,result3)
                })
            })
        })
    })
})

function createPaper(fn) {
    var paper = document.createElement('div')
    paper.id = 'paper'
    document.body.appendChild(paper)
    var content = document.createElement('pre')
    content.className = 'content'
    paper.appendChild(content)
    fn.call()
}

function markdownToHtml(fn){
    let domPaper = document.querySelector('#paper > .content')
    domPaper.innerHTML = marked(result3);
    styleTag.innerHTML = result3;
    fn.call()
}

