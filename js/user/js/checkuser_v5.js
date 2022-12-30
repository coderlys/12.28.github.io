//
function ChangeCode() {
  var now = new Date();
  var number = now.getSeconds();
  document.getElementById("codeimg").src = "checkcode.aspx?num=" + number;
  document.getElementById("Code").value = "";
}


var EmailOK = 0, PasswordOK = 0, RePasswordOK = 0, RealNameOK = 0, CodeOK = 0, AcceptOK = 1;
var UserNameBakValue = "", EmailBakValue = "", CodeBakValue = "";
var thisname;
var thisinfo;

var $ = function (tagName) {
  return document.getElementsByTagName(tagName);
}
var $div = function (tagName) {
  return document.getElementById(tagName + "_txt");
}
var $val = function (tagName) {
  return document.getElementById(tagName);
}


function checkspace(checkstr) {
  var str = '';
  for (i = 0; i < checkstr.length; i++) {
      str = str + ' ';
  }
  return (str == checkstr);
}


//检查用户名
function CheckUsername() {

  if (checkspace(document.register.Username.value)) {
      document.getElementById("Username_txt").innerHTML = window.Username_txt;
      //document.getElementById("Username_txt").className = "alerts";
      //document.getElementById("Username").style.border = "1px #ff9900 solid ";
      UsernameOK = 0;
      return false;
  }
  if (checkspace(document.register.Username.value) || document.register.Username.value.length < 6 || document.register.Username.value.length > 20) {
      document.getElementById("Username_txt").innerHTML = window.Username_txt2;
      //document.getElementById("Username_txt").className = "alerts";
      //document.getElementById("Username").style.border = "1px #ff9900 solid ";
      UsernameOK = 0;

      return false;
  }

  var regexp = /^[a-zA-Z0-9_]+$/;
  if (regexp.test(document.register.Username.value) == false) {
      document.getElementById("Username_txt").innerHTML = window.Username_txt2;
      //document.getElementById("Username_txt").className = "alerts";
      //document.getElementById("Username").style.border = "1px #ff9900 solid ";
      UsernameOK = 0;
      return false;
  }



  //  var objRegex = /[a-z0-9_]/;
  //  alert(document.register.Username.value.match(objRegex));
  //  
  //  if   (document.register.Username.value.match(objRegex)   ==  null)  
  //  {  
  //  }


  //	var  objRegex = /[^a-z_]/ig;
  //	var  UsernameStr=document.register.Username.value;
  //	if   (UsernameStr.match(objRegex)   !=  null)  
  //	{  
  //	}


  thisinfo = document.getElementById("Username").value;
  if (thisinfo != UserNameBakValue) {
      var xmlhttp;
      try {
          xmlhttp = new XMLHttpRequest();
      }
      catch (e) {
          xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
      xmlhttp.onreadystatechange = function () {
          if (xmlhttp.readyState == 4) {

              if (xmlhttp.status == 200) {
                  UserNameBakValue = thisinfo;
                  var data = xmlhttp.responseText;
                  username_result(data);
              }
              else {

                  $val("Username_txt").innerHTML = window.Username_txt3;
              }
          }
          else {

              $val("Username_txt").innerHTML = window.Username_txt4;
          }
      }

      xmlhttp.open("post", "UserRegisterCheck.aspx", true);
      xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xmlhttp.send("act=checkusername&username=" + escape(thisinfo));

      //验证正确的样式
      document.getElementById("Username_txt").innerHTML = " ";
      //document.getElementById("Username_txt").className = "current";
  }

}

function LcaseUsername() {
  if (document.register.Username.value.length > 0) {
      var Username = document.register.Username.value;
      Username = Username.toLowerCase().replace(/\s/, "");
      document.register.Username.value = Username;
  }
}


function username_result(data) {
  if (data == 1) {
      $val("Username_txt").innerHTML = ' ';
      //$val("Username").style.border = "1px #aaaaaa solid ";
      //document.getElementById("Username_txt").className = "current";
      UsernameOK = 1;
  }
  else {
      $val("Username_txt").innerHTML = window.Username_txt5;
      //$val("Username").style.border = "1px #ff9900 solid ";
      //document.getElementById("Username_txt").className = "alerts";
      UsernameOK = 0;
  }
}




function LcaseEmail() {
  if (document.register.Email.value.length > 0) {
      var Email = document.register.Email.value;
      Email = Email.toLowerCase().replace(/\s/, "");
      document.register.Email.value = Email;
  }
}


function CheckPhone() {

    if(document.register.phone.value.length == 0){
        document.getElementById("phone_txt").innerHTML = "<img src=\"./images/no.png\">" + "请输入你的手机号码";
    }


}


function CheckEmail() {

  if (document.register.Email.value.length != 0) {

      //  if (document.register.Email.value == "电子邮箱") return false;

      document.register.Email.value = document.register.Email.value.toLowerCase().replace(/\s/, "");
      if (!IsValidEmail(document.register.Email.value)) {
          document.getElementById("Email_txt").innerHTML = "<img src=\"./images/no.png\">" + window.Email_txt;
          //document.getElementById("Email_txt").className = "alerts";
          //document.getElementById("Email").style.border = "1px #ff9900 solid ";
          document.getElementById("Email_pass").innerHTML = "";
          EmailOK = 0;
          return false;
      }
      /*        else {
      document.getElementById("Email_txt").innerHTML = " ";
      document.getElementById("Email_txt").className = "current";
      //document.getElementById("Email_txt").innerHTML="<samp class='green'><strong>Email格式正确</strong></samp>";
      //document.getElementById("Email").style.border="1px #7fc613 solid ";
      //EmailOK=1;
      return;
      }*/
      else {
      }
  }
  else if (checkspace(document.register.Email.value)) {
      //  document.getElementById("Email_txt").innerHTML = "输入您的电子邮箱地址！没有？推荐注册<a href=\"http://reg.163.com/reg/reg0.jsp?url=http://mscan3.163.com/activate163/QuickCreateMail.jsp\" target=\"_blank\">163</a>、<a href=\"http://mail.qq.com/cgi-bin/loginpage?t=regist\"  target=\"_blank\">QQ</a>邮箱";
      document.getElementById("Email_txt").innerHTML = "<img src=\"../images/no.png\">" + window.Email_txt2;;
      //document.getElementById("Email_txt").className = "alerts";
      //document.getElementById("Email").style.border = "1px #ff9900 solid ";
      document.getElementById("Email_pass").innerHTML = "";
      EmailOK = 0;
      return false;
  }


  thisinfo = document.getElementById("Email").value;

  // if (thisinfo != EmailBakValue) {

  var xmlhttp;
  try {
      xmlhttp = new XMLHttpRequest();
  }
  catch (e) {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
              //EmailBakValue = thisinfo;
              var data = xmlhttp.responseText;
              Email_result(data);
          }
          else {
              $val("Email_txt").innerHTML = window.Email_txt3;
          }
      }
      else {
          $val("Email_txt").innerHTML = window.Email_txt4;
      }
  }
  xmlhttp.open("post", "UserRegisterCheck.aspx", true);
  xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xmlhttp.send("act=checkemail&email=" + escape(thisinfo));

  //验证正确的样式
  document.getElementById("Email_txt").innerHTML = "";

  document.getElementById("Email_pass").innerHTML = "<img src=\"./images/pic_17.gif\" class=\"ri\">";
  //document.getElementById("Email_txt").className = "current";
  // }

}



