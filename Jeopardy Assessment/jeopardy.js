let categories = [];
let catsAndClues = [];

// create Jeopardy Title and Start/Reset button
$('body').append(`
    <h1 id="title">JEOPARDY!</h1>
    <div id="button-div">
        <button id="button" data-startBtn="true">Start!</button>
    </div>
    <div id="game-board">
    </div>`);

async function getCategoryIds() {
	// save random number from one to 18000 to randomInt
	// randomInt will be used as the "offset" parameter to get a random sequence of categories
	let randomInt = Math.floor(Math.random() * 18000 + 1);
	let res = await axios.get(`http://jservice.io/api/categories?count=100&offset=${randomInt}`);
	// create a loop to iterate until the categories array contains 6 items
	for (let i = 0; categories.length < 6; i++) {
		// pull random ID number from the 100 categories pulled from API
		let i = Math.floor(Math.random() * 100 + 1);
		let randomCatId = res.data[i].id;
		// if categories array does not include the randomCatId, add it to the categories array
		if (!categories.includes(randomCatId)) {
			categories.push(randomCatId);
		}
		console.log(categories);
	}
}

async function getCategory(catId) {
	// retreive clues from API with the category ID parameter
	let res = await axios.get(`http://jservice.io/api/clues?category=${catId}`);
	// use .map function to return object displaying question, answer, and "showing"
	// properties for every item in the data's array
	let clueGroup = res.data.map((clue) => {
		return {
			question: clue.question,
			answer: clue.answer,
			showing: null
		};
	});
	console.log('clueGroup:', clueGroup);
	let clueArray = [];
	for (let i = 0; clueArray.length < 5; i++) {
		// pull random clue from the clues array and save to variable
		let i = Math.floor(Math.random() * clueGroup.length);
		let randomClue = clueGroup[i];
		// if categories array does not include the randomCatId, add it to the categories array
		if (!clueArray.includes(randomClue)) {
			clueArray.push(randomClue);
		}
	}
	// define obj to show category title and list of all clues within the category
	console.log('clueArray: ', clueArray);
	console.log(res.data[0].category.title);
	return { title: res.data[0].category.title, clues: clueArray };
}

