let testdata = '';

fetch('/langs')
  .then(data => data.json())
  .then(test => {
    testdata = test.msg;
    for (const data of testdata) {
      document.getElementById('test').innerHTML += `${data._id}(${data.count}) `;
    }
  });
