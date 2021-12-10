!function () {

	var today = moment();

	function Calendar(selector, events) {
		this.el = document.querySelector(selector);
		this.events = events;
		this.current = moment().date(1);
		this.draw();
		var current = document.querySelector('.today');
		if (current) {
			var self = this;
			window.setTimeout(function () {
				self.openDay(current);
			}, 500);
		}
	}

	Calendar.prototype.draw = function () {
		//Create Header
		this.drawHeader();

		//Draw Month
		this.drawMonth();

    //
		//this.drawLegend();
	}

	Calendar.prototype.drawHeader = function () {
		var self = this;
		if (!this.header) {
			//Create the header elements
			this.header = createElement('div', 'header');
			this.header.className = 'header';

			this.title = createElement('h1');
            this.title.addEventListener('click', function () {
				 self.curMonth();
			});

			var right = createElement('div', 'right');
			right.addEventListener('click', function () {
				self.nextMonth();
			});

			var left = createElement('div', 'left');
			left.addEventListener('click', function () {
				self.prevMonth();
			});

			//Append the Elements
			this.header.appendChild(this.title);
			this.header.appendChild(right);
			this.header.appendChild(left);
			this.el.appendChild(this.header);
		}

		this.title.innerHTML = this.current.format('MMMM YYYY');
	}

	Calendar.prototype.drawMonth = function () {
		var self = this;

		this.events.forEach(function (ev) {
		//	ev.date = self.current.clone().date(Math.random() * (29 - 1) + 1);
      ev.date = moment(ev.eventTime, "YYYY-MM-DD");
		});


		if (this.month) {
			this.oldMonth = this.month;
			this.oldMonth.className = 'month out ' + (self.next ? 'next' : 'prev');
			this.oldMonth.addEventListener('animationend', function () {
				self.oldMonth.parentNode.removeChild(self.oldMonth);
				self.month = createElement('div', 'month');
				self.backFill();
				self.currentMonth();
				self.fowardFill();
				self.el.appendChild(self.month);
				window.setTimeout(function () {
					self.month.className = 'month in ' + (self.next ? 'next' : 'prev');
				}, 16);
			});
		} else {
			this.month = createElement('div', 'month');
			this.el.appendChild(this.month);
			this.backFill();
			this.currentMonth();
			this.fowardFill();
			this.month.className = 'month new';
		}
	}

	Calendar.prototype.backFill = function () {
		var clone = this.current.clone();
		var dayOfWeek = clone.day() - 1;

		if (dayOfWeek == -1)
			dayOfWeek = 6;

		if (!dayOfWeek) {
			return;
		}

		clone.subtract('days', dayOfWeek + 1);

		for (var i = dayOfWeek; i > 0; i--) {
			this.drawDay(clone.add('days', 1));
		}
	}

	Calendar.prototype.fowardFill = function () {
		var clone = this.current.clone().add('months', 1).subtract('days', 1);
		var dayOfWeek = clone.day();

		if (dayOfWeek === 7) {
			return;
		}

		for (var i = dayOfWeek; i < 7; i++) {
			this.drawDay(clone.add('days', 1));
		}
	}

	Calendar.prototype.currentMonth = function () {
		var clone = this.current.clone();

		while (clone.month() === this.current.month()) {
			this.drawDay(clone);
			clone.add('days', 1);
		}
	}

	Calendar.prototype.getWeek = function (day) {
		if (!this.week || day.day() === 1) {
			this.week = createElement('div', 'week');
			this.month.appendChild(this.week);
		}
	}

	Calendar.prototype.drawDay = function (day) {
		var self = this;
		this.getWeek(day);

		//Outer Day
    var clickState = 0;
		var outer = createElement('div', this.getDayClass(day));
		outer.addEventListener('click', function () {
      if ( this.classList.contains('active') ) {
         self.closeDay(this);
      } 
      else {
         self.openDay(this);
      }
    
		});

		//Day Name
		var name = createElement('div', 'day-name', day.format('ddd'));

		//Day Number
		var number = createElement('div', 'day-number', day.format('DD'));


		//Events
		var events = createElement('div', 'day-events');
		this.drawEvents(day, events);

		outer.appendChild(name);
		outer.appendChild(number);
		outer.appendChild(events);
		this.week.appendChild(outer);
	}

	Calendar.prototype.drawEvents = function (day, element) {
		if (day.month() === this.current.month()) {
			var todaysEvents = this.events.reduce(function (memo, ev) {
				if (ev.date.isSame(day, 'day')) {
					memo.push(ev);
				}
				return memo;
			}, []);

			todaysEvents.forEach(function (ev) {
				var evSpan = createElement('span', ev.color);
				element.appendChild(evSpan);
			});
		}
	}

	Calendar.prototype.getDayClass = function (day) {
		classes = ['day'];
		if (day.month() !== this.current.month()) {
			classes.push('other');
		} else if (today.isSame(day, 'day')) {
			classes.push('today');
		}
		return classes.join(' ');
	}
  
  Calendar.prototype.closeDay = function (el) {
		// var details, arrow;
		// var dayNumber = +el.querySelectorAll('.day-number')[0].innerText || +el.querySelectorAll('.day-number')[0].textContent;
		// var day = this.current.clone().date(dayNumber);
    var daysActive = document.querySelectorAll(".day.active");

[].forEach.call(daysActive, function(i) {
    i.classList.remove("active");
});
		var currentOpened = document.querySelector('.details');
    
    
    if (currentOpened) {
				currentOpened.addEventListener('webkitAnimationEnd', function () {
					currentOpened.parentNode.removeChild(currentOpened);
				});
				currentOpened.addEventListener('oanimationend', function () {
					currentOpened.parentNode.removeChild(currentOpened);
				});
				currentOpened.addEventListener('msAnimationEnd', function () {
					currentOpened.parentNode.removeChild(currentOpened);
				});
				currentOpened.addEventListener('animationend', function () {
					currentOpened.parentNode.removeChild(currentOpened);
				});
				currentOpened.className = 'details out';
			}
  }

	Calendar.prototype.openDay = function (el) {
		var details, arrow;
		var dayNumber = +el.querySelectorAll('.day-number')[0].innerText || +el.querySelectorAll('.day-number')[0].textContent;
		var day = this.current.clone().date(dayNumber);
        
    
     var daysActive = document.querySelectorAll(".day.active");

[].forEach.call(daysActive, function(i) {
    i.classList.remove("active");
});
    el.classList.add('active');

		var currentOpened = document.querySelector('.details');
    
		//Check to see if there is an open detais box on the current row
		if (currentOpened && currentOpened.parentNode === el.parentNode) {
			details = currentOpened;
			arrow = document.querySelector('.arrow');
    
		} else {
			//Close the open events on differnt week row
			//currentOpened && currentOpened.parentNode.removeChild(currentOpened);
     //  el.classList.remove('active');
			if (currentOpened) {
				currentOpened.addEventListener('webkitAnimationEnd', function () {
					currentOpened.parentNode.removeChild(currentOpened);
				});
				currentOpened.addEventListener('oanimationend', function () {
					currentOpened.parentNode.removeChild(currentOpened);
				});
				currentOpened.addEventListener('msAnimationEnd', function () {
					currentOpened.parentNode.removeChild(currentOpened);
				});
				currentOpened.addEventListener('animationend', function () {
					currentOpened.parentNode.removeChild(currentOpened);
				});
				currentOpened.className = 'details out';
       
			}

			//Create the Details Container
			details = createElement('div', 'details in');

			//Create the arrow
			var arrow = createElement('div', 'arrow');

			//Create the event wrapper

			details.appendChild(arrow);
			el.parentNode.appendChild(details);
		}

		var todaysEvents = this.events.reduce(function (memo, ev) {
			if (ev.date.isSame(day, 'day')) {
				memo.push(ev);
			}
			return memo;
		}, []);

		this.renderEvents(todaysEvents, details);

		arrow.style.left = el.offsetLeft - el.parentNode.offsetLeft + 27 + 'px';
	}

	Calendar.prototype.renderEvents = function (events, ele) {
		//Remove any events in the current details element
		var currentWrapper = ele.querySelector('.events');
		var wrapper = createElement('div', 'events in' + (currentWrapper ? ' new' : ''));

		events.forEach(function (ev) {
			var div = createElement('div', 'event');
			var square = createElement('div', 'event-category ' + ev.color);
			var span = createElement('span', '', ev.eventName);
			var link=createElement("a")
            link.setAttribute("href",`/events/${ev.id}`)
			div.appendChild(square);
			link.appendChild(span);
			div.appendChild(link)
			wrapper.appendChild(div);
		});

		if (!events.length) {
			var div = createElement('div', 'event empty');
			var span = createElement('span', '', 'No Events');

			div.appendChild(span);
			wrapper.appendChild(div);
		}

		if (currentWrapper) {
			currentWrapper.className = 'events out';
			currentWrapper.addEventListener('webkitAnimationEnd', function () {
				currentWrapper.parentNode.removeChild(currentWrapper);
				ele.appendChild(wrapper);
			});
			currentWrapper.addEventListener('oanimationend', function () {
				currentWrapper.parentNode.removeChild(currentWrapper);
				ele.appendChild(wrapper);
			});
			currentWrapper.addEventListener('msAnimationEnd', function () {
				currentWrapper.parentNode.removeChild(currentWrapper);
				ele.appendChild(wrapper);
			});
			currentWrapper.addEventListener('animationend', function () {
				currentWrapper.parentNode.removeChild(currentWrapper);
				ele.appendChild(wrapper);
			});
		} else {
			ele.appendChild(wrapper);
		}
	}

	Calendar.prototype.drawLegend = function () {
		var legend = createElement('div', 'legend');
		var calendars = this.events.map(function (e) {
			return e.calendar + '|' + e.color;
		}).reduce(function (memo, e) {
			if (memo.indexOf(e) === -1) {
				memo.push(e);
			}
			return memo;
		}, []).forEach(function (e) {
			var parts = e.split('|');
			var entry = createElement('span', 'entry ' + parts[1], parts[0]);
			legend.appendChild(entry);
		});
		this.el.appendChild(legend);
	}

	Calendar.prototype.nextMonth = function () {
		this.current.add('months', 1);
		this.next = true;
		this.draw();
	}

	Calendar.prototype.prevMonth = function () {
		this.current.subtract('months', 1);
		this.next = false;
		this.draw();
	}
  
  Calendar.prototype.curMonth = function () {
		this.current = moment().date(1);
		this.draw();
	}

	window.Calendar = Calendar;

	function createElement(tagName, className, innerText) {
		var ele = document.createElement(tagName);
		if (className) {
			ele.className = className;
		}
		if (innerText) {
			ele.innderText = ele.textContent = innerText;
		}
		return ele;
	}
}();

