
// To check wheather d3 is unlocked or not
// To check go to inspect>console
console.log(d3); 


// d3.select('div')
// 	.selectAll('p')
// 	.data([1,2,3])
// 	.enter()   gives all the missing element
// 	.append('p')    /*add new p*/
// 	.text(dta => dta);  /*sets text into the created p*/



const DUMMY_DATA = [
	{ id:'d1', value:10, region: 'Kathmandu' },
	{ id:'d2', value:11, region: 'Chitwan' },
	{ id:'d3', value:12, region: 'Pokhara' },
	{ id:'d4', value:13, region: 'Mardi' },
];

d3.select('div')
	.selectAll('p')
	.data(DUMMY_DATA)
	.enter()   
	.append('p') 
	.text(dta => dta.region)
	.classed('container', true)
	.style('border','1px solid black'); 

