const chrInput = document.querySelector('.chr__input');
const numInput = document.querySelector('.num__input');
const specialInput = document.querySelector('.special__input');
const wordInput = document.querySelector('.word__input');
const generateBtn = document.querySelector('.generate__btn');
const pwordDiv = document.querySelector('.password__div');
const resultDiv = document.querySelector('.result__div');
const chrErrorDiv = document.querySelector('.chr__error--div');
const clipboardSvg = document.querySelector('.bi-clipboard');
const svgButton = document.querySelector('.svg-button');

let clipboard1 = new ClipboardJS(svgButton);

const pickRandom = from => {
	const rand = Math.floor(Math.random() * from.length);
	let arr = [];
	arr.push(from[rand]);
	return arr.join();
};

const pickNumbers = (ammount = 1) => {
	var numArr = [];
	for (let i = 0, n = chrSet.length; i < ammount; i++) {
		numArr.push(chrSet.charAt(Math.floor(Math.random() * n)));
	}
	return numArr.join('');
};

const isCapital = string => {
	const caps = string.replace(/[ABCDEFGHIJKLMNOPQRSTUVWXYZ]*/g, '').length;
	if (caps < string.length) {
		return true;
	} else {
		return false;
	}
};

const chrSet = '0123456789';

const specialSet = '!@#$%&*?';

const threeLetterWords = [
	'car',
	'cat',
	'run',
	'mat',
	'dye',
	'wig',
	'boo',
	'mud',
	'ask',
	'lob',
	'box',
	'due',
	'ham',
	'cry',
	'few',
	'sub',
	'one',
	'two',
	'pop',
	'map'
];

//if chr input is not selected make it 8

generateBtn.addEventListener('click', e => {
	e.preventDefault();

	if (!chrInput.value) {
		var chrs = 10;
	} else {
		var chrs = chrInput.value;
	}

	if (chrs > 30) {
		return;
	}

	if (numInput.value) {
		if (/^[0-9 ]*$/.test(numInput.value)) {
			var numbers = numInput.value.split(' ').join('');
			document.querySelector('.fail__num').classList.add('hidden');
		} else {
			document.querySelector('.fail__num').classList.remove('hidden');
		}
	} else {
		document.querySelector('.fail__num').classList.add('hidden');
	}

	if (specialInput.value) {
		if (/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/? ]*$/.test(specialInput.value)) {
			var specials = specialInput.value.split(' ').join('');
			document.querySelector('.fail__special').classList.add('hidden');
		} else {
			document.querySelector('.fail__special').classList.remove('hidden');
		}
	} else {
		document.querySelector('.fail__special').classList.add('hidden');
	}

	if (wordInput.value) {
		if (/^[a-zA-z ]*$/.test(wordInput.value)) {
			var words = wordInput.value.split(' ').join('');
			document.querySelector('.fail__words').classList.add('hidden');
		} else {
			document.querySelector('.fail__words').classList.remove('hidden');
		}
	} else {
		document.querySelector('.fail__words').classList.add('hidden');
	}

	let str = '';
	words ? (str += words) : str;

	numbers ? (str += numbers) : str;

	specials ? (str += specials) : str;

	let diff = parseInt(chrs) - str.length;

	if (diff < 3) {
		let extraNumArr = [];
		while (diff > 0) {
			extraNumArr.push(pickRandom(chrSet));
			diff -= 1;
		}
		var extraNums = extraNumArr.join();
		extraNums = extraNums.replace(/,/g, '');
	} else {
		let wordsArr = [];
		while (diff > 0) {
			if (diff > 5) {
				wordsArr.push(pickRandom(threeLetterWords));
				diff -= 3;
			}
			if (diff >= 0 && diff <= 8) {
				break;
			}
		}
		var extraWords = wordsArr.join('');

		let extraNumArr = [];
		while (diff > 2) {
			extraNumArr.push(pickRandom(chrSet));
			diff -= 1;
			if (diff === 2) {
				break;
			}
		}

		var extraNums = extraNumArr.join('');

		let specialArr = [];
		while (diff > -1) {
			specialArr.push(pickRandom(specialSet));
			diff -= 1;
			if (diff === 0) {
				break;
			}
		}
		var extraSpecials = specialArr.join('');
	}

	let finalStr = '';

	words ? (finalStr += words) : finalStr;
	extraWords ? (finalStr += extraWords) : finalStr;
	numbers ? (finalStr += numbers) : finalStr;
	extraNums ? (finalStr += extraNums) : finalStr;
	specials ? (finalStr += specials) : finalStr;
	extraSpecials ? (finalStr += extraSpecials) : finalStr;

	if (isCapital(finalStr) === false) {
		finalStr = finalStr.charAt(0).toUpperCase() + finalStr.slice(1);
	}

	if (chrInput) {
		if (chrErrorDiv.innerText) {
			chrErrorDiv.innerText = '';
		}
		if (chrInput.value) {
			if (finalStr.length > chrInput.value) {
				let chrError = document.createElement('p');
				chrError.innerText = `Password is not ${chrInput.value.toString()} characters long as what you specified has made it ${finalStr.length} characters long.`;
				chrError.classList.add('chr__error--style');
				chrErrorDiv.appendChild(chrError);
			}
		}
	}

	if (resultDiv.innerText) {
		resultDiv.innerText = '';
	}

	let result = document.createElement('h1');
	result.innerText = finalStr;
	result.style.color = 'rgb(45, 103, 228)';
	result.style.fontFamily = 'Ubutu, sans-serif';
	result.setAttribute('id', 'result-copy');
	resultDiv.appendChild(result);
	svgButton.classList.remove('hidden');
});

// const fourLetterWords = [
// 	'hook',
// 	'hems',
// 	'hiss',
// 	'neck',
// 	'wrap',
// 	'bark',
// 	'rust',
// 	'baby',
// 	'fist',
// 	'tong',
// 	'feel',
// 	'pike',
// 	'sung',
// 	'east',
// 	'hake',
// 	'pens',
// 	'lend',
// 	'fare',
// 	'bold',
// 	'wool'
// ];
