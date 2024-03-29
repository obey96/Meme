const imageFileInput = document.querySelector('#imageFileInput');
const canvas = document.querySelector('#meme');
const topTextInput = document.querySelector('#topTextInput');
const bottomTextInput= document.querySelector('#bottomTextInput');
const dele = document.querySelector('#del');

let image;

// This fuction runs to grab a picture to be converting into a data url
imageFileInput.addEventListener('change', () => {
// blob URL
const imageDataUrl = URL.createObjectURL(imageFileInput.files[0]);
// this console is to see currtent url
console.log(imageDataUrl);

// this is like html <img> it helps create the img
image = new Image();
image.src = imageDataUrl;
// load src and then it will run my next function
image.addEventListener('load', () => {

    updateMemeCanvas( canvas, image, topTextInput.value, bottomTextInput.value);
    // this once:true allows the event listener runs once and then die
}, {once:true});

});

// update Toptext without refresh page

topTextInput.addEventListener('change',() =>{

    updateMemeCanvas(canvas,image,topTextInput.value,bottomTextInput.value);
});


// update Bottomtext without refresh page
bottomTextInput.addEventListener('change',() => {

    updateMemeCanvas(canvas,image,topTextInput.value,bottomTextInput.value);
});

// this fuction will update canvas
function updateMemeCanvas(canvas, image, topText, bottomText) {
    // it will gimme the update feedback
console.log(canvas);
console.log(image);
console.log(topText);
console.log(bottomText);   

// Set up hight and width base on pic
const ctx = canvas.getContext('2d');
const width = image.width;
const height = image.height;
// font size is divide by image width
const fontSize = Math.floor(width / 10);
const yOffset = height / 25;


canvas.width = width;
canvas.height = height;

// draw the pic 0 , 0 position
ctx.drawImage(image,0,0);

//Text form
ctx.strokeStyle = 'black';
ctx.lineWidth = Math.floor(fontSize / 4);
ctx.fillStyle = 'red';
ctx.textAlign ='center';
ctx.lineJoin ='round';
ctx.font = `${fontSize}px sans-serif`;

// Top text form
ctx.textBaseline = 'top';
ctx.strokeText(topText, width / 2, yOffset);
ctx.fillText(topText,width / 2, yOffset);

// Bottom text form
ctx.textBaseline ='bottom';
ctx.strokeText (bottomText,width /2, height -yOffset);
ctx.fillText (bottomText,width / 2, height - yOffset);
}

// Add a function to clear the canvas
function clearCanvas() {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// this fuction will reload the page, so it does not get stuck with pic
function resetP() {

    location.reload();
}

// Add an event listener to the delete button
dele.addEventListener('click', () => {
    clearCanvas();
    image = null; // Clear the image reference
    // Clear the text inputs
    topTextInput.value = '';
    bottomTextInput.value = '';
    resetP();
});



// Function to handle canvas image download
function downloadMeme() {
    const link = document.createElement('a');
    // This place the name for the meme
    link.download = 'meme.png';
    // This will convert the canvas to data 
    link.href = canvas.toDataURL('image/png');
    // triggers the donwload
    link.click();
}

// Add an event listener to the download button
const downloadBtn = document.querySelector('#down');
downloadBtn.addEventListener('click', downloadMeme);



// I was not able to add multiple memes to the page