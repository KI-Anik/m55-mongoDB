import { useLoaderData } from "react-router-dom";

const Update = () => {
    const loadedUser = useLoaderData()

    const hadnleUpdate = e => {
        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        console.log(name, email)
    }
    return (
        <div>
            <h2>Update form of {loadedUser.name}</h2>
            <form onSubmit={hadnleUpdate}>
                <input type="text" name="name" id="" defaultValue={loadedUser?.name} />
                <br />
                <input type="email" name="email" id="" defaultValue={loadedUser?.email} />
                <br />
                <input type="submit" value="Update" />
            </form>
        </div>
    );
};

export default Update;