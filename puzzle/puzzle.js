// Android无效？？？
function my$(id) {
    return document.getElementById(id);
}
function over(e) {
    e.preventDefault();
}
//抓起，记录被抓起元素的id
function drag(e) {
    //获取id
    var id = e.target.id;
    //传输数据
    e.dataTransfer.setData("id", id);
}

//放下
function drop(e) {
    //var ev = window.event;
    var dragId = e.dataTransfer.getData("id");
    var dropId = e.target.id;
    var dragE = document.getElementById(dragId);
    var dropE = document.getElementById(dropId);
    var dragParent = dragE.parentNode;
    var dropParent = dropE.parentNode;
    //互换
    dragParent.appendChild(dropE);
    dropParent.appendChild(dragE);
    checked();
}

function checked() {
    var count = 0;
    var pis = document.getElementsByClassName("picture");
    for (var i = 0; i < pis.length; i++) {
        var pi = pis[i];
        var fi = pi.parentNode;
        var piId = pi.getAttribute("id");
        var fiId = fi.getAttribute("id");
        if (piId.replace("z-", "") == fiId.replace("f-", "")) {
            count++;
        } else {
            return;
        }
        if (count == 9) {
            alert("congratulate you!");
        }
    }
}
// 一旦打乱后各个div的位置都变了，重新选择文件后也是乱的
function disorder() {
    var pis = document.getElementsByClassName("picture");
    for (var i = 0; i < 100; i++) {
        var r1 = parseInt(Math.random() * 9);
        var r2 = parseInt(Math.random() * 9);
        //得到随机父节点
        var pir1 = pis[r1].parentNode;
        var pir2 = pis[r2].parentNode;
        //互换
        pir1.appendChild(pis[r2]);
        pir2.appendChild(pis[r1]);
    }
}

//给父子div绑定相应的事件
var idf = [];
var idz = [];
// var idf = new Array(9);
// var idz = new Array(9);
for (var i = 0; i < 9; i++) {
    // idf[i] = "f-" + (1 + i);
    // idz[i] = "z-" + (1 + i);
    idf.push("f-" + (1 + i));
    idz.push("z-" + (1 + i));
}
for (var i = 0; i < 9; i++) {
    my$(idf[i]).ondrop = drop;
    my$(idf[i]).ondragover = over;
    my$(idz[i]).draggable = true;
    my$(idz[i]).ondragstart = drag;
}

//获取被点击的图片的url
$("#file0").change(function () {
    var objUrl = getObjectURL(this.files[0]);//获取文件信息  
    if (objUrl) {
        var pis = document.getElementsByClassName("picture");
        for (var i = 0; i < pis.length; i++) {
            pis[i].style.backgroundImage = "url(" + objUrl + ")";
        }
    }
});


function getObjectURL(file) {
    var url = null;
    if (window.createObjectURL != undefined) {
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)  
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome  
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
};