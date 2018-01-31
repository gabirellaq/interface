const express = require('express');
const app = express();
const router = express.Router();

// 跨域设置
app.all("*", function(req, res, next) {
    if (req.path !== "/" && !req.path.includes(".")) {
        res.header("Access-Control-Allow-Credentials", true);
        // 这里获取 origin 请求头 而不是用 *
        res.header("Access-Control-Allow-Origin", req.headers["origin"] || "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("Content-Type", "application/json;charset=utf-8");
    }
    next();
});

//小红书 首页列表 “http://www.xiaohongshu.com/web_api/sns/v2/homefeed/notes?page_size=20&oid=recommend&page=1”
//http://localhost:9000/list
app.use("/list", require('./router/list'));

//小红书 单个列表 详情 “http://www.xiaohongshu.com/web_api/sns/v1/note/:id” “http://www.xiaohongshu.com/web_api/sns/v1/note/5a5b2a0a798e2b502fab7aef”
//http://localhost:9000/note/5a5b2a0a798e2b502fab7aef
app.use("/note", require('./router/note'));


//module.exports = router;
const APP_PORT = 9000;
app.listen(APP_PORT, () => {
    console.log(` server running @ http://localhost:${APP_PORT}!`);
});
module.exports = app;