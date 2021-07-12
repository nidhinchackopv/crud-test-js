

export async function editProd(props,state) {
    console.log(props)
    console.log(state)
    const data = await fetch(`http://localhost:3000/users/${props.match.params.id}`, {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                title: state.title,
                body: state.body
            })
        })
 return data;
}

export async function editProdOne(props) {
    console.log(props)
        const response = await fetch(`http://localhost:3000/users/${props.match.params.id}`);

        const data = await response.json();
        return data;
}