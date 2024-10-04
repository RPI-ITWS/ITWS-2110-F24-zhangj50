<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Weather App</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
  <?php 
    $dbOk = false;
    @$db = new mysqli('localhost', 'phpmyadmin', 'Password123', 'weather');
    if ($db->connect_error) { 
      echo '
      <div class="messages">
        Could not connect to the database. Error: '; echo $db->connect_errno . ' -
        ' . $db->connect_error . '
      </div>';
    } else {
      $dbOk = true;
    }
  ?>
    <button class="update-buttons" id="current-button">Pull Current Weather</button>
    <button class="update-buttons" id="forecast-button">Pull Forecasted Weather</button>
  </form>

    
    <div class="container">
      <div class="weather-wrapper">
        <div class="top-wrapper">
          <div class="left">
            <h2 class="city">Troy</h2>
            <div class="main-degree">
              <h3 class="temp">73&deg;</h3>
              <button><img src="icons/edit.png" alt="edit"></button>
            </div>
            <div class="image"></div>
          </div>

          <div class="right">
            <div class="forecast"></div>
          </div>
        </div>

        <div class="detail-wrapper">
          <div class="details">
            <div id="wind-wrapper" class="wind-wrapper">
              <h3>
                <span><img src="icons/wind.png" alt="wind" /></span>WIND
              </h3>
              <div class="wind-main">
                <div class="wind-left">
                  <div id="wind-speed">
                    <b id="wind-speed-number"></b>
                    <div class="wind-info">
                      <p id="mph">MPH</p>
                      <p>Wind Speed</p>
                    </div>
                  </div>
                  <hr />
                  <div id="wind-gusts">
                    <b id="wind-gust-number"></b>
                    <div class="wind-info">
                      <p id="mph">MPH</p>
                      <p>Wind Gusts</p>
                    </div>
                  </div>
                </div>
                <div id="compass">
                  <span id="north">N</span>
                  <span id="south">E</span>
                  <span id="east">S</span>
                  <span id="west">W</span>
                  <div id="pointer">
                    <img src="icons/arrow.png" alt="compass pointer" />
                  </div>
                </div>
              </div>
            </div>
            <div class="box">
              <h3>
                <span><img src="icons/temp.png" alt="temp" /></span>FEELS LIKE
              </h3>
              <div class="box-info">
                <b id="feels-like-number"></b>
              </div>
            </div>
            <div class="box">
              <h3>
                <span><img src="icons/raindrop.png" alt="temp" /></span>
                PRECIPITATION
              </h3>
              <div class="box-info">
                <b id="rain-number"></b>
                <p class="extra-box-info">in the last hour</p>
              </div>
            </div>
            <div class="box">
              <h3>
                <span><img src="icons/eye.png" alt="temp" /></span>
                VISIBILITY
              </h3>
              <div class="box-info">
                <b id="viz-number">11mi</b>
              </div>
            </div>
            <div class="box">
              <h3>
                <span><img src="icons/humidity.png" alt="temp" /></span>
                HUMIDITY
              </h3>
              <div class="box-info">
                <b id="hum-number"></b>
              </div>
            </div>
            <div class="box">
              <h3 id="ss">
                <span><img src="icons/sunrise.png" alt="temp" /></span>
                SUNRISE
              </h3>
              <div id="small" class="box-info">
                <b id="sun-time"></b>
              </div>
            </div>
            <div class="box">
              <h3>
                <span><img src="icons/pressure.png" alt="temp" /></span>
                PRESSURE
              </h3>
              <div id="small" class="box-info">
                <b>30.02 inHg</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <script src="fetch.js"></script>
  </body>
</html>
