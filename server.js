const express = require("express");

const app = express();

const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// Store blogs in a JavaScript array
let blogs = [];

// Home Page
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Get all blogs
app.get("/blogs", (req, res) => {
    res.json(blogs);
});

// Add new blog
app.post("/add-blog", (req, res) => {

    const { title, author, content } = req.body;

    // Validation
    if (!title || !author || !content) {
        return res.status(400).json({
            message: "Please fill all fields."
        });
    }

    const newBlog = {
        id: blogs.length + 1,
        title,
        author,
        content
    };

    blogs.push(newBlog);

    res.status(201).json({
        message: "Blog Added Successfully!",
        blog: newBlog
    });

});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});