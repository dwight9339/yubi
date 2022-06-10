import axios from "axios";

function randomInt(min, max){
  return Math.floor(Math.random() * (max - min)) + min;
}

export const getRandomImageFile = async () => {
  const hipsters = await axios.get("https://random-data-api.com/api/hipster/random_hipster_stuff");
  const theme = hipsters.data.words.join();
  console.log(theme);
  const unsplashRandomPhotoUrl = `https://source.unsplash.com/random/500x500?${theme}`;

  try {
    const res = await axios.get(unsplashRandomPhotoUrl, {
      responseType: "blob"
    });
    const file = new File([res.data], "random.jpg", {
      type: "image/jpeg"
    });
    
    return file;
  } catch(err) {
    console.error(`Random photo grab error: ${err}`);
    return { success: false };
  } 
}

export const getRandomName = async () => {
  const backupNames = ["Garry Newman", "Bob Saget", "Chris Rock", "Andy Samberg"];
  const baseURL = "https://random-data-api.com/api/";

  try {
    const coffee = await axios.get("coffee/random_coffee", {
      baseURL
    });
    const hipsters = await axios.get("hipster/random_hipster_stuff", {
      baseURL
    });
    const { blend_name: blendName } = coffee.data;
    const { words: hipsterWords } = hipsters.data;
    let randomHipsterWord = hipsterWords[randomInt(0, hipsterWords.length)];
    randomHipsterWord =  `${randomHipsterWord[0].toUpperCase()}${randomHipsterWord.slice(1)}`;
    const name = blendName.split(" ");
    name.splice(randomInt(0, name.length), 0, randomHipsterWord);
    if (randomInt(0, 2)) {
      name.splice(0, 1);
    }

    return name.join(" ");
  } catch(error) {
    console.error(`Random name error: ${error}`);
    
    return backupNames[randomInt(0, backupNames.length)];
  }
}

export const getLoremIpsum = async () => {
  const params = new URLSearchParams({
    type: "all-meat",
    sentences: randomInt(3, 7)
  });
  const baconIpsumUrl = `https://baconipsum.com/api/?${params.toString()}`;

  try {
    const res = await axios(baconIpsumUrl);

    return res.data[0];
  } catch(error) {
    console.error(`Lorem generator error: ${error}`);

    return "Unable to generate lorem ipsum text";
  }
}

export const generateRandomPrice = () => {
  return (randomInt(0, 100) * Math.random()).toFixed(2);
}

export const getVariantDescription = async () => {
  const baseURL = "https://random-data-api.com/api/";
  const hipsters = await axios.get("hipster/random_hipster_stuff", {
    baseURL
  });

  return hipsters.data.sentence;
}