function Email_result(data) {
  if (data == 1) {
      //        $val("Email_txt").innerHTML = '当前电邮可以使用!';
      $val("Email_txt").innerHTML = '';
      //$val("Email").style.border = "1px #aaaaaa solid ";
      //document.getElementById("Email_txt").className = "current";
      EmailOK = 1;

      var EmailProvider = document.register.Email.value.substr(document.register.Email.value.indexOf('@') + 1, document.register.Email.value.length - document.register.Email.value.indexOf('@')).toLowerCase()
      switch (EmailProvider) {
          case "china.com":
          case "china.com.cn":
          case "citiz.net":
              document.getElementById("Email_txt").innerHTML = "<img src=\"./images/no.png\">" + window.Email_txt5;
              //document.getElementById("Email_txt").className = "current2row";
              //document.getElementById("Email").style.border = "1px #ff9900 solid ";
              //EmailOK = 1;
              //return true;
              break;
      }

  }
  else {
      var loginpageurl = "https://passport.jinbay.com/login.aspx";
      var nextreurl = $val("nextreurl").value;
      if (nextreurl.length > 0) { loginpageurl += "?reurl=" + nextreurl }
      $val("Email_txt").innerHTML = '<img src=\"./images/no.png\">' + window.Error_Email3 + ' <a href="' + loginpageurl + '">' + window.login + '</a>。';
      //$val("Email").style.border = "1px #ff9900 solid ";
      //document.getElementById("Email_txt").className = "alerts";
      document.getElementById("Email_pass").innerHTML = "";
      EmailOK = 0;
  }
}



