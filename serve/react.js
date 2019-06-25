var express=require("express");
var router=express.Router();
var {conn}=require("./utils/db");
var {aesEncrypt,keys}=require("./utils/index")
var {ObjectId}=require("mongodb");
var util = require('./config/index.js');


router.get("/",(req,res)=>{
    res.send("react路由接口")
})


/**
 * 手机验证码接口
 * post    
 * 传入手机号，返回验证码
 */


//*********************登录***************************  
//生成验证码  函数
function getCode(){
    return 1000+Math.floor(Math.random()*9000)
}


//手机验证码生成 发送
router.post('/add', function(req, res, next) {
    console.log(req.body);
    const mobile = req.body.mobile; //需要发送的号码
    var param = getCode(); //变量内容   需要发送的验证码
    console.log(param)

    if (mobile == '') {
        res.json({
            code:200,
            type:0,
            msg:"手机号不能为空"
        })
       
    }else{
        console.log("vvvvvvvvvvvv")
        //通过云之讯发送验证码到手机
        util.getResult(param, mobile).then(function(response) {
            console.log(response.data);
            console.log(response.data.code);
            if (response.data.code == '000000') {
                conn((err,db)=>{
                    if(err) throw err;
                    db.collection("smusers").findOne({mobile},(err,result)=>{
                        if(err) throw err;
                        console.log(result)
                        var time=new Date().getTime();
                        if(result){
                            db.collection("smusers").update({mobile},{$set:{time,code:param}},(err,result)=>{
                                if(err) throw err;
                                console.log("111111111111")                                
                                console.log(result.result.ok)       
                                console.log(result)
                                console.log("****************")  
                                var ok=result.result.ok;
                                console.log(ok)
                              if(ok){
                                    res.json({
                                        msg: '发送成功',
                                        code: 200,
                                        type:1
                                        // num:param
                                    } )
                                }else{
                                    res.json({
                                        msg: '发送失败1',
                                        code: 200,
                                        type:0
                                    } )
                                }
                            
                               
                            })
                        }else{
                            db.collection("smusers").insert({mobile,code:param,time},(err,result)=>{
                                if(err) throw err;
                                console.log("222222222222")
                                console.log(result.result.ok)
                                var ok=result.result.ok;
                                console.log(ok)
                                if(ok){
                                    res.json({
                                        msg: '发送成功',
                                        code: 200,
                                        type:1
                                        // num:param
                                    } )
                                }else{
                                    res.json({
                                        msg: '发送失败2',
                                        code: 200,
                                        type:0
                                    } )
                                }
                             })
                        }
                    })
                })
                
            } else {
                res.json({
                    msg: '发送失败',
                    code: 200,
                    type:0
                });
            }
    
        }, function(err) {
            // console.log(err);
            res.json({
                msg:"云之讯数据库错误",
                code:200,
                type:0
            })
        })
    }

});



 


/**
 * 登录接口
 * post
 * 传入手机号，验证码==》快速登录 ，验证码 
 * 用户名密码===>密码登录
 */
function loginSet(db,body,res,req){
    db.collection("smusers").findOne(body,(err,result)=>{
        if(err) throw err;
        console.log(body)
        // console.log(result);
        var timeNum=0;
        if(body.code){
            var oldTime=result.time;
            var newTime=new Date()
            newTime=newTime.getTime();
            timeNum=newTime-oldTime;
            console.log(newTime);
            console.log(oldTime);
            console.log(Math.floor(timeNum/1000/60)<3);
            timeNum=timeNum/1000/60
        }
       
        if(timeNum<3){
            if(result){
                // 存储Token,并返回
                var token=aesEncrypt(body.mobile+new Date().getTime(),keys)
                req.session.token = token;
                req.session.mobile=body.mobile;
                console.log(req.session.token)
                console.log(req.session.mobile)
                var username="";
                username=result.username?result.username:"";
                console.log(username);
                res.json({
                    code:200,
                    type:1,
                    msg:"登陆成功",
                    token,
                    username
                })
            }else{
                res.json({
                    code:200,
                    type:0,
                    msg:"登陆失败,用户名或密码错误"
                })
            }
        }else{
            res.json({
                code:200,
                type:0,
                msg:"验证码已失效请重新获取"
            })
        }
       
        db.close();
    })
}



router.post("/login",(req,res)=>{
    var body=req.body;
    console.log(body);
    conn((err,db)=>{
        if(err) throw err;
        if(body.password){
            console.log("password验证")
            loginSet(db,body,res,req);
        }else{
            console.log("验证码验证")
            body.code=body.code*1;
            // console.log(body)
            loginSet(db,body,res,req);
        }
        
    })
})


//判断是否已登录接口
 //1:前端没有：未登录
//2：后端没有：登录信息过期
//3:前后端不匹配：登录失败
//4:相同  匹配==》登录成功，通过手机号查找用户信息返回用户名
router.post("/islogin",(req,res)=>{
    console.log(req.headers.token)
    var qianToken =req.headers.token;
    var hToken=req.session.token;
    console.log(req.session)
    if(qianToken&&hToken&&qianToken==hToken){
        conn((err,db)=>{
            if(err) throw err;
            db.collection("smusers").findOne({mobile:req.session.mobile},(err,result)=>{
                if(err) throw err;
                var username=result.username?result.username:req.session.mobile;
                if(result){
                    res.json({
                        code:200,
                        type:1,
                        msg:"登录成功",
                        username
                    })
                }else{
                    res.json({
                        code:200,
                        type:0,
                        msg:"您还未登录，快去登录吧"
                    })  
                }
            })
        })
    }else{
        res.json({
            code:200,
            type:0,
            msg:"您还未登录，快去登录吧"
        })
    }

})




//音乐文件接口  返回 id，名称mname，音频地址 address，图片地址（img）,icon,类别status
router.get("/musiclist",(req,res)=>{
    conn((err,db)=>{
        if(err)throw err;
        db.collection("music").find().toArray((err,result)=>{
            if(err) throw err;
            console.log(result);
            res.json({
                code:200,
                type:1,
                msg:"获取成功",
                result
            })
            db.close();
        })
    })
})

module.exports=router;