var express=require("express");
var app=express();
var hostname="0.0.0.0";
var port=1503;
var http=require("http");
var server=http.createServer(app);
app.get("/",(req,res)=>{
    res.send("数据接口")
})

app.use(express.json());
app.use(express.urlencoded({extended:false}));
// app.use(express.static(path.join(__dirname, 'public')));//static 静态文件   根 
// app.use(express.static('public'));


// 处理跨域方法   CORS 处理方式 
app.all('*',function(req,res,next){
    // res.header("Access-Control-Allow-Headers","Access-Control-Allow-Headers")
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    next();
});




var session=require("express-session");
app.use(session({
    secret:"keyboard cat",
    name:"appTest",
    cookie:{maxAge:60*60*1000},
    resave:false,
    saveUninitialized:true
}))

var {login}=require("./utils/index");
app.use(login);



var vue=require("./vue");
app.use("/api",vue)

var react=require("./react");
app.use("/apir",react)


server.listen(port,hostname,()=>{
    console.log(`http://${hostname}:${port}`)
})