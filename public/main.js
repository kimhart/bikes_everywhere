$(document).ready(function(){
	$('#calendar').fullCalendar({
		eventClick: function(event){
			console.log(event.title);
			$.ajax({
				url: "/calendar/"+event.title,
				type: "GET",
				dataType: "json"
			}).done(function(response){
				console.log(response);
			})
		}
	});

	var getEvents = function(){
		console.log('getting events');
		$.ajax({
			url:"/calendar/events",
			type: "GET",
			dataType: "json"
		}).done(function(response){
			response.forEach(function(eventObj){
			var bikeEvent = eventObj.event_details
			$('#calendar').fullCalendar( 'renderEvent', bikeEvent );

			})
		})
	}

	getEvents();
});

	//  timeFormat: 'H(:mm)'
	// $('#calendar').fullCalendar( 'renderEvent', bikeEvent );