function CheckPassword() {
  if (checkspace(document.register.Password.value) || document.register.Password.value.length < 6) {
      document.getElementById("Password_txt").innerHTML = "<img src=\"./images/no.png\">" + window.Error_Password;
      //document.getElementById("Password_txt").className = "alerts";
      //document.getElementById("Password").style.border = "1px #ff9900 solid ";

      document.getElementById("Password_pass").innerHTML = "";

      PasswordOK = 0;
      return;
  }
  else if (IsInvalidPassword(document.register.Password.value) || document.register.Password.value.indexOf(" ") >= 0) {
      document.getElementById("Password_txt").innerHTML = "<img src=\"./images/no.png\">" + window.Error_Password2;
      //document.getElementById("Password_txt").className = "alerts";
      //document.getElementById("Password").style.border = "1px #ff9900 solid ";
      document.getElementById("Password_pass").innerHTML = ">";
      PasswordOK = 0;
      return;
  }
  else {
      document.getElementById("Password_txt").innerHTML = " ";
      //document.getElementById("Password_txt").className = "current";
      //document.getElementById("Password").style.border = "1px #aaaaaa solid ";
      document.getElementById("Password_pass").innerHTML = "<img src=\"./images/pic_17.gif\" class=\"ri\">";
      PasswordOK = 1;
  }
}


