if ('DeviceOrientationEvent' in window) {
    window.addEventListener('deviceorientation', deviceOrientationHandler, false);
  } else {
    document.getElementById('logoContainer').innerText = 'Device Orientation API not supported.';
  }
  
  function deviceOrientationHandler (eventData) {
    var tiltLR = eventData.gamma;
    var tiltFB = eventData.beta;
    var dir = eventData.alpha;
    
    document.getElementById("doTiltLR").innerHTML = Math.round(tiltLR) + "°";
    document.getElementById("doTiltFB").innerHTML = Math.round(tiltFB)*-1 + "°";
  
    var logo = document.getElementById("imgLogo");
    //logo.style.webkitTransform = "rotate(" + tiltLR + "deg) rotate3d(1,0,0, " + (tiltFB * -1) + "deg)";
    //logo.style.MozTransform = "rotate(" + tiltLR + "deg)";
    //logo.style.transform = "rotate(" + tiltLR + "deg) rotate3d(1,0,0, " + (tiltFB * -1) + "deg)";
    
    var max = 25;
    
    //logo.style.transform = "translate("+(tiltLR)*-1+"px,"+(tiltFB)*-1+"px)";
    var x = tiltLR;
    var y = tiltFB;
    
    var ratio = 0.85;
    
  
    logo.style.transform = "translate("+ x * ratio +"px,"+ y * ratio +"px)";

}

let accelerometer;
let gravity;
let gyroscope;

let lastReadingTimestamp;
  
let duration=0;
let min=-1;
let max=-1;
let count=0;
let sum=0;
let avg = 0;

let Values = [];
let ValuesX = [];
let ValuesY = [];
let ValuesZ = [];
let Label = [];

$(function() 
{
    $("#askButton").click( function()
    {
        $(".progress-bar").show();
        duration=0;
        min=-1;
        max=-1;
        count=0;
        sum=0;
        avg = 0;

        Values = [];
        ValuesX = [];
        ValuesY = [];
        ValuesZ = [];
        Label = [];

        if ('LinearAccelerationSensor' in window && 'Gyroscope' in window) 
        {

            accelerometer = new LinearAccelerationSensor()

            //acceleration
            //let accelerometer = new LinearAccelerationSensor();
            accelerometer.addEventListener('reading', e => {
                if (lastReadingTimestamp) {
                intervalHandler(Math.round(accelerometer.timestamp - lastReadingTimestamp));
                }
                lastReadingTimestamp = accelerometer.timestamp
                accelerationHandler(accelerometer, 'moAccel');
            });
            accelerometer.start();

            if ('GravitySensor' in window) {
                gravity = new GravitySensor()
                gravity.addEventListener('reading', e => accelerationHandler(gravity, 'moAccelGrav'));
                gravity.start();
            }

            gyroscope = new Gyroscope()
            gyroscope.addEventListener('reading', e => rotationHandler({
                alpha: gyroscope.x,
                beta: gyroscope.y,
                gamma: gyroscope.z
            }));
            gyroscope.start();

        } 
        else if ('DeviceMotionEvent' in window) {

            var onDeviceMotion = function (eventData) {
                accelerationHandler(eventData.acceleration, 'moAccel');
                intervalHandler(eventData.interval);}
            window.addEventListener('devicemotion', onDeviceMotion, false);
        } else {
        }
  
    })
});
  
  
  function accelerationHandler(acceleration, targetId) {
    var info, xyz = "[X, Y, Z]";
  
    info = xyz.replace("X", acceleration.x && acceleration.x.toFixed(3));
    info = info.replace("Y", acceleration.y && acceleration.y.toFixed(3));
    info = info.replace("Z", acceleration.z && acceleration.z.toFixed(3));
    
    ValuesX.push(acceleration.x);
    ValuesY.push(acceleration.y);
    ValuesZ.push(acceleration.z);

    var length = Math.sqrt(acceleration.x * acceleration.x + acceleration.y * acceleration.y + acceleration.z * acceleration.z );

    Values.push(length);
    Label.push("");
    
    sum += length;
    avg = sum / ++count;
    document.getElementById("avg").innerHTML = avg.toFixed(3);

    if(max == -1 || max < length){
      max = length;
      document.getElementById("max").innerHTML = max.toFixed(3);
    }  
  }
  
  
    function rotationHandler(rotation) {
        var info, xyz = "[X, Y, Z]";
    
        info = xyz.replace("X", rotation.alpha && rotation.alpha.toFixed(3));
        info = info.replace("Y", rotation.beta && rotation.beta.toFixed(3));
        info = info.replace("Z", rotation.gamma && rotation.gamma.toFixed(3));
    }

    function intervalHandler(interval) {
        duration += interval;
        if(duration > 10000){

            $(".progress-bar").hide();

            duration=0;
            accelerometer.stop();
            
            Label[0] = 0;
            Label[Label.count-1] = 30

            //alert(Values);
            //alert(Label);

            new Chart(document.getElementById("line-chart"), {
                type: 'line',
                data: {
                labels: Label,
                datasets: [
                    { 
                        data: Values,
                        label: "Distance move",
                        borderColor: "#3e95cd",
                        fill: false
                    }
                ]
                },
                options: {
                title: {
                    display: true,
                    text: 'Motion (in seconds)'
                }
                }
            });

            new Chart(document.getElementById("line-chart2"), {
                type: 'line',
                data: {
                labels: Label,
                datasets: [
                    { 
                        data: ValuesX,
                        label: "X",
                        borderColor: "#a00000",
                        fill: false
                    },
                    { 
                        data: ValuesY,
                        label: "Y",
                        borderColor: "#00a000",
                        fill: false
                    },
                    { 
                        data: ValuesZ,
                        label: "Z",
                        borderColor: "#0000a0",
                        fill: false
                    }
                ]
                },
                options: {
                title: {
                    display: true,
                    text: 'Motion (in seconds)'
                }
                }
            });
            


            

            gyroscope.stop();
            gravity.stop(); 
        }
    }