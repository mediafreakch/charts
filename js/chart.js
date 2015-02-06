  google.setOnLoadCallback(loadData);

  function loadData() {
    var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1l7EB-35q4AHgNLG_-uswKi3Ywb0GgQQEfrPS8QI2yjE/edit?usp=sharing');

        // Apply query language statement.
        query.setQuery('SELECT B, sum(O) group by B');
        
        // Send the query with a callback function.
        query.send(handleQueryResponse);
    };

    function handleQueryResponse(response) {
        if (response.isError()) {
          alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
          return;
      }
      var data = response.getDataTable();

      initChart(data);
  };


  function initChart(data) {
    var options = {
      title: 'Company Performance',
      curveType: 'function',
      legend: { position: 'bottom' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

    chart.draw(data, options);
  };