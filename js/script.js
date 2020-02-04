// Initialize & add the map
function initMap() {
  // The location of SDA Daejeon
  var sdaDaejeon = {lat: 36.320859, lng: 127.416152};
  // The map, centered at SDA Daejeon
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 14, center: sdaDaejeon});
  // The marker, positioned at SDA Daejeon
  var marker = new google.maps.Marker({position: sdaDaejeon, map: map});
}

// Initialize page  
$('#about').hide()
$('#contact').hide()
//$('#daily').hide()


let tab1 = $('#tab1')
let tab2 = $('#tab2')
let tab3 = $('#tab3')

let tabArr = [tab1, tab2, tab3];

const about = "about" 
const contact = "contact"
const daily = "daily"

const contArr = [daily, about, contact];

let noOfCarImg = 3
let shortPicArr = []
let randomNumbers = []
let path = "./images/daily/"
let htmlID = ['#one', '#two', '#three']
let picNames = [
  "80514777_2595726167340966_8357509998782215831_n.jpg",
  "80751819_737491266777665_1846042292416572731_n.jpg",
  "81241054_133125938168093_8173712555879434697_n.jpg",
  "81577997_203302670849871_7541990208362609277_n.jpg",
  "81660381_501319537446329_6457119774769208975_n.jpg",
  "81831736_765680843963148_7081870768247205902_n.jpg",
  "81942169_635777087233643_1326223461624432609_n.jpg",
  "81948573_137236061085979_7002895173617735630_n.jpg",
  "81981693_628828194532250_4246916359765434774_n.jpg",
  "82333288_494017854640781_5177749155473789569_n.jpg",
  "82390303_485995722109841_6854435614771186137_n.jpg",
  "82411479_129711241854505_4909548239590508087_n.jpg",
  "82450804_1474888762677205_3869440212952931451_n.jpg",
  "82457872_188964979171439_7407437699789235811_n.jpg",
  "82490330_131356565042760_2499917403176170616_n.jpg",
  "82511664_179341563285823_2322728555270763103_n.jpg",
  "82753025_176981196895597_5675281788665159425_n.jpg",
  "82765922_132050861608352_8557968300396924918_n.jpg",
  "83149758_2450548135261439_5986293567519877610_n.jpg",
  "83181937_593405514814436_581868481514501085_n.jpg",
  "83421783_1062122190804144_2961620582292075468_n.jpg"
]

/* Toggle language display */

$('#language-toggle').click(function() {
  $('.language').toggle()
})




/* Carousel random image grab */

let randomKey = (max) => (Math.floor(Math.random() * max))

// iterate over randomKey "noOfCarImg" times.
for (let i = 0; i < noOfCarImg; i++) {
  let key 
  let makeKey = () => {
    return randomKey(picNames.length)
  }
  let pusher = function() {
    randomNumbers.push(key)
  } 

  // set value of key to random number
  key = makeKey()

  // check that the returned random number isn't already in randomNumbers
  while (randomNumbers.includes(key)) {
    key = makeKey()
  }

  // if not already in randomNumbers, push it to the array
  pusher()
}
console.log(`Random index numbers. Returns 3 images. Array: [${randomNumbers}]`)


// iterate noOfCarImg number of times over temp[]
for (let i = 0; i < noOfCarImg; i++) {
  // populate it from picNames, with returned randomNumber as indexes
  // placeholder array should have x number of files names (like picNames)
  shortPicArr.push(picNames[randomNumbers[i]])
}

// concatinate the array values with the path
for (let i = 0; i < shortPicArr.length; i++) {
  shortPicArr[i] = path + shortPicArr[i]
}

// figure out how to set array values to src in the html file
for (let i = 0; i < noOfCarImg; i++) {
  $(htmlID[i]).prop('src', shortPicArr[i])
}



/* --- Tab and Content show/hide controls --- */

for (let i = 0; i < tabArr.length; i++) {
  $('.tab').eq(i).on("click", { value: i }, function(event) {
    let clickedTab = event.data.value;
    sortTab(highTab(clickedTab), leftTab(clickedTab), rightTab(clickedTab));
    sideTab();
    revealSections(clickedTab);
  })
}

let revealSections = function(i) {
  let tempArr = contArr.slice(0)
  let toRemove = hideSection(tempArr, i)
  showSection(tempArr, i, toRemove)
}

let showSection = function(arr, i, arr2) {
  let toShow = [];
  for (var i in arr) {
    if (arr2.indexOf(arr[i]) === -1) toShow.push(arr[i])
  }
  document.getElementById(toShow).style.display = "block";
}

let hideSection = function(arr, i) {
  let toRemoveLow = arr.filter(function(value, index, arr){
    return index < i;
  })
  let toRemoveHigh = arr.filter(function(value, index, arr){
    return index > i;
  })
  let toRemove = toRemoveLow.concat(toRemoveHigh)
  for (const element of toRemove) {
    document.getElementById(element).style.display = "none";
  } 
  return toRemove;
}

const highTab = (i) => {
  const high = tabArr[i];
  return high;
}

const leftTab = (i) => {
  let left;
  if (i === 0) {
    left = 1;
  } else {
    left = 0;
  }
  return tabArr[left];
} 

const rightTab = (i) => {
  let right;
  if (i < 2) {
    right = 2;
  } else {
    right = 1;
  }
  return tabArr[right];
}

// to colorize visual tab until the edge of window
const sideTab = () => {
  const sr = '#space-right';
  const sl = '#space-left';
  const tl = 'tab-left';
  const tr = 'tab-right';
  const th = 'tab-high';

  if ($('#tab1').hasClass(th)) {
    $(sl).removeClass(tl).addClass(th);
  } else {
    $(sl).removeClass(th).addClass(tl);
  }
  if ($('#tab3').hasClass(th)) {
    $(sr).removeClass(tr).addClass(th);
  } else {
    $(sr).removeClass(th).addClass(tr);
  }
}

const sortTab = function(high, left, right){
  high.removeClass('tab-left tab-right').addClass('tab-high');
  left.removeClass('tab-high tab-right').addClass('tab-left');
  right.removeClass('tab-high tab-left').addClass('tab-right');
}