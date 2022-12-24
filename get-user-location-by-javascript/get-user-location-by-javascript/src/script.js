let text = document.querySelector('.card p');
let locationBox = document.querySelector('.location');
let detectBtn = document.querySelector('.detectBtn');

let successFunction = (position) => {
    text.innerHTML = '';
    detectBtn.innerHTML = 'Detecting Your Location...';
    let { latitude, longitude } = position.coords;
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=6f6d6d4d05c04f798cdc8c808d899d9f`)
        .then(response => response.json()).then(response => {
            let allDetails = response.results[0].components;
            console.table(allDetails);
            let { county, postcode, country, state_code } = allDetails;
            locationBox.innerText = `${county} ${postcode} ${state_code}, ${country}`;
            detectBtn.style.display = 'none';
        }).catch(() => {
            detectBtn.innerText = "Something went wrong";
        });
}

let errorFunction = (error) => {
    if (error.code == 1) {
        text.innerHTML = 'You denied to access your location';
    } else if (error.code == 2) {
        text.innerHTML = 'Location is not available';
    } else {
        text.innerHTML = 'Something went wrong';
    }
}

detectBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        text.innerHTML = 'Allow location access to Detect your location.';
        navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
    } else {
        alert('It seems like Geolocation, which is required for this page, is not enabled in your browser.');
    }
});