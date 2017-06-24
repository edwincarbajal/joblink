const PROTOCOL = 'https://';

// write link to local storage
const saveLink = (text, source) => {
  // using chromes storage API
  chrome.storage.local.set({ [source]: PROTOCOL + text });
}

const setDarkMode = (val) => {
  chrome.storage.local.set({ 'dark_mode': val });
}

const getDarkMode = () => new Promise((resolve, reject) => {
  chrome.storage.local.get("dark_mode", items => {
    resolve(items.dark_mode);
  });
});

// retrieve from local storage
const displayLink = () => new Promise((resolve, reject) => {
  // using chromes storage API
  chrome.storage.local.get(function(data) {
    // if data exists
    if (data) {
      let links = {};
      for(link in data) {
        // make sure each data belongs to object
        if(!data.hasOwnProperty(link)) {
          continue;
        }
        links[link] = data[link];
      }
      resolve(links);
    }
  });
});

// remove item from local storage
const deleteLink = (key) => {
  chrome.storage.local.remove(key);
}
