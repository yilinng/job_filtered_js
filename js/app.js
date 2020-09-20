//ES6 support JSON importing with the following syntax: import * as data from './example.json'; 
//
const allPost = document.querySelector('#allPost');
const tag = document.querySelector('.tag');
const cleanBtn = document.querySelector('.cleanBtn');
let dataJson  = [];
/*
frontRole.addEventListener('click', function(e){

    let tagBtn = document.createElement('span');
    tagBtn.setAttribute("class","bg-teal-100 text-teal-600 m-2 rounded border-l-1");
    tagBtn.textContent = 'Frontend';
    let deleteBtn = document.createElement('button');
    deleteBtn.setAttribute("class","text-teal-100 bg-teal-600 w-5 rounded-r-lg");
    deleteBtn.textContent = 'X';

    tag.appendChild(tagBtn).appendChild(deleteBtn);
    
});
*/
Array.from(document.querySelectorAll('.cursor-pointer'));  
      //keys.forEach(key => key.addEventListener('transitionend', removeTransition));
      window.addEventListener("click",createTag);


function createTag(e){
    
     //check tag 
    const tagCheck = tag.innerText;

    if (tagCheck.includes(e.target.innerText) != true) {
      
        let tagBtn = document.createElement('span');
            tagBtn.setAttribute("class","bg-teal-100 text-teal-600 m-3 xl:m-2 rounded border-l-1");
            tagBtn.innerText = e.target.innerText;
        let btn = document.createElement('INPUT');
            btn.setAttribute("type","button");
            btn.setAttribute("class","clearBtn text-teal-100 bg-teal-600 w-5 rounded-r-lg");
            btn.setAttribute("value", "X");
        let newTag = tag.appendChild(tagBtn).appendChild(btn);

        
        //click X delete on the tag
        newTag.addEventListener('click',function(e){

            let li = e.target.parentElement;
                //console.log(li);
                             
                tag.removeChild(li);

                                
            });
    
        }
    
   /*
   const posts = allPost.getElementsByTagName('li');

   const books = tag.children;
    //console.log(books);
     
    //get all li from all post
    Array.from(posts).forEach((post) => {

    //The property of the HTMLElement interface represents the "rendered" text content
   
    //console.log(post.innerText);
   
    //get all  btn from tag     
    Array.from(books).forEach((book) => {
               
        const sliceTag = book.innerText;
        //console.log(sliceTag);
        //item include keyword 
       
        let postTag = post.lastElementChild.lastElementChild;
        // <div class= "btnHere">
        //     <tag>
        // </div>
        
       // console.log(sliceTag.includes(e.target.dataset.languages) == true);
        //if tag have the sametag
        if(sliceTag.includes(e.target.innerText) == true ){


            book.style.display = 'inline';
           
            //console.log(postTag.innerText.includes(sliceTag) == true);
            //if list have the same tag or tag is null
            if (postTag.innerText.includes(sliceTag) == true) {

                post.style.display = 'block';
             }else{
                post.style.display = 'none';
             }
        

        }

    });
 });
    */
   
    const searchString = e.target.innerText;
    //console.log(searchString); 

    const filteredPost = dataJson.filter((post) => {
        return (
            post.role.includes(searchString) ||
            post.level.includes(searchString) ||
            post.languages.includes(searchString) ||
            post.tools.includes(searchString)
        );
    });
    displayPost(filteredPost);


}


 

 

   const loadPost = async () => {
    try {                        //fetch data 
        const res = await fetch('https://yilinng.github.io/data.json');
        dataJson = await res.json();
        displayPost(dataJson);
    } catch (err) {
        console.log(err);
    }
};
//Conditional (ternary) operator  (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)
//            ${(typeof (post.languages) =='undefined' ? '' : 'hidden')}


const displayPost = (posts) => {
    const htmlString = posts
        .map((post) => {
            return `
            <li data-id="${post.id}">
            <div class="relative xl:flex w-10/12 h-auto bg-white shadow-2xl my-4  rounded border-l-2  ${( post.new !=  true ? '' : 'border-teal-600')} ">         

            <div class="xl:flex-grow-0 m-auto xl:m-6 p-4 xl:p-0">

            <div class="z-10 absolute xl:relative -mt-12 xl:m-auto">
            <img src = '${post.logo}'>
           
        </div>

        </div> 
        <div class="xl:flex-grow-1">
        <div class="my-6 mx-3">
        <div class="block py-2">
              <span class="text-teal-500">
            ${post.company}
            </span>
            <span class="bg-teal-500 text-white mx-1 rounded-full py-2 px-4  ${(post.new == true ? '' : 'hidden')}" data-new="${post.new}">
                New!
            </span>
            <span class="bg-black text-white rounded-full py-2 px-4 ${(post.featured == true ? '' : 'hidden')}" data-featured="${post.featured}">

            Featured
            </span>

        </div>
          <div class="flex-grow-1 p-4 xl:p-0">
            <span>${post.position}</span>
            
            <br>
              <span class="col-span-1 text-gray-500">${post.postedAt}</span>
              
              <span class="col-span-1 text-gray-500">${post.contract}</span>
              <span class="col-span-1 text-gray-500">${post.location}</span>

            <hr class="block xl:hidden m-2 -mb-8">
            </div>  

              </div> 

              </div>    
            <div class="btnHere p-6 my-4 xl:ml-48 xl:my-10">
            <span class="bg-teal-100 text-teal-600 m-3 xl:mx-1 shadow text-center cursor-pointer"
                data-role="${post.role}">${post.role}</span>
            <span class="bg-teal-100 text-teal-600 m-3 xl:mx-1 shadow text-center cursor-pointer"
                data-level="${post.level}">${post.level}</span>
           
          <span class="bg-teal-100 text-teal-600 m-3 xl:mx-1 shadow text-center cursor-pointer ${(typeof (post.languages[0]) !='undefined' ? '' : 'hidden')}" 
                data-languages="${post.languages[0]}">${post.languages[0]}</span>
                
        <span class="bg-teal-100 text-teal-600 m-3 xl:mx-1 shadow text-center cursor-pointer ${(typeof (post.languages[1]) !='undefined' ? '' : 'hidden')}"
                data-languages="${post.languages[1]}">${post.languages[1]}</span>
                                      
        <span class="bg-teal-100 text-teal-600 m-3 xl:mx-1 shadow text-center cursor-pointer ${(typeof (post.languages[2]) !='undefined' ? '' : 'hidden')}"
                data-languages="${post.languages[2]}">${post.languages[2]}</span>                              

        <span class="bg-teal-100 text-teal-600 m-3 xl:mx-1 shadow text-center cursor-pointer ${(typeof (post.tools[0]) !='undefined' ? '' : 'hidden')}"
                data-tools="${post.tools[0]}">${post.tools[0]}</span>
                          
        <span class="bg-teal-100 text-teal-600 m-3 xl:mx-1 shadow text-center cursor-pointer ${(typeof (post.tools[1]) !='undefined' ? '' : 'hidden')}"
                data-tools="${post.tools[1]}">${post.tools[1]}</span>     
          
         <span class="bg-teal-100 text-teal-600 m-3 xl:mx-1 shadow text-center cursor-pointer ${(typeof (post.tools[2]) !='undefined' ? '' : 'hidden')}"
                data-tools="${post.tools[2]}">${post.tools[2]}</span>     
                  


              
        </div>

          </div>
        </li>
        `;
        
        })
        .join('');
  
 
 allPost.innerHTML = htmlString;

};



loadPost();
