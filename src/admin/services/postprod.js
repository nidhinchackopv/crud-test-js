export async function getData(title,body) {
    const data = await fetch("http://localhost:3000/users", {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                title,
                body
            })
        })
 return data;
}