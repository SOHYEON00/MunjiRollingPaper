export const saveLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getDefaultsImage = (key: string) => {
  return localStorage.getItem(key);
};

export const generateCanvas = (canvas) => {
  const url = canvas.toDataURL({
    width: canvas.width,
    height: canvas.height,
    left: 0,
    top: 0,
    format: "png",
    multiplier: 5,
  });
  return url;
};

export const CanvasWidth = 516;
export const CanvasHeight = 643;
