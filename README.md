Recrop
======

A simple javascript function to resize and crop images using HTML5 Canvas.

Licensed under Apache License ([http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0))

## Usage ##

Call the script inside your html `<head>` tag:

	<script src="recrop.js"></script>

Recrop is now ready to be used. You just need to make the call:

	<script>
        recrop("myclass", 120, 80); // Generates thumbnails [Width: 120px] [Height: 80px]
    </script>

With the command above, all your images with the class `myclass` will be thumbnailed:

	<img src="http://site.com/img1.jpg" class="myclass"/>
	<img src="http://site.com/img2.png" class="myclass"/>
	<img src="http://site.com/img3.jpg" class="myclass"/>

Also, you can call it as many times you want, on different classes:

    <script>
        recrop("smaller-than-desired", 150, 150);
        recrop("picture", 236, 123);
        recrop("jpg", 197, 178);
    </script>

## Example ##

Check out `index.html` file to see it in action.