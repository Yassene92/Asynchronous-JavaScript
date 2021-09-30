'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
     <h3 class="country__name">${data.name}</h3>
     <h4 class="country__region">${data.region}</h4>
     <p class="country__row"><span>👫</span>${(
       +data.population / 1000000
     ).toFixed(1)} people</p>
     <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
     <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
  </div>
 </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};
///////////////////////////////////////

/*
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('Get', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `
  <article class="country">
    <img class="country__img" src="${data.flags[0]}" />
    <div class="country__data">
     <h3 class="country__name">${data.name}</h3>
     <h4 class="country__region">${data.region}</h4>
     <p class="country__row"><span>👫</span>${(
       +data.population / 1000000
     ).toFixed(1)}</p>
     <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
     <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
  </div>
 </article>`;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};
getCountryData('iran');
getCountryData('china');
getCountryData('usa');

const getCountryAndNeighbour = function (country) {
  // Ajax call country 1
  const request = new XMLHttpRequest();
  request.open('Get', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    // render country 1
    renderCountry(data);
    // get neighbour country (2)
    const [neighbour] = data.borders;

    if (!neighbour) return;

    //AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('Get', `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);
      // render neighbour
      renderCountry(data2, 'neighbour');
    });
  });
};
getCountryAndNeighbour('china');
//Callback Hell
setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 second passed');
    setTimeout(() => {
      console.log('3 second passed');
      setTimeout(() => {
        console.log('4 second passed');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);

//Promises and the Fetch API

const getCountryData = function (country) {
fetch(`https://restcountries.com/v2/name/${country}`)
  .then(function (response) {
    console.log(response);
   return response.json();
  })
  .then(function (data) {
   console.log(data);
    renderCountry(data[0]);
  });
//
//
//st getCountryData = function (country) {
//etch(`https://restcountries.com/v2/name/${country}`)
// .then(response => response.json())
// .then(data => {
//   renderCountry(data[0]);
//   const neighbour = data[0].borders[0];
//
//   if (!neighbour) return;
//
//   // country 2
//   return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
// })
// .then(response => response.json())
// .then(data => renderCountry(data, 'neighbour'))
// .catch(err => {
//   console.error(`${err} 🚨🚨🚨🚨🚨 `);
//   renderError(`Somthing went wrong 🚨🚨🚨 ${err.message}. Try again!`);
// })
// .finally(() => {})
//
//.addEventListener('click', function () {
//etCountryData('china');
//
const getCountryData = function (country) {
  // Country 1
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) throw new Error('No neighbour found!');

      // Country 2
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        'Country not found'
      );
    })

    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('portugal');
});

// getCountryData('australia');

//Coding Challenge #1

const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(res => {
      if (!res.ok) throw new Error(`problem in geocoding! ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);

      return fetch(`https://restcountries.com/v2/name/${data.country}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`country not found (${res.status})`);

      return res.json();
    })
    .then(data => {
      console.log(data[0]);
      renderCountry(data[0]);
    })
    .catch(err => console.error(`${err.message} 🚨🚨🚨🚨🚨 `));
};
whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);

//The Event Loop in Practice

console.log('Test start');
setTimeout(() => {
  console.log('0 sec timer');
}, 0);
Promise.resolve('Resolved promise 1 ').then(res => {
  console.log(res);
});

Promise.resolve('Resoled promise 2').then(res => {
  for (let i = 0; i < 1000000; i++) {}
  console.log(res);
});

console.log('test end');

//Building a Simple Promise
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lotter draw is happening 🔮');
  setTimeout(() => {
    if (Math.random() >= 0.5) {
      resolve('You win 💵');
    } else {
      reject(new Error('You lost your money💸'));
    }
  }, 2000);
});
lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// promisifying setTmout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};
wait(1)
  .then(() => {
    console.log('1 seconds passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 seconds passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 seconds passed');
    return wait(1);
  })
  .then(() => {
    console.log('4 seconds passed');
    return wait(1);
  });

Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('Problem!')).catch(x => console.error(x));

//Promisifying the Geolocation API
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    //navigator.geolocation.getCurrentPosition(
    // position => resolve(position),
   //  err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getPosition().then(pos => console.log(pos));

const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude : lat, longitude: lng } = pos.coords;

      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`problem in geocoding! ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);

      return fetch(`https://restcountries.com/v2/name/${data.country}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`country not found (${res.status})`);

      return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message} 🚨🚨🚨🚨🚨`));
};
btn.addEventListener('click', whereAmI);


//Coding Challenge #2

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

let currentImg;

createImage('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    console.log('Image 1 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('Img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    console.log('Image 1 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('Img/img-3.jpg');
  })
  .then(img => {
    currentImg = img;
    console.log('Image 1 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(err => console.error(err));


//Consuming Promises with Async/Await
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  // Geolocation
  try {
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    //reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error('Problem getting location data');
    const dataGeo = await resGeo.json();

    // country data
    const res = await fetch(
      `https://restcountries.com/v2/name/${dataGeo.country}`
    );
    if (!res.ok) throw new Error('Problem getting country');
    const data = await res.json();
    renderCountry(data[0]);
  } catch (err) {
    console.error(`${err} 💥`);
    renderError('${err.message} 💥');
  }
};

console.log('1: will get location');
//const city = whereAmI();
//console.log(city);

(async function () {
  try {
    const city = await whereAmI();
    console.log(`2: ${city}`);
  } catch (err) {
    console.error(`2: ${err.message} 💥`);
  }
  console.log('3: finched getting location');
})();

//Running Promises in Parallel

const get3Countrries = async function (c1, c2, c3) {
  try {
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v2/name/${c1}`),
      getJSON(`https://restcountries.com/v2/name/${c2}`),
      getJSON(`https://restcountries.com/v2/name/${c3}`),
    ]);
    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.error(err);
  }
};
get3Countrries('portugal', 'canada', 'tanzania');

//Other Promise Combinators: race, allSettled and any
//1) Promise.race
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v2/name/italy`),
    getJSON(`https://restcountries.com/v2/name/morocco`),
    getJSON(`https://restcountries.com/v2/name/mexico`),
  ]);
  console.log(res[0]);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(new Error('request took to long!'));
    }, sec * 1000);
  });
};

Promise.race([getJSON(`https://restcountries.com/v2/name/iran`), timeout(5)])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

// 2) Promise.allsettled
Promise.allSettled([
  Promise.resolve('success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another succESS'),
]).then(res => console.log(res));

Promise.all([
  Promise.resolve('success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another succESS'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

  // Promise.any ES2021
  Promise.any([
    Promise.resolve('Success'),
    Promise.reject('ERROR'),
    Promise.resolve('Another succESS'),
  ])
    .then(res => console.log(res))
    .catch(err => console.error(err));
    */

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

