const express=require('express');
const app=express();
const path=require('path')
const fs=require('fs');
const { log } = require('console');

app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
    fs.readdir(`./files`,(err,files)=>{
    
        res.render('index',{files:files})
    })

});

app.get('/file/:filename',(req,res)=>{
    fs.readFile(`./files/${req.params.filename}`,"utf-8",(err,filedata)=>{
      res.render('show',{filename: req.params.filename, filedata})
    })
});


app.post('/create',(req,res)=>{
  fs.writeFile(`./files/${req.body.Title.split(' ').join('')}.txt`,req.body.Message,(err)=>{
    res.redirect('/')

  })

    })
    app.get('/edit/:filename',(req,res)=>{
      res.render('edit',{filename: req.params.filename})
    })
    app.post('/edit',(req,res)=>{
      fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}`,(err)=>{
        res.redirect('/')
      })

    })
   



app.listen(2050);