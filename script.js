var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    //variable initialization
    const data = JSON.parse(xhttp.responseText);
    const postsContainer = document.querySelector(".posts");
    const button = document.querySelector("#btn");
    let valueD = 0;
    
    //number of posts to load per click
    let nMin = 0;
    let nMax = 4;

    let j = 0;

    //converts date format from '2019-01-12 03:00:00' to '12 Jan 2019'
    const DateConvert = (date) =>{
      let strings;
      
      strings = date.split("-");
      const months = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      let num = parseInt(strings[1])
      let year = strings[0];
      
      let day = strings[2].split(" ");
      return(day[0] +" "+ months[num] +" "+ year);
    }

    //Creates and loads new posts
    const loadPosts = () => {

      for (let i = nMin; i < nMax; i++) {
        if(data[i]){
            let newCard = document.createElement("div");
            newCard.innerHTML =
              '<div class = "card card'+j+'">'+
                '<div class="user">' +
                    '<div class="image">' +
                      '<img class="imgCircle" src="'+data[i].profile_image +'"width="60px">'+
                    '</div>'+
                    '<div class="info">' +
                        '<p class="name">'+data[i].name +'</p>' +
                        '<p class="date">'+DateConvert(data[i].date) +'</p>'+
                    '</div>'+
                        '<div class="instaLogo"><object data="instagram-logo.svg"></object></div>'+
                '</div>'+
                '<div class="post post'+j+'">'+
                    '<div liked="0" value="'+i+'" class="photoBox photoBox'+j+'">'+
                        '<img class="photo" src="'+ data[i].image +'">'+
                    '</div>'+
                    '<div class="captionBox">'+
                            '<p class="caption">'+data[i].caption+'</p>'+
                        '</div>'+
                        '<hr style="height:1px;border-width:0;background-color:#E0E0E0">'+
                    '<div value="'+i+'" class="likeButtonBox likeButtonBox'+j+'">'+
                        '<div  class="likeButton"><object class="heart" data="heart.svg"></object></div>'+
                        '<span class="likeCount" value="0">'+ data[i].likes +'</span>'+
                    '</div>'+
                '</div>'+
              '</div>';
            newCard.classList.add("box");
            postsContainer.append(newCard);

            if(data[i+1]){
              console.log(data[i])
            }else{
              console.log("hide button");
              button.classList.add("hide");
            }

        }
      }
      
        let LikeButton = document.querySelectorAll(".likeButtonBox"+j);
        let DialogBox = document.querySelectorAll(".photoBox"+j);

        //add event listener to every new like button
        LikeButton.forEach(item => {
          item.addEventListener('click', event => {likeCounter(item);})
        })
        //add event listener to every new picture
        DialogBox.forEach(picture => {
          
          picture.addEventListener('click', event => {DialogBoxOpen(picture);})
        })

        j++;
    
    };//END of function

    //loads first page of posts
    loadPosts();

    //Load more button
    button.addEventListener("click", function(){
    
      nMax+=4;
      nMin+=4;

      loadPosts()
    });

    //like Counter function
    const likeCounter = (item) => {
      item.querySelector(".likeButton").classList.toggle("Red");
      let value = item.querySelector(".likeCount").getAttribute("value");
      let index = item.getAttribute("value");
      let likeNum = item.querySelector(".likeCount").innerHTML;
      console.log("index: "+index);

      if(value == 0){
          item.querySelector(".likeCount").innerHTML = ++likeNum;
          item.querySelector(".likeCount").setAttribute("value",1);
          data[index].likes += 1;
          
      } 
      else {
          item.querySelector(".likeCount").innerHTML = --likeNum;
          item.querySelector(".likeCount").setAttribute("value",0);
          data[index].likes -= 1;
      }
    }

    //Create dialog
    const DialogBoxOpen = (picture) =>{
      console.log("picture")
      
       let DialogBoxCard = document.createElement("div");
       let valueBox = parseInt(picture.getAttribute("value"));
      //  let likeValue1 = picture.querySelector(".likeCount").getAttribute("value");
      //  console.log("likevaluie"+likeValue1);

       DialogBoxCard.innerHTML =
       '<div class="dialogBox">'+
              '<div class="photoBoxDialog"><img class="photoDialog" src="'+data[valueBox].image+'"></div>'+
              '<div class="DialogRight">'+
                '<div class="userDialog">' +
                    '<div class="image">' +
                      '<img class="imgCircle" src="'+data[valueBox].profile_image +'"width="60px">'+
                    '</div>'+
                    '<div class="info">' +
                        '<p class="name">'+data[valueBox].name +'</p>' +
                        '<p class="date">'+DateConvert(data[valueBox].date) +'</p>'+
                    '</div>'+
                        '<div class=" instalogoDialog"><object data="instagram-logo.svg"></object></div>'+
                '</div>'+
                '<hr style="height:1px;width:340px;border-width:0;background-color:#E0E0E0">'+
                '<div class="captionDialog">'+data[valueBox].caption+'</div>'+
                '<div value="'+0+'" class="likeButtonBoxDialog">'+
                        '<div  class="likeButton"><object class="heart" data="heart.svg"></object></div>'+
                        '<span class="likeCountDialog" value="0">'+ data[valueBox].likes +'</span>'+
                    '</div>'+
              '</div>'+  
            '</div>'+
       '<div class="dialogBackground"></div>';
      
       DialogBoxCard.classList.add("dialogBoxContainer");
       document.querySelector(".Dialog").append(DialogBoxCard);

       //remove dialog  
       document.querySelector(".dialogBackground").addEventListener("click",function(){
        console.log("da");
        DialogBoxCard.remove();
       })

       //like inside dialog
       document.querySelector(".likeButtonBoxDialog").addEventListener("click",function(){
        console.log("DIALOG");
        
                  this.querySelector(".heart").classList.toggle("Red");
                  let likeNum = parseInt(this.querySelector(".likeCountDialog").innerHTML);

                if(valueD == 0){
                    this.querySelector(".likeCountDialog").innerHTML = ++likeNum;
                    valueD = 1;
                } 
                else {
                    this.querySelector(".likeCountDialog").innerHTML = --likeNum;
                  valueD = 0;
                }

                // let postCard = document.querySelector(".photoBox").getAttribute("value");
                // console.log("========"+postCard);

                // likeCounter();


      });
       


    }//END of function
  
    // document.querySelector("#btn2").addEventListener("click",function(){
    //   data[0].likes = '1000';
    //   console.log("clsdkfksdnf");
    // })
  }
};
xhttp.open("GET", "data.json", true);
xhttp.send();
