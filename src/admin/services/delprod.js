export async function delData(id) {
    const data = await fetch(`http://localhost:3000/users/${id}`,{
                 method: 'DELETE'
            });
        return data;
}