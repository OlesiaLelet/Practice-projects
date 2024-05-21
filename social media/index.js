const root = document.getElementById("root");


const init =  async () => {
    if (!root) {
        console.error("no root element");
        return
    }
   const posts = await getPosts();
   const users = await getUsers();
   const photos = await getPhotos();
   const comments = await getComments();
//Promise.all([getPosts, getUsers, getPhotos, getComments]);
// замість цих 4 рядків застосувати promise all;
   


    const postWithUser = posts.map ((post) => {
        const user = users.find(user => user.id === post.userId);
        const photo = photos.find(photo => photo.id === post.userId);
        const comment = comments.filter(comment => comment.postId === post.id);
        const postPhoto = photos.find(photo => photo.id === post.id);

        if(!comment) {
            return post;
        }
        if(!user) {
            return post;
        }
        if(!photo) {
            return post;
        }
        if (!postPhoto) {
            return post;
        }

        return {...post, user, photo, postPhoto, comment};
    });

                            
    

    
    console.log(postWithUser);

   renderPostWithUserAndPhotoAndComm(postWithUser);

}     
   


    const getPosts = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');

            const data = await response.json();

            return data;
        } catch (er) {
            console.error("don't find fetch");
            return [];
        }
    }  
    
    const getUsers = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const data = await response.json();
            return data;
        } catch (er) {
            console.error("don't find fetch");
            return [];
        }
        
    }

    const getPhotos = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/photos');
            const data = await response.json();
            return data;
        } catch (er) {
                console.error("don't find fetch");
                return [];
            }
    }
    
    const getComments = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/comments');
            const data = await response.json();
            return data;
        } catch (er) {
                console.error("don't find fetch");
                return [];
            }
    }
    
    const deleteComment = async (id) => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/comments/' + id, {
                method: 'DELETE',
                })
            const data = await response.json;
            console.log("successfully deleted");
            return data;
        } catch (er) {
            console.error("don't find fetch");
            return [];
        }
    }
        
    
    const renderPostWithUserAndPhotoAndComm = (posts) => {
        posts.forEach ((post) => {

            const div = document.createElement("div");
            div.classList.add("content");
            root.appendChild(div);
                
            const divUser = document.createElement("div");
            div.appendChild(divUser);
            divUser.classList.add("content__user");
                

            const spanAvatar = document.createElement("span");
            spanAvatar.classList.add("content__user--avat");
            divUser.appendChild(spanAvatar);
            spanAvatar.style.backgroundImage = `url(${post.photo.url})`;

    
            const spanNick = document.createElement("span");
            spanNick.classList.add("content__user--nick");
            divUser.appendChild(spanNick);
            spanNick.innerHTML = post.user.name;;
            
                
                
            const spanTitle = document.createElement("span");
            spanTitle.classList.add("content__title");
            div.appendChild(spanTitle);
            spanTitle.innerHTML = post.title;
            const line = document.createElement("span");
            div.appendChild(line);
            line.classList.add("content__line");

            const spanText = document.createElement("span");
            spanText.classList.add("content__text");
            div.appendChild(spanText);
            spanText.innerHTML = post.body;

            const spanPhoto = document.createElement("span"); 
            spanPhoto.classList.add("content__postPhoto");
            div.appendChild(spanPhoto);
            const pict = document.createElement("img");
            pict.src = post.postPhoto.url;
            pict.alt = "post_picture";
            pict.classList.add("content__postPhoto--pict");
            spanPhoto.appendChild(pict);
            //spanPhoto.style.backgroundImage = `url(${post.postPhoto.url})`

            const spanComm = document.createElement("span");
            spanComm.classList.add("content__amountOfComments");
            div.appendChild(spanComm);
            const amountOfCom = document.createElement("span");
            spanComm.appendChild(amountOfCom);
            spanComm.innerHTML = `${post.comment.length} comments`;

            const img = document.createElement("img");
            img.src = "images/commentars.png";
            img.alt = "open_comments";
            img.role = "button";
            img.classList.add("content__commentsIcon");
            div.appendChild(img);

            let showComments = null;
            img.addEventListener('click', function(){
                if (showComments=== null) {
                    showComments = document.createElement("div");
                    div.appendChild(showComments);
                    showComments.classList.add("divComments");
                            

                    post.comment.forEach((commentar) => {
                    const comment = document.createElement("span");
                    showComments.appendChild(comment);
                    comment.classList.add("divComments__сontent");

                    const spanAvatar = document.createElement("span");
                    spanAvatar.classList.add("divComments__сontent--avatar");
                    comment.appendChild(spanAvatar);
                    spanAvatar.style.backgroundImage = 'url(images/user1.png)';
 
                            const spanUserAndComm = document.createElement("span");
                            spanUserAndComm.classList.add("divComments__сontent--userAndComm");
                            comment.appendChild(spanUserAndComm);

                            const users = document.createElement("span");
                            spanUserAndComm.appendChild(users);
                            users.classList.add("userAndComm__nickn");
                            users.innerHTML = commentar.name;
                           
                            
                
                            const deleteButton = document.createElement("img");
                           
                            deleteButton.src = "images/delete.png";
                            deleteButton.alt = "delete_comment";
                            deleteButton.role = "button";
                            users.appendChild(deleteButton);
                            deleteButton.classList.add("userAndComm__deleteButton");
                            // deleteButton.onclick = deleteComment(commentar.id);
                            deleteButton.addEventListener('click', function (params) {
                                comment.style.display = 'none';
                                deleteComment(commentar.id);
                            })
                               
                        
                            
                            const body = document.createElement("span");
                            spanUserAndComm.appendChild(body);
                            body.innerHTML = commentar.body;

                        });
                        } if (showComments.style.display!=="none") {
                                    showComments.style.display="none" ;
                                 } else {
                                    showComments.style.display = "flex" ;
                                 }

                        });
              });
            };

         init ();
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // for (let i=0; i< amount; i++) {
    //   newDiv = document.createElement("div");
    //   newDiv.classList.add("post");
    //   root.appendChild(newDiv);
    //   arrOfPosts.push(newDiv);

    //   newContent = document.createElement("div");
    //   newContent.classList.add("content");
    //   newDiv.appendChild(newContent);
    //   arrOfCont.push(newContent);

    //   newUser = document.createElement ("span");
    //   newUser.classList.add("user");
    //   newDiv.appendChild(newUser);
    //   arrOfUsers.push(newUser);

    //   newPictOfUser = document.createElement ("span");
    //   newPictOfUser.classList.add("pict");
    //   newPictOfUser.id = `p${i}`;
    //   newUser.appendChild(newPictOfUser);
    //   arrOfPict.push(newPictOfUser);

    //   newNick = document.createElement("span");
    //   newNick.classList.add("nick");
    //   newUser.appendChild(newNick);
    //   arrOfNick.push(newNick);
    //  // newNick.id = i;

    //   newTitle = document.createElement("h3");
    //   newTitle.classList.add("title");
    //   newTitle.id = `T${i}`;
    //   newContent.appendChild(newTitle);
    //   arrOfTitle.push(newTitle);

    //   newText = document.createElement("span");
    //   newText.classList.add("text");
    //   newText.id = `t${i}`;
    //   newContent.appendChild(newText);
    //   arrOfText.push(newText);
      
