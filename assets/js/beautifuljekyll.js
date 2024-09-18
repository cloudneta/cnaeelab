// Dean Attali / Beautiful Jekyll 2020

var BeautifulJekyllJS = {

  bigImgEl : null,
  numImgs : null,

  init : function() {
    setTimeout(BeautifulJekyllJS.initNavbar, 10);

    // Shorten the navbar after scrolling a little bit down
    $(window).scroll(function() {
        if ($(".navbar").offset().top > 50) {
            $(".navbar").addClass("top-nav-short");
        } else {
            $(".navbar").removeClass("top-nav-short");
        }
    });

    // On mobile, hide the avatar when expanding the navbar menu
    $('#main-navbar').on('show.bs.collapse', function () {
      $(".navbar").addClass("top-nav-expanded");
    });
    $('#main-navbar').on('hidden.bs.collapse', function () {
      $(".navbar").removeClass("top-nav-expanded");
    });

    // initCopyButton
    BeautifulJekyllJS.initCopyButtons();
    BeautifulJekyllJS.initLineCopyButtons();

    // show the big header image
    BeautifulJekyllJS.initImgs();

    BeautifulJekyllJS.initSearch();
  },

  initNavbar : function() {
    // Set the navbar-dark/light class based on its background color
    const rgb = $('.navbar').css("background-color").replace(/[^\d,]/g,'').split(",");
    const brightness = Math.round(( // http://www.w3.org/TR/AERT#color-contrast
      parseInt(rgb[0]) * 299 +
      parseInt(rgb[1]) * 587 +
      parseInt(rgb[2]) * 114
    ) / 1000);
    if (brightness <= 125) {
      $(".navbar").removeClass("navbar-light").addClass("navbar-dark");
    } else {
      $(".navbar").removeClass("navbar-dark").addClass("navbar-light");
    }
  },

  initImgs : function() {
    // If the page was large images to randomly select from, choose an image
    if ($("#header-big-imgs").length > 0) {
      BeautifulJekyllJS.bigImgEl = $("#header-big-imgs");
      BeautifulJekyllJS.numImgs = BeautifulJekyllJS.bigImgEl.attr("data-num-img");

      // 2fc73a3a967e97599c9763d05e564189
      // set an initial image
      var imgInfo = BeautifulJekyllJS.getImgInfo();
      var src = imgInfo.src;
      var desc = imgInfo.desc;
      BeautifulJekyllJS.setImg(src, desc);

      // For better UX, prefetch the next image so that it will already be loaded when we want to show it
      var getNextImg = function() {
        var imgInfo = BeautifulJekyllJS.getImgInfo();
        var src = imgInfo.src;
        var desc = imgInfo.desc;

        var prefetchImg = new Image();
        prefetchImg.src = src;
        // if I want to do something once the image is ready: `prefetchImg.onload = function(){}`

        setTimeout(function(){
          var img = $("<div></div>").addClass("big-img-transition").css("background-image", 'url(' + src + ')');
          $(".intro-header.big-img").prepend(img);
          setTimeout(function(){ img.css("opacity", "1"); }, 50);

          // after the animation of fading in the new image is done, prefetch the next one
          //img.one("transitioned webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
          setTimeout(function() {
            BeautifulJekyllJS.setImg(src, desc);
            img.remove();
            getNextImg();
          }, 1000);
          //});
        }, 6000);
      };

      // If there are multiple images, cycle through them
      if (BeautifulJekyllJS.numImgs > 1) {
        getNextImg();
      }
    }
  },

  getImgInfo : function() {
    var randNum = Math.floor((Math.random() * BeautifulJekyllJS.numImgs) + 1);
    var src = BeautifulJekyllJS.bigImgEl.attr("data-img-src-" + randNum);
    var desc = BeautifulJekyllJS.bigImgEl.attr("data-img-desc-" + randNum);

    return {
      src : src,
      desc : desc
    }
  },

  setImg : function(src, desc) {
    $(".intro-header.big-img").css("background-image", 'url(' + src + ')');
    if (typeof desc !== typeof undefined && desc !== false) {
      $(".img-desc").text(desc).show();
    } else {
      $(".img-desc").hide();
    }
  },

  // codeblock copy button
  initCopyButtons: function() {
    // 모든 코드 블록에 복사 버튼 추가
    document.querySelectorAll('pre').forEach(function(pre) {
      var codeBlock = pre.querySelector('code'); // 코드 블록을 찾기
      if (!codeBlock) {
        return; // pre 태그 내에 code 블록이 없는 경우 버튼을 추가하지 않음
      }

      // 복사 버튼 생성
      var button = document.createElement('button');
      button.className = 'copy-code-btn';
      button.textContent = 'Copy All';

      // 복사 버튼 클릭 시
      button.addEventListener('click', function() {
        // 코드 블록에서 텍스트만 복사, 줄바꿈 및 주석 필터링
        var codeText = codeBlock.innerText.split('\n') // 줄바꿈을 기준으로 배열로 변환
          .filter(function(line) {
            return !line.trim().startsWith('##'); // "##"로 시작하는 주석을 필터링
          })
          .join('\n'); // 줄바꿈을 유지하면서 병합

        // 클립보드에 텍스트 복사
        navigator.clipboard.writeText(codeText)
          .then(() => {
            button.textContent = 'Copied!';
            setTimeout(() => button.textContent = 'Copy', 2000);
          })
          .catch(err => console.error('Error copying text: ', err));
      });

      // 복사 버튼을 코드 블록에 추가
      pre.style.position = 'relative';
      pre.insertBefore(button, pre.firstChild); // 복사 버튼을 첫 번째 요소로 추가

      // **라인별 복사 버튼 추가**
      var lines = codeBlock.innerText.split('\n'); // 코드 블록을 줄 단위로 나눔
      codeBlock.innerHTML = ''; // 기존 코드 지우고 다시 구성

      lines.forEach(function(line) {
        var lineContainer = document.createElement('div'); // 각 라인을 감쌀 컨테이너
        lineContainer.className = 'code-line-container'; // 스타일을 위해 클래스 추가

        // 라인 텍스트를 넣을 span 생성
        var lineSpan = document.createElement('span');
        lineSpan.className = 'code-line';
        lineSpan.textContent = line; // 실제 코드 텍스트

        // **라인 복사 버튼 생성**
        var lineCopyButton = document.createElement('button');
        lineCopyButton.className = 'copy-code-btn-line';
        lineCopyButton.textContent = 'Copy Line';

        // **라인 복사 버튼 클릭 시**
        lineCopyButton.addEventListener('click', function() {
          // 해당 라인 텍스트만 복사
          navigator.clipboard.writeText(line)
            .then(() => {
              lineCopyButton.textContent = 'Copied!';
              setTimeout(() => lineCopyButton.textContent = 'Copy Line', 2000);
            })
            .catch(err => console.error('Error copying line: ', err));
        });

        // 라인과 버튼을 컨테이너에 추가
        lineContainer.appendChild(lineSpan);
        lineContainer.appendChild(lineCopyButton);

        // 기존 코드 블록에 라인 컨테이너를 추가
        codeBlock.appendChild(lineContainer);
      });
      
    });
  },

  initSearch : function() {
    if (!document.getElementById("beautifuljekyll-search-overlay")) {
      return;
    }

    $("#nav-search-link").click(function(e) {
      e.preventDefault();
      $("#beautifuljekyll-search-overlay").show();
      $("#nav-search-input").focus().select();
      $("body").addClass("overflow-hidden");
    });
    $("#nav-search-exit").click(function(e) {
      e.preventDefault();
      $("#beautifuljekyll-search-overlay").hide();
      $("body").removeClass("overflow-hidden");
    });
    $(document).on('keyup', function(e) {
      if (e.key == "Escape") {
        $("#beautifuljekyll-search-overlay").hide();
        $("body").removeClass("overflow-hidden");
      }
    });
  }
};

$('a[href="#top"]').click(function () {
    $('body,html').animate({
        scrollTop: 0
    }, 600);
    return false;
});

$(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
        $('.totop a').fadeIn();
    } else {
        $('.totop a').fadeOut();
    }
});

// 2fc73a3a967e97599c9763d05e564189

document.addEventListener('DOMContentLoaded', BeautifulJekyllJS.init);

