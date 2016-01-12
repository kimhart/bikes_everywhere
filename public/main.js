$(document).ready(function(){

	var toggleModal = function(){
		$('.modal-container').toggle();
	};
	$('.close').on('click', toggleModal);



	$('#calendar').fullCalendar({
		eventClick: function(event){
			console.log(event.title);
			$.ajax({
				url: "/calendar/"+event.title,
				type: "GET",
				dataType: "json"
			}).done(function(response){
				var source = $("#event-info").html();
				response.spots = response.max_attendees - response.rsvps.length;
				var template = Handlebars.compile(source);
				var html = template(response);
				$('.modal').append(html);
				var source2 = $('#comments').html();
				var template2 = Handlebars.compile(source2);
				response.comments.forEach(function(comment){
					$('.modal').append(template2(comment));
				})
				toggleModal();
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



