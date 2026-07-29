// -----------------------------
// Add Blog Form
// -----------------------------

const blogForm = document.getElementById("blogForm");

if (blogForm) {

    blogForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const title = document.getElementById("title").value.trim();
        const author = document.getElementById("author").value.trim();
        const content = document.getElementById("content").value.trim();

        // Form Validation
        if (title === "" || author === "" || content === "") {
            alert("Please fill all the fields.");
            return;
        }

        // Send data to Express server
        const response = await fetch("/add-blog", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                title: title,
                author: author,
                content: content
            })

        });

        const result = await response.json();

        alert(result.message);

        // Clear the form
        blogForm.reset();

    });

}

// -----------------------------
// Display Blogs on Home Page
// -----------------------------

const blogList = document.getElementById("blogList");

if (blogList) {

    loadBlogs();

}

async function loadBlogs() {

    const response = await fetch("/blogs");

    const blogs = await response.json();

    blogList.innerHTML = "";

    blogs.forEach(blog => {

        blogList.innerHTML += `

        <div class="card">

            <h2>${blog.title}</h2>

            <h4>Author: ${blog.author}</h4>

            <p>${blog.content}</p>

        </div>

        `;

    });

}