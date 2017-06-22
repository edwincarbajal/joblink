const PROTOCOL = 'https://';

// write link to local storage
const saveLink = (text, source) => {
  // using chromes storage API
  chrome.storage.local.set({ [source]: PROTOCOL + text });
}

// retrieve from local storage
const displayLink = () => {
  // using chromes storage API
  chrome.storage.local.get(function(data) {
    // if the value exists
    if(data) {
      let links = {};
      for (var link in data) {
        return links[link] = data[link];
      }
      // console.log(links);
      return links;
    }
  });
}
