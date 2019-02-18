$(function() {
	//Operate with Page Headings menu
	const pageHeadingsButton = document.querySelector('.js-list-of-headings-button');
	const pageHeadingsContainer = document.querySelector('.js-page-headings-container');
	const toolsBarWidth = document.querySelector('.js-tools-bar').offsetWidth;

	pageHeadingsContainer.style.right = Number(toolsBarWidth) + 10 + 'px';

	const HTMLCollectionOfPageHeadings = document.getElementsByTagName('h3');
	const arrayOfPageHeadings = Array.from(HTMLCollectionOfPageHeadings);
	const arrayOfPageHeadingsMenuElements = []

	arrayOfPageHeadings.forEach(function(pageHeadingElement) {
		let anchorLink = window.location.origin + window.location.pathname + '#' + pageHeadingElement.id;
		let outputString = '<li><a href="' + anchorLink + '" data-id="' + pageHeadingElement.id + '" class="js-page-heading-link">' + pageHeadingElement.innerText + '</a></li>';
		arrayOfPageHeadingsMenuElements.push(outputString);
	});

	const pageHeadingsMenuContent = '<p>Jump to part:</p><ul>' + arrayOfPageHeadingsMenuElements.join('') + '</ul>';
	pageHeadingsContainer.innerHTML = pageHeadingsMenuContent;

	pageHeadingsButton.addEventListener('click', function(e) {
		e.preventDefault();

		if (pageHeadingsButton.getAttribute('data-state') === 'closed') {
			//Open Page Headings menu

			pageHeadingsButton.innerText = '❌';
			pageHeadingsButton.setAttribute('data-state', 'opened');
			pageHeadingsContainer.style.display = 'block';
			
		} else {
			//Close Page Headings menu

			pageHeadingsButton.innerText = '📜';
			pageHeadingsButton.setAttribute('data-state', 'closed');
			pageHeadingsContainer.style.display = 'none';

		}
	});

	pageHeadingsContainer.addEventListener('click', function(e) {
		if (e.target.classList.contains('js-page-heading-link')) {
			e.preventDefault();
			let elementIdToScrollTo = e.target.getAttribute('data-id');
			document.getElementById(elementIdToScrollTo).scrollIntoView({behavior: 'smooth', block: 'start'});
		}
	});

  //Hide - it is not fixed yet
  $(pageHeadingsButton).hide();


	//Go to Top button Logic
	$('.js-go-to-top-button').on('click', function(e) {
		e.preventDefault();
		$('html, body').animate({scrollTop: 0}, 800);
	});


	//Go to Bottom button Logic
	$('.js-go-to-bottom-button').on('click', function(e) {
		e.preventDefault();
		$('html, body').animate({scrollTop: document.body.scrollHeight}, 800);
	});


	//Generate the list of all articles
	// $.getJSON('https://quick-geek.github.io/allArticles.json', function(data) {
	// 	const $listOfAllArticles = $('.js-list-of-pages').detach();
	// 	console.log(data);

	// 	data.forEach(article => {
	// 		$listOfAllArticles.append('<li><a href="../articles/' + article.id + '/index.html">' + article.title + '</a></li>\n');
	// 	});
		
	// 	$('.js-list-of-articles-container').append($listOfAllArticles);
	// });


	//Get the list of all articles
	$('.js-list-of-articles-container').load('../../index.html .js-all-articles-list');
});