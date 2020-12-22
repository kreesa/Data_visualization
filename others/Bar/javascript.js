// function to handle success
function success() {
    var data = JSON.parse(this.responseText); //parse the string to JSON
    var sabai_dates= new Array();
    var harek_date_ko_infected = new Array();
    var i=0;
    data.forEach(()=>{  
        //Value display gareko tyo textarea ma
        sabai_dates[i]=data[i].date;
        harek_date_ko_infected[i]=data[i].totalCases;
        i++;
    });
    chart_banaidey(sabai_dates,harek_date_ko_infected);
}

// function to handle error
function error(err) {
    console.log('Request Failed', err); //error details will be in the "err" object
}

var xhr = new XMLHttpRequest(); //invoke a new instance of the XMLHttpRequest
xhr.onload = success; // call success function if request is successful
xhr.onerror = error;  // call error function if request failed
xhr.open('GET','https://data.nepalcorona.info/api/v1/covid/timeline'); // open a GET request
xhr.send(); // send the request to the server.

function chart_banaidey(value1,value2){
covid_data = document.getElementById('yo_chart_1_ho');
	Plotly.newPlot( covid_data, [{
	x: value1,
	y:  value2 }], {
    margin: { t: 0 } } );
}

    
TESTER = document.getElementById('yo_chart_2_ho');
Plotly.newPlot( TESTER, [{
x: [1, 2, 3, 4, 5],
y: [1, 2, 4, 8, 16] }], {
margin: { t: 0 } } );