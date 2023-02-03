//Load assets and elements for use
const meme = document.querySelector(".meme");
const baseImage = document.querySelector("#baseImage");
const topText = document.querySelector("#topText");
const bottomText = document.querySelector("#bottomText");
const saveBtn = document.querySelector(".saveBtn");

let image;

baseImage.addEventListener("change", () => {
	const dataUrl = URL.createObjectURL(baseImage.files[0]);

	image = new Image();
	image.src = dataUrl;

	image.addEventListener(
		"load",
		() => {
			memeUpdate(meme, image, topText.value, bottomText.value);
		},
		{ once: true }
	);
});

topText.addEventListener("change", () => {
	memeUpdate(meme, image, topText.value, bottomText.value);
});

bottomText.addEventListener("change", () => {
	memeUpdate(meme, image, topText.value, bottomText.value);
});

saveBtn.addEventListener("click", () => {
	const d = new Date();
	if (window.navigator.msSaveBlob) {
		window.navigator.msSaveBlob(meme.msToBlob(), `meme-${d.getTime()}.png`);
	} else {
		const a = document.createElement("a");

		document.body.appendChild(a);

		a.href = meme.toDataURL();
		a.download = `meme-${d.getTime()}.png`;
		a.click();
		document.body.removeChild(a);
	}
});

function memeUpdate(meme, image, topText, bottomText) {
	const ctx = meme.getContext("2d");
	const width = image.width;
	const height = image.height;
	const fontSize = Math.floor(width / 20);
	const yOffset = height / 25;

	meme.width = width;
	meme.height = height;

	ctx.drawImage(image, 0, 0);

	ctx.strokeStyle = "black";
	ctx.lineWidth = Math.floor(fontSize / 6);
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.lineJoin = "round";
	ctx.font = `${fontSize}px 'Poppins'`;

	ctx.textBaseline = "top";
	ctx.strokeText(topText.toUpperCase(), width / 2, yOffset);
	ctx.fillText(topText.toUpperCase(), width / 2, yOffset);

	ctx.textBaseline = "bottom";
	ctx.strokeText(bottomText.toUpperCase(), width / 2, height - yOffset);
	ctx.fillText(bottomText.toUpperCase(), width / 2, height - yOffset);
}