function IsInvalidPassword(Password) {
  var valid = /[\'\"\,\<\>\+\-\*\/\%\^\=\(\)\[\]\{\}\:\;]+/;
  return (valid.test(Password));
}


function CheckRePassword() {
  if (PasswordOK == 1) {
      if (checkspace(document.register.Password.value)) {
          document.getElementById("RePassword_txt").innerHTML = "<img src=\"./images/no.png\">" + window.Error_RePassword2;
          //document.getElementById("RePassword_txt").className = "alerts";
          //document.getElementById("RePassword").style.border = "1px #ff9900 solid ";
          document.getElementById("RePassword_pass").innerHTML = "";
          RePasswordOK = 0;
          return;
      }
      if (document.register.Password.value != document.register.RePassword.value) {
          document.getElementById("RePassword_txt").innerHTML = "<img src=\"./images/no.png\">" + window.Error_RePassword2;
          //document.getElementById("RePassword_txt").className = "alerts";
          //document.getElementById("RePassword").style.border = "1px #ff9900 solid ";
          document.getElementById("RePassword_pass").innerHTML = "";
          RePasswordOK = 0;
          return;
      }
      else {
          document.getElementById("RePassword_txt").innerHTML = " ";
          //document.getElementById("RePassword_txt").className = "current";
          //document.getElementById("RePassword").style.border = "1px #aaaaaa solid ";
          document.getElementById("RePassword_pass").innerHTML = "<img src=\"./images/pic_17.gif\" class=\"ri\">";
          RePasswordOK = 1
      }
  }

  else {
      document.getElementById("RePassword_txt").innerHTML = "<img src=\"./images/no.png\">" + window.Error_RePassword2;
      //document.getElementById("RePassword_txt").className = "alerts";
      //document.getElementById("RePassword").style.border = "1px #ff9900 solid ";
      document.getElementById("RePassword_pass").innerHTML = "";
      RePasswordOK = 0;
  }
}


function CheckRealName() {
  var nnname = document.getElementById('RealName').value;
  //if (nnname == "姓名/昵称") return false;
  if (nnname.length < 2 || nnname.length > 20) {
      document.getElementById("RealName_txt").innerHTML = "<img src=\"./images/no.png\">" + window.Error_RealName2;
      //document.getElementById("RealName_txt").className = "alerts";
      //document.getElementById("RealName").style.border = "1px #ff9900 solid ";
      document.getElementById("RealName_pass").innerHTML = "";
      RealNameOK = 0;
      return false;
  }
  else {
      // var reg =/^([\u4e00-\u9fa5])*$/;
      // var reg2=/[a-zA-Z]{3,15}[\s]([a-zA-Z]{1,15})?[\s]?([a-zA-Z]{3,15})?([\s]+)?/im;
      // if(nnname.match(reg))
      // {
      //     if(nnname.length > 6)
      //     {
      //   	  document.getElementById("RealName_txt").innerHTML = "填写您的真实姓名，可以更好体验金海湾的服务。";
      //   	  document.getElementById("RealName_txt").className = "alerts";
      //   	  document.getElementById("RealName").style.border = "1px #ff9900 solid ";
      //   	  RealNameOK = 0;
      //   	  return false;
      //     }
      //  //else(!check_surname(nnname))
      //  // {
      //  //   var str=str.substr(0,1);  
      //  //   document.getElementById("RealName_txt").innerHTML = "请输入您的姓名！";
      //  //   document.getElementById("RealName_txt").className = "alerts";
      //  //   document.getElementById("RealName").style.border = "1px #ff9900 solid ";
      //  //   RealNameOK = 0;
      //  //   return false;
      //  // }
      // }
      // else if(nnname.match(reg2))
      // {  
      // }
      // else
      // {
      //   document.getElementById("RealName_txt").innerHTML = "填写您的真实姓名，可以更好体验金海湾的服务。";
      //   document.getElementById("RealName_txt").className = "alerts";
      //   document.getElementById("RealName").style.border = "1px #ff9900 solid ";
      //   RealNameOK = 0;
      //   return false;
      // }
      document.getElementById("RealName_txt").innerHTML = " ";
      //document.getElementById("RealName_txt").className = "current";
      //document.getElementById("RealName").style.border = "1px #aaaaaa solid ";
      document.getElementById("RealName_pass").innerHTML = "<img src=\"./images/pic_17.gif\" class=\"ri\">";
      RealNameOK = 1;
      return true;
  }
}


function check_surname(str) {
  var str = str.substr(0, 1);
  var surname = "赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏陶姜戚谢邹喻柏水窦章云苏潘葛奚范彭郎鲁韦昌马苗凤花方俞任袁柳酆鲍史唐费廉岑薛雷贺倪汤滕殷罗毕郝邬安常乐于时傅皮卞齐康伍余元卜顾孟平黄和穆萧尹姚邵湛汪祁毛禹狄米贝明臧计伏成戴谈宋茅庞熊纪舒屈项祝董梁杜阮蓝闵席季麻强贾路娄危江童颜郭梅盛林刁钟徐邱骆高夏蔡田樊胡凌霍虞万支柯昝管卢莫柯房裘缪干解应宗丁宣贲邓郁单杭洪包诸左石崔吉钮龚程嵇邢滑裴陆荣翁荀羊于惠甄曲家封芮羿储靳汲邴糜松井段富巫乌焦巴弓牧隗山谷车侯宓蓬全郗班仰秋仲伊宫宁仇栾暴甘钭历戎祖武符刘景詹束龙叶幸司韶郜黎蓟溥印宿白怀蒲邰从鄂索咸籍赖卓蔺屠蒙池乔阳郁胥能苍双闻莘党翟谭贡劳逄姬申扶堵冉宰郦雍却璩桑桂濮牛寿通边扈燕冀浦尚农温别庄晏柴瞿阎充慕连茹习宦艾鱼容向古易慎戈廖庾终暨居衡步都耿满弘匡国文寇广禄阙东欧殳沃利蔚越夔隆师巩厍聂晁勾敖融冷訾辛阚那简饶空曾毋沙乜养鞠须丰巢关蒯相查后荆红游竺权逮盍益桓公上赫皇澹淳太轩令宇长盖况闫";
  r = surname.search(str);
  if (r == -1)
      return false
  else
      return true
}


//function CheckSex() {
//    if (!document.register.Sex[0].checked && !document.register.Sex[1].checked) {
//        document.getElementById("Sex_txt").innerHTML = "选择您的性别！";
//        document.getElementById("Sex_txt").className = "alerts";
//        SexOK = 0;
//        return;
//    }
//    else {
//        document.getElementById("Sex_txt").innerHTML = "注册后不可更改";
//        document.getElementById("Sex_txt").className = "current";
//        SexOK = 1;
//    }
//}



//检查城市
//function CheckAreaID() {
//    if (document.register.ProvinceID.value == 0 ) {
//        document.getElementById("AreaID_txt").innerHTML = "请选择您所在的省！";
//        document.getElementById("AreaID_txt").className = "alerts";
//        AreaIDOK = 0;
//        return;
//    }
//   if ( document.register.AreaID.value == 0) {
//        document.getElementById("AreaID_txt").innerHTML = "请选择您所在的市/区！";
//        document.getElementById("AreaID_txt").className = "alerts";
//        AreaIDOK = 0;
//        return;
//    }
//
//    else {
//        document.getElementById("AreaID_txt").innerHTML = " ";
//        document.getElementById("AreaID_txt").className = "current";
//        AreaIDOK = 1;
//    }
//}

//function CheckAreaID(DropDownID) {
//    //	alert(document.getElementsByName("ProvinceID").item(0).selectedIndex);
//    //		alert(document.getElementsByName("AreaID").item(0).selectedIndex);

//    if (DropDownID == 0) {
//        if (document.getElementsByName("ProvinceID").item(0).selectedIndex == 0) {
//            document.getElementById("AreaID_txt").innerHTML = "选择您所在的省！";
//            document.getElementById("AreaID_txt").className = "alerts";
//            AreaIDOK = 0;
//            return;
//        }
//        else {
//            if (document.getElementsByName("AreaID").item(0).selectedIndex != 0) {
//                document.getElementById("AreaID_txt").innerHTML = " ";
//                document.getElementById("AreaID_txt").className = "current";
//                AreaIDOK = 0;
//                return;
//            }
//            else {
//                document.getElementById("AreaID_txt").innerHTML = " ";
//                document.getElementById("AreaID_txt").className = "normals";
//                return;
//            }
//        }
//    }


//    if (document.getElementsByName("AreaID").item(0) != null) {
//        if (document.getElementsByName("AreaID").item(0).selectedIndex == 0) {
//            document.getElementById("AreaID_txt").innerHTML = "选择您所在的市/区！";
//            document.getElementById("AreaID_txt").className = "alerts";
//            AreaIDOK = 0;
//            return;
//        }
//    }
//    else {
//        document.getElementById("AreaID_txt").innerHTML = "选择您所在的市/区！";
//        document.getElementById("AreaID_txt").className = "alerts";
//        AreaIDOK = 0;
//        return;

//    }

//    document.getElementById("AreaID_txt").innerHTML = " ";
//    document.getElementById("AreaID_txt").className = "current";
//    AreaIDOK = 1;
//}

function CheckAccept() {
  if (document.getElementById("Accept").checked == false) {
      document.getElementById("Accept_txt").innerHTML = "<img src=\"./images/no.png\">" + window.Error_Accept;
      //document.getElementById("Accept_txt").className = "alerts";
      document.getElementById("Accept_pass").innerHTML = "";
      AcceptOK = 0;
      return;
  }
  else {
      document.getElementById("Accept_txt").innerHTML = " ";
      //document.getElementById("Accept_txt").className = "current";
      document.getElementById("Accept_pass").innerHTML = "<img src=\"./images/pic_17.gif\" class=\"ri\">";
      AcceptOK = 1;
  }
}



//验证码
function CheckCodes() {

  if (CodeOK == 0) {
      document.getElementById("Code_txt").innerHTML = "<img src=\"./images/no.png\">" + window.slidearrowtocomplete;
      //document.getElementById("Code").style.border = "1px #ff9900 solid ";
      //document.getElementById("Code_txt").className = "alerts";
      document.getElementById("Code_pass").innerHTML = "";
      DisableSubmitButton(0);
      //ChangeCode(); //改变验证码
      return;
  }

}


function Code_result(data) {
  if (data == 1) {
      $val("Code_txt").innerHTML = ' '; //<samp class="green">验证成功!</samp>';
      //$val("Code").style.border = "1px #aaaaaa solid ";
      //document.getElementById("Code_txt").className = "current";
      document.getElementById("Code_pass").innerHTML = "<img src=\"./images/pic_17.gif\" class=\"ri\">";
      CodeOK = 1;
  }
  else {
      $val("Code_txt").innerHTML = '输入正确的验证码，或更换验证码后输入！';
      //$val("Code").style.border = "1px #ff9900 solid ";
      //document.getElementById("Code_txt").className = "alerts";
      document.getElementById("Code_pass").innerHTML = "";
      CodeOK = 0;
      DisableSubmitButton(0);
      ChangeCode(); //改变验证码
  }
}



//function CheckBirthday(DropDownID) {

//    if (DropDownID == 0 || DropDownID == 1 || DropDownID == 2) {
//        if (document.register.Birthday_Year.value == 0) {
//            document.getElementById("Birthday_txt").innerHTML = "选择出生年份！";
//            document.getElementById("Birthday_txt").className = "alerts";
//            //document.getElementById("Password").style.border = "1px #ff9900 solid ";
//            BirthdayOK = 0;
//            return;
//        }
//        else {
//            document.getElementById("Birthday_txt").innerHTML = "填写真实生日，出于安全考虑生日默认隐藏。";
//            document.getElementById("Birthday_txt").className = "normals";
//        }
//    }


//    if (DropDownID == 1 || DropDownID == 2) {

//        if (document.register.Birthday_Month.value == 0) {
//            document.getElementById("Birthday_txt").innerHTML = "选择出生月份！";
//            document.getElementById("Birthday_txt").className = "alerts";
//            //document.getElementById("Password").style.border = "1px #ff9900 solid ";
//            BirthdayOK = 0;
//            return;
//        }
//        else {
//            document.getElementById("Birthday_txt").innerHTML = "填写真实生日，出于安全考虑生日默认隐藏。";
//            document.getElementById("Birthday_txt").className = "normals";
//        }
//    }



//    if (DropDownID == 2) {

//        if (document.register.Birthday_Day.value == 0) {
//            document.getElementById("Birthday_txt").innerHTML = "选择出生日！";
//            document.getElementById("Birthday_txt").className = "alerts";
//            //document.getElementById("Password").style.border = "1px #ff9900 solid ";
//            BirthdayOK = 0;
//            return;
//        }
//        else {
//            document.getElementById("Birthday_txt").innerHTML = " ";
//            document.getElementById("Birthday_txt").className = "normals";
//        }
//    }


//    if (document.register.Birthday_Year.value != 0 && document.register.Birthday_Month.value != 0 && document.register.Birthday_Day.value != 0) {
//        var BirthdayStr = document.register.Birthday_Year.value + "-" + document.register.Birthday_Month.value + "-" + document.register.Birthday_Day.value;
//        if (!CheckDateTime(BirthdayStr)) {
//            document.getElementById("Birthday_txt").innerHTML = "选择正确的出生日期！";
//            document.getElementById("Birthday_txt").className = "alerts";
//            //document.getElementById("Password").style.border = "1px #ff9900 solid ";
//            BirthdayOK = 0;
//            return;
//        }
//        else {
//            document.getElementById("Birthday_txt").innerHTML = " ";
//            document.getElementById("Birthday_txt").className = "current";
//            //document.getElementById("Password").style.border = "1px #aaaaaa solid ";
//            BirthdayOK = 1;
//        }

//    }

//}

//function ChangeRowBgColor(id) {
//    //	if(EmailOK==0)
//    //	{
//    //	   CheckEmail();
//    //	}
//    //	
//    //	if(RealNameOK==0)
//    //	{
//    //	   CheckRealName();
//    //	}


//    for (i = 1; i <= 8; i++) {
//        document.getElementById("Row" + i).style.backgroundColor = "#FFFFFF";
//    }
//    document.getElementById("Row" + id).style.backgroundColor = "#F0F3F6";
//}




//函数名：CheckDateTime      
//功能介绍：检查是否为日期时间   
function CheckDateTime(str) {
  var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;
  var r = str.match(reg);
  if (r == null) return false;
  var d = new Date(r[1], r[3] - 1, r[4]);
  var newStr = d.getFullYear() + r[2] + (d.getMonth() + 1) + r[2] + d.getDate()
  if (newStr == str) {
      return true;
  }
  else {
      return false;
  }

}


function IsValidEmail(emailstr) {
  //　var pattern =/^[A-Z0-9._%+-]+@(?:[A-Z0-9\-]+\.)+[A-Z]{2,3}$/i; 
  var pattern = /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|biz|info|name|aero|biz|info|jobs|museum|edu)\b/i;
  flag = pattern.test(emailstr);
  if (flag) {
      return true;
  }
  else {
      return false;
  }
}

