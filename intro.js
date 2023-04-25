var state = "";
      var i = 0;
      function move() {
        if (state == "") {
          if (i == 0) {
            i = 1;
            var elem = document.getElementById("myBar");
            var width = 1;
            var id = setInterval(frame, 10);
            function frame() {
              if (width >= 100) {
                clearInterval(id);
                i = 0;
                beginGame();
              } else {
                width++;
                elem.style.width = width + "%";
              }
            }
          }
        }else if (state == "icebreaker"){
          document.getElementById("instruction").innerHTML =
          "Good Job."+"<br />"+"<br />"+ "Now let's break the ice."
          document.getElementById("instruction2").style.display = "none";
          document.getElementById("exitInstruction").style.display = "none";
          document.getElementById("btn").style.display = "none";
        }
      }
      var result = document.getElementById("result");
      var upper = document.getElementById("upper");
      function findPartner() {
        document.getElementById("instruction").innerHTML =
          "Your task:"+"<br />"+ "Find a teammate who...";
        document.getElementById("instruction2").style.display = "block";
        document.getElementById("exitInstruction").style.display = "block";
        document.getElementById("btn").style.display = "block";
        document.getElementById("btn").innerHTML = "Both wave when ready";
      }
      function beginGame() {
        var btn = document.getElementById("btn");
        btn.style.display = "none";
        document.getElementById("gif").style.display = "none";
        document.getElementById("myBar").style.display = "none";
        document.getElementById("exitInstruction").style.display = "none";
        //document.getElementById('instruction').style.display = 'none'
        document.getElementById("instruction").innerHTML =
          " First, let's find a teammate.";
        setTimeout(findPartner, 2000);
        state = "icebreaker";
        //upper.innerHTML = " The previous image is replaced by the new image as you click the button. <br> ";
      }