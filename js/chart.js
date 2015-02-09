  google.setOnLoadCallback(loadData);

  function loadData() {
    var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1l7EB-35q4AHgNLG_-uswKi3Ywb0GgQQEfrPS8QI2yjE/edit?usp=sharing');

        // Apply query language statement.
        query.setQuery('SELECT A, sum(M), sum(L) group by A');
        
        // Send the query with a callback function.
        query.send(handleQueryResponse);
    };

    function handleQueryResponse(response) {
        if (response.isError()) {
          return;
      }
      var data = response.getDataTable();

      initChart(data);
  };


  function initChart(data) {
    var options = {
      title: 'Chart',
      legend: { position: 'bottom' },
      series: { 
        0 : { 
          targetAxisIndex: 0
        },
        1 : { 
          targetAxisIndex: 1,
        } 
      }, 
      vAxes: { 
        0 : { title : 'GMV' },
        1 : { title : 'Listing fees' } 
      }
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

    chart.draw(data, options);
  };