$(function () {
    var _editArea = $('#editArea');

    //显示隐藏发送按钮
    var _editAreaInterval;
    $('#editArea').focus(function () { 
        var _this = $(this), html;
        _editAreaInterval = setInterval(function () {
             $('#btn_send').show();
            // html = _this.html();
            // if (html.length > 0) {
            //     $('#web_wechat_pic').hide();
            //     $('#btn_send').show();
            // } else {
            //     $('#web_wechat_pic').show();
            //     $('#btn_send').hide();
            // }
        }, 200);
    });
    

    $('#editArea').blur(function () {
        clearInterval(_editAreaInterval); 
        if($("#editArea").val() == ""){
               $('#btn_send').hide(); 
        }
        
    });

    //显示隐藏表情栏
    $('.web_wechat_face').click(function () {
        $('.box_ft_bd').toggleClass('hide');
        resetMessageArea();
    });

    //切换表情主题
    $('.exp_hd_item').click(function () {
        var _this = $(this), i = _this.data('i');
        $('.exp_hd_item,.exp_cont').removeClass('active');
        _this.addClass('active');
        $('.exp_cont').eq(i).addClass('active');
        resetMessageArea();
    });

    //选中表情
    $('.exp_cont a').click(function () {
        var _this = $(this);
        var html = '<img class="' + _this[0].className + '" title="' + _this.html() + '" src="images/spacer.gif">';
        _editArea.html(_editArea.html() + html);
        $('#web_wechat_pic').hide();
        $('#btn_send').show();
    });

    resetMessageArea();


    function sendMsg(str) {
    }

    function resetMessageArea() {
        $('#messageList').animate({ 'scrollTop': 999 }, 500);
    }
//     $("#btn_send").click(function(){
//       var ss = $("#editArea").html();
//        var now = new Date();
//        var mytime=now.toLocaleTimeString();
//       if(ss == ""){
//         return false;
//       }
//       var s = '<div class="message me"><img class="avatar" src="static/images/96.jpeg" /><div class="content"><div class="nickname"><span class="time">'+mytime+'</span></div><div class="bubble bubble_primary right no_arrow"><div class="bubble_cont"><div class="picture">'+ss+'</div></div></div></div></div>'
//       $("#messageList").append(s);


//   var div = document.getElementById('messageList');
// div.scrollTop = div.scrollHeight;
// $("#editArea").html("");

//     })
});
