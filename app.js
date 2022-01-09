const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
mongoose.connect("mongodb://localhost:27017/wikiDB");
const articleSchema = new mongoose.Schema({
    title: String,
    content: String
});
const Article = mongoose.model("Article", articleSchema);
app.route("/articles")
.get(function(req,res){
    Article.find({}, function(err, foundArticles){
        if(err){
            re.send(err);
        }else{
            res.send(foundArticles);
        }
    
});
})
// fff
.post(function(req,res){
    const article = new Article({
    title: req.body.title,
    content: req.body.content
});
article.save(function(err){
    if(!err){
        res.send("new article saved sucessfully");
        
    }else{
        res.send(err);
    }
})
})
.delete(function(req,res){
    Article.deleteMany({}, function(err){
        if(!err){
            res.send("sucessfully deleted");
        }else{
            res.send(err);
        }
    })
})
app.route("/articles/:articlename")
.get(function(req,res){
    console.log(req.params.articlename);
    const topic  =  req.params.articlename;
        Article.findOne({title: topic}, function(err, foundArticles){
            if(err){
                re.send(err);
            }else{
                res.send(foundArticles);
            }
        
    });
})
.put(function(req, res){
   Article.update(
       {title: req.params.articlename},
       {title: req.body.title, content: req.body.content},
       {overwrite: true},
       function(err){
           if(!err){
               res.send("succesfully updated");
           }else{
               res.send(err);
           }
       }
       ) 
})
.patch(function(req,res){
    Article.update(
        {title: req.params.articlename},
        {$set: req.body},
        function(err){
            if(!err){
                res.send("succesfully updated");
            }else{
                re.send(err);
            }
        }
    )
})
.delete(function(req,res){
    Article.deleteOne({title: req.params.articlename},function(err){
        if(!err){
            res.send("succesfully deleted");
        }else{
            res.send(err);
        }
    })

});
// Article.insertMany(article1, function(err){
//     console.log("sucessfully added");
// });

app.listen("3000", function(){
    console.log("server is ready and started in port 3000");
});