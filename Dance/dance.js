// adb push './Audio.mp3' '/sdcard/audio/Audio' 

misty.MoveHeadDegrees(0, 0, 0, 100);
misty.Pause(3000);

misty.Set("Dance", "False", false);
misty.ChangeLED(0,255,0);


function _headV()
{
    misty.DisplayImage("e_Joy2.jpg");
    for (let index = 0; index < 2; index++) 
    {
        misty.MoveHeadDegrees(-45, 0, -40, 100);
        misty.MoveArmDegrees("left", -80, 50); misty.Pause(50);
        misty.MoveArmDegrees("right", 40, 50);
        misty.Pause(1000);

        misty.MoveHeadDegrees(20, 1, 0, 100);
        misty.Pause(1000);

        misty.MoveHeadDegrees(-45, 0, 40, 100);
        misty.MoveArmDegrees("left", 40, 50); misty.Pause(50);
        misty.MoveArmDegrees("right", -80, 50);
        misty.Pause(1000);

        misty.MoveHeadDegrees(20, 1, 0, 100);
        misty.Pause(1000);
    }
    misty.MoveHeadDegrees(0, 0, 0, 100);
    return 0;
}

function _moveFR()
{
    misty.DisplayImage("e_Joy.jpg");
    for (let index = 0; index < 6; index++) 
    {
        misty.DriveTime(30, 0, 600);
        misty.MoveArmDegrees("left", -80, 50); misty.Pause(50);
        misty.MoveArmDegrees("right", -80, 50);

        misty.Pause(500); misty.Stop(); misty.Pause(200);

        misty.DriveTime(-30, 0, 600);
        misty.MoveArmDegrees("left", 80, 50); misty.Pause(50);
        misty.MoveArmDegrees("right", 80, 50);

        misty.Pause(500); misty.Stop(); misty.Pause(200);
    }
    misty.Stop();
    return 0;
}

function _headI()
{
    misty.DisplayImage("e_EcstacyStarryEyed.jpg");
    for (let index = 0; index < 6; index++) 
    {
        misty.MoveHeadDegrees(45, 0, 0, 100); 
        misty.Pause(500); 
        misty.MoveHeadDegrees(-20, 0, 0, 100);
        misty.Pause(500);
    }
    return 0;
}

function _moveFRandI()
{
    misty.DisplayImage("e_Surprise.jpg");
    misty.MoveArmDegrees("left", 80, 50);
    misty.Pause(50);
    misty.MoveArmDegrees("right", -20, 50);

    for (let index = 0; index < 10; index++) 
    {
        misty.DriveTime(30, 0, 700);
        misty.MoveHeadDegrees(45, 0, 0, 100);
        misty.Pause(500); misty.Stop(); misty.Pause(200);
        
        misty.DriveTime(-30, 0, 700);
        misty.MoveHeadDegrees(-20, 0, 0, 100);
        misty.Pause(500); misty.Stop(); misty.Pause(200);
    }
    misty.Stop();
    return 0;
}


function _headRoll()
{
    misty.DisplayImage("e_Terror.jpg");
    misty.MoveArmDegrees("left", 0, 50);
    misty.Pause(50);
    misty.MoveArmDegrees("right", 0, 50);

    for (let index = 0; index < 10; index++) 
    {
        misty.MoveHeadDegrees(0, 45, 0, 100);
        misty.Pause(500);
        misty.MoveHeadDegrees(0, -45, 0, 100);
        misty.Pause(500);
    }
    misty.MoveHeadDegrees(0, 0, 0, 100);
    return 0;
}


function _handsSpin()
{
    for (let index = 0; index < 3; index++) 
    {
        misty.DriveTrack(50, -50);
        misty.MoveArmDegrees("left", -80, 10); misty.Pause(50);
        misty.MoveArmDegrees("right", 80, 10);

        misty.Pause(2000);

        misty.DriveTrack(-50, 50);
        misty.MoveArmDegrees("left", 80, 10); misty.Pause(50);
        misty.MoveArmDegrees("right", -80, 10);

        misty.Pause(2000);

        misty.Stop();
    }
    return 0;
}

function _sequence()
{
    
    if (misty.Get("Dance") == "True") {
        _ = _headV(); // This is a method of forcing the functions to complete before moving on. These function calls return 0 when successfull.
    }
    
    if (misty.Get("Dance") == "True") {
        _ = _moveFR();
    }
    
    if (misty.Get("Dance") == "True") {
        _ = _headI();
    }
    
    misty.Pause(2000);

    if (misty.Get("Dance") == "True") {
        _ = _moveFRandI();
    }

    if (misty.Get("Dance") == "True") {
        _ = _headRoll();
    }

    misty.PlayAudio("032-Bewbewbeeew.wav", 100);
    
    misty.Stop();
    misty.Pause(500);

    misty.ChangeLED(0,255,0);
    misty.DisplayImage("e_DefaultContent.jpg");
    return 0;
}

function _dance()
{
    _ = _sequence();
    
    if (misty.Get("Dance") == "True") {
        misty.RegisterTimerEvent("dance", 100, false);
    }
}

function _LEDdance()
{
    misty.ChangeLED(getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255));
    
    if (misty.Get("Dance") == "True") {
        misty.RegisterTimerEvent("LEDdance", 500, false);
    }
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function _Bumped(data) 
{
    var sensor = data.AdditionalResults[0];
    var isPressed = data.AdditionalResults[1];
    isPressed ? misty.Debug(sensor+" is Pressed") : misty.Debug(sensor+" is Released");
    
    if (isPressed)
    {
        if (sensor == "Bump_FrontRight" || sensor == "Bump_FrontLeft")
        {
            misty.Set("Dance", "True", false);
            misty.PlayAudio("s_Joy2.wav");
            misty.Pause(2000);
            misty.ChangeLED(0,0,0);
            misty.RegisterTimerEvent("dance", 100, false);
            misty.PlayAudio("AndWeDanced-670b796c-e4a9-4b81-b654-52f7bc0a1213.mp3");
            misty.RegisterTimerEvent("LEDdance", 500, false);
        } 
        else if (sensor == "Bump_RearLeft" || sensor == "Bump_RearRight")
        {
            misty.Set("Dance", "False", false);
            misty.PlayAudio("s_PhraseHello.wav");   
            misty.Pause(4000);
            misty.ChangeLED(255,0,0);
        } 
        else 
        {
            misty.Debug("Sensor Name Unknown");
        }
    }
 }

//Bump Sensors
misty.AddReturnProperty("Bumped", "sensorName");
misty.AddReturnProperty("Bumped", "IsContacted");
misty.RegisterEvent("Bumped", "BumpSensor", 50 ,true);
