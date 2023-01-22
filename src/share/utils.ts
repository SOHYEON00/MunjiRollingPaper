import { fabric } from "fabric";

export const saveLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getDefaultsImage = (key: string) => {
  return localStorage.getItem(key);
};

export const getParentElSize = (
  id: string
): { height: number; width: number } => {
  const canvasEl = document.getElementById(id);

  if (canvasEl) {
    return {
      height: canvasEl.parentElement.clientHeight * 3,
      width: canvasEl.parentElement.clientWidth * 3,
    };
  }
  return undefined;
};

export const CanvasWidth = 838.5;
export const CanvasHeight = 1625;
export const zoomValue = 0.5;

export const setFabricImageDelControl = () => {
  const deleteImg = document.createElement("img");

  deleteImg.src = deleteIcon;

  const deleteObject = (eventData, transform) => {
    var target = transform.target;
    var canvas = target.canvas;
    canvas.remove(target);
    canvas.requestRenderAll();

    return true;
  };

  function renderIcon(ctx, left, top, styleOverride, fabricObject) {
    const size = 30;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    ctx.drawImage(deleteImg, -size / 2, -size / 2, size, size);
    ctx.restore();
  }

  fabric.Object.prototype.transparentCorners = false;
  fabric.Object.prototype.controls.deleteControl = new fabric.Control({
    x: 0.5,
    y: -0.5,
    offsetY: -16,
    offsetX: 16,
    cursorStyle: "pointer",
    mouseUpHandler: deleteObject,
    render: renderIcon,
    cornerSize: 40,
  } as any);
};

export const deleteIcon =
  "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";
