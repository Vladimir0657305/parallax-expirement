var image = document.getElementsByClassName('thumbnail');
new simpleParallax(image,{
    orientation: "up",
    delay: .6,
    transition: 'cubic-bezier(0,0,0,1)',
    maxTransition: 600
});

// var image1 = document.querySelector('.parallaxImg1');
// new simpleParallax(image1, {
//     orientation: "left"
// });
// var image2 = document.querySelector('.parallaxImg2');
// new simpleParallax(image2, {
//     orientation: "right"
// });
// var image3 = document.querySelector('.parallaxImg3');
// new simpleParallax(image3, {
//     orientation: "up"
// });
// var image4 = document.querySelector('.parallaxImg4');
// new simpleParallax(image4, {
//     orientation: "down"
// });