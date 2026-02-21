const form = document.getElementById("contact-form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    try {
        const res = await fetch("/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, message })
        });

        const data = await res.json();

        if (data.success) {
            alert("Message sent successfully!");
            form.reset();
        } else {
            alert("Error sending message");
        }
    } catch (err) {
        console.error(err);
        alert("Server error");
    }
});
