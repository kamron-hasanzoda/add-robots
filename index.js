const baseURL = "http://localhost:3000/users";
let container = document.querySelector('.container')
let addBTN = document.querySelector('.add')
let a = document.querySelector('.a')
let b = document.querySelector('.b')
let c = document.querySelector('.c')
const form = document.forms.login
let ageInp = document.querySelector('#age')
let nameInp = document.querySelector('#name')

fetch(baseURL)
	.then((res) => res.json())
	.then((res) => reload(res))
	.catch((err) => console.log(err));

addBTN.onclick = (event) => {
	event.preventDefault();

	let data = {
		"firstName": nameInp.value,
		"age": ageInp.value,
		"image": "https://robohash.org/hicveldicta.png"
	}

	fetch(baseURL, {
		method: "POST",
		body: JSON.stringify(data),
		headers: { "Content-Type": "application/json;charset=utf-8" }
	})
		.then((res) => res.json())
		.then((res) => {
			let newItem = document.createElement('div');
			newItem.classList.add('item');
			newItem.innerHTML = `
      <img src="${res.image}" alt="">
      <span>${res.firstName}</span>
      <span>${res.age}</span>
    `
			if (res.age < 26) {
				a.appendChild(newItem);
			} else if (res.age < 51) {
				b.appendChild(newItem);
			} else {
				c.appendChild(newItem);
			}
			fetch(baseURL)
				.then((res) => res.json())
				.then((res) => reload(res))
				.catch((err) => console.log(err))
		})
		.catch((err) => console.log(err));
}

function reload(arr) {
	container.innerHTML = "";
	for (let item of arr) {
		let newItem = document.createElement("div");
		newItem.classList.add("item");
		newItem.innerHTML = `
    <img src="${item.image}" alt="">
    <span>${item.firstName}</span>
    <span>${item.age}</span>
    `;
		if (item.age < 26) {
			a.appendChild(newItem);
		} else if (item.age < 51) {
			b.appendChild(newItem);
		} else {
			c.appendChild(newItem);
		}
	}
}