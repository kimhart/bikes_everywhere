$(document).ready(function(){

	$('#calendar').fullCalendar({
		eventClick: function(event){
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
				$('#submit-comment-btn').on('click', getComments);
				$('#submit-rsvp-btn').on('click',getRsvps);
				var toggleModal = function(){
					$('.modal-container.'+response._id).toggle();
				};
				toggleModal();
				$('.close').on('click', toggleModal);
			})
		}
	});

	var getEvents = function(){
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

	var getComments = function(event){
		event.preventDefault();
		$.ajax({
			url: "/calendar/"+$('#event-name').val()+"/comment",
			type: "POST",
			dataType: "json",
			data:{
				name: $('#name').val(),
				comment: $('#comment').val()
			}
		}).done(function(response){
			var newli =$('<li>');
			newli.text(response.name+": "+response.comment);
			$('#comments-list').append(newli);
			$('#name').val('');
			$('#comment').val('');
		})
	}

	var getRsvps = function(event){
		event.preventDefault();
		$.ajax({
			url:"/calendar/"+$('#rsvp-event-name').val()+"/rsvp",
			type: "POST",
			dataType: "json",
			data:{
				name: $('#rsvp-name').val(),
				e_mail: $('#e-mail').val()
			}
		}).done(function(response){
			$('#rsvp-name').val('');
			$('#e-mail').val('');
		});
	}

	getEvents();
});



