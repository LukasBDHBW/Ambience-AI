

// http handling

function send_data(){
    const formData = new FormData();


    var user_emotion = document.getElementById("emotion_response").value;
    var user_age = document.getElementById("age_response").value;

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
    // DOM manipulation part
    document.getElementById("first_view").style.display="None";
    document.getElementById("second_view").style.display="inline";


    // ================================== //
    // functional part
   	let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
	document.getElementById("video").srcObject = stream;
};

function take_picture() {



   	document.getElementById("canvas").getContext('2d').drawImage(document.getElementById("video"), 0, 0, document.getElementById("canvas").width, document.getElementById("canvas").height);
 

}

function send_img() {
    let image_base64 = document.querySelector("#canvas").toDataURL('image/jpeg').replace(/^data:image\/jpeg;base64,/, ""); 
    document.getElementById("second_view").style.display="None";
    document.getElementById("third_view").style.display="inline";
    var xhr = new XMLHttpRequest(),
        data = image_base64;

    xhr.open("POST", "http://127.0.0.1:5000/api");

    xhr.send(data);


    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            response = xhr.responseText;
            response = JSON.parse(response);
            console.log(response);
            document.getElementById("third_view").style.display="None";
            document.getElementById("fourth_view").style.display="inline";
            document.getElementById("age_response").innerHTML=response[1];
            document.getElementById("emotion_response").innerHTML=response[0];

        }
    }
}
;