function fillTable() {
	$('#game-board').append(
		`<table id="table">
        <thead>
            <tr id="header-row">
                <th>${catsAndClues[0].title}</th>
                <th>${catsAndClues[1].title}</th>
                <th>${catsAndClues[2].title}</th>
                <th>${catsAndClues[3].title}</th>
                <th>${catsAndClues[4].title}</th>
                <th>${catsAndClues[5].title}</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td data-question= "${catsAndClues[0].clues[0].question}" 
                      data-answer= "${catsAndClues[0].clues[0].answer}" 
                     data-showing= "${catsAndClues[0].clues[0].showing}">?
                </td>
                <td data-question= "${catsAndClues[1].clues[0].question}" 
                      data-answer= "${catsAndClues[1].clues[0].answer}" 
                     data-showing= "${catsAndClues[1].clues[0].showing}">?
                </td>
                <td data-question= "${catsAndClues[2].clues[0].question}" 
                      data-answer= "${catsAndClues[2].clues[0].answer}" 
                     data-showing= "${catsAndClues[2].clues[0].showing}">?
                </td>
                <td data-question= "${catsAndClues[3].clues[0].question}" 
                      data-answer= "${catsAndClues[3].clues[0].answer}" 
                     data-showing= "${catsAndClues[3].clues[0].showing}">?
                </td>
                <td data-question= "${catsAndClues[4].clues[0].question}" 
                      data-answer= "${catsAndClues[4].clues[0].answer}" 
                     data-showing= "${catsAndClues[4].clues[0].showing}">?
                </td>
                <td data-question= "${catsAndClues[5].clues[0].question}" 
                      data-answer= "${catsAndClues[5].clues[0].answer}" 
                     data-showing= "${catsAndClues[5].clues[0].showing}">?
                </td>
            </tr>
            <tr>
                <td data-question= "${catsAndClues[0].clues[1].question}" 
                      data-answer= "${catsAndClues[0].clues[1].answer}" 
                     data-showing= "${catsAndClues[0].clues[1].showing}">?
                </td>
                <td data-question= "${catsAndClues[1].clues[1].question}" 
                      data-answer= "${catsAndClues[1].clues[1].answer}" 
                     data-showing= "${catsAndClues[1].clues[1].showing}">?
                </td>
                <td data-question= "${catsAndClues[2].clues[1].question}" 
                      data-answer= "${catsAndClues[2].clues[1].answer}" 
                     data-showing= "${catsAndClues[2].clues[1].showing}">?
                </td>
                <td data-question= "${catsAndClues[3].clues[1].question}" 
                      data-answer= "${catsAndClues[3].clues[1].answer}" 
                     data-showing= "${catsAndClues[3].clues[1].showing}">?
                </td>
                <td data-question= "${catsAndClues[4].clues[1].question}" 
                      data-answer= "${catsAndClues[4].clues[1].answer}" 
                     data-showing= "${catsAndClues[4].clues[1].showing}">?
                </td>
                <td data-question= "${catsAndClues[5].clues[1].question}" 
                      data-answer= "${catsAndClues[5].clues[1].answer}" 
                     data-showing= "${catsAndClues[5].clues[1].showing}">?
                </td>
            </tr>
            <tr>
                <td data-question= "${catsAndClues[0].clues[2].question}" 
                      data-answer= "${catsAndClues[0].clues[2].answer}" 
                     data-showing= "${catsAndClues[0].clues[2].showing}">?
                </td>
                <td data-question= "${catsAndClues[1].clues[2].question}" 
                      data-answer= "${catsAndClues[1].clues[2].answer}" 
                     data-showing= "${catsAndClues[1].clues[2].showing}">?
                </td>
                <td data-question= "${catsAndClues[2].clues[2].question}" 
                      data-answer= "${catsAndClues[2].clues[2].answer}" 
                     data-showing= "${catsAndClues[2].clues[2].showing}">?
                </td>
                <td data-question= "${catsAndClues[3].clues[2].question}" 
                      data-answer= "${catsAndClues[3].clues[2].answer}" 
                     data-showing= "${catsAndClues[3].clues[2].showing}">?
                </td>
                <td data-question= "${catsAndClues[4].clues[2].question}" 
                      data-answer= "${catsAndClues[4].clues[2].answer}" 
                     data-showing= "${catsAndClues[4].clues[2].showing}">?
                </td>
                <td data-question= "${catsAndClues[5].clues[2].question}" 
                      data-answer= "${catsAndClues[5].clues[2].answer}" 
                     data-showing= "${catsAndClues[5].clues[2].showing}">?
                </td>
            </tr>
            <tr>
                <td data-question= "${catsAndClues[0].clues[3].question}" 
                      data-answer= "${catsAndClues[0].clues[3].answer}" 
                     data-showing= "${catsAndClues[0].clues[3].showing}">?
                </td>
                <td data-question= "${catsAndClues[1].clues[3].question}" 
                      data-answer= "${catsAndClues[1].clues[3].answer}" 
                     data-showing= "${catsAndClues[1].clues[3].showing}">?
                </td>
                <td data-question= "${catsAndClues[2].clues[3].question}" 
                      data-answer= "${catsAndClues[2].clues[3].answer}" 
                     data-showing= "${catsAndClues[2].clues[3].showing}">?
                </td>
                <td data-question= "${catsAndClues[3].clues[3].question}" 
                      data-answer= "${catsAndClues[3].clues[3].answer}" 
                     data-showing= "${catsAndClues[3].clues[3].showing}">?
                </td>
                <td data-question= "${catsAndClues[4].clues[3].question}" 
                      data-answer= "${catsAndClues[4].clues[3].answer}" 
                     data-showing= "${catsAndClues[4].clues[3].showing}">?
                </td>
                <td data-question= "${catsAndClues[5].clues[3].question}" 
                      data-answer= "${catsAndClues[5].clues[3].answer}" 
                     data-showing= "${catsAndClues[5].clues[3].showing}">?
                </td>
            </tr>
            <tr>
                <td data-question= "${catsAndClues[0].clues[4].question}" 
                      data-answer= "${catsAndClues[0].clues[4].answer}" 
                     data-showing= "${catsAndClues[0].clues[4].showing}">?
                </td>
                <td data-question= "${catsAndClues[1].clues[4].question}" 
                      data-answer= "${catsAndClues[1].clues[4].answer}" 
                     data-showing= "${catsAndClues[1].clues[4].showing}">?
                </td>
                <td data-question= "${catsAndClues[2].clues[4].question}" 
                      data-answer= "${catsAndClues[2].clues[4].answer}" 
                     data-showing= "${catsAndClues[2].clues[4].showing}">?
                </td>
                <td data-question= "${catsAndClues[3].clues[4].question}" 
                      data-answer= "${catsAndClues[3].clues[4].answer}" 
                     data-showing= "${catsAndClues[3].clues[4].showing}">?
                </td>
                <td data-question= "${catsAndClues[4].clues[4].question}" 
                      data-answer= "${catsAndClues[4].clues[4].answer}" 
                     data-showing= "${catsAndClues[4].clues[4].showing}">?
                </td>
                <td data-question= "${catsAndClues[5].clues[4].question}" 
                      data-answer= "${catsAndClues[5].clues[4].answer}" 
                     data-showing= "${catsAndClues[5].clues[4].showing}">?
                </td>
            </tr>
            </tbody>
        </table>`
	);
	$('td').on('click', clickEvent);
}
// document.addEventListener("click", function(e){console.dir(e.target);});
// document.addEventListener("click", function(e){console.dir(e.target.dataset.question);});
// document.addEventListener("click", function(e){console.dir(e.target.dataset.answer);});
// document.addEventListener("click", function(e){console.dir(e.target.dataset.showing);});
/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function clickEvent(e) {
	let tile = e.target;
	let question = tile.dataset.question;
	let answer = tile.dataset.answer;
	let showing = tile.dataset.showing;
	console.log(question, answer, showing);
	// if (tile.showing == "answer"){
	//     return};

	// if (!showing){
	//     tile.innerHTML = question;
	//     showing = "question"
	// }
	// else if (showing == question){
	//     tile.innerHTML = answer;
	//     showing = "answer"
	// }
	// else {return}
}

async function setupAndStart() {
	await getCategoryIds();
	console.log(catsAndClues);
	for (let i = 0; catsAndClues.length < 6; i++) {
		let tempVar = await getCategory(categories[i]);
		catsAndClues[i] = tempVar;
	}
	console.log(catsAndClues);
	fillTable();
}
setupAndStart();
