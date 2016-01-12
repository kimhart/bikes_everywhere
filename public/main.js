$(document).ready(function(){




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
				$('body').append(html);
				var source2 = $('#comments').html();
				var template2 = Handlebars.compile(source2);
				response.comments.forEach(function(comment){
					$('body').append(template2(comment));
				})
				var toggleModal = function(){
					$('.modal-container.'+response._id).toggle();
				};
				toggleModal();
				$('.close').on('click', toggleModal);
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



