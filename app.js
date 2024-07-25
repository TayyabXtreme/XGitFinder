const modeChangeBtn= document.getElementById('modeChangeBtn');

let flag=true
let icon=document.getElementById('icon');
modeChangeBtn.addEventListener('click', () => {


    if(flag){
    
    document.documentElement.style.setProperty('--backgroundColor', 'white');
    document.documentElement.style.setProperty('--whiteColor', 'black');
    document.documentElement.style.setProperty('--blurColor', 'rgba(0, 147, 245, 0.125)');
        flag=false;
        icon.innerHTML='dark_mode'

    }
    else{
        document.documentElement.style.setProperty('--backgroundColor', 'rgb(20, 29, 46)');
    document.documentElement.style.setProperty('--whiteColor', 'white');
    document.documentElement.style.setProperty('--blurColor', 'rgba(255, 255, 255, 0.178)');
        flag=true;
        icon.innerHTML='light_mode'
    }

})


let userName='TayyabXtreme'
let apiUrl=`https://api.github.com/users/${userName}`


const profileImage=document.getElementById('profileImage')
const Uname=document.getElementById('Uname')
const username=document.getElementById('username')
const bio=document.getElementById('bio')
const mygit=document.getElementById('mygit')
const repo=document.getElementById('repo')
const followers=document.getElementById('followers')
const following=document.getElementById('following')
const repBtn=document.getElementById('repBtn')
const followersBtn=document.getElementById('followersBtn')
const followingBtn=document.getElementById('followingBtn')

async function getCurrentUser(){
    const response=await fetch(apiUrl)
    const data=await response.json()
    profileImage.src=data.avatar_url
    Uname.innerHTML=data.name
    username.innerHTML=data.login
    username.href=data.html_url
    bio.innerHTML=data.bio
    repo.innerHTML=data.public_repos
    followers.innerHTML=data.followers
    following.innerHTML=data.following

    mygit.addEventListener('click',()=>{
        window.open(data.html_url)
    })


    repBtn.addEventListener('click',()=>{
        getRepositories(data.repos_url)
    })

    followersBtn.addEventListener('click',()=>{

        getAllFollowers(data.followers_url)
    })

    followingBtn.addEventListener('click',()=>{

        getAllFollowing(data.following_url.replace('{/other_user}',''))
    }
    )




    


     console.log(data)


}

getCurrentUser()



const cardBox=document.getElementById('cardBox')


async function getRepositories(url){

    const response=await fetch(url)
    const data=await response.json()
    

    cardBox.innerHTML=''

    for(let i=0;i<data.length;i++){
        let repositoryName=data[i].name
        let repositoryDesc=data[i].description
        let language=data[i].language
        let stars=data[i].stargazers_count
        let fork=data[i].forks

        let publicorprivate=data[i].private ? 'private' : 'public'
        cardBox.innerHTML+=`


          <div class="card">


                        <div class="part-1">
                            <span>
                                <h2>${repositoryName}</h2>
                                <p>${repositoryDesc}</p>
                            </span>
                            <span>
                                <a >${publicorprivate}</a>
                            </span>
                        </div>
                        <div class="part-2">
                            
                            <span class="material-symbols-outlined">
                                code
                            </span>
                            <p>${language}</p>

                            <span class="material-symbols-outlined">
                                star
                            </span>

                            <p>${stars}</p>

                            <span class="material-symbols-outlined">
                                share
                            </span>

                            <p>${fork}</p>


                        </div>





                    </div>


        `
    }





}


async function getAllFollowers(url){
    const response=await fetch(url)
    const data=await response.json()

    cardBox.innerHTML=''

    for(let i=0;i<data.length;i++){
       
        let followerName=data[i].login
        let followerImage=data[i].avatar_url
        let followerUrl=data[i].html_url

        cardBox.innerHTML+=`

          <div class="card2" onClick=getSelectedUser('${followerName}')>

                        <span>
                            <img src=${followerImage} alt="">
                            <h2>${followerName}</h2>
                        </span>

                        <span>
                        <a href=${followerUrl} target="_blank">
                            <span class="material-symbols-outlined">
                                link
                                </span>
                                </a>
                        </span>
                        





                    </div>



        `

    }
    
}

async function getAllFollowing(url){
    const response=await fetch(url)
    const data=await response.json()

    cardBox.innerHTML=''

    for(let i=0;i<data.length;i++){
       
        let followerName=data[i].login
        let followerImage=data[i].avatar_url
        let followerUrl=data[i].html_url

        const username=followerName

        cardBox.innerHTML+=`


              <div class="card2" onClick=getSelectedUser('${followerName}')>

                        <span>
                            <img src=${followerImage} alt="">
                            <h2>${followerName}</h2>
                        </span>

                        <span>
                        <a href=${followerUrl} target="_blank">
                            <span class="material-symbols-outlined">
                                link
                                </span>
                        </a>
                        </span>
                        





                    </div>

        `
        
}

}



function getSelectedUser(user){
      userName=user
    apiUrl=`https://api.github.com/users/${userName}`

    getCurrentUser()
}