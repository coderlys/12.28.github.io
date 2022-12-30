/* 
* drag 1.1
* date 2017-02-10
* 鑾峰彇婊戝潡楠岃瘉鐮�
* JavaScript宸ュ叿鎺ㄨ崘锛�
* https://tool.lu/js
*/
(function ($) {
  var __imgx = 0, //鍥剧墖瀹藉害
      __imgy = 0, //鍥剧墖楂樺害
      __spec = "",//鍥剧墖灏哄
      __executename,//鏍￠獙閫氳繃鍚庢墽琛岀殑鍑芥暟鍚�
      __codediv;//楠岃瘉鐮佸尯鍩熺殑div
  $.fn.slide = function (imgspec, exename) {
      //鏍￠獙鍙傛暟
      if (typeof imgspec === 'undefined') {
          imgspec = "300*300";
      }
      else if (typeof imgspec !== "string") {
          imgspec = "300*300";
      }
      if (typeof exename === 'undefined') {
          exename = "";
      }
      else if (typeof exename !== "string") {
          exename = "";
      }
      var div = this;
      __codediv = div.attr("id");
      __spec = imgspec;
      __executename = exename;
      if (__codediv === undefined) {
          throw div.selector + ' does not exist';
      }
      __init();
  };
  //杞藉叆
  function __init() {
      if (__spec === "")
          __spec = "300*300";
      var _spec = __spec.split('*');
      __imgx = _spec[0];
      __imgy = _spec[1];
      $("#" + __codediv).css("width", __imgx);
      $("#" + __codediv).css("height", parseInt(__imgy) + 34);
      CreadeCodeDiv();
      $('#drag').drag(__executename, __imgx, __imgy, __codediv);
      $.ajax({ //鑾峰彇楠岃瘉鐮�
          type: "POST",
          url: "./VerificationCode.ashx?action=getcode",
          dataType: "JSON",
          async: true,
          data: { spec: __spec },
          success: function (result) {
              if (result['state'] === -1) {
                  return;
              }
              var errcode = result['errcode'];
              if (errcode !== 0) {
                  document.getElementById(__codediv).innerHTML =
                      "<span style='color:red'>" + window.code_loadfailed
                      + result['errmsg'] + "</span>";
              }
              var yvalue = result['y'], small = result['small'], array = result['array'], normal = result['normal'];
              __imgx = result['imgx'];
              __imgy = result['imgy'];
              $(".cut_bg").css("background-image", "url(" + normal + ")");
              $("#xy_img").css("background-image", "url(" + small + ")");
              $("#xy_img").css("top", yvalue);
              $("#drag").css("width", __imgx);
              $("#drag .drag_text").css("width", __imgx);
              $(".cut_bg").css("width", __imgx / 10);
              $(".cut_bg").css("height", __imgy / 2);
              $(".refesh_bg").show();
              $(".refesh_bg").css("left", __imgx - 25);
              var bgarray = array.split(',');
              //杩樺師鍥剧墖
              var _cutX = __imgx / 10;
              var _cutY = __imgy / 2;
              for (var i = 0; i < bgarray.length; i++) {
                  var num = indexOf(bgarray, i.toString()); //绗琲寮犲浘鐩稿浜庢贩娣嗗浘鐗囩殑浣嶇疆涓簄um
                  var x = 0, y = 0;
                  //杩樺師鍓嶅亸绉�
                  y = i > 9 ? -_cutY : 0;
                  x = i > 9 ? (i - 10) * -_cutX : i * -_cutX;
                  //褰撳墠y杞村亸绉婚噺
                  if (num > 9 && i < 10) y = y - _cutY;
                  if (i > 9 && num < 10) y = y + _cutY;
                  //褰撳墠x杞村亸绉婚噺
                  x = x + (num - i) * -_cutX;
                  //鏄剧ず绗琲寮犲浘鐗�
                  $("#bb" + i).css("background-position", x + "px " + y + "px");
              }
              //瀹屾垚,绉婚櫎鎻愮ず
              $(".vcode-hints").remove();
          },
          beforeSend: function () {
          }
      });
  }
  function indexOf(arr, str) {
      if (arr && arr.indexOf) return arr.indexOf(str);
      var len = arr.length;
      for (var i = 0; i < len; i++) { if (arr[i] === str) return i; } return -1;
  }
  //缁樺埗楠岃瘉鐮佺粨鏋�
  function CreadeCodeDiv() {
      var __codeDIV = document.getElementById(__codediv);
      __codeDIV.innerHTML = '';
      var __codeHTML = "<div style='width:" + __imgx + "px;height:" + __imgy + "px;background-color:#e8e8e8;'>";
      //姝ｅ湪杞藉叆鎻愮ず鏂囧瓧
      __codeHTML += "<div class='vcode-hints'style='width:" + __imgx + "px;line-height:" + (__imgy / 100) * 7 + ";'>" + window.code_loading + "</div>";
      for (var i = 0; i < 20; i++) {
          //20寮犲皬鍥剧粍鎴愬畬鏁寸殑楠岃瘉鐮佸浘鐗�
          __codeHTML += "<div id='bb" + i + "'class='cut_bg'></div>";
      }
      __codeHTML += "<div id='xy_img'class='xy_img_bord'></div></div><div id='drag'></div>";
      __codeDIV.innerHTML = __codeHTML;
  }
})(jQuery);
/*
*
* date 2017-02-10
* 婊戝潡楠岃瘉鐮佹牎楠�
*/
(function ($) {
  $.fn.drag = function (executename, imgx, imgy, __codediv) {
      var x, drag = this, isMove = false;
      //娣诲姞鑳屾櫙锛屾枃瀛楋紝婊戝潡
      var html = '<div class="drag_bg"></div><div class="drag_text" onselectstart="return false;"'
          + 'unselectable="on">'
          + window.slidearrowtocomplete
          + '</div>'
          + '<div class="handler handler_bg"></div><a href="javascript:;" onclick="console.log(\''
          + '%cVerificationCode Refresh\',\'color:blue\');$(' + __codediv + ').slide(\'' + imgx
          + '*' + imgy + '\',\'' + executename + '\')"'
          + ' title="' + window.code_refresh + '"'
          + 'style="width:16px;height:16px;"><div class="refesh_bg"></div></a>';
      this.append(html);
      $("#drag .drag_text").css("width", imgx);
      $(".refesh_bg").css("left", imgx - 25);
      var handler = drag.find('.handler'),
          drag_bg = drag.find('.drag_bg'),
          text = drag.find('.drag_text'),
          maxWidth = imgx - 40, // drag.width() - handler.width();  //鑳芥粦鍔ㄧ殑鏈€澶ч棿璺�
          t1 = new Date(), //寮€濮嬫粦鍔ㄦ椂闂�
          t2 = new Date(); //缁撴潫婊戝姩鏃堕棿

      var $xy_img = $("#xy_img");
      var arrayDate = new Array();//榧犳爣/鎵嬫寚绉诲姩杞ㄨ抗
      /*
       *榧犳爣/鎵嬫寚鍦ㄤ笂涓嬫枃绉诲姩鏃讹紝
       *绉诲姩璺濈澶т簬0灏忎簬鏈€澶ч棿璺�
       *婊戝潡x杞翠綅缃瓑浜庨紶鏍囩Щ鍔ㄨ窛绂�
       *缁戝畾document闃叉榧犳爣/鎵嬫寚
       *绂诲紑婊戝潡鏃剁洃鍚仠姝�
       */
      handler.mousedown(function (e) {
          dragstart(e.pageX);
      });//榧犳爣鎸変笅
      $(document).mousemove(function (e) {
          dragmoving(e.pageX);
      });//绉诲姩榧犳爣
      $(document).mouseup(function (e) {
          dragmovend(e.pageX);
      });//鏉惧紑榧犳爣
      handler.mouseout(function (e) { });//榧犳爣绉诲嚭鍏冪礌
      handler.on("touchstart", function (e) {
          dragstart(e.originalEvent.touches[0].pageX);
          //闃绘椤甸潰鐨勬粦鍔ㄩ粯璁や簨浠�
          document.addEventListener("touchmove", defaultEvent, false);
      });//鎵嬫寚鎸変笅
      $(document).on("touchmove", function (e) {
          dragmoving(e.originalEvent.touches[0].pageX);
      });//鎵嬫寚绉诲姩
      $(document).on("touchend", function (e) {
          dragmovend(e.originalEvent.changedTouches[0].pageX);
          //闃绘椤甸潰鐨勬粦鍔ㄩ粯璁や簨浠�
          document.removeEventListener("touchmove", defaultEvent, false);
      });//鎵嬫寚鏉惧紑
      //榧犳爣/鎵嬫寚寮€濮嬫粦鍔�
      function dragstart(thisx) {
          //if (thisx >= maxWidth) {
          //    return;
          //}
          $xy_img.show();
          isMove = true;
          x = thisx - parseInt(handler.css('left'), 10);
          t1 = new Date();
      }
      //榧犳爣/鎵嬫寚绉诲姩杩囩▼
      function dragmoving(thisx) {
          var _x = thisx - x;
          if (isMove) {
              if (_x > 0 && _x <= maxWidth) {
                  $xy_img.css({ 'left': _x });
                  $(".refesh_bg").hide();
                  handler.css({ 'left': _x });
                  drag_bg.css({ 'width': _x });
                  arrayDate.push([_x, new Date().getTime()]);
              }
              else if (_x > maxWidth) {  //榧犳爣鎸囬拡绉诲姩璺濈杈惧埌鏈€澶ф椂娓呯┖浜嬩欢
              }
          }
      }
      //榧犳爣/鎵嬫寚绉诲姩缁撴潫
      function dragmovend(thisx) {
          if (!isMove) {//娌℃湁婊戝姩杩囩▼ 鐩存帴杩斿洖
              return;
          }
          isMove = false;
          if (isNaN(x) || x === undefined) {
              return;
          }
          var _x = Math.round(thisx - x);//鍙栨暣
          if (_x < 10) {
              $(".refesh_bg").show();
              $xy_img.css({ 'left': 0 });
              handler.css({ 'left': 0 });
              drag_bg.css({ 'width': 0 });
              return;
          }
          t2 = new Date();
          $.ajax({ //鏍￠獙
              type: "POST",
              url: "./VerificationCode.ashx?action=check",
              dataType: "JSON",
              async: true,
              data:
              {
                  point: _x,
                  timespan: t2 - t1,
                  datelist: arrayDate.join("|")
              },
              success: function (result) {
                  if (result['state'] === 0) {
                      //鎶栧姩鏁堟灉
                      for (var i = 1; 4 >= i; i++) {
                          $xy_img.animate({ left: _x - (40 - 10 * i) }, 50);
                          $xy_img.animate({ left: _x + 2 * (40 - 10 * i) }, 50, function () {
                              $xy_img.css({ 'left': result['data'] });
                          });
                      }
                      handler.css({ 'left': maxWidth });
                      drag_bg.css({ 'width': maxWidth });
                      $xy_img.removeClass('xy_img_bord');
                      $xy_img.css("border", "1px solid rgb(255,255,255)");
                      $("#drag a").remove();
                      console.log("%cVerificationCode Verified", "color:green");
                      dragOk();
                  } else {
                      $(".refesh_bg").show();
                      $xy_img.css({ 'left': 0 });
                      handler.css({ 'left': 0 });
                      drag_bg.css({ 'width': 0 });
                      if (result['msg'] > 0) {
                          //瓒呰繃鏈€澶ч敊璇鏁伴檺鍒� 鍒锋柊楠岃瘉鐮�
                          $("#" + __codediv).slide(imgx + "*" + imgy, executename);
                          console.log("%cVerificationCode Refresh", "color:blue");
                      }
                      else {
                          console.log("%cNumber of errors: " + result['msg'], "color:red");
                      }
                  }
              },
              beforeSend: function () {
              }
          });
      }
      //鍙栨秷浜嬩欢鐨勯粯璁ゅ姩浣� 
      //闃叉涓€浜汚ndroid娴忚鍣ㄩ〉闈㈣窡闅忔粦鍔ㄧ殑鎯呭喌
      function defaultEvent(e) {
          e.preventDefault();
      }
      //娓呯┖浜嬩欢
      function dragOk() {
          handler.removeClass('handler_bg').addClass('handler_ok_bg');
          text.text(window.code_passed);
          drag.css({ 'color': '#fff' });
          handler.unbind('mousedown');
          $(document).unbind('mousemove');
          $(document).unbind('mouseup');
          $(".refesh_bg").hide();
          if (executename !== '')
              window[executename]();
      }
  };
})(jQuery);