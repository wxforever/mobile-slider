#手机滑动切换效果，动画自定义

###使用方法

1、引入slider.js
2、添加滑动动画css3效果,例如

```css

@keyframes zoomIn {
    0% {
        -webkit-transform: scale3d(.6, .6, .6);
        transform: scale3d(.6, .6, .6);
    }

    50% {
        opacity: 1;
    }
}

.zoomIn {
    -webkit-animation-name: zoomIn;
    animation-name: zoomIn;
      -webkit-animation-duration: 0.5s;
    -ms-animation-duration: 0.5s;
    animation-duration: 0.5s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
}

```

3、new一个新的Slider

```js

 var slider= new Slider('.slider-item','zoomIn');

//slider-item为类名，代表页面,一般有多页  注意要给slider-item的父元素添加`overflow:hidden`css，因为css3动画会改变内容大小
//zoomIn为要添加的切换效果
```
