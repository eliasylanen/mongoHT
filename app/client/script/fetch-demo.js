const poemTranslations = document.getElementById('poemTranslations');
const translationWrap = document.getElementById('translationWrap');
const commentWrap = document.getElementById('commentWrap');

fetch('/langs')
  .then(data => data.json())
  .then(test => {
    const poemWrap = document.getElementById('poemWrap');
    for (const data of test.msg) {
      const langLink = document.createElement('BUTTON');
      // langLink = langLink.innerHTML += `${data._id}(${data.count}) `;
      const langLinkContent = document.createTextNode(`${data._id} (${data.count}) `);
      langLink.value = data._id.toLowerCase();
      langLink.className = 'lang';
      langLink.appendChild(langLinkContent);
      poemWrap.appendChild(langLink);
    }
    const headerWrapper = document.createElement('div');
    poemWrap.appendChild(headerWrapper);
    fetchLang(headerWrapper);
  });

function fetchLang(headerWrapper) {
  const links = document.getElementsByClassName('lang');
  Array.prototype.forEach.call(links, (link) => {
    link.addEventListener('click', (e) => {
      poemTranslations.innerHTML = null;
      translationWrap.innerHTML = null;
      commentWrap.innerHTML = null;
      fetch(`/langs/${e.target.value}`)
        .then(data => data.json())
        .then(poems => {
          headerWrapper.innerHTML = '';
          for (const data of poems.msg) {
            const poemDiv = document.createElement('div');
            const poemH = document.createElement('h1');
            poemH.onclick = handleTitleClick;
            const poemContent = document.createElement('p');
            const transLink = document.createElement('button');
            const transContent = document.createElement('p');


            transContent.style.display = 'none';
            poemContent.style.display = 'none';
            poemH.textContent = `${data.title}`;
            getAuthor(`${data.authors[0]}`)
              .then(authorData => {
                poemH.textContent += ` - ${authorData.msg.fname} ${authorData.msg.lname}`;
              });
            getTranslationsCount(data._id)
              .then(translationData => {
                if (translationData.msg.length > 0) {
                  for (const transLang of translationData.msg) {
                    // Give translation button a class according to its language
                    transLink.className = 'translation';
                    transLink.value = transLang._id;
                    transLink.id = data._id;
                    transLink.onclick = handleTranslationClick;
                    transLink.textContent +=
                      `${transLang.count} ${transLang._id} translation(s)`;
                    poemTranslations.appendChild(transLink);
                  }
                }
              });
            for (const row of data.content) {
              poemContent.innerHTML += `${row}<br />`;
            }
            poemDiv.appendChild(poemH);
            poemDiv.appendChild(poemContent);
            headerWrapper.appendChild(poemDiv);
            translationWrap.appendChild(transContent);
          }
        });
    });
  });
}


function handleTitleClick(e) {
  $(e.target.nextSibling).slideToggle('fast');
}

function handleTranslationClick(e) {
  return fetch(`/translations/${e.target.id}/${e.target.value}`)
    .then(data => data.json())
    .then(translations => {
      translationWrap.innerHTML = null;
      for (const translation of translations.msg) {
        console.log(translation);
        const transH = document.createElement('h1');
        transH.textContent = translation.trans_title;
        translationWrap.appendChild(transH);
        const transP = document.createElement('p');
        translation.trans_content.forEach(value => {
          transP.innerHTML += `${value}<br />`;
        });
        translationWrap.appendChild(transP);
        getComments(translation._id);
      }
    });
}

function getAuthor(id) {
  return fetch(`/authors/${id}`)
    .then(data => data.json());
}

function getTranslationsCount(id) {
  return fetch(`/translations/${id}`)
    .then(data => data.json());
}

function getComments(id) {
  return fetch(`/comments/${id}`)
    .then(data => data.json())
    .then(comments => {
      let ratingAVG = 0;
      for (const comment of comments.msg) {
        ratingAVG += comment.rating;
        console.log(comments.msg);
        const commentP = document.createElement('p');
        commentP.textContent = comment.content;
        const commentIntro = document.createElement('h3');
        commentIntro.textContent = 'Comments: ';
        commentWrap.appendChild(commentIntro);
        commentWrap.appendChild(commentP);
        const commentRating = document.createElement('p');
        commentRating.textContent = 'Rating: ' + comment.rating + '/5';
        commentWrap.appendChild(commentRating);
      }
      const ratingIntro = document.createElement('h3');
      ratingIntro.textContent = 'Average rating: ';
      $(commentWrap).prepend(ratingIntro);
      ratingAVG /= comments.msg.length;
      ratingIntro.textContent += ratingAVG;
    });
}
