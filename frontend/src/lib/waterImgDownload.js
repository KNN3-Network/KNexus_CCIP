export async function downLoadNoWaterMark(imgUrl) {
  console.log(imgUrl);
  let img = await urlToImg(`${imgUrl}?time=${new Date().valueOf()}`);
  let canvas = imgToCanvas(img);
  let url = canvas.toDataURL("image/png");
  let a = document.createElement("a");
  let event = new MouseEvent("click");
  a.download = "Knexus";
  a.href = url;
  a.dispatchEvent(event);
}

function urlToImg(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener("load", () => resolve(img));
    img.crossOrigin = "anonymous";
    img.src = url;
  });
}

function imgToCanvas(img) {
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const context = canvas.getContext("2d");
  context.drawImage(img, 0, 0);
  return canvas;
}
