function createAndManipulateCanvases(originalCanvas) {
    const body = document.body;
    const newCanvas = document.createElement('canvas');
    newCanvas.width = originalCanvas.width;
    newCanvas.height = originalCanvas.height;
    const ctx = newCanvas.getContext('2d');
    let container = document.getElementById('canvasContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'canvasContainer';
        document.body.appendChild(container); // Append the container to the body or any other suitable element
        container.style.width = '100%'; // Adjust as necessary
        container.style.height = 'auto';
        container.style.display = 'none';
        container.style.justifyContent = 'center';
        container.style.alignItems = 'center';
    }
    container.appendChild(newCanvas);
    return newCanvas;
}

class CanvasMorpher {
    constructor(c, numPoints = 1200) {
        this.ctx = c.getContext('2d');
        this.canvas = this.ctx.canvas;
        this.numPoints = numPoints;

        this.intrablob_distance = 500;
        this.num_ctrls = 4;
        this.offset = 1.7;
        this.maxxy = 700;
        this.A = 230;
        this.B = 670;
        this.distortion_amount = 50;

        this.x_points = [[], [], [], [], []];
        this.y_points = [[], [], [], [], []];
        this.ctrl_x_first = [[], [], [], [], []];
        this.ctrl_y_first = [[], [], [], [], []];
        this.ctrl_x_second = [[], [], [], [], []];
        this.ctrl_y_second = [[], [], [], [], []];
        this.initializePoints();
    }

    initializePoints() {
        this.x_points[0] = [100, 220, 310, 210];
        this.y_points[0] = [190, 140, 250, 320];
        for (let i = 1; i < 5; i++) {
            this.x_points[i] = this.cloneObject(this.x_points[0]);
            this.y_points[i] = this.cloneObject(this.y_points[0]);
        }

        this.ctrl_x_first[0] = [142, 255, 362, 137];
        this.ctrl_y_first[0] = [58, 239, 479, 286];
        for (let i = 1; i < 5; i++) {
            this.ctrl_x_first[i] = this.cloneObject(this.ctrl_x_first[0]);
            this.ctrl_y_first[i] = this.cloneObject(this.ctrl_y_first[0]);
        }

        this.applyDistortion();

    }