//     // }

//     const getdata = async () => {
//         try {
//         const response = await fetch('https://jsonplaceholder.typicode.com/posts');
//         const users = await fetch('https://jsonplaceholder.typicode.com/users');
//         const photos = await fetch('https://jsonplaceholder.typicode.com/photos');
//         const data = await response.json();
//         const dataU = await users.json();
//         const dataPh = await photos.json();
//          console.log(data);
//          console.log(dataU);
//         for (let i = 1; i <= arrOfPosts.length; i++) {
//         arrOfPosts[i].id = data[i].id;
//         arrOfUsers[i].id = data[i].userId;
//          let title = document.getElementById(`T${i}`).innerHTML = data[i].title;
//          let text = document.getElementById(`t${i}`).innerHTML = data[i].body;
         
//          //let nick = document.getElementById(`u${i}`).innerHTML = dataU[i].username;
//          let pict = document.getElementById(`p${i}`).style.backgroundImage = `url(${dataPh[i].url})`;


            
//          }
//         console.log(data);
//        } 
//         catch (err) {
//             console.error("we have some error:", err);
//         }
//  }
//     getdata();
//     let date = new Date;
//     console.log(date);

    

// }
// showPosts(100)

 //  if (++arrOfNick[i].id === data[i].userId) {
        //     userId = arrOfNick[i].id =  dataU[i].id;
        //  }