// our racer class works in this file because the racerhelper.js file is loaded in our html file before this file


const getRoundData = async (season, round) => {
    let response = await axios.get(`https://ergast.com/api/f1/${season}/${round}/driverStandings.json`);
    console.log(response);
    return response.data
}

const showData = async (season, round) => {
    let data = await getRoundData(season, round);
    data = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    //data = data['MRData']['StandingsTable']['StandingsLists'][0]['DriverStandings'].slice(0,7);
    console.log(data);

    // let's take that data and actually organize it and put it in our html
    // i started with my classic api principle of "if I can do it for one, I can do it for many"
    for(let i = 0; i<data.length; i++){
        let driver = new Racer(data[i]); // organizes the data for a single racer
        create_html(driver); // creates the html from the organized data (racer object)
        console.log(driver);
    }

    // forEach syntax for the same functionality as lines 18 thru 22
    //data.forEach( driver => { let dr = new Racer(driver); create_html(dr); console.log(dr); });
}

// Form stuff? I need that season and round value.
const form = document.querySelector('#apiCallForm');
console.log(form);

// add event handler to our form
form.addEventListener('submit', ( event ) => {
    event.preventDefault();
    clear_data();
    let season = event.path[0][0].value;
    let round = event.path[0][1].value;
    console.log(season, round);
    showData(season, round);
});


// create constant variable(s) to hold our DOM elements
let DOM_Elements = {
    driver_list: '.driver-list'
}

// function to create and insert actual html for a driver
const create_html = (driver) => {
    const html_tag = `<a href="#" class="list-group-item list-group-item-action list-group-item-light" id="${driver.num}">${driver.pos} | ${driver.code}-${driver.num} | ${driver.name} | ${driver.team} | ${driver.points}</a>`
    document.querySelector(DOM_Elements.driver_list).insertAdjacentHTML('beforeend', html_tag);
}

const clear_data = () => {
    document.querySelector(DOM_Elements.driver_list).innerHTML = '';
}