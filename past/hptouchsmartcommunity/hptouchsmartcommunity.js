import json from '/content.json'
let data = json.hptouchsmartcommunity[0];

document.querySelector('#hptouchsmartcommunity').innerHTML = `
  <div id="projectcontent">
    <h1>${data.project_title}</h1>
    <p>${data.project_skills}</p>
    <p>${data.project_year}</p>
  </div>
`