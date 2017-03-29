var a = "";
var flist = ""
var dev = "dev001";
var wxid = "";
//dianji haoyou  shijian
function massagesend(str, name) {
    
      if($('.now-content-name').html() == name){

        }else{ 
        $(".am-comments-list-flip").empty();



    } 
    
    $(".now-content-name").html(name);
        wxid = str;
  
    
}

function addtextbox(strangerV1) {
    var s = $("#typeadd").val();
    //alert(s); 
    //    PHONE SHAKE

    var tyep = $("#typeadd").val(); 
    var text = $(".hitext").val();
    data = '{"type":"ADD_STRANGER","strangerV1":"' + strangerV1 + '","way":"' + tyep + '","helloStr":"'+text+'"}';
    // console.log(data);
    window.lokiws.send(data);
    exit();
}   
function exit() {
    $("#androidDialog2").hide();
    $(".weui-dialog__bd").html('<input type="text" id="textSeach"/> FROM:<select id="typeadd" class=""><option value="PHONE">PHONE</option><option value="NEARBY">NEARBY</option><option value="SHAKE">SHAKE</option></select>');
}

//CHECK_USER 
function seachf() {
    var data = $("#textSeach").val();
    data = '{"type":"CHECK_USER","keyword":"' + data + '"}';
    //console.log(data);
    window.lokiws.send(data);

}
function ciclesend() {
    var text = $(".content-box").val();
    // console.log(text); 
    var img = $("input[name='touxiang']");
    var s = "";
    var lengt = img.length;
    for (var i = 0; i < lengt; i++) {
        if (i == lengt - 1) {
            s += '"' + img[i].value + '"';
        } else {

            s += '"' + img[i].value + '",';
        }
    }
    // console.log(s); 
    var data = '{"type":"MOMENT_UPLOAD","momtype":"image","text":"' + text + '","link":"","images":[' + s + ']}'
    //  var data ='{type:MOMENT_UPLOAD, data:{"momtype":"image","text":"'+text+'",images":['+img+'],link:""}}';

    // console.log(data);
    window.lokiws.send(data)
    $(".content-box").val('');
    $(".choosed .pyimg").empty();
}


