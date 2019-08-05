HTMLWidgets.widget({

  name: 'testChart',

  type: 'output',

  factory: function(el, width, height) {

    // TODO: define shared variables for this instance

    return {

      renderValue: function(rSettings) {
        
        el.innerHTML = "<div class='chart-wrapper'></div>";
        var settings =  {
          x: {
           type: 'linear',
           column: 'Sepal.Length',
           label: 'Sepal length',
           domain: ['minimum',null],
          },
        y: {
          type: 'linear',
          column: 'Sepal.Width',
          label: 'Sepal Width',
          domain: ['minimum',null],
        },
        marks: [
          {
            type: 'circle',
            per: ['seq'],
            tooltip: '$x,$y',
          },
       ],
      color_by: 'Species',
      legend: {
        label: 'Species',
        mark: 'circle',
        location: 'bottom',
      },
      aspect: 1
      };

        var chart =  webCharts.createChart(".chart-wrapper", settings);
        var jsdata = HTMLWidgets.dataframeToD3(rSettings.data);
       
        // Step 1 - Fire a custom 'participantToggle' event whenever a points is clicked 
        // In the future we could have `participantSelected` events (and other common events?) standard in the js libraries. 
        chart.on("resize",function(d){
          var chart = this; 
          
          this.marks[0].circles.on("click",function(d){
              //save the participant ID as a property of the overall chart
              chart.participantSelected = d.values.raw[0].seq
              
              // Create a new event and dispatch to the overall chart wrap
              var event = new CustomEvent('participantSelected', {detail:chart.participantSelected});
              chart.wrap.node().dispatchEvent(event);
              
              //Note: NBD, but we'll need to add a polyfill to make this work in old browsers
          })
        })
        
        chart.init(jsdata);
        
        // Step 2 - Listen for the participantSelected event, and trigger an action in Shiny. 
        // This would be custom defined in the htmlwidget
        chart.wrap.on("participantSelected",function(chart){
          console.log("Participant Selected!! You clicked participant: "+chart.participantSelected)
          Shiny.setInputValue("selectedParticipant", d3.event.detail); //Note: d3.event.detail and chart.participantSelected are interchangable here
        })
      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      }

    };
  }
});