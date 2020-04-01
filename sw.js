importScripts('./node_modules/idb-keyval/dist/idb-keyval-iife.js');

var secret;

self.addEventListener('message', async function(e) {
  const { data, ports: [ port ] } = e;
  if (data.type === 'put') {
    secret = data.secret;
    await idbKeyval.set('secret', secret);
  } else if (data.type === 'get') {
    port.postMessage({
      global: secret,
      idb: await idbKeyval.get('secret')
    })
  }
});