//qingqiu shouji geshu
function getphone() {
    data = '{"type":"DEVICE_STATE"}';
    window.lokiws.send(data);
}

   
    var strname = "";
      window.onresize = function () {
         
        changeh();
        }; 
    function changeh() {
        var a = $("html").height();
        $(".bodycontent").height(a);
        $(".left").height(a);
        $(".mid-left").height(a - 106);
        $(".am-tab-panel ").height(a - 106 - 40 - 41 - 40 - 25);
        $(".mid-right").height(a - 106);
        $(".mid-content1").height(a - 106 - 40 - 180 - 40-30);
        $(".am-comments-list").height(a - 106 - 40 - 180 - 49);
    } 

    changeh();
    $(".iconfontli").click(function () {
        $(this).addClass("iconfont-active").siblings().removeClass("iconfont-active")
    })

    //  lokiws = new WebSocket("ws://223.95.161.119:9090/ws");
    lokiws = new WebSocket("ws://localhost:9090/ws");
    lokiws.onopen = function () {
        lokiws.send('{"type":"FRIEND_LIST","device":"dev001"}');

        lokiws.send('{"type":"DEVICE_STATE"}');
    };
    lokiws.onmessage = function (evt) {
        var obj = JSON.parse(evt.data); 
        var now = new Date();
        var mytime = now.toLocaleTimeString(); // now time 
        if (obj.errno == "0" && obj.errmsg == "success") {
            //DEVICE_STATE
            if (obj.type == "DEVICE_STATE") { 
                var str = "";
                var a = 0;
                for (var i = 0; i < obj.data.length; i++) {
                    if (obj.data[i].status == "GOOD") {
                        if(a == 0){
                            str = str +'<div class="left-l1 ok' + obj.data[i].device + '" onclick="changeDevice(\'' + obj.data[i].device + '\')"><p>' + obj.data[i].device + '</p><span class="iconfont icon-energy_green"></span><span class="iconfont icon-gengduo" style="float:right"></span></div>';
                       
                        }else{
                            str = str +'<div class="left-l1 ok' + obj.data[i].device + '" onclick="changeDevice(\'' + obj.data[i].device + '\')"><p>' + obj.data[i].device + '</p><span class="iconfont icon-energy_green"></span></div>';
                       
                        }
                         // str = str + '<div class="boxline" onclick="changeDevice(\'' + obj.data[i].device + '\')"><div class="headimgbox" ></div ><div class="textbox">number:' + obj.data[i].device + '<i class="iconfont icon-energy_green"></i></div></div >';
                        a ++;
                    } else {
                        str = str +'<div class="left-l1 ' + obj.data[i].device + '" onclick="changeDevice(\'' + obj.data[i].status + '\')"><p>' + obj.data[i].device + '</p><span class="iconfont icon-warning"></span></div>';
                        // str = str + '<div class="boxline" onclick="changeDevice(\'' + obj.data[i].device + '\')"><div class="headimgbox" ></div ><div class="textbox">number:' + obj.data[i].device + '<i class="iconfont icon-warning"></i></div></div >';
                    }

                }
                $(".select_list_xx").html(str);
                
                $(".add-content .mid-left").html(str);

            }
            //message 
            if (obj.type == "MESSAGE_IO") {
// RECV MP {"field_content":"我通过了你的朋友验证请求，现在我们可以开始聊天了",


// "field_talker":"wxid_450ldt6k334r21",

// "field_isShowTimer":0,"field_msgId":0,"field_msgSeq":618340245,"

// field_msgSvrId":899962836288223929,"field_bizChatId":0,

// "field_createTime":1490161291000,"field_flag":0,"field_talkerId":0,

// "field_status":3,"field_isSend":0,"field_type":1,"type":"MP_RECV_MESSAGE"}

 
                
                if (obj.direction == "out") {  //send message
                    var ss = $("#editArea").val();
                    if (ss == "") {
                        return false;
                    }
                    // var s = '<div class="message me"><img class="avatar" src="static/images/96.jpeg" /><div class="content"><div class="nickname"><span class="time">' + mytime + '</span></div><div class="bubble bubble_primary right no_arrow"><div class="bubble_cont"><div class="picture">' + ss + '</div></div></div></div></div>'
                    var s = "<li class='am-comment am-comment-flip' >"
                        + "<a href=''><img class='am-comment-avatar' alt='' src='static/images/96.jpeg'/></a>"
                        + "<div class='am-comment-main'><div class='am-comment-bd'>" + ss + "</div></li>"

                    $("#messageList").append(s);
                    var div = document.getElementById('messageList');
                    div.scrollTop = div.scrollHeight;
                    $("#editArea").val("");
                } else if (obj.direction == "in") {
                    var list = flist.split(",");
                    var name = ""

                    for (var i = 0; i < list.length; i++) {
                        if (list[i] == obj.wxid) {
                            name = list[i-1]
                        }
                    }
                    $(".messaging").addClass("am-active").siblings().removeClass("am-active")
                    
                    if (name !== $('.now-content-name').html()) {

                        $(".now-content-name").html(name);
                        $("#messageList").html("");
                        $("#editArea").val("");
                    }
 
                        wxid = obj.wxid;
                    // showMsg(evt.data)
                    // var s = '<div class="message"><img class="avatar" src="static/images/96.jpeg" /><div class="content"><div class="nickname"><span class="time">' + mytime + '</span></div><div class="bubble bubble_primary right no_arrow"><div class="bubble_cont"><div class="picture">' + obj.content + '</div></div></div></div></div>'

                    var s = '<li class="am-comment"><a href=""><img class="am-comment-avatar" alt="" src="static/images/96.jpeg">'
                        + '</a><div class="am-comment-main"><div class="am-comment-bd">' + obj.content + '</div></div></li>';



                    $("#messageList").append(s);
                }
                var div = document.getElementById('messageList');
                div.scrollTop = div.scrollHeight;

            }
            //查询好友 返回 CHECK_USER 
            if (obj.type == "CHECK_USER") {
                // \""+obj.data[i].wxid+"\",\""+obj.wxid+"\"  NEARBY/PHONE/SHAKE
                var str = "<div class='boxline' >"
                    + '<div class="headimgbox"><img src="' + obj.smallImage + '"  class="imghead"/></div><div class="textbox">' + obj.nickName + '</div>'
                    + "<div class='textbox' onclick='addtextbox(\"" + obj.strangerV1 + "\")'>添加</div><div><select id='typeadd'><option value='NEARBY'>NEARBY</option><option value='PHONE'>PHONE</option><option value='SHAKE'>SHAKE</option></select></div><div><input type='text' class='hitext' /></div></div>";

                $(".check_user").html(str);

            }
            //好友列表 返回
            if (obj.type == "MP_RET_ALL_CONTACT") { 
                var length = obj.data.length;
                var str = "";
                var strs = "";
                for (var i = 0; i < length; i++) {
                    // {"alias":"Daniel_aim","conRemark":"","deleteFlag":"0","lvbuff":"
                    // [B@432e85c0","nickname":"╭(╯3╰)╮  诚 ","rowid":"32",
                    // "showHead":"123","username":"CathyO","verifyFlag":"0","weiboFlag":"0"}
                    flist = flist + obj.data[i].nickname + "," + obj.data[i].wxid + ",";
                    var img = "";
                    if (obj.data[i].headimage == "") {
                        img = "static/images/96.jpeg"
                    } else {
                        img = obj.data[i].headimage;
                    }
                    // str = str + "<div class='boxline' onclick='massagesend(\"" + obj.data[i].wxid + "\",\"" + obj.data[i].nickname + "\")'>"
                    //     + '<div class="headimgbox"><img id="listimg' + i + '" src="' + img + '" class="imghead"/></div><div class="textbox">' + obj.data[i].nickname + '</div></div>';
                    str = str + "<li class='am-cf' ><div class='am-fl laber-input'><label for='checkbox0' class='label'></label>"
                        + "<input type='checkbox' id='checkbox0' style='display: none'/>"
                        + "</div><div class='am-fl'><img src='" + img + "' alt='头像'></div>"
                        + "<div class='list-p am-fl'><p style='color:#000; margin-top: 15px'>" + obj.data[i].nickname + "</p>"
                        + "</div></li>";
                    strs = strs + "<li class='am-cf' onclick='massagesend(\"" + obj.data[i].wxid + "\",\"" + obj.data[i].nickname + "\")'><div class='am-fl laber-input'><label for='checkbox0' class='label'></label>"
                        + "<input type='checkbox' id='checkbox0' style='display: none' /></div>"
                        + "<div class='am-fl'><img src='" + img + "' alt='头像'></div>"
                        + "<div class='list-p am-fl'><p style='color:#000;'>" + obj.data[i].nickname + "<span class='am-fr' style='font-size: 12px;padding-top: 2px;color:#808080;display: block'>下午，12:12</span>"
                        + "</p><p>这里是用户最近的消息记录</p></div></li>";
                }

                $(".mefriend").html(str);
                $(".nowfriend").html(strs);

                // for (var i = 0; i < length; i++) {

                //     getlistHeadImg(obj.data[i].wxid);
                //   }
            }
            if (obj.type == "MOMENT_UPLOAD") {

            }

        } else {
            alert(obj.errmsg);
        }

    };

    window.lokiws = lokiws;
 
