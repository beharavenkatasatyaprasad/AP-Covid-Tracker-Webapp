const districtsEl = document.getElementById('districts');
const toggleBtn = document.getElementById('toggle');
const searchEl = document.getElementById('search');


getAP_Data();

async function getAP_Data() {
	const res = await fetch('https://api.covid19india.org/state_district_wise.json');
    const response = await res.json();
    Object.keys(response).forEach(function(key) {
        let replaced = key.replace(' ', '');
        if (key !== replaced) {
            response[replaced] = response[key];
          delete response[key];
        }
      });
    
    const AP_Data = response.AndhraPradesh.districtData;
    const DistrictNames = Object.keys(AP_Data);
    const Districtsdata = Object.values(AP_Data);
    displayDistricts(DistrictNames,Districtsdata);
}

function displayDistricts(DistrictNames,Districtsdata) {
	districtsEl.innerHTML = '';
    for(let i=1;i<DistrictNames.length;i++){
      const districtEl = document.createElement('div');
      districtEl.classList.add('card');
      districtEl.innerHTML = `
              <div class="card-body">
                  <h3 class="district-name">
                      ${i}. ${DistrictNames[i]}
                  </h3>
                  <p>
                      <strong>Active:</strong>
                      ${Districtsdata[i].active}
                  </p>
                  <p>
                      <strong>Confirmed:</strong>
                      ${Districtsdata[i].confirmed}
                  </p>
                  <p>
                      <strong>Recovered:</strong>
                      ${Districtsdata[i].recovered}
                  </p>
                  <p>
                      <strong>Deceased:</strong>
                      ${Districtsdata[i].deceased}
                  </p>
                  `;
      districtsEl.appendChild(districtEl);
    }
}

// theme - dark & light
toggleBtn.addEventListener('click', () => {
	document.body.classList.toggle('dark');
});


searchEl.addEventListener('input', e => {
	const { value } = e.target;
	const districtName = document.querySelectorAll('.district-name');

	districtName.forEach(name => {
		if (name.innerText.toLowerCase().includes(value.toLowerCase())) {
			// .card -> .card-body -> .district-name
			name.parentElement.parentElement.style.display = 'block';
		} else {
			name.parentElement.parentElement.style.display = 'none';
		}
	});
});



// scroll button function
var mybutton = document.getElementById("scrollBtn");
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } 
  else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }