/**
 *
 * ADD button page gamedev
 *
 */
const observer = new MutationObserver(() => {
  const targetSection = document.querySelector('section.sticky.top-0');
  const iframe = document.querySelector('iframe.absolute');

  if (!document.querySelector('button.buttonIframe')) {
    const button = document.createElement('button');
    button.className = 'buttonIframe';
    button.textContent = 'Open Iframe';
    button.style.margin = '10px';
    button.style.padding = '5px 10px';
    button.style.cursor = 'pointer';
    button.style.width = '10%';

    button.addEventListener('click', () => {
      window.open(iframe.src, '_blank');
    });

    targetSection.appendChild(button);
    observer.disconnect();
  }
});

observer.observe(document.body, { childList: true, subtree: true });

/**
 *
 * Translate subtitle IFrame
 *
 */
function observeSubtitleContainer() {
  const subtitleContainer = document.querySelector('div.plyr__captions');

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
}

const observeGlobal = new MutationObserver(() => {
  const subtitleContainer = document.querySelector('div.plyr__captions');
  if (subtitleContainer) {
    observeSubtitleContainer();
    observeGlobal.disconnect();
  }
});

observeGlobal.observe(document.body, { childList: true, subtree: true });

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
    engine: 'ENGINE',
    blueprint: 'BLUEPRINT',
    portfolio: 'PORTFOLIO',
  };

  let words = text.split(' ');
  words = words.map((word) => {
    const lowerCaseWord = word.toLowerCase();
    if (replace[lowerCaseWord]) {
      return replace[lowerCaseWord];
    }
    return word;
  });

  return words.join(' ');
}
