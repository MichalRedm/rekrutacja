const codes = [

`<DOCTYPE html>
<html lang="en">
<head>
    <title>AKAI</title>
    <meta charset="utf-8" />
</head>
<body>
    <h1>Lorem ipsum</h1>
<body>
<html>`,

`for i := 0; i < 10; i++ {
    fmt.println("Hello world!")
}`,

`SELECT * FROM USERS
ORDER BY username DESC`,

`<?php foreach($users as $user): ?>
    <div class="card">
        <h1><?=$user["username"]?></h1>
        <p><?=$user["email"]?></p>
    </div>
<?php endforeach; ?>`,

`<form method="POST" action="login.php">
    <input type="email" name="email" placeholder="Email" />
    <input type="password" name="pass" placeholder="Password" />
    <input type="submit" value="Log in" />
</form>`,

`.button {
    border: none;
    background: transparent;
    font-size: inherit;
    font-family: inherit;
    border-radius: 100px;
    transition: all 0.3s ease;

    &:hover {
        background: white;
        color: black;
    }
}`,

`.row {
    display: flex;
    gap: 16px;
}`,

`html, body {
    padding: 0;
    margin: 0;
}`,

`interface user {
    id: number,
    email: string,
    fname: string,
    lname: string
}`,

`let xhttp = new XMLHttpRequest();
xhttp.onload = function() {
    console.log(this.responseText);
}
xhttp.open("GET", "get_data.php", false);
xhttp.send();`,

`CREATE OR REPLACE VIEW [ Product List] AS
SELECT ProductID, ProductName, Category
FROM Products
WHERE Discontinued = No;`,

`SELECT COUNT(price), price FROM orders 
WHERE price < 70 GROUP BY price ORDER BY price`,

`function isPrime(n: number): boolean {
    for (let i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            return false;
        }
    }
    return true;
}`,

`func GetBookById(Id int64) (*Book, *gorm.DB) {
    var getBook Book
    db := db.Where("ID=?", Id).Find(&getBook)
    return &getBook, db
}`,

`import random
print(random.randint(0,9))`,

`console.log("Hello world!")`,

`<?php
class Fruit {
    public $name;
    public $color;

    function __construct($name) {
        $this->name = $name;
    }
    function __destruct() {
        echo "The fruit is {$this->name}.";
    }
}

$apple = new Fruit("Apple");
?> `,

`<?php
header("Content-Type: application/json");
$age = array("Peter"=>35, "Ben"=>37, "Joe"=>43);
echo json_encode($age);
?>`,

`import React from 'react';
import ReactDOM from 'react-dom/client';

function Hello(props) {
  return <h1>Hello World!</h1>;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Hello />);`,

`var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!');
}).listen(8080);`,

`@keyframes colors {
    0%   {background-color: red;}
    25%  {background-color: yellow;}
    50%  {background-color: blue;}
    100% {background-color: green;}
}`,

`@media only screen and (max-width: 1024px) {
    .container {
        flex-direction: column;
    }
}`,

`$("button").click(function(){
    $("div").animate({
        left: '250px',
        height: '+=150px',
        width: '+=150px'
    });
});`,

`<ul>
    {% for x in mymembers %}
        <li>{{ x.firstname }}</li>
    {% endfor %}
</ul>`,

`<?xml version="1.0" encoding="UTF-8"?>`,

`const elem: HTMLDivElement = document.createElement("div");
elem.classList.add("card");
document.body.appendChild(elem);`,

`public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}`

];

let choicesRecent = [], choicesRemaining = [];

for (var i = 0; i < codes.length; i++) {
    choicesRemaining.push(i);
}

setInterval(animateCode, 1000);
animateCode();

function animateCode() {

    if (document.hidden) {
        return;
    }

    let index = choose(choicesRemaining);
    let c = codes[index];
    choicesRecent.push(index);
    if (choicesRecent.length > 18) {
        choicesRemaining.push(choicesRecent.shift());
    }

    const pre = document.createElement("pre");
    pre.innerText = c;

    let from = { x: Math.random(), y: Math.random() };
    let to   = { x: Math.random(), y: Math.random() };
    let fontSize = Math.random() * 0.25 + 0.75;

    pre.style.transform = `translate(calc(${from.x * 100}vw - 50%), calc(${from.y * 100}vh - 50%))`;
    pre.style.fontSize = `${fontSize}em`;
    document.body.appendChild(pre);
    setTimeout(() => pre.style.transform = `translate(calc(${to.x * 100}vw - 50%), calc(${to.y * 100}vh - 50%))`, 10);

    setTimeout(() => pre.remove(), 20000);

}

function choose(choices) {
    let index = Math.floor(Math.random() * choices.length);
    let result = choices[index];
    choices.splice(index, 1);
    return result;
}