// function getlistHeadImg(a){
//         console.log(a);
//         var data='{"type":"CHECK_USER","keyword":"'+a+'"}'; 
//         window.lokiws.send(data);
// }


window.onload = function () {
    $("#btn_send").click(function () {
        var data = $("#editArea").val();
        data = '{"type":"MESSAGE_SEND","device":"' + dev + '","wxid":"' + wxid + '","msgtype":"text","content":"' + data + '"}';
        console.log(data);
        window.lokiws.send(data)

    });

    $(".add").click(function () {
        $("#androidDialog2").show();
        // var s = '<div class="weui-search-bar" id="searchBar" onclick="show()"><form class="weui-search-bar__form"><div class="weui-search-bar__box"><i class="weui-icon-search"></i><input class="weui-search-bar__input" id="searchInput" placeholder="搜索" required="" type="search"><a href="javascript:" class="weui-icon-clear" id="searchClear"></a></div><label class="weui-search-bar__label" id="searchText" style="transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);"><i class="weui-icon-search"></i><span>搜索</span></label></form><a href="javascript:" class="weui-search-bar__cancel-btn" id="searchCancel" onclick="quxiao()">取消</a></div>'
        // $("#messageList").html(s);




    });
    $(".send-friends").click(function () {
        $("#main1").hide();
        $('#main2').show();
        $('#main3').hide();
    });
    $(".select_dev").click(function(){
        $(".select_list_xx").toggle();
    });

};
function showMsg(msg) {
    var msgobj = $("#msgarea");
    var origin = $("#msgarea").html();
    $("#msgarea").html(origin + msg + "\n");
    //  console.dir(msgobj);
    var scrollHeight = msgobj[0].scrollHeight;
    msgobj.scrollTop(scrollHeight);

}
// images action
function chooseimg(a, frameId) {
    if (frameId == "allosaurusimgpy") {

        var img = $("input[name='touxiang']");
        var lengt = img.length;
        console.log(lengt);
        if (lengt > 9) {

            $("#dialogpengyouquan").hide();
            return false;
        }

        $("#dialogpengyouquan").hide();
        var str = '<span class="pyimg" id="' + lengt + '"><img name="' + a + '"  src="/static/imgpool/thum_' + a + '.jpg"   /><input type="hidden" value="' + a + '" name="touxiang"/><i onclick="deletepengyouquan(' + lengt + ')" class="iconfont icon-delete pengyou"></i></span>';
        console.log(str);
        $(".choosed").append(str);
    } else if (frameId == "allosaurusimggrsz") {
        $("#touxianglogo").hide();

        var str = '<img  src="/static/imgpool/thum_' + a + '.jpg"   /><input type="hidden" value="' + a + '" class="gerenimg"/><span onclick="showheadimg()"><i class="iconfont icon-delete"></i></span>';

        $(".change_pic").html(str);
    }

}
//geren ziliao xiugaitouxiang
function showheadimg() {
    $("#touxianglogo").show();
}
function changeHead() {
    if ($(".gerenimg").val() == "" || $(".gerenimg").val() == null) {
        alert("choose img");
        return false;
    }
    var data = '{"type":"SET_PERSON_IMG","device":"' + dev + '","image":"' + $(".gerenimg").val() + '"}'

    window.lokiws.send(data);
}
//个人资料
function changeForm() {
    $("#main2").hide();
    $("#main1").hide();
    $("#main3").show();
}

