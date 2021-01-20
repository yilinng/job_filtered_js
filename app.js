//ES6 support JSON importing with the following syntax: import * as data from './example.json'; 
//
const allPost = document.querySelector('#allPost');
const tag = document.querySelector('.tag');
const cleanBtn = document.querySelector('.cleanBtn');
const itemSelected = document.querySelector('.itemSelected');

let dataJson  = [];
let clickItem = true;

itemSelected.addEventListener('click', (e) => {

    const rePost = dataJson.reverse();

    //console.log(rePost);
    
    displayPost(rePost);
if (!clickItem) {

   itemSelected.innerHTML = 'New'; 
  clickItem = true;
}else{

   itemSelected.innerHTML = 'Old'; 
   clickItem = false;
  
}
});


allPost.addEventListener('click', (e) => {

const clickRole = e.target.dataset.role === undefined ? null: e.target.dataset.role;
const clickLevel = e.target.dataset.level === undefined ? null: e.target.dataset.level;
const clickLanguages = e.target.dataset.languages === undefined ? null: e.target.dataset.languages;
const clickTools = e.target.dataset.tools === undefined ? null: e.target.dataset.tools;

console.log(clickRole, clickLevel, clickLanguages, clickTools);

    if (e.target.classList.contains('cursor-pointer')) {
   
    const clickItem = tag.children;

    const clickItemFilter = Array.from(clickItem).filter(nb =>{

        return  nb.innerText === clickRole ||
                nb.innerText === clickLevel ||
                nb.innerText === clickLanguages ||
                nb.innerText === clickTools 
    });

    //console.log(tag.children, clickItemFilter);

    if (clickItem.length) {

            if (!clickItemFilter.length) {
      
            let tagBtn = document.createElement('span');
                tagBtn.setAttribute("class","bg-teal-100 text-teal-600 m-3 xl:m-2 rounded border-l-1");
                tagBtn.innerText = clickRole || clickLevel || clickLanguages || clickTools;
            let btn = document.createElement('INPUT');
                btn.setAttribute("type","button");
                btn.setAttribute("class","clearBtn text-teal-100 bg-teal-600 w-5 rounded-r-lg");
                btn.setAttribute("value", "X");
            let newTag = tag.appendChild(tagBtn).appendChild(btn);
            reLoad();
            //click X delete on the tag
            newTag.addEventListener('click',(e) =>{
                let li = e.target.parentElement;
                    //console.log(li);                            
                    tag.removeChild(li);
                    reLoad();          
                });    
            };
       
      
    }else{

        let tagBtn = document.createElement('span');
            tagBtn.setAttribute("class","bg-teal-100 text-teal-600 m-3 xl:m-2 rounded border-l-1");
            tagBtn.innerText = clickRole || clickLevel || clickLanguages || clickTools;
        let btn = document.createElement('INPUT');
            btn.setAttribute("type","button");
            btn.setAttribute("class","clearBtn text-teal-100 bg-teal-600 w-5 rounded-r-lg");
            btn.setAttribute("value", "X");
        let newTag = tag.appendChild(tagBtn).appendChild(btn);   
            reLoad();
            //click X delete on the tag
        newTag.addEventListener('click',(e) =>{
            let li = e.target.parentElement;
                    //console.log(li);                            
            tag.removeChild(li);
            reLoad();          
        });    
    }
        
    
   function reLoad(){

    const searchString = e.target.innerText;
    console.log(searchString); 

    const filteredPost = dataJson.filter((post) => {
        return (
            post.role.includes(searchString) ||
            post.level.includes(searchString) ||
            post.languages.includes(searchString) ||
            post.tools.includes(searchString)
        );
    });
        if (clickItem.length) {

        displayPost(filteredPost);

        }else{
            loadPost();
        }

   };
   
 };

});

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
