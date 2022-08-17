// 1.

// let currentPage = 1;
// let totalPages;

// function getUsers(page) {
//     fetch('https://reqres.in/api/users?page=' + page,{
//     method: 'GET'
// })

// .then(function(answer){
//     if (answer.status !== 200) {
//         throw answer.status
//     }
//     return answer.json()
// }) 
// .then(function(jsanswer){
//     const fragment = document.createDocumentFragment();

//     jsanswer.data.forEach(element => {
//         let li = document.createElement('li')
//         li.textContent = element.email
//         li.style.color = 'blue'
//         let li2 = document.createElement('li')
//         li2.textContent =element.last_name
//         li2.style.color = 'red'
//         fragment.appendChild(li)
//         fragment.appendChild(li2)

//     });

//     document.getElementById('list').innerHTML = ' '
//     document.getElementById('list').appendChild(fragment)

//     totalPages = jsanswer.total_pages;

// })
// .catch(function(erroranswer){
//     if (erroranswer == 404) {
//         let p = document.createElement('p')
//         p.textContent = 'page not found'
//         document.getElementById('divwraper').appendChild(p)
//     } else if (erroranswer == 500) {
//         let p = document.createElement('p')
//         p.textContent = 'server error'
//         document.getElementById('divwraper').appendChild(p)
//     } else {
//         console.log('error');
//     }
// })
// }

// document.getElementById('prev').addEventListener('click', function(){
//     if (currentPage == 1) {
//         return
//     }
//     currentPage -= 1;
//     getUsers(currentPage)
// })
// document.getElementById('next').addEventListener('click', function(){
//     if (currentPage == totalPages) {
//         return; 
//     }
//     currentPage += 1;
//     getUsers(currentPage)
// })

// getUsers();

// 2.

let currentPage = 1;
let totalPages;

function renderLogika() {
    let answer = this.responseText;
    let jsanswer = JSON.parse(answer);
    console.log(jsanswer);
    totalPages = jsanswer.total_pages;

    let ul = document.getElementById('list')
    ul.innerHTML = ' '
    jsanswer.data.forEach(element => {
        let li = document.createElement('li')
        li.classList.add('li-item')
        let span = document.createElement('span')
        span.textContent = element.id + ' ' + element.first_name
        let img = document.createElement('img')
        img.src = element.avatar
        ul.appendChild(li)
        li.appendChild(img)
        li.appendChild(span)
    });
    document.getElementById('divwraper').appendChild(ul)
}

function errorLogika() {
    let p = document.createElement('p')
    p.textContent = 'server error'
    p.style.color = 'red'
    document.getElementById('divwraper').appendChild(p)
}

function getUsers(page) {   
    let request = new XMLHttpRequest();
    request.addEventListener('load', renderLogika)
    request.addEventListener('error', errorLogika)
    request.open('GET', 'https://reqres.in/api/users?page=' + page)
    request.send();
}
document.getElementById('prev').addEventListener('click', function(){
    if (currentPage == 1) {
        return
    }
    currentPage -= 1;
    getUsers(currentPage)
})
document.getElementById('next').addEventListener('click', function(){
    if (currentPage == totalPages) {
        return; 
    }
    currentPage += 1;
    getUsers(currentPage)
})
   
getUsers(currentPage);
