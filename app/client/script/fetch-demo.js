let testdata = '';

fetch('/langs')
  .then(data => data.json())
  .then(test => {
    testdata = test.msg;
    for (const data of testdata) {
      var langLink = document.createElement('BUTTON');
      var langWrap = document.getElementById('lang-wrap');
      // langLink = langLink.innerHTML += `${data._id}(${data.count}) `;
      var langLinkContent = document.createTextNode(`${data._id}(${data.count}) `);
      langLink.value = data._id.toLowerCase();
      langLink.appendChild(langLinkContent);
      langWrap.appendChild(langLink);
    }
  });
