import express from "express";
import bodyParser from "body-parser";
import lodash from "lodash";
import mongoose from "mongoose";

//Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dictum varius duis at consectetur. Mi ipsum faucibus vitae aliquet nec. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. Nibh tellus molestie nunc non blandit massa. Egestas purus viverra accumsan in nisl nisi scelerisque. Convallis a cras semper auctor neque vitae tempus quam pellentesque. Ac tincidunt vitae semper quis lectus nulla at. Lobortis elementum nibh tellus molestie nunc non blandit massa enim. In dictum non consectetur a erat. Sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae. Urna duis convallis convallis tellus id interdum velit.

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const postsSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Post = mongoose.model("Post", postsSchema);


app.get("/" , async (req,res)=>{
  try{
    await mongoose.connect("mongodb://localhost:27017/postsDB", {family: 4});
    const posts = await Post.find();
    res.render("home.ejs" , {homeContent: homeStartingContent, posts: posts});
  }catch(err){
    console.log(err);
  }
});

app.get("/about" , (req,res)=>{
  res.render("about.ejs" , {aboutContent: aboutContent});
});

app.get("/contact" , (req,res)=>{
  res.render("contact.ejs" , {contactContent: contactContent});
});

app.get("/compose" , (req,res)=>{
  res.render("compose.ejs");
});

app.get("/posts/:postName", async (req,res)=>{
  const posts = await Post.find();
  posts.forEach( (element)=>{
    if( lodash.camelCase( element.title ) === lodash.camelCase( req.params.postName) ){
      res.render("post.ejs", {post: element});
    }
  } );
});

app.post("/compose", (req,res)=>{
  const post = new Post({
    title: req.body.title,
    content: req.body.post
  });

  post.save();
  
  res.redirect("/");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
