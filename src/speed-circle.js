
import Utility from './utility';
import BaseComponent from './base-component';
import { COLOR } from './color';

export default class SpeedCircle extends BaseComponent {

  constructor(canvas, options) {
    super(canvas, options, 0, 0, 200, 200);

    this._font = '25px Arial';
    this._degree1 = 0;
    this._degree2 = 0;
    this._degree3 = 0;
    this._degree4 = 0;
  }

  setOptions(options = {}) {
    const c1 = options.circle1 || {};
    const c2 = options.circle2 || {};
    const c3 = options.circle3 || {};
    const c4 = options.circle4 || {};
    const text = options.text || {};

    this._speed1 = c1.speed || 0.5;
    this._color1 = c1.color || COLOR.red;

    this._speed2 = c2.speed || -0.5;
    this._color2 = c2.color || COLOR.yellow;

    this._speed3 = c3.speed || 0.5;
    this._color3 = c3.color || COLOR.blue;

    this._speed4 = c4.speed || -0.5;
    this._color4 = c4.color || COLOR.grey;

    this._textColor = text.color || COLOR.green;
    this._textValue = text.value || '';
  }

  drawObject() {
    this._degree1 = Utility.getNextAngleByDegree(this._degree1, this._speed1);
    this._degree2 = Utility.getNextAngleByDegree(this._degree2, this._speed2);
    this._degree3 = Utility.getNextAngleByDegree(this._degree3, this._speed3);
    this._degree4 = Utility.getNextAngleByDegree(this._degree4, this._speed4);

    const a1 = Utility.getAngleByDegree(this._degree1);
    const a2 = Utility.getAngleByDegree(this._degree2);
    const a3 = Utility.getAngleByDegree(this._degree3);
    const a4 = Utility.getAngleByDegree(this._degree4);

    this.clear();
    this._ctx.save();
    this.scale();
    this._ctx.translate(100, 100);
    this._ctx.rotate(a1);
    // Draw bar circle 1.
    this._ctx.strokeStyle = this._color1;
    this._ctx.lineWidth = 8;
    let space = 0.02;
    let len = 0.5;
    let start = 0;
    let end = len;

    for (let i = 0; i < 6; i++) {
      this._ctx.beginPath();
      this._ctx.arc(0, 0, 90, Math.PI * start, Math.PI * end);
      this._ctx.stroke();
      this._ctx.closePath();

      start = end + space;
      len /= 1.7;
      end = start + len;
    }

    this._ctx.restore();
    this._ctx.save();
    this.scale();
    this._ctx.translate(100, 100);
    this._ctx.rotate(a3);

    // Draw dot circle 3.
    this._ctx.fillStyle = this._color3;
    for (let i = 0; i < 360; i = i + 9) {
      let a = Utility.getAngleByDegree(i);

      let x = 64 * Math.cos(a);
      let y = 64 * Math.sin(a);

      this._ctx.beginPath();
      this._ctx.arc(x, y, 3, 0, Math.PI * 2);
      this._ctx.closePath();
      this._ctx.fill();
    }

    this._ctx.restore();
    this._ctx.save();
    this.scale();
    this._ctx.translate(100, 100);
    this._ctx.rotate(a2);

    // Draw bar circle 2.
    this._ctx.lineWidth = 6;
    this._ctx.strokeStyle = this._color2;
    for (let i = 0; i < 360; i = i + 8) {
      let a = Utility.getAngleByDegree(i);

      const x1 = 70 * Math.cos(a);
      const y1 = 70 * Math.sin(a);

      let x2 = 83 * Math.cos(a);
      let y2 = 83 * Math.sin(a);

      this._ctx.beginPath();
      this._ctx.moveTo(x1, y1);
      this._ctx.lineTo(x2, y2);
      this._ctx.closePath();
      this._ctx.stroke();
    }

    this._ctx.restore();
    this._ctx.save();
    this.scale();
    this._ctx.translate(100, 100);
    this._ctx.rotate(a4);

    // Draw bar circle 4.
    this._ctx.lineWidth = 5;
    this._ctx.strokeStyle = this._color4;
    len = (2 - (12 * space)) / 12;
    start = 0;
    end = len;
    for (let i = 0; i < 12; i++) {
      this._ctx.beginPath();
      this._ctx.arc(0, 0, 56, Math.PI * start, Math.PI * end);
      this._ctx.stroke();
      this._ctx.closePath();
      start = end + space;
      end = start + len;
    }

    this._ctx.restore();
    this._ctx.save();
    this.scale();
    // Draw the text in the middle.
    this._ctx.font = this._font;
    this._ctx.textAlign = 'center';
    this._ctx.fillStyle = this._textColor;
    this._ctx.fillText(this._textValue, 100, 110);
    this._ctx.restore();
  }

  set speed(n) {
    this._speed = n;
  }

  set color1(s) {
    this._color1 = s;
  }

  set color2(s) {
    this._color2 = s;
  }

  set color3(s) {
    this._color3 = s;
  }

  set color4(s) {
    this._color4 = s;
  }

  set textColor(s) {
    this._textColor = s;
  }

  set textValue(s) {
    this._textValue = s;
  }
}
