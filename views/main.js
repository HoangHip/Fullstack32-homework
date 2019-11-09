document.querySelector(".btn-login").addEventListener("click", () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    fetch("/api/auth/signin", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
            })

        }).then(res => res.json())
        .then(data => {
            if (data.success) {
                document.getElementById("app").innerHTML = `<h1 class="text-center">Hello ${data.data.name}</h1>`;
            } else {
                document.getElementById("error").innerText = data.error;
            }
        })
})