const form = document.getElementById("blogForm");

if (form) {
    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const content = document.getElementById("content").value;

        const response = await fetch("/add-blog", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                author,
                content
            })
        });

        const data = await response.json();

        alert(data.message);

        form.reset();
    });
}