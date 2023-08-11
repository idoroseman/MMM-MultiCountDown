Module.register("MMM-MultiCountDown", {
  // Default module config.
  defaults: {
    events: [
      {
        name: "New Millenium:",
        date: "3000-01-01"
      }
    ],
    showHours: false,
    showMinutes: false,
    showSeconds: false,
    customInterval: 1000,
    daysLabel: "d",
    hoursLabel: "h",
    minutesLabel: "m",
    secondsLabel: "s"
  },

  // set update interval
  start: function () {
    var self = this;
    setInterval(function () {
      self.updateDom(); // no speed defined, so it updates instantly.
    }, this.config.customInterval);
    console.log("MMM-MultiCountDown started");
  },

  // Update function
  getDom: function () {
    var today = new Date(Date.now());
    var wrapper = document.createElement("div");

    this.config.events.forEach((event) => {
      var timeWrapper = document.createElement("div");
      var textWrapper = document.createElement("div");

      textWrapper.className = "align-left week dimmed small";
      timeWrapper.className = "time bright small light";
      textWrapper.innerHTML = event.name;

      var target = new Date(event.date);
      var timeDiff = target - today;

      // Set days, hours, minutes and seconds
      var diffDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      var diffHours = Math.floor(
        (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var diffMinutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      var diffSeconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      // Build the output
      var hrs = "";
      var mins = "";
      var secs = "";
      var days = diffDays + this.config.daysLabel;

      if (this.config.showHours == true)
        hrs = diffHours + this.config.hoursLabel;
      if (this.config.showMinutes == true)
        mins = diffMinutes + this.config.minutesLabel;
      if (this.config.showSeconds == true)
        secs = diffSeconds + this.config.secondsLabel;

      timeWrapper.innerHTML = days + hrs + mins + secs;

      wrapper.appendChild(textWrapper);
      wrapper.appendChild(timeWrapper);
    });

    return wrapper;
  }
});
