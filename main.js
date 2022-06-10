prediction_1="";
prediction_2="";

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:100
});

Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function(data_uri)
    {
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'">';
    });
}

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/hrZxilJZu/model.json",modelLoaded);

function modelLoaded(){
    console.log("model Loaded");
}

function speak(){
    var synth=window.speechSynthesis;
    speak_data_1="the first prediction is "+prediction_1;
    speak_data_2="the second prediction is "+prediction_2;
    var utterthis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterthis);
}

function check() {
    img=document.getElementById("captured_image");
    classifier.classify(img,gotResult);
}

function gotResult(error,results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        prediction_1=results[0].label;
        prediction_2=results[1].label;
        speak();
        if(results[0].label=="Top")
        {
            document.getElementById("update_emoji").innerHTML="&#9757;";
        }
        if(results[0].label=="Clap")
        {
            document.getElementById("update_emoji").innerHTML="&#128079;";
        }
        if(results[0].label=="Thumbs up")
        {
            document.getElementById("update_emoji").innerHTML="&#128077;";

        }
        
        if(results[1].label=="Top")
        {
            document.getElementById("update_emoji2").innerHTML="&#9757;";
        }
        if(results[1].label=="Clap")
        {
            document.getElementById("update_emoji2").innerHTML="&#128079;";
        }
        if(results[1].label=="Thums up")
        {
            document.getElementById("update_emoji2").innerHTML="&#128077;";

        }
      
    }
}