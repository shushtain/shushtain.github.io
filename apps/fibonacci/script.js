let canvas = document.getElementById('result');
let density = document.getElementById('density');
let guides = document.getElementById('guides');
let start = document.getElementById('start');
let count = document.getElementById('count');
let save = document.getElementById('save');
let ctx = canvas.getContext('2d');


let FIB = [];
let fibx, fiby;

window.addEventListener('load', Load());

canvas.addEventListener('click', function () {
	Update();
});

//density.addEventListener('change', function () {
//	Update();
//});
//guides.addEventListener('change', function () {
//	Update();
//});
//start.addEventListener('change', function () {
//	Update();
//});
//count.addEventListener('change', function () {
//	Update();
//});

save.addEventListener('click', function () {
	let dataURL = canvas.toDataURL('image/png', 1.0);
	downloadImage(dataURL, 'fib.png');
	console.log(1);
});

function Load() {
	Fib(20);
	Update();
}

function Update() {
	Coordinates();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = 'white';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	Grid();
	Blocks();
}

function Coordinates() {
	let tempSliceStart = RndMinMax(1, 5);
	let tempSliceEnd = tempSliceStart + RndMinMax(3, 5);

	/* FIB X */
	let fibtemp = FIB.slice(tempSliceStart, tempSliceEnd);
	console.log(fibtemp);
	let i = 0;
	let j = tempSliceStart + 1;
	while (i < RndMax(3)) {
		fibtemp.unshift(FIB[j]);
		i++;
		j++;
	}
	console.log(fibtemp);
	if (RndMax(1) > 0) {
		fibtemp.reverse();
	}
	let fr = 0;
	for (let i in fibtemp) {
		fr += fibtemp[i];
	}
	let point = canvas.width / fr;
	fibx = [];
	for (let i in fibtemp) {
		fibx[i] = fibtemp[i] * point;
		if (i > 0) {
			fibx[i] += fibx[i - 1];
		}
	}
	fibx.unshift(0);
	//	fibx.pop();

	/* FIB Y*/
	fibtemp = FIB.slice(tempSliceStart, tempSliceEnd + 1);
	i = 0;
	j = tempSliceStart + 1;
	while (i < RndMax(3)) {
		fibtemp.unshift(FIB[j]);
		i++;
		j++;
	}
	fiby = [];
	for (let i in fibtemp) {
		fiby[i] = fibtemp[i] * point;
		if (i > 0) {
			fiby[i] += fiby[i - 1];
		}
	}
	fiby.unshift(0);
	//	fiby.pop();
}

function Grid() {
	ctx.strokeStyle = 'red';
	for (let i in fibx) {
		ctx.beginPath();
		ctx.moveTo(fibx[i], 0);
		ctx.lineTo(fibx[i], canvas.height);
		ctx.stroke();
		ctx.closePath();
	}
	for (let i in fiby) {
		ctx.beginPath();
		ctx.moveTo(0, fiby[i]);
		ctx.lineTo(canvas.width, fiby[i]);
		ctx.stroke();
		ctx.closePath();
	}
}

function Blocks() {
	ctx.fillStyle = 'black';
	let i = 0;
	while (i < fibx.length - 1) {
		let j = 0;
		let x1 = fibx[i];
		let k = i + 1;
		let x2 = fibx[k];
		while (j < fiby.length - 1) {
			let y1 = fiby[j];
			let l = j + 1;
			let y2 = fiby[l];

			ctx.beginPath();
			ctx.moveTo(x1, y1);
			ctx.lineTo(x2, y1);
			ctx.lineTo(x2, y2);
			ctx.lineTo(x1, y2);
			if (RndMax(5) > 2) {
				ctx.fill();
			};
			ctx.closePath();
			j++;
		}
		i++;
	}
}

function Fib(num) {
	FIB = [];
	let a = 0;
	let b = 1;
	let temp;
	while (num >= 0) {
		temp = b;
		FIB.push(b);
		b = a + b;
		a = temp;
		num--;
	}
}

function RndMax(max) {
	return Math.round(Math.random() * max);
}

function RndMinMax(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

function downloadImage(data, filename = 'fib.png') {
	let a = document.createElement('a');
	a.href = data;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
}
