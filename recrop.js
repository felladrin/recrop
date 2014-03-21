/*
 * Recrop - A simple javascript function to resize and crop images using HTML5 Canvas.
 *
 * @copyright  Copyright 2014, Victor Nogueira (http://github.com/felladrin)
 * @link       http://github.com/felladrin/recrop
 * @license    Apache License (http://www.apache.org/licenses/LICENSE-2.0)
 */

/**
 * Resize then crop all images containing a specific class name.
 * @param className Class name of the images to be thumbnailed.
 * @param width Desired width of thumbnails.
 * @param height Desired height of thumbnails.
 */
function recrop(className, width, height)
{
    initialize(function()
    {
        // Collects all images from the page, matching the given class name.
        var images = document.getElementsByClassName(className);

        // Generates thumbnails for each image collected.
        for (var i = 0; i < images.length; i++)
            recropThumbnail(images[i], width, height);

        // Removes all collected images.
        while (images[0])
            images[0].remove();
    });
}

/**
 * Resize then crop a ginve img element to generate a thumbnail.
 * @param element Image element to be resized and cropped.
 * @param width Desired width of thumbnail.
 * @param height Desired height of thumbnail.
 */
function recropThumbnail(element, width, height)
{
    // Checks if all parameters are defined.
    if(typeof element === 'undefined' || typeof width === 'undefined' || typeof height === 'undefined')
    {
        console.log("Recrop Error: Invalid Parameters.");
        return;
    }

    // Checks if user's browser supports canvas. If not, recrop won't be executed.
    if (!window.CanvasRenderingContext2D)
    {
        element.width = width;
        element.height = height;
        console.log("Recrop Error: Canvas not supported.");
        return;
    }

    // Checks if image element has src attribute.
    if(!element.src)
    {
        console.log("Recrop Error: Image has no source.");
        return;
    }

    // Creates a temporary image from where will get its width and height.
    var img = new Image();
    img.src = element.src;

    // Removes current image, so user won't see it stretched while canvas is being generated.
    element.src = '';

    // Initializes the canvas that will hold the resized image.
    var canvasResized = document.createElement("canvas");
    var canvasResizedContext = canvasResized.getContext("2d");

    // Sets resize ration to 1 by default.
    var ratio = 1;

    // Sets variables to check the image's format.
    var isPortrait = img.height >= img.width;
    var isLandscape = img.width >= img.height;

    // Sets variables to check if image is exceeds maximium size.
    var exceedsWidth = img.width > width;
    var exceedsHeight = img.height > height;

    // Sets ratio for redimension.
    if (isPortrait && exceedsWidth)
        ratio = width / img.width;
    else if (isLandscape && exceedsHeight)
        ratio = height / img.height;
    else if (!exceedsWidth)
        ratio = width / img.width;
    else if (!exceedsHeight)
        ratio = height / img.height;

    // Sets canvas size based on ratio.
    canvasResized.width = img.width * ratio;
    canvasResized.height = img.height * ratio;

    // Draws the resized image on the canvas.
    canvasResizedContext.drawImage(img, 0, 0, canvasResized.width, canvasResized.height);

    // Initializes the canvas that will hold the cropped image.
    var canvasCropped = document.createElement("canvas");
    var canvasCroppedContext = canvasCropped.getContext("2d");

    // Sets offsets for the crop.
    var offsetX = 0;
    var offsetY = 0;

    // Calculates offsets.
    if (isPortrait)
        offsetY = -Math.floor(canvasResized.height / 2 - height / 2);
    else if (isLandscape)
        offsetX = -Math.floor(canvasResized.width / 2 - width / 2);

    // Sets canvas size based on desired size.
    canvasCropped.width = width;
    canvasCropped.height = height;

    // Draws the cropped image on the canvas.
    canvasCroppedContext.drawImage(canvasResized, offsetX, offsetY);

    // Replaces the image by the cropped version.
    element.parentNode.appendChild(canvasCropped);
}

/**
 * Adds a function to be executed when window has finished loading.
 * @param func Function to be executed when window is ready.
 */
function initialize(func)
{
    if (window.addEventListener)
        window.addEventListener('load', func, false);
    else if (window.attachEvent)
        window.attachEvent('onload', func);
}
