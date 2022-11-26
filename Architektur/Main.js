// http handling

function send_data(){
    var user_job = document.getElementById("user_job_input").value;
    var user_data = [user_job];
    //window.alert(user_job);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1:5000/api");
    xhr.send(user_data);


    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            response = xhr.responseText;
            console.log(response);
        }
      }
    
}