let testdata = '';

fetch('/langs')
  .then(data => data.json())
  .then(test => {
    testdata = test.msg;
    for (const data of testdata) {
      document.getElementById('test').innerHTML += `${data._id} `;
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
