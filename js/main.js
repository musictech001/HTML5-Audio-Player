var audio;

$('#pause').hide();

initAudio($('#playlist li:first-child'));

function initAudio(element){
  var song = element.attr('song');
  var title = element.text();
  var cover = element.attr('cover');
  var artist = element.attr('artist');
  
  // create audio object
  audio = new Audio('media/'+ song);
  
  // insert audio info
  $('.artist').text(artist);
  $('.title').text(title);
  
  // insert song cover
  $('img.cover').attr('src','images/covers/'+cover);
  
  $('#playlist li').removeClass('active');
  element.addClass('active');

}


//Play Button
$('#play').click(function(){
  console.log('test2');
	audio.play();
	$('#play').hide();
	$('#pause').show();
	showDuration();
});

$('#pause').click(function(){
  console.log('test3');
	audio.pause();
	$('#pause').hide();
	$('#play').show();
});

$('#stop').click(function(){
  audio.pause();
  audio.currentTime = 0;
  $('#pause').hide();
  $('#play').show();
});


// next button
// https://api.jquery.com/category/traversing/tree-traversal/
$('#next').click(function(){
  audio.pause();
  var next = $('#playlist li.active').next();
  if(next.length == 0){
    next = $('#playlist li:first-child');
  }
  console.log(next.attr('song'));
  initAudio(next);
  audio.play()
// 	$('#pause').hide();
// 	$('#play').show();
});


// prev button
$('#prev').click(function(){
  audio.pause();
  var next = $('#playlist li.active').prev();
  if(next.length == 0){
    next = $('#playlist li:last-child');
  }
  console.log(next.attr('song'));
  initAudio(next);
  audio.play()
});


// playlist song click
$('#playlist li').click(function(){
  audio.pause();
  initAudio($(this));
  $('#play').hide();
  $('#pause').show();
  audio.play();
  showDuration();
  
})

// volume
$('#volume').change(function(){
  audio.volume = parseFloat(this.value / 10);
});

// duration
function showDuration(){
  $(audio).bind('timeupdate', function(){
    console.log('test 5');
    // get hours and minutes
    var s = parseInt(audio.currentTime % 60);
    var m = parseInt(audio.currentTime / 60) % 60;
    if (s<10) {
      s = '0'+s;
    }
    if (m<10) {
      m = '0' + m;
    }
    $('#duration').html(m + ':' + s );
    
    var value = 0;
    if(audio.currentTime > 0){
      value = Math.floor((100 / audio.duration) * audio.currentTime);
    }
    $('#progress').css('width',value+'%')
    
  })
}