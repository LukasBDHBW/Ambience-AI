// http handling

function send_data(){
    const formData = new FormData();

    var user_job = document.getElementById("user_job_input").value;
    formData.append("job", user_job);

    var user_img = document.getElementById("user_picture_input").files[0];
    formData.append("image", user_img);


    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1:5000/api");
    xhr.send(formData);


    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            response = xhr.responseText;
            document.getElementById("emotion_response").innerHTML=response;
        }
      }
    
}