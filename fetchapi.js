

fetch('https://portal.edcd.gov.np/rest/api/fetch?filter=casesBetween&type=dayByDay&sDate=2020-01-01&eDate=2020-11-29&disease=COVID-19', { 
  method: 'GET'
}).then(res => {
    return res.json()
  })
  .then(data => console.log(data))
  .catch(_error => console.log('ERROR'))