//let currentImg;
//
//createImage('img/img-1.jpg')
//  .then(img => {
//    currentImg = img;
//    console.log('Image 1 loaded');
//    return wait(2);
//  })
//  .then(() => {
//    currentImg.style.display = 'none';
//    return createImage('Img/img-2.jpg');
//  })
//  .then(img => {
//    currentImg = img;
//    console.log('Image 2 loaded');
//    return wait(2);
//  })
//  .then(() => {
//    currentImg.style.display = 'none';
//    return createImage('Img/img-3.jpg');
//  })
//  .then(img => {
//    currentImg = img;
//    console.log('Image 3 loaded');
//    return wait(2);
//  })
//  .then(() => {
//    currentImg.style.display = 'none';
//  })
//  .catch(err => console.error(err));

const loadNPause = async function () {
  try {
    //load image 1
    let img = await createImage('img/img-1.jpg');
    console.log('Image 1 loaded');
    await wait(2);
    img.style.display = 'none';
    //load image 2
    img = await createImage('img/img-2.jpg');
    console.log('Image 2 loaded');
    await wait(2);
    img.style.display = 'none';
    //load image 3
    img = await createImage('img/img-3.jpg');
    console.log('Image 3 loaded');
    await wait(2);
    img.style.display = 'none';
  } catch (err) {
    console.error(err);
  }
};
//loadNPause();

//part 2
const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));
    const imgsEl = await Promise.all(imgs);
    console.log(imgsEl);
    imgsEl.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(err);
  }
};
loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
