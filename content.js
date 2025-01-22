let subtitleContainer = document.querySelector('div.plyr__captions');

if (subtitleContainer) {
  let config = { childList: true, subtree: true };

  var callback = async function (mutationsList) {
    for (var mutation of mutationsList) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(async function (node) {
          if (node.matches && node.matches('span.plyr__caption')) {
            // console.log('🚀 ~ node:', node.innerText);
            const translateText = await fetchTranslation(node.innerText);
            // console.log(
            //   '🚀 ~ translateText.translatedText:',
            //   translateText.translatedText
            // );
            node.innerHTML = translateText.translatedText;
          }
        });
      }
    }
  };

  var observer = new MutationObserver(callback);
  observer.observe(subtitleContainer, config);
}

async function fetchTranslation(text) {
  const modifiedText = modifyText(text);

  const formData = new FormData();
  formData.append('q', modifiedText);
  formData.append('source', 'en');
  formData.append('target', 'fr');
  formData.append('format', 'text');
  formData.append('alternatives', '3');
  formData.append('api_key', '');

  const res = await fetch('http://localhost:5000/translate', {
    method: 'POST',
    body: formData,
  });
  return await res.json();
}

function modifyText(text) {
  const replace = {
    unreal: 'UNREAL',
    blueprint: 'BLUEPRINT',
    portfolio: 'PORTFOLIO',
  };

  let modifiedText = text;
  for (const [key, value] of Object.entries(replace)) {
    const regex = new RegExp(`\\b${key}\\b`, 'gi');
    modifiedText = modifiedText.replace(regex, value);
  }

  return modifiedText;
}
