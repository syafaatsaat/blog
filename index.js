import express from "express";
import bodyParser from "body-parser";
import _ from "lodash";

const app = express();
const port = 3000;

// store all posts here
const postArray = Array();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//
app.get("/", (req, res) => {
  res.render("index.ejs", {
    posts: postArray
  });
});

// ------------------------------------------------------------
// EDIT ROUTES BELOW ------------------------------------------
// ------------------------------------------------------------

app.get("/create", (req, res) => {
  res.render("create.ejs");
});

app.get("/edit/:postID/:postTitle", (req, res) => {
  let postID = req.params.postID;

  res.render("edit.ejs", {
    id: postID,
    title: postArray[postID].title,
    content: postArray[postID].content
  });
});

// create post method which receives input (post title and content)
// processes them with body parse
// stores them as an object inside postArray 
app.post("/create", (req, res) => {
  let newPost = {
    "title": req.body["title"],
    "content": req.body["content"],
    "date": Date()
  };

  postArray.push(newPost);
  res.redirect('/');
});

// edit post method which receives input (post title and content)
// processes them with body parse
// stores them as an object inside postArray 
app.post("/edit/:postID/:postTitle", (req, res) => {
  let postID = req.params.postID;
  postArray[postID].title = req.body["title"];
  postArray[postID].content = req.body["content"];

  res.redirect('/');
});

// ------------------------------------------------------------
// CREATE ROUTES BELOW ----------------------------------------
// ------------------------------------------------------------

app.get("/delete/:postID/:postTitle", (req, res) => {
  let postID = req.params.postID;
  console.log("postArray (before): ", postArray);

  postArray.splice(postID, 1);
  console.log("postArray (after): ", postArray);

  res.redirect('/');
});

// ------------------------------------------------------------
// POST VIEW ROUTE --------------------------------------------
// ------------------------------------------------------------

// post get method that initializes routes to the individual post on their own pages
app.get("/posts/:postID/:postTitle", (req, res) => {
  let postID = req.params.postID;
  let postTitle = req.params.postTitle;

  let thePost = postArray[postID];
  console.log(postTitle, " == ", thePost.title, " : ", postTitle == thePost.title);

  res.render("post.ejs", {
    title: thePost.title,
    date: thePost.date,
    content: thePost.content
  });
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});