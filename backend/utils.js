let message = "hello world"

function showMessage() {
    console.log(message);
}

console.log(module)

module.exports = {
    message: message,
    second_variable: "again",
    sayHello: showMessage
}

console.log(module)