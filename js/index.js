// [User Search Endpoint](https://developer.github.com/v3/search/#search-users)

//Add event listener to the submit button after buildUser
document.querySelector('form').addEventListener('submit', handleSubmit)

function handleSubmit(e){
    e.preventDefault()
    getUsers(e.target.search.value)
    console.log('I have been Clicked')
}

/**
 * Fetch the data from the server and test to ensure that we receive
 * data from it.
 */

getUsers = (user) => {
    fetch(`https://api.github.com/search/users?q=${user}`)
    .then(resp => resp.json())
    .then(user => { console.log(user)
        user.items.forEach(user => buildUser(user))
    }) //console.log(user)
}
//getUsers("user")

/**
 * Part 3: Add user to the db.json fetch: POST
 */

 handleAddUser = (userObj) => {
     //debugger
    fetch('http://localhost:3000/coder',{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(userObj)
    })
}
/**
 * Part 2: Get data to be displayed on the page
 */



buildUser = (user) => {

    let userObj = {
        user: user.login,
        repoUrl:  user.repos_url,
        avatar: user.avatar_url
    }

    //let div = document.createElement('div')
    let main = document.getElementById('main')
    let userList = document.querySelector('#user-list')
    let repoList = document.querySelector('#repos-list')
    let avatarList = document.querySelector('#avatar-list')
    let userName = document.createElement('li')
    let userRepo = document.createElement('li')
    let img = document.createElement('img')
    let btn = document.createElement('button')
   
    userName.textContent = user.login
    userRepo.textContent = user.repos_url
    img.src = user.avatar_url
    img.style.width ="80px"
    img.style.height ="80px"
    userList.appendChild(userName)
    repoList.appendChild(userRepo)
    avatarList.appendChild(img)

    //debugger

    btn.textContent = "Add User"
    btn.addEventListener('click', () => handleAddUser(userObj))
    avatarList.appendChild(btn)
}

