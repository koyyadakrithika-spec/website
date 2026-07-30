const express = require("express");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Store blogs in an array
let blogs = [];

// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to My Blog Website!");
});

// Get All Blogs
app.get("/blogs", (req, res) => {
    res.json(blogs);
});

// Add Blog
app.post("/add-blog", (req, res) => {

    const newBlog = {
        title: req.body.title,
        author: req.body.author,
        content: req.body.content
    };

    blogs.push(newBlog);

    res.json({
        message: "Blog Added Successfully!",
        blogs: blogs
    });

});

// Edit Blog
app.put("/edit-blog/:id", (req, res) => {

    const id = req.params.id;

    // Check if blog exists
    if (id >= blogs.length || id < 0) {
        return res.status(404).json({
            message: "Blog not found"
        });
    }

    blogs[id] = {
        title: req.body.title,
        author: req.body.author,
        content: req.body.content
    };

    res.json({
        message: "Blog Updated Successfully!",
        blogs: blogs
    });

});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});