!function () {
	let data1=[]
    for(let event of events){
        data1.push({eventName: event.name,
            color: 'blue',
            eventTime: moment(event.date),
		    id:event._id})
    }

    

	// var data = [
	// 	{eventName: events[0].name, description: events[0].description, color: 'orange', eventTime: moment(events[0].date)},
	// 	{eventName: 'Interview - Jr. Web Developer', calendar: 'Work', color: 'orange', eventTime: moment("2020-05-16")},
	// 	{eventName: 'Demo New App to the Board', calendar: 'Work', color: 'orange', eventTime: moment("2020-05-1")},
	// 	{eventName: 'Dinner w/ Marketing', calendar: 'Work', color: 'orange', eventTime: moment("2020-05-30")},

	// 	{eventName: 'Game vs Portalnd', calendar: 'Sports', color: 'blue', eventTime: moment("2020-05-16")},
	// 	{eventName: 'Game vs Houston', calendar: 'Sports', color: 'blue', eventTime: moment("2020-05-5")},
	// 	{eventName: 'Game vs Denver', calendar: 'Sports', color: 'blue', eventTime: moment("2020-05-8")},
	// 	{eventName: 'Game vs San Degio', calendar: 'Sports', color: 'blue', eventTime: moment("2020-05-10")},

	// 	{eventName: 'School Play', calendar: 'Kids', color: 'yellow', eventTime: moment("2020-06-16")},
	// 	{eventName: 'Parent/Teacher Conference', calendar: 'Kids', color: 'yellow', eventTime: moment("2020-05-13")},
	// 	{eventName: 'Pick up from Soccer Practice', calendar: 'Kids', color: 'yellow', eventTime: moment("2020-05-26")},
	// 	{eventName: 'Ice Cream Night', calendar: 'Kids', color: 'yellow', eventTime: moment("2020-05-22")},

	// 	{eventName: 'Free Tamale Night', calendar: 'Other', color: 'green', eventTime: moment("2020-05-6")},
	// 	{eventName: 'Bowling Team', calendar: 'Other', color: 'green', eventTime: moment("2020-05-27")},
	// 	{eventName: 'Teach Kids to Code', calendar: 'Other', color: 'green', eventTime: moment("2020-05-19")},
	// 	{eventName: 'Startup Weekend', calendar: 'Other', color: 'green', eventTime: moment("2020-05-31")}
	// ];



	function addDate(ev) {

	}

	var calendar = new Calendar('#calendar', data1);

}();
let allEvents = document.getElementsByClassName("event");
for(let event of allEvents)
{
    event.childNodes
}									