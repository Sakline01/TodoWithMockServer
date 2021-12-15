export default function pagination(todo) {

    var pagee = [];
    for (let i = 1; i <= Math.ceil(todo / 3); i++) {

        pagee.push(i);
    }
    return pagee;
}