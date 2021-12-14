import axios from 'axios';
async function PostTodo(payLoad) {
    return (
        axios.post('http://localhost:3000/todo',
            payLoad
        )
    )
}
export default PostTodo;

export async function DeleteTodo(id) {
    return (
        axios.delete(`http://localhost:3000/todo/${id}`)
    )
}
export async function UpdateStatus(id, status) {

    return (
        axios.patch(`http://localhost:3000/todo/${id}`, {
            status: status
        })
    )
}