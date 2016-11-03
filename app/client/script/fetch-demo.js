let testdata = '';

fetch('/langs')
  .then(data => data.json())
  .then(test => {
    testdata = test.msg;
    const langWrap = document.getElementById('lang-wrap');
    for (const data of testdata) {
      const langLink = document.createElement('BUTTON');
      // langLink = langLink.innerHTML += `${data._id}(${data.count}) `;
      const langLinkContent = document.createTextNode(`${data._id}(${data.count}) `);
      langLink.value = data._id.toLowerCase();
      langLink.className = 'lang';
      langLink.appendChild(langLinkContent);
      langWrap.appendChild(langLink);
    }
    const headerWrapper = document.createElement('div');
    langWrap.appendChild(headerWrapper);
    fetchLang(headerWrapper);
  });

function fetchLang(headerWrapper) {
  const links = document.getElementsByClassName('lang');
  Array.prototype.forEach.call(links, (link) => {
    link.addEventListener('click', (e) => {
      headerWrapper.innerHTML = '';
      fetch(`/langs/${e.target.value}`)
        .then(data => data.json())
        .then(test => {
          for (const data of test.msg) {
            const poemDiv = document.createElement('div');
            const poemH = document.createElement('h1');
            const poemContent = document.createElement('p');
            poemContent.style.display = 'none';
            poemH.textContent = `${data.title}`;
            for (const row of data.content) {
              poemContent.innerHTML += `${row}<br />`;
            }
            poemDiv.appendChild(poemH);
            poemDiv.appendChild(poemContent);
            headerWrapper.appendChild(poemDiv);
          }
        });
    });
  });
}