function changeInfo() {
    var name = $('[name=name]').val();
    var sex = $(".person-text select").val();
    var person = $('[name=person]').val();
    data = '{"type":"SET_PERSON_TEXT","device":"' + dev + '","name":"' + name + '","sex":' + sex + ',"signature":"' + person + '"}';
    window.lokiws.send(data);
}

//pengyouquan 
function showpyqimg() {

    $("#dialogpengyouquan").show();
}

//pengyouquan  images
function deletepengyouquan(a) {

    $("#" + a).remove();
}

//change adderss  lat lng
function changeAdderss() {
    $(".adderss").show();
    $(".icon-dizhi").hide();
    $(".adderss span").show();
}
function saveAdderss() {
    var data = '{"type":"SET_PERSON_LOC","device":"' + dev + '","latitude":' + $(".addersspointlat").val() + ',"longitude":' + $(".addersspointlng").val() + '}';
    window.lokiws.send(data);
    $(".adderss").hide();
    $(".icon-dizhi").show();
    $(".adderss span").hide();

}
//shouji  zt  changeDevice

function changeDevice(device) {
    if (dev == device) {

    } else {
        window.lokiws.send('{"type":"FRIEND_LIST","device":"' + device + '"}');
    }
    dev = device;
    $('.icon-gengduo').remove();
    $('.ok'+device).append('<span class="iconfont icon-gengduo" style="float:right"></span>')
    
    console.log(device);
     $(".select_list_xx").toggle();
}