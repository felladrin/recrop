Recrop
======

A simple javascript function to resize and crop images using HTML5 Canvas.

Released under MIT License.

## Demo ##

Check ou the live demo here: [http://felladrin.github.io/recrop](http://felladrin.github.io/recrop)

Just click on the images to see their original size.

## Usage ##

Call the script inside your html `<head>` tag:

    <script src="recrop.js"></script>

Recrop is now ready to be used. You just need to make the call:

    <script>
        recrop("thumb", 120, 80); // Generates thumbnails [Width: 120px] [Height: 80px]
    </script>

With the command above, all your images with the class `thumb` will be thumbnailed:

    <img src="http://site.com/img1.jpg" class="thumb"/>
    <img src="http://site.com/img2.png" class="thumb"/>
    <img src="http://site.com/img3.jpg" class="thumb"/>

Also, you can call it as many times you want, on different classes. For example:

    <script>
        recrop("my-other-class", 150, 150);
        recrop("cropped-jpg", 197, 178);
        recrop("picture", 236, 123);
    </script>
