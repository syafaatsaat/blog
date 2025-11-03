import express from "express";
import bodyParser from "body-parser";
import _ from "lodash";

const app = express();
const port = 3000;

// store all posts here
const postArray = Array();
let nextFreeID = 0;

// make separate ejs for post creation/editing site (edit-post.ejs)

// make another separate ejs for post view site (view-post.ejs)
    // set tab title to post title


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//
app.get("/", (req, res) => {
  res.render("index.ejs", {
    posts: postArray
  });
});

app.get("/edit", (req, res) => {
  res.render("edit.ejs");
});

app.get("/edit/:postID", (req, res) => {
  let postTitle = req.params.postID;

  postArray.forEach(post => {
    if (_.toLower(postTitle) == _.toLower(post.title)) {
      res.render("edit.ejs", {
        title: post.title,
        content: post.content
      });
    }
  });
});

// edit post method which receives input (post title and content)
// processes them with body parse
// stores them as an object inside postArray 
app.post("/edit", (req, res) => {
  let newPost = {
    "title": req.body["title"],
    "content": req.body["content"],
    "date": Date()
  };

  postArray.push(newPost);
  res.redirect('/');
});

// post get method that initializes routes to the individual post on their own pages
app.get("/posts/:postID/:postTitle", (req, res) => {
  let postID = req.params.postID;
  let postTitle = req.params.postTitle;

  postArray.forEach(post => {
    if (_.toLower(postTitle) == _.toLower(post.title)) {
      res.render("post.ejs", {
        title: post.title,
        date: post.date,
        content: post.content
      });
    }
  });
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});