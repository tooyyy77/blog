import express from 'express';
import path from 'path';

const app = express()
//导入 account 接口路由文件
import articleRouter from './server/api/article.js';
app.use('/api', articleRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     next(createError(404));
//   });
  
//   // error handler
//   app.use(function(err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
  
//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
//   });
app.listen(3000, function () {
    console.log('访问地址为 localhost:3000')
  })
  
export default app;