    cloneObject(obj) {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }
        const temp = obj.constructor();
        for (const key in obj) {
            temp[key] = this.cloneObject(obj[key]);
        }
        return temp;
    }

    applyDistortion() {
        this.distort(1, 0, Math.PI / 4, this.distortion_amount);
        this.distort(2, 0, (Math.PI / 2) + Math.PI / 4, this.distortion_amount);
        this.distort(3, 0, Math.PI / 4, this.distortion_amount);
        this.distort(3, 0, (Math.PI / 2) + Math.PI / 4, this.distortion_amount);

        this.distort(1, 1, Math.PI * 3 / 4, this.distortion_amount);
        this.distort(2, 1, (Math.PI / 2) + Math.PI * 3 / 4, this.distortion_amount);
        this.distort(3, 1, Math.PI * 3 / 4, this.distortion_amount);
        this.distort(3, 1, (Math.PI / 2) + Math.PI * 3 / 4, this.distortion_amount);

        this.distort(1, 2, Math.PI * 5 / 4, this.distortion_amount);
        this.distort(2, 2, (Math.PI / 2) + Math.PI * 5 / 4, this.distortion_amount);
        this.distort(3, 2, Math.PI * 5 / 4, this.distortion_amount);
        this.distort(3, 2, (Math.PI / 2) + Math.PI * 5 / 4, this.distortion_amount);

        this.distort(1, 2, Math.PI, this.distortion_amount);
        this.distort(2, 2, (Math.PI / 2) + Math.PI, this.distortion_amount);
        this.distort(3, 2, Math.PI, this.distortion_amount);
        this.distort(3, 2, (Math.PI / 2) + Math.PI, this.distortion_amount);
    }

    distort(blob, ctrl, angle, distance) {
        this.ctrl_x_first[blob][ctrl] = this.ctrl_x_first[blob][ctrl] + Math.cos(angle) * distance;
        this.ctrl_y_first[blob][ctrl] = this.ctrl_y_first[blob][ctrl] + Math.sin(angle) * distance;
    }

    morphAndDraw({radius = 0, rand = 0, arrangementType = 'dual', FillColor = "#73C6B6"}) {
        console.log(`radius: ${radius}, rand: ${rand}, arrangementType: ${arrangementType}, FillColor: ${FillColor}`);
        const flipped = (px, py, cx, cy) => {
            const nx = (cx - px) + cx;
            const ny = (cy - py) + cy;
            return [nx, ny];
        };

        const which = 4;
        const center_x = 0;
        const center_y = 0;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        let e;
        switch (arrangementType) {
            case 'circle':
                const thetaCircle = radius * 2 * Math.PI;
                e = { x: (this.maxxy / 2) + Math.cos(thetaCircle) * (this.maxxy / 2), y: (this.maxxy / 2) + Math.sin(thetaCircle) * (this.maxxy / 2) };
                break;
            case 'sineWave':
                e = { x: radius * this.maxxy, y: Math.sin(radius * 2 * Math.PI) * (this.maxxy / 2) };
                break;
            case 'halfCircle':
                const thetaHalfCircle = radius * Math.PI;
                e = { x: (this.maxxy / 2) + Math.cos(thetaHalfCircle) * (this.maxxy / 2), y: (this.maxxy / 2) + Math.sin(thetaHalfCircle) * (this.maxxy / 2) };
                //e = { x: 1185, y: 5};
                break;
            case 'halfEllipse':
                const thetaHalfEllipse = radius * Math.PI;
                e = { x: (this.maxxy / 2) + Math.cos(thetaHalfEllipse) * (this.maxxy / 2.5), y: (this.maxxy / 2) + Math.sin(thetaHalfEllipse) * (this.maxxy / 1.5) };
                break;
            case 'dual':
                const noise = rand * 70
                e = { x : this.A + (this.B * radius) + noise, y : this.A + (this.B * radius) - noise};
                //e = { x: 860, y: 940};
                break;
        }
        console.log(`Blob controled by: (${radius}, ${rand}) to render (${e.x}, ${e.y})`);

        for (let j = 0; j < this.num_ctrls; j++) {
            let m = (this.ctrl_x_first[1][j] - this.ctrl_x_first[0][j]) / this.intrablob_distance;
            let b = this.ctrl_x_first[0][j] - m * this.intrablob_distance;
            let horizontal_rec_x = (e.x - 100) * this.offset * m + b;

            m = (this.ctrl_y_first[1][j] - this.ctrl_y_first[0][j]) / this.intrablob_distance;
            b = this.ctrl_y_first[0][j] - m * this.intrablob_distance;
            let horizontal_rec_y = (e.x - 100) * this.offset * m + b;

            m = (this.ctrl_x_first[2][j] - this.ctrl_x_first[0][j]) / this.intrablob_distance;
            b = this.ctrl_x_first[0][j] - m * this.intrablob_distance;
            let vertical_rec_x = (e.y - 100) * this.offset * m + b;

            m = (this.ctrl_y_first[2][j] - this.ctrl_y_first[0][j]) / this.intrablob_distance;
            b = this.ctrl_y_first[0][j] - m * this.intrablob_distance;
            let vertical_rec_y = (e.y - 100) * this.offset * m + b;

            this.ctrl_x_first[4][j] = (horizontal_rec_x + vertical_rec_x) / 2;
            this.ctrl_y_first[4][j] = (horizontal_rec_y + vertical_rec_y) / 2;
        }

        let c2 = flipped(this.ctrl_x_first[which][1], this.ctrl_y_first[which][1], this.x_points[which][1], this.y_points[which][1]);
        this.ctrl_x_second[which][0] = c2[0];
        this.ctrl_y_second[which][0] = c2[1];

        c2 = flipped(this.ctrl_x_first[which][2], this.ctrl_y_first[which][2], this.x_points[which][2], this.y_points[which][2]);
        this.ctrl_x_second[which][1] = c2[0];
        this.ctrl_y_second[which][1] = c2[1];

        c2 = flipped(this.ctrl_x_first[which][3], this.ctrl_y_first[which][3], this.x_points[which][3], this.y_points[which][3]);
        this.ctrl_x_second[which][2] = c2[0];
        this.ctrl_y_second[which][2] = c2[1];

        c2 = flipped(this.ctrl_x_first[which][0], this.ctrl_y_first[which][0], this.x_points[which][0], this.y_points[which][0]);
        this.ctrl_x_second[which][3] = c2[0];
        this.ctrl_y_second[which][3] = c2[1];

        this.ctx.lineWidth = 6;
        this.ctx.beginPath();
        this.ctx.moveTo(this.x_points[which][0] + center_x, this.y_points[which][0] + center_y);
        this.ctx.bezierCurveTo(this.ctrl_x_first[which][0] + center_x, this.ctrl_y_first[which][0] + center_y, this.ctrl_x_second[which][0] + center_x, this.ctrl_y_second[which][0] + center_y, this.x_points[which][1] + center_x, this.y_points[which][1] + center_y);
        this.ctx.bezierCurveTo(this.ctrl_x_first[which][1] + center_x, this.ctrl_y_first[which][1] + center_y, this.ctrl_x_second[which][1] + center_x, this.ctrl_y_second[which][1] + center_y, this.x_points[which][2] + center_x, this.y_points[which][2] + center_y);
        this.ctx.bezierCurveTo(this.ctrl_x_first[which][2] + center_x, this.ctrl_y_first[which][2] + center_y, this.ctrl_x_second[which][2] + center_x, this.ctrl_y_second[which][2] + center_y, this.x_points[which][3] + center_x, this.y_points[which][3] + center_y);
        this.ctx.bezierCurveTo(this.ctrl_x_first[which][3] + center_x, this.ctrl_y_first[which][3] + center_y, this.ctrl_x_second[which][3] + center_x, this.ctrl_y_second[which][3] + center_y, this.x_points[which][0] + center_x, this.y_points[which][0] + center_y);
        this.ctx.fillStyle = FillColor;
        this.ctx.fill();
    }

    canvasToImage(canvas) {
     return new Promise((resolve, reject) => {
       const img = new Image();
       img.onload = () => {
         //console.log("Image loaded");
         resolve(img);
       };
       img.onerror = (error) => {
         console.error("Image load error:", error);
         reject(error);
       };
       img.src = canvas.toDataURL('image/png');
     });
   }

    scaleCanvas(originalCanvas, targetWidth, targetHeight){
      const aspectRatio = originalCanvas.width / originalCanvas.height;
      let newWidth, newHeight;
      if (targetWidth / targetHeight > aspectRatio) {
          newHeight = targetHeight;
          newWidth = targetHeight * aspectRatio;
      } else {
          newWidth = targetWidth;
          newHeight = targetWidth / aspectRatio;
      }
      const scaledCanvas = document.createElement('canvas');
      scaledCanvas.width = newWidth;
      scaledCanvas.height = newHeight;
      const scaledCtx = scaledCanvas.getContext('2d');
      scaledCtx.clearRect(0, 0, newWidth, newHeight);
      scaledCtx.drawImage(originalCanvas, 0, 0, newWidth, newHeight);
      return scaledCanvas;
     };

    MorphSingle({canvas = canvas, par = par, n = 0}) {
      // Create a canvas for original drawing
      const dim_size = 400;
      const originalCanvas = document.createElement('canvas');
      [originalCanvas.width, originalCanvas.height] = [dim_size, dim_size];
      const newCanvas = createAndManipulateCanvases(originalCanvas);
      const canvasMorpher = new CanvasMorpher(newCanvas);
      const originalCtx = originalCanvas.getContext('2d');

      // Draw the central image (p1)
      canvasMorpher.morphAndDraw({radius:par, FillColor:'#FFB6C1'});
      originalCtx.drawImage(newCanvas, 0, 0);
      const scaledCentralCanvas = this.scaleCanvas(originalCanvas, canvas.width, canvas.height);
      const centralImgPromise = this.canvasToImage(scaledCentralCanvas);
      // Combine the images in the new layout
      const ctx = canvas.getContext('2d');
      Promise.all([centralImgPromise]).then(([centralImg]) => {
          canvas.width = canvas.width;
          // Calculate positions for images
          const centralX = (canvas.width-centralImg.width)/2; // Centered horizontally
          const centralY = 0; // Top section of the canvas
          ctx.drawImage(centralImg, centralX, centralY); // Central image
      });
    };

    MorphPair({canvas = canvas, par = par, n1 = 0, n2 = 0}) {
      // Create a canvas for original drawing
      const dim_size = 400;
      const originalCanvas = document.createElement('canvas');
      [originalCanvas.width, originalCanvas.height] = [dim_size, dim_size];
      const newCanvas = createAndManipulateCanvases(originalCanvas);
      const canvasMorpher = new CanvasMorpher(newCanvas);
      const originalCtx = originalCanvas.getContext('2d');

      let [p1, p2] = par; // use condition to control the reference order
      // Draw the central image (p1)
      canvasMorpher.morphAndDraw({radius:p1, FillColor:'#AFAFAF'});
      originalCtx.drawImage(newCanvas, 0, 0);
      const scaledcleftCanvas = this.scaleCanvas(originalCanvas, canvas.width, canvas.height);
      const cleftImgPromise = this.canvasToImage(scaledcleftCanvas);
      // Draw the central image (p2)
      originalCanvas.width = originalCanvas.width;
      canvasMorpher.morphAndDraw({radius:p2, FillColor:'#FFB6C1'});
      originalCtx.drawImage(newCanvas, 0, 0);
      const scaledcrightCanvas = this.scaleCanvas(originalCanvas, canvas.width, canvas.height);
      const crightImgPromise = this.canvasToImage(scaledcrightCanvas);

      // Combine the images in the new layout
      const ctx = canvas.getContext('2d');
      Promise.all([cleftImgPromise, crightImgPromise]).then(([cleftImg, crightImg]) => {
          canvas.width = canvas.width;
          // Calculate positions for images
          const cleftX = (canvas.width-cleftImg.width)/4; // Centered horizontally
          const crightX = cleftX + cleftImg.width/1.5; // Centered horizontally
          const centralY = 0; // Top section of the canvas

          // Draw the images
          ctx.drawImage(cleftImg, cleftX, centralY); // Central image
          ctx.drawImage(crightImg, crightX, centralY); // Central image
      });
    };

    SliderMorph({canvas = canvas, par = par, r = [0, 1], condition = 0}) {
      // Create a canvas for original drawing
      const dim_size = 400;
      const originalCanvas = document.createElement('canvas');
      [originalCanvas.width, originalCanvas.height] = [dim_size, dim_size];
      const newCanvas = createAndManipulateCanvases(originalCanvas);
      const canvasMorpher = new CanvasMorpher(newCanvas);
      const originalCtx = originalCanvas.getContext('2d');

      // Draw the central image (p1)
      canvasMorpher.morphAndDraw({radius:par, FillColor:'#FFB6C1'});
      originalCtx.drawImage(newCanvas, 0, 0);
      const scaledCentralCanvas = this.scaleCanvas(originalCanvas, canvas.width, canvas.height);
      const centralImgPromise = this.canvasToImage(scaledCentralCanvas);

      let [r1, r2] = condition !== 0 ? [r[1], r[0]] : r; // use condition to control the reference order

      // Draw the left reference (p2)
      originalCanvas.width = originalCanvas.width; //shortcut to clear originalCtx.clearRect(0, 0, originalCanvas.width, originalCanvas.height);
      canvasMorpher.morphAndDraw({radius:r1, FillColor:'#AFAFAF'});
      originalCtx.drawImage(newCanvas, 0, 0);
      const scaledLeftCanvas = this.scaleCanvas(originalCanvas, canvas.width / 3, canvas.height / 3);
      const leftImgPromise = this.canvasToImage(scaledLeftCanvas);

      // Draw the right reference (p3)
      originalCanvas.width = originalCanvas.width;
      canvasMorpher.morphAndDraw({radius:r2, FillColor:'#AFAFAF'});
      originalCtx.drawImage(newCanvas, 0, 0);
      const scaledRightCanvas = this.scaleCanvas(originalCanvas, canvas.width / 3, canvas.height / 3);
      const rightImgPromise = this.canvasToImage(scaledRightCanvas);

      // Combine the images in the new layout
      const ctx = canvas.getContext('2d');
      Promise.all([centralImgPromise, leftImgPromise, rightImgPromise]).then(([centralImg, leftImg, rightImg]) => {
          canvas.width = canvas.width;
          // Calculate positions for images
          const centralX = (canvas.width-centralImg.width)/2; // Centered horizontally
          const centralY = 0; // Top section of the canvas

          const leftX = 0; // Further left from central image
          const leftY = canvas.height - leftImg.height; // Below central image

          const rightX = canvas.width - rightImg.width; // Further right from central image
          const rightY = canvas.height - rightImg.height;  // Below central image

          // Draw the images
          ctx.drawImage(centralImg, centralX, centralY); // Central image
          ctx.drawImage(leftImg, leftX, leftY); // Left image
          ctx.drawImage(rightImg, rightX, rightY); // Right image
      });
    };

    SliderPair({canvas = canvas, par = par, r = [0, 1], condition = 0}) {
      // Create a canvas for original drawing
      const dim_size = 400;
      const originalCanvas = document.createElement('canvas');
      [originalCanvas.width, originalCanvas.height] = [dim_size, dim_size];
      const newCanvas = createAndManipulateCanvases(originalCanvas);
      const canvasMorpher = new CanvasMorpher(newCanvas);
      const originalCtx = originalCanvas.getContext('2d');

      let [p1, p2] = par; // use condition to control the reference order
      // Draw the central image (p1)
      canvasMorpher.morphAndDraw({radius:p1, FillColor:'#AFAFAF'});
      originalCtx.drawImage(newCanvas, 0, 0);
      const scaledcleftCanvas = this.scaleCanvas(originalCanvas, canvas.width, canvas.height);
      const cleftImgPromise = this.canvasToImage(scaledcleftCanvas);
      // Draw the central image (p2)
      originalCanvas.width = originalCanvas.width;
      canvasMorpher.morphAndDraw({radius:p2, FillColor:'#FFB6C1'});
      originalCtx.drawImage(newCanvas, 0, 0);
      const scaledcrightCanvas = this.scaleCanvas(originalCanvas, canvas.width, canvas.height);
      const crightImgPromise = this.canvasToImage(scaledcrightCanvas);

      let [r1, r2] = condition !== 0 ? [r[1], r[0]] : r; // use condition to control the reference order
      // Draw the left image (r1)
      originalCanvas.width = originalCanvas.width; //shortcut to clear originalCtx.clearRect(0, 0, originalCanvas.width, originalCanvas.height);
      canvasMorpher.morphAndDraw({radius:r1, FillColor:'#AFAFAF'});
      originalCtx.drawImage(newCanvas, 0, 0);
      const scaledLeftCanvas = this.scaleCanvas(originalCanvas, canvas.width / 3, canvas.height / 3);
      const leftImgPromise = this.canvasToImage(scaledLeftCanvas);

      // Draw the right image (r2)
      originalCanvas.width = originalCanvas.width;
      canvasMorpher.morphAndDraw({radius:r2, FillColor:'#AFAFAF'});
      originalCtx.drawImage(newCanvas, 0, 0);
      const scaledRightCanvas = this.scaleCanvas(originalCanvas, canvas.width / 3, canvas.height / 3);
      const rightImgPromise = this.canvasToImage(scaledRightCanvas);

      // Combine the images in the new layout
      const ctx = canvas.getContext('2d');
      Promise.all([cleftImgPromise, crightImgPromise, leftImgPromise, rightImgPromise]).then(([cleftImg, crightImg, leftImg, rightImg]) => {
          canvas.width = canvas.width;
          // Calculate positions for images
          const cleftX = (canvas.width-cleftImg.width)/4; // Centered horizontally
          const crightX = cleftX + cleftImg.width/1.5; // Centered horizontally
          const centralY = 0; // Top section of the canvas

          const leftX = 0; // Further left from central image
          const rightX = canvas.width - rightImg.width; // Further right from central image
          const bottomY = canvas.height - leftImg.height; // Below central image

          // Draw the images
          ctx.drawImage(cleftImg, cleftX, centralY); // Central image
          ctx.drawImage(crightImg, crightX, centralY); // Central image
          ctx.drawImage(leftImg, leftX, bottomY); // Left image
          ctx.drawImage(rightImg, rightX, bottomY); // Right image
      });
    };

    SliderOverlap({canvas = canvas, par = par, r = [0, 1], condition = 0}) {
      // Create a canvas for original drawing
      const dim_size = 400;
      const originalCanvas = document.createElement('canvas');
      [originalCanvas.width, originalCanvas.height] = [dim_size, dim_size];
      const newCanvas = createAndManipulateCanvases(originalCanvas);
      const canvasMorpher = new CanvasMorpher(newCanvas);
      const originalCtx = originalCanvas.getContext('2d');

      let [r1, r2] = condition !== 0 ? [r[1], r[0]] : r;
      // Draw the central image (p1)
      canvasMorpher.morphAndDraw({radius:r1, FillColor:'#AFAFAF'});
      originalCtx.drawImage(newCanvas, 0, 0);
      const scaledcleftCanvas = this.scaleCanvas(originalCanvas, canvas.width, canvas.height);
      const cleftImgPromise = this.canvasToImage(scaledcleftCanvas);
      // Draw the central image (p2)
      originalCanvas.width = originalCanvas.width;
      canvasMorpher.morphAndDraw({radius:par, FillColor:'#FFB6C1'});
      originalCtx.drawImage(newCanvas, 0, 0);
      const scaledcrightCanvas = this.scaleCanvas(originalCanvas, canvas.width*0.6, canvas.height*0.6);
      const crightImgPromise = this.canvasToImage(scaledcrightCanvas);

      // Draw the left image (r1)
      originalCanvas.width = originalCanvas.width; //shortcut to clear originalCtx.clearRect(0, 0, originalCanvas.width, originalCanvas.height);
      canvasMorpher.morphAndDraw({radius:r1, FillColor:'#AFAFAF'});
      originalCtx.drawImage(newCanvas, 0, 0);
      const scaledLeftCanvas = this.scaleCanvas(originalCanvas, canvas.width / 3, canvas.height / 3);
      const leftImgPromise = this.canvasToImage(scaledLeftCanvas);

      // Draw the right image (r2)
      originalCanvas.width = originalCanvas.width;
      canvasMorpher.morphAndDraw({radius:r2, FillColor:'#AFAFAF'});
      originalCtx.drawImage(newCanvas, 0, 0);
      const scaledRightCanvas = this.scaleCanvas(originalCanvas, canvas.width / 3, canvas.height / 3);
      const rightImgPromise = this.canvasToImage(scaledRightCanvas);

      // Combine the images in the new layout
      const ctx = canvas.getContext('2d');
      Promise.all([cleftImgPromise, crightImgPromise, leftImgPromise, rightImgPromise]).then(([cleftImg, crightImg, leftImg, rightImg]) => {
          canvas.width = canvas.width;
          // Calculate positions for images
          const cleftX = (canvas.width-cleftImg.width)/2; // Centered horizontally
          const crightX = (canvas.width-crightImg.width)/2; // Centered horizontally
          const cleftY = 0; // Top section of the canvas
          const crightY = (cleftImg.width-crightImg.width)/2; // Top section of the canvas

          const leftX = 0; // Further left from central image
          const rightX = canvas.width - rightImg.width; // Further right from central image
          const bottomY = canvas.height - leftImg.height; // Below central image

          // Draw the images
          ctx.drawImage(cleftImg, cleftX, cleftY); // Central image
          ctx.drawImage(crightImg, crightX, crightY); // Central image
          ctx.drawImage(leftImg, leftX, bottomY); // Left image
          ctx.drawImage(rightImg, rightX, bottomY); // Right image
      });
    };

 };

window.CanvasMorpher = CanvasMorpher;
