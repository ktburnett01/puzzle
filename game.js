function imageBlock(no, x, y) {

   this.no = no;
   this.x = x;
   this.y = y;
   this.isSelected = false;
}
function SetImageBlock() {

   var total = TOTAL_PIECES;
   imageBlockList = new Array();
   blockList = new Array();

   var x1 = BLOCK_IMG_WIDTH + 20;
   var x2 = canvas.width - 50;
   var y2 = BLOCK_IMG_HEIGHT;

   for (var i = 0; i < total; i++) {

       var randomX = randomXtoY(x1, x2, 2);
       var randomY = randomXtoY(0, y2, 2);

       var imgBlock = new imageBlock(i, randomX, randomY);

       imageBlockList.push(imgBlock);

       var x = (i % TOTAL_COLUMNS) * BLOCK_WIDTH;
       var y = Math.floor(i / TOTAL_COLUMNS) * BLOCK_HEIGHT;

       var block = new imageBlock(i, x, y);
       blockList.push(block);

   }
}
function drawAllImages() {

   for (var i = 0; i < imageBlockList.length; i++) {
       var imgBlock = imageBlockList[i];
       if (imgBlock.isSelected == false) {

           drawImageBlock(imgBlock);
       }
   }
}
function drawImageBlock(imgBlock) {

   drawFinalImage(imgBlock.no, imgBlock.x, imgBlock.y, BLOCK_WIDTH, BLOCK_HEIGHT);

}

function drawFinalImage(index, destX, destY, destWidth, destHeight) {

   ctx.save();

   var srcX = (index % 4) * 60;
   var srcY = Math.floor(index / 4) * 100;

   ctx.drawImage(image1, srcX, srcY, IMG_WIDTH, IMG_HEIGHT, destX, destY, destWidth, destHeight);

   ctx.restore();
}
canvas.onmousedown = handleOnMouseDown;
canvas.onmouseup = handleOnMouseUp;
canvas.onmouseout = handleOnMouseOut;
canvas.onmousemove = handleOnMouseMove;
   
   if (selectedBlock != null) {

       imageBlockList[selectedBlock.no].isSelected = false;

   }

   selectedBlock = GetImageBlock(imageBlockList, e.pageX, e.pageY);

   if (selectedBlock) {
       imageBlockList[selectedBlock.no].isSelected = true;
   }
function handleOnMouseMove(e) {

   if (selectedBlock) {

       selectedBlock.x = e.pageX  - 25;
       selectedBlock.y = e.pageY  - 25;

       DrawGame();
   }
}
function handleOnMouseUp(e) {

   if (selectedBlock) {
       var index = selectedBlock.no;

       var block = GetImageBlock(blockList, e.pageX, e.pageY);
       if (block) {

           var blockOldImage = GetImageBlockOnEqual(imageBlockList, block.x, block.y);
           if (blockOldImage == null) {
               imageBlockList[index].x = block.x;
               imageBlockList[index].y = block.y;
           }
       }
       else {
           imageBlockList[index].x = selectedBlock.x;
           imageBlockList[index].y = selectedBlock.y;
       }

       imageBlockList[index].isSelected = false;
       selectedBlock = null;
       DrawGame();

       if (isFinished()) {
           OnFinished();
       }
   }
}

