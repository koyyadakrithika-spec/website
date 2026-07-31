const express = require("express");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Store blogs in a JavaScript array
let blogs = [];

// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to My Blog Website!");
});

// GET - View All Blogs
app.get("/blogs", (req, res) => {
    res.json(blogs);
});

// POST - Add Blog
app.post("/add-blog", (req, res) => {

    const newBlog = {
        title: req.body.title,
        author: req.body.author,
        content: req.body.content
    };

    blogs.push(newBlog);

    res.status(201).json({
        message: "Blog Added Successfully!",
        blogs: blogs
    });

});

// PUT - Edit Blog
app.put("/edit-blog/:id", (req, res) => {

    const id = parseInt(req.params.id);

    if (isNaN(id) || id < 0 || id >= blogs.length) {
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

// DELETE - Delete Blog
app.delete("/delete-blog/:id", (req, res) => {

    const id = parseInt(req.params.id);

    if (isNaN(id) || id < 0 || id >= blogs.length) {
        return res.status(404).json({
            message: "Blog not found"
        });
    }

    blogs.splice(id, 1);

    res.json({
        message: "Blog Deleted Successfully!",
        blogs: blogs
    });

});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});