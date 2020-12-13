const axios = require('axios');
const fs = require('fs');
const csv = require('fast-csv');
require('dotenv').config();

let city = 'dallas';
const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=metric`;

const getCurrentWeather = async (url) => {
  try {
    const { data: city } = await axios.get(url);
    const message = `The weather for today in ${city.name} city is : ${city.main.temp}° celsius,  !`;
    const precipitation = city.rain ? true : false;
    const nameFile = fs.createWriteStream(`${city.name} weather.csv`);
    const csvStream = csv.format({ headers: true });
    csvStream.write([
      'City',
      'Temperature (c)',
      'Temperature (f)',
      'Precipitation ',
    ]);
    csvStream.write([
      city.name,
      city.main.temp,
      (city.main.temp * 9) / 5 + 32,
      precipitation,
    ]);
    csvStream.pipe(nameFile);
    console.log(message);
  } catch (error) {
    console.error(error);
  }
};

getCurrentWeather(url);
