$(document).ready(function(){
    $('#weather-form').submit(function(){
        event.preventDefault();
        var location = $('#location').val();
        var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?units=imperial&zip=" +location+ ",us&appid=" + apiKey;
        $.getJSON(weatherUrl, function(weatherData){
            // this will console log the main API call so that we can sort through what we want to extract. It's our vision to the data
            var currTemp = weatherData.main.temp;
            var name = weatherData.name;
            var icon = weatherData.weather[0].icon +'.png';
            var weatherDescription = weatherData.weather[0].description
            $('#currTemp').html("<img src='http://openweathermap.org/img/w/" + icon + "'>The temperature in " + name + " is currently " + currTemp + "&deg;")
            $('.weather-description').html(weatherDescription)

            var canvas = $('#weather-canvas');
            var context = canvas[0].getContext('2d');
            // Set up the outer circle
            var currPercent = 0;
            function animate(current){
                // Draw inner circle
                context.fillStyle = "grey";
                context.beginPath();
                context.arc(155,75,65,Math.PI*0,Math.PI*2);
                context.closePath();
                context.fill();
                // Draw the outer line
				$('.degrees').html(currPercent/5 + "&deg;")
                if(currPercent<50){
              		context.strokeStyle = '#e3f2fd'
              		$('.degrees').css({'color':'#e3f2fd'})
              	}else if(currPercent<100){
              		context.strokeStyle = '#bbdefb'
              		$('.degrees').css({'color':'#bbdefb'})
              	}else if(currPercent<150){
              		context.strokeStyle = '#90caf9'
              		$('.degrees').css({'color':'#90caf9'})
              	}else if(currPercent<200){
              		context.strokeStyle = '#64b5f6'
              		$('.degrees').css({'color':'#64b5f6'})
              	}else if(currPercent<250){
              		context.strokeStyle = '#42a5f5'
              		$('.degrees').css({'color':'#42a5f5'})
              	}else if(currPercent<300){
              		context.strokeStyle = '#fff9c4'	
              		$('.degrees').css({'color':'#fff9c4'})
              	}else if(currPercent<350){
              		context.strokeStyle = '#fff9c4'
              		$('.degrees').css({'color':'#fff9c4'})
              	}else if(currPercent<400){
              		context.strokeStyle = '#fff59d'
              		$('.degrees').css({'color':'#fff59d'})
              	}else if(currPercent<450){
              		context.strokeStyle = '#fff176'
              		$('.degrees').css({'color':'#fff176'})
              	}else if(currPercent<500){
              		context.strokeStyle = '#ffee58'
              		$('.degrees').css({'color':'#ffee58'})
              	}else if(currPercent>=500){
              		context.strokeStyle = '#ffeb3b'
              		$('.degrees').css({'color':'#ffeb3b'})
              	}

              	context.lineWidth = 10; //make a thick outer line
                context.beginPath();
                context.arc(155,75,70,Math.PI*1.5, (Math.PI * 2 * current) + Math.PI*1.5);
                context.stroke()	
                
                ; //we want stroke, not fill.. we want a line

                currPercent++;
       			var currPercent2 = currPercent / 5
                if(currPercent2<currTemp){
                	requestAnimationFrame(function(){
                		animate(currPercent / 500)
                	})
                }
            }
            animate();
        });

        var weatherWeekUrl = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=' + location + ',us&mode=json&units=imperial&appid=' + apiKey;
        $.getJSON(weatherWeekUrl, function(weatherWeekData){
        	var weekHTML = ""
        	for(let i=0; i<7; i++){
        		var weatherDate = new Date(weatherWeekData.list[i].dt * 1000)
				var date = weatherDate.getDate()
        		var max = weatherWeekData.list[i].temp.max
        		var min = weatherWeekData.list[i].temp.min
        		// var icon = weatherWeekData.list[i].icon
        		
        		weekHTML += "<div>" + date + "<br>" + Math.floor(max) + "<br>" + Math.floor(min) + "</div>"
        	}
			$('.weather-week').html(weekHTML)
			$('.weather-week').prepend('<div>Date<br>High<br>Low</div>')
        })
    });
});