function DisableSubmitButton(DisableValue) {
  if (DisableValue == 1) {
      document.getElementById("btnRegister").disabled = true;
      document.getElementById("btnRegister").value = window.submitting;
  }
  else {
      document.getElementById("btnRegister").disabled = false;
      document.getElementById("btnRegister").value = window.registernow;
  }
}

function CheckWholeForm() {

  DisableSubmitButton(1);

  /*    if(UsernameOK==0)
      {
        CheckUsername();
      }
      if (UsernameOK == 0) return false;*/
  if (EmailOK == 0) {
      CheckEmail();
  }
  if (EmailOK == 0) {
      DisableSubmitButton(0);
      return false;
  }

  CheckPassword();
  if (PasswordOK == 0) {
      DisableSubmitButton(0);
      return false;
  }
  CheckRePassword()
  if (RePasswordOK == 0) return false;

  if (RealNameOK == 0) {
      CheckRealName();
  }
  if (RealNameOK == 0) {
      DisableSubmitButton(0);
      return false;
  }


  //CheckSex();
  //if (SexOK == 0) {
  //    DisableSubmitButton(0);
  //    return false;
  //}
  //CheckBirthday(2)
  //if (BirthdayOK == 0) {
  //    DisableSubmitButton(0);
  //    return false;
  //}
  //CheckAreaID(1);
  //if (AreaIDOK == 0) {
  //    DisableSubmitButton(0);
  //    return false;
  //}

  if (CodeOK == 0) {
      CheckCodes();
  }

  setTimeout("CheckWholeFormStep2()", 3000);
}


