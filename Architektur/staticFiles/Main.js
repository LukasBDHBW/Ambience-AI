// http handling

function send_data(){
    const formData = new FormData();

    var user_job = document.getElementById("user_job_input").value;
    var user_emotion = document.getElementById("emotion_response").value;
    var user_age = document.getElementById("age_response").value;
    formData.append("job", user_job);
    formData.append("emotion", user_emotion);
    formData.append("age", user_age);


    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1:5000/api_banking");
    xhr.send(formData);


    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            response = xhr.responseText;
            document.getElementById("banking_recommendation").innerHTML=response;
        }
      }
    
}


// camera input handling

async function start_camera () {
   	let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
	document.getElementById("video").srcObject = stream;
};

function take_picture() {

   	document.getElementById("canvas").getContext('2d').drawImage(document.getElementById("video"), 0, 0, document.getElementById("canvas").width, document.getElementById("canvas").height);
 
    let image_base64 = document.querySelector("#canvas").toDataURL('image/jpeg').replace(/^data:image\/jpeg;base64,/, ""); 
    console.log(image_base64)  
    var xhr = new XMLHttpRequest(),
        data = image_base64;

    xhr.open("POST", "http://127.0.0.1:5000/api");

    xhr.send(data);


    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            response = xhr.responseText;
            document.getElementById("emotion_response").innerHTML=response;
        }
    }
        
        

      
    

};