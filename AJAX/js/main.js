//  LOAD BY JS

const jsButton = document.querySelector('.js')
const jsContainer = document.querySelector('.js-container');

function requestXML(obj) {
    let request = new XMLHttpRequest();
	request.open(obj.method, obj.url); 
	request.onreadystatechange = function () {
		if (this.readyState === 4) {
			if (this.status === 200) {
				if (obj.dataType === 'json') {
					try {
						obj.success(JSON.parse(this.response));
					} catch (e) {
						obj.error(e);
					}
				} else {
					obj.success(this.response);
				}
			} else {
				obj.error(this.status);
			}
		}
	};
	request.send();
}

jsButton.addEventListener('click', function () {
	requestXML({
		method: 'GET',
		url: 'https://jsonplaceholder.typicode.com/users',
		dataType: 'json',
		error: function (e) {
			console.log(e);
		},
		success: function (parsed) {
            parsed.forEach(item => {
                jsContainer.insertAdjacentHTML('beforeend',`
                <div class="item-js">${item.name}</div>
                `);
            });	
		}
	});
},{once:true});

//  LOAD BY FETCH

const fetchButton = document.querySelector('.fetch');
const elementContaner = document.querySelector('.fetch-container');

fetchButton.addEventListener('click', function(){
    createBoardFetch()
})

async function createBoardFetch(){
    document.querySelector('.pre-loader').classList.remove('done')
    fetch(`https://jsonplaceholder.typicode.com/users/`)
        .then(response => response.json())
        .then((data) => {
            document.querySelector('.pre-loader').classList.add('done')
            data.forEach((item) => {
                elementContaner.innerHTML +=
                `<div id='${item.id}' class="element">
                    <h3 class="element-title">${item.name}</h3>
                    <div class="buttons">
                        <button class="edit">Edit</button>
                        <button class="delete">Delete</button>
                    </div>
                    <div class="correct">
                        <input type="text" value="${item.name}">
                        <button class="save">Save</button>
                    </div>
                </div>
                `
            })
            elementContaner.addEventListener('click', (e) => {
                const editItem = e.target.closest('.element');
                if (e.target.innerHTML === 'Edit'){
                    document.querySelector(`[id='${editItem.id}'] .correct`).style.display = 'flex';
                    document.querySelector(`[id='${editItem.id}'] .save`).addEventListener('click', function() {
                        let index = parseInt(editItem.id);
                        document.querySelector('.pre-loader').classList.remove('done')
                        fetch(`https://jsonplaceholder.typicode.com/users/${index}`,{
                            method: 'PUT',
                            body: JSON.stringify({
                                id: index,
                                name: document.querySelector(`[id='${editItem.id}'] input`).value
                            }),
                            headers: {
                                'Content-type': 'application/json; charset=UTF-8'
                            }
                        })
                        .then((response) => response.json())
                        .then((data) => {
                            document.querySelector('.pre-loader').classList.add('done');
                            document.querySelector(`[id='${editItem.id}'] .element-title`).textContent = data.name;
                            document.querySelector(`[id='${editItem.id}'] .correct`).style.display = 'none';
                        })
                        .catch((e) => {
                            console.log(e);
                        })
                    })
                } 
                if (e.target.innerHTML === 'Delete'){
                    document.querySelector('.pre-loader').classList.remove('done');
                    fetch(`https://jsonplaceholder.typicode.com/posts/${editItem.id}`, {
                        method: 'DELETE'
                        })
                        .then(() => {
                            document.querySelector('.pre-loader').classList.add('done');
                            alert(`Card with`+
                            ` ${document.querySelector(`[id='${editItem.id}'] .element-title`).textContent} deleted`)
                            document.querySelector(`[id='${editItem.id}']`).remove();
                        })
                        .catch((e) => {
                            console.log(e);
                        })
                }
            })  
        }).catch((e) => {
            console.log(e);
        })
}