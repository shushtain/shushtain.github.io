import * as c from '/apps/tillumination/modules/dbColors.js';

let canvas = document.getElementById('cSquareText');
let iText = document.getElementById('iTextSquareText');
let iColor = document.getElementById('iColorSquareText');
let bSave = document.getElementById('bSaveSquareText');
let ctx = canvas.getContext('2d');

let x0 = canvas.width / 2;
let y0 = canvas.height / 2;

let fontSize = 90;
let lineHeight = 120;

ctx.font = 'bold ' + fontSize + 'px "Montserrat Alternates"';

window.addEventListener('load', Load());
canvas.addEventListener('click', function () {
	Update();
});
iText.addEventListener('change', function () {
	Update();
});
iColor.addEventListener('change', function () {
	Update();
});
bSave.addEventListener('click', function () {
	let dataURL = canvas.toDataURL('image/png', 1.0);
	downloadImage(dataURL, 'till-sm.png');
});

function Load() {
	Update();
}

function Update() {
	Bg(3);
	Text(iText.value);
}

function Bg(num) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = 'white';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	switch (iColor.value) {
		case 'trans':
			num = 2;
			break;
		case 'nonbinary':
			num = 2;
			break;
		default:
			num = 3;
	}
	ctx.globalAlpha = .9;
	for (let i = 0; i < num; i++) {
		let x1 = 0;
		let y1 = 0;
		let x2 = 0;
		let y2 = 0;
		let x3 = 0;
		let y3 = 0;
		let x4 = 0;
		let y4 = 0;

		let w = RndMinMax(100, 200);
		let h = canvas.height * 1.5;
		let incr = w * RndMinMax(2, 3);

		let hue;

		switch (iColor.value) {
			case 'trans':
				hue = c.TRANS[i];
				break;
			case 'nonbinary':
				hue = c.NONBINARY[i];
				break;
			default:
				hue = RndMax(360);
		}

		x1 = x1 + x0 - w / 2;
		y1 = y1 + y0 - h / 2;
		x2 = x1 + w;
		y2 = y1;
		x3 = x2 + incr;
		y3 = y1 + h;
		x4 = x1 - incr;
		y4 = y3;

		ctx.fillStyle = 'hsl(' + hue + ', ' + RndMinMax(85, 95) + '%, ' + RndMinMax(50, 60) + '%)';
		ctx.beginPath();
		ctx.translate(x0, y0);
		ctx.rotate(RndMinMax(45, 270) * Math.PI / 180);
		ctx.translate(-x0, -y0);
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.lineTo(x3, y3);
		ctx.lineTo(x4, y4);
		ctx.fill();
		ctx.closePath();
	}
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.globalAlpha = 1;
}

function Text(text) {
	let lines = text.split('\n');
	let j = -1;
	lines = lines.filter(function (el) {
		return el != '';
	});
	lines = lines.filter(function (el) {
		return el != null;
	});
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	for (let i = 0; i < lines.length; i++) {
		ctx.fillText(lines[i], x0, y0 + fontSize / 4 - (lines.length - 1) * lineHeight / 2 + i * lineHeight);
	}

}

function RndMax(max) {
	return Math.round(Math.random() * max);
}

function RndMinMax(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

function downloadImage(data, filename = 'till-sm.png') {
	let a = document.createElement('a');
	a.href = data;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
}