function CheckWholeFormStep2() {
  if (CodeOK == 0) {
      DisableSubmitButton(0);
      return false;
  }

  CheckAccept();
  if (AcceptOK == 0) {
      DisableSubmitButton(0);
      return false;
  }

  if (AcceptOK == 1 && CodeOK == 1 && RealNameOK == 1 && PasswordOK == 1 && RePasswordOK == 1 && EmailOK == 1) {
      document.register.submit();
  }
  else {
      DisableSubmitButton(0);
  }
}



//function CheckLoginForm() {
//    if (checkspace(document.getElementById("LoginUserName").value) || document.getElementById("LoginUserName").value == "电子邮箱或用户名") {
//        alert("请输入电子邮箱或用户名");
//        document.getElementById("LoginUserName").focus();
//        return false;
//    }
//    if (checkspace(document.getElementById("LoginPassword").value)) {
//        alert("请输入登录密码");
//        document.getElementById("LoginPassword").focus();
//        return false;
//    }
//    return true;
//}


/**
* @name placeHolder
* @class 跨浏览器placeHolder,对于不支持原生placeHolder的浏览器，通过value或插入span元素两种方案模拟
* @param {Object} obj 要应用placeHolder的表单元素对象
* @param {Boolean} span 是否采用悬浮的span元素方式来模拟placeHolder，默认值false,默认使用value方式模拟
*/
function placeHolder(obj, span) {

  if (!obj.getAttribute('placeholder')) return;
  var imitateMode = span === true ? true : false;
  var supportPlaceholder = 'placeholder' in document.createElement('input');
  if (!supportPlaceholder) {

      var defaultValue = obj.getAttribute('placeholder');
      if (!imitateMode) {

          obj.onfocus = function () {
              (obj.value == defaultValue) && (obj.value = '');
              obj.style.color = '';
              //if (obj.name == "Email")
              //    ChangeRowBgColor(1);
              //if (obj.name == "Password")
              //    ChangeRowBgColor(2);
              //if (obj.name == "RealName")
              //    ChangeRowBgColor(3);
              //if (obj.name == "Code")
              //    ChangeRowBgColor(7);
          }

          obj.onblur = function () {
              if (obj.value == defaultValue) {
                  obj.style.color = '';
              } else if (obj.value == '') {
                  obj.value = defaultValue;
                  obj.style.color = '#ACA899';
              }
              if (obj.name == "Email") {
                  CheckEmail();
              }
              //if (obj.name == "Password")
              //    CheckPassword();
              //if (obj.name == "RePassword")
              //CheckRePassword();
              if (obj.name == "RealName")
                  CheckRealName();
              if (obj.name == "Code")
                  CheckCodes();
          }

          if (obj.value == defaultValue) {
              obj.style.color = '';
          } else if (obj.value == '') {
              obj.value = defaultValue;
              obj.style.color = '#ACA899';
          }
          obj.onblur();

      } else {
          //color:#ACA899; 
          var placeHolderCont = document.createTextNode(defaultValue);
          var oWrapper = document.createElement('span');
          oWrapper.style.cssText = 'position:absolute; color:#ACA899; display:inline-block; overflow:hidden;';
          oWrapper.className = 'wrap-placeholder';
          oWrapper.style.fontFamily = getStyle(obj, 'fontFamily');
          oWrapper.style.fontSize = getStyle(obj, 'fontSize');
          oWrapper.style.marginLeft = parseInt(getStyle(obj, 'marginLeft')) ? parseInt(getStyle(obj, 'marginLeft')) + 3 + 'px' : 3 + 'px';
          oWrapper.style.marginTop = parseInt(getStyle(obj, 'marginTop')) ? getStyle(obj, 'marginTop') : 1 + 'px';
          oWrapper.style.paddingLeft = getStyle(obj, 'paddingLeft');
          oWrapper.style.width = obj.offsetWidth - parseInt(getStyle(obj, 'marginLeft')) + 'px';
          oWrapper.style.height = obj.offsetHeight + 'px';
          oWrapper.style.lineHeight = obj.nodeName.toLowerCase() == 'textarea' ? '' : obj.offsetHeight + 'px';
          oWrapper.appendChild(placeHolderCont);
          obj.parentNode.insertBefore(oWrapper, obj);
          oWrapper.onclick = function () {
              obj.focus();
          }
          //绑定input或onpropertychange事件
          if (typeof (obj.oninput) == 'object') {
              obj.addEventListener("input", changeHandler, false);
          } else {
              obj.onpropertychange = changeHandler;
          }

          function changeHandler() {
              oWrapper.style.display = obj.value != '' ? 'none' : 'inline-block';
          }
          /**
           * @name getStyle
           * @class 获取样式
           * @param {Object} obj 要获取样式的对象
           * @param {String} styleName 要获取的样式名
           */
          function getStyle(obj, styleName) {
              var oStyle = null;
              if (obj.currentStyle)
                  oStyle = obj.currentStyle[styleName];
              else if (window.getComputedStyle)
                  oStyle = window.getComputedStyle(obj, null)[styleName];
              return oStyle;
          }
      }
  }
}