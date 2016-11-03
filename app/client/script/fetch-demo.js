let testdata = '';

fetch('/langs')
  .then(data => data.json())
  .then(test => {
    testdata = test.msg;
    for (const data of testdata) {
      const langLink = document.createElement('BUTTON');
      const langWrap = document.getElementById('lang-wrap');
      // langLink = langLink.innerHTML += `${data._id}(${data.count}) `;
      const langLinkContent = document.createTextNode(`${data._id}(${data.count}) `);
      langLink.value = data._id.toLowerCase();
      langLink.appendChild(langLinkContent);
      langWrap.appendChild(langLink);
    }
  });

const links = document.getElementsByClassName('lang');
Array.prototype.forEach.call(links, (link) => {
  link.addEventListener('click', (e) => {
    fetch('/langs/e.target.value')
      .then(data => data.json())
      .then(test => {
        console.log(test.msg);
      });
  });
});
