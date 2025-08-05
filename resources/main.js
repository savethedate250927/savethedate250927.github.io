// main.js
// 여기에 공통 JS 코드를 작성하세요. 

let currentImageIndex = 0;
const images = [
    './img/11/CSJ00006.jpg',
    './img/11/CSJ00058.jpg',
    './img/11/CSJ00187.jpg',
    './img/11/CSJ00209.jpg',
    './img/11/CSJ00323.jpg',
    './img/11/CSJ00419.jpg',
    './img/11/CSJ00466.jpg',
    './img/11/CSJ00712.jpg',
    './img/11/CSJ00786.jpg',
    './img/11/CSJ00794.jpg',
    './img/11/CSJ00796.jpg',
    './img/11/CSJ00912.jpg',
    './img/11/CSJ00914.jpg',
    './img/11/CSJ01150.jpg',
    './img/11/CSJ01254.jpg',
    './img/11/CSJ01391.jpg',
    './img/11/CSJ01405.jpg',
    './img/11/CSJ01494.jpg',
    './img/11/CSJ01597.jpg',
    './img/11/CSJ01712.jpg',
    './img/11/CSJ01750.jpg',
    './img/11/CSJ01841.jpg',
    './img/11/CSJ01990.jpg',
    './img/11/CSJ02176.jpg',
    './img/11/CSJ02327.jpg',
    './img/11/CSJ02403.jpg',
    './img/11/CSJ02526.jpg',
    './img/11/CSJ02536.jpg',
    './img/11/CSJ02566.jpg',
    './img/11/CSJ02613.jpg',
    './img/11/CSJ02685.jpg',
    './img/11/CSJ02704.jpg'
];

// 터치 스와이프 관련 변수
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;

// 마우스 드래그 관련 변수
let mouseStartX = 0;
let mouseEndX = 0;
let mouseStartY = 0;
let mouseEndY = 0;
let isMouseDown = false;

function openModal(imgSrc) {
    document.getElementById('imageModal').style.display = 'block';
    document.getElementById('modalImage').src = imgSrc;
    currentImageIndex = images.indexOf(imgSrc);
    
    // 터치 이벤트 리스너 추가
    addTouchListeners();
    // 마우스 이벤트 리스너 추가
    addMouseListeners();
}

function closeModal() {
    document.getElementById('imageModal').style.display = 'none';
    
    // 터치 이벤트 리스너 제거
    removeTouchListeners();
    // 마우스 이벤트 리스너 제거
    removeMouseListeners();
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    document.getElementById('modalImage').src = images[currentImageIndex];
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    document.getElementById('modalImage').src = images[currentImageIndex];
}

// 터치 이벤트 리스너 추가
function addTouchListeners() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    
    modal.addEventListener('touchstart', handleTouchStart, false);
    modal.addEventListener('touchend', handleTouchEnd, false);
    modalImage.addEventListener('touchstart', handleTouchStart, false);
    modalImage.addEventListener('touchend', handleTouchEnd, false);
}

// 터치 이벤트 리스너 제거
function removeTouchListeners() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    
    modal.removeEventListener('touchstart', handleTouchStart, false);
    modal.removeEventListener('touchend', handleTouchEnd, false);
    modalImage.removeEventListener('touchstart', handleTouchStart, false);
    modalImage.removeEventListener('touchend', handleTouchEnd, false);
}

// 마우스 이벤트 리스너 추가
function addMouseListeners() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    
    modal.addEventListener('mousedown', handleMouseDown, false);
    modal.addEventListener('mouseup', handleMouseUp, false);
    modal.addEventListener('mouseleave', handleMouseLeave, false);
    modalImage.addEventListener('mousedown', handleMouseDown, false);
    modalImage.addEventListener('mouseup', handleMouseUp, false);
    modalImage.addEventListener('mouseleave', handleMouseLeave, false);
}

// 마우스 이벤트 리스너 제거
function removeMouseListeners() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    
    modal.removeEventListener('mousedown', handleMouseDown, false);
    modal.removeEventListener('mouseup', handleMouseUp, false);
    modal.removeEventListener('mouseleave', handleMouseLeave, false);
    modalImage.removeEventListener('mousedown', handleMouseDown, false);
    modalImage.removeEventListener('mouseup', handleMouseUp, false);
    modalImage.removeEventListener('mouseleave', handleMouseLeave, false);
}

// 터치 시작 이벤트 처리
function handleTouchStart(event) {
    const touch = event.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
}

// 터치 종료 이벤트 처리
function handleTouchEnd(event) {
    const touch = event.changedTouches[0];
    touchEndX = touch.clientX;
    touchEndY = touch.clientY;
    
    handleSwipe();
}

// 마우스 다운 이벤트 처리
function handleMouseDown(event) {
    isMouseDown = true;
    mouseStartX = event.clientX;
    mouseStartY = event.clientY;
}

// 마우스 업 이벤트 처리
function handleMouseUp(event) {
    if (isMouseDown) {
        mouseEndX = event.clientX;
        mouseEndY = event.clientY;
        isMouseDown = false;
        handleMouseSwipe();
    }
}

// 마우스 리브 이벤트 처리 (마우스가 모달 밖으로 나갈 때)
function handleMouseLeave(event) {
    if (isMouseDown) {
        mouseEndX = event.clientX;
        mouseEndY = event.clientY;
        isMouseDown = false;
        handleMouseSwipe();
    }
}

// 마우스 스와이프 처리
function handleMouseSwipe() {
    const diffX = mouseStartX - mouseEndX;
    const diffY = mouseStartY - mouseEndY;
    
    // 최소 스와이프 거리 (50px)
    const minSwipeDistance = 50;
    
    // 수평 스와이프가 수직 스와이프보다 클 때만 처리
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > minSwipeDistance) {
        if (diffX > 0) {
            // 왼쪽으로 스와이프 - 다음 이미지
            nextImage();
        } else {
            // 오른쪽으로 스와이프 - 이전 이미지
            prevImage();
        }
    }
}

// 스와이프 처리
function handleSwipe() {
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;
    
    // 최소 스와이프 거리 (50px)
    const minSwipeDistance = 50;
    
    // 수평 스와이프가 수직 스와이프보다 클 때만 처리
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > minSwipeDistance) {
        if (diffX > 0) {
            // 왼쪽으로 스와이프 - 다음 이미지
            nextImage();
        } else {
            // 오른쪽으로 스와이프 - 이전 이미지
            prevImage();
        }
    }
}

// Close modal when clicking outside the image
document.getElementById('imageModal').onclick = function(e) {
    if (e.target === this) {
        closeModal();
    }
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (document.getElementById('imageModal').style.display === 'block') {
        if (e.key === 'ArrowLeft') {
            prevImage();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        } else if (e.key === 'Escape') {
            closeModal();
        }
    }
});

function toggleGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    const expandBtn = document.getElementById('expandBtn');
    galleryGrid.classList.add('expanded');
    expandBtn.style.display = 'none';
}

// 페이지 로드 시 이미지 순서 재배치
document.addEventListener('DOMContentLoaded', function() {
    const galleryGrid = document.getElementById('galleryGrid');
    const items = Array.from(galleryGrid.children);
    
    // 이미지들을 2열로 재배치 (좌측부터 채우기)
    const leftColumn = [];
    const rightColumn = [];
    
    items.forEach((item, index) => {
        if (index % 2 === 0) {
            leftColumn.push(item);
        } else {
            rightColumn.push(item);
        }
    });
    
    // 갤러리 초기화
    galleryGrid.innerHTML = '';
    
    // 좌측 컬럼 먼저 추가
    leftColumn.forEach(item => {
        galleryGrid.appendChild(item);
    });
    
    // 우측 컬럼 추가
    rightColumn.forEach(item => {
        galleryGrid.appendChild(item);
    });
});

// Countdown Timer
function updateCountdown() {
    const target = new Date('2025-09-27T18:00:00+09:00');
    const now = new Date();
    let diff = target - now;
    if (diff < 0) diff = 0;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);
    document.getElementById('cd-days').textContent = String(days).padStart(2, '0');
    document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('cd-mins').textContent = String(mins).padStart(2, '0');
    document.getElementById('cd-secs').textContent = String(secs).padStart(2, '0');
    document.getElementById('cd-days-text').textContent = days;
}
setInterval(updateCountdown, 1000);
updateCountdown();

// Map Modal
function openMapModal() {
    document.getElementById('mapModal').classList.add('show');
}
function closeMapModal() {
    document.getElementById('mapModal').classList.remove('show');
}
// 바깥 클릭 시 닫기
document.addEventListener('click', function(e) {
    const modal = document.getElementById('mapModal');
    if (modal.classList.contains('show') && e.target === modal) {
        closeMapModal();
    }
});

// Account Accordion Toggle
function toggleAccount(type) {
    const list = document.getElementById('account-' + type);
    const arrow = document.getElementById('arrow-' + type);
    if (list.style.display === 'none' || list.style.display === '') {
        list.style.display = 'block';
        // 위쪽 화살표 SVG
        arrow.innerHTML = '<svg viewBox="0 0 24 24"><polyline points="6 15 12 9 18 15" fill="none" stroke="#b0b0b0" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    } else {
        list.style.display = 'none';
        // 아래쪽 화살표 SVG
        arrow.innerHTML = '<svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9" fill="none" stroke="#b0b0b0" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    }
}
// Account Copy
function copyAccount(text) {
    navigator.clipboard.writeText(text).then(function() {
        alert('계좌번호가 복사되었습니다!');
    });
}

function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  const windowHeight = window.innerHeight;
  reveals.forEach(function(el) {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 60) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll);

// 우클릭 방지 및 모바일 확대 방지
document.addEventListener('DOMContentLoaded', function() {
    // 우클릭 방지 (PC)
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
    
    // 모바일 확대 방지
    document.addEventListener('touchstart', function(e) {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });
    
    document.addEventListener('gesturestart', function(e) {
        e.preventDefault();
    });
    
    document.addEventListener('gesturechange', function(e) {
        e.preventDefault();
    });
    
    document.addEventListener('gestureend', function(e) {
        e.preventDefault();
    });
    
    // 갤러리 이미지 클릭은 허용
    const galleryImages = document.querySelectorAll('.gallery-item img');
    galleryImages.forEach(function(img) {
        img.addEventListener('contextmenu', function(e) {
            // 갤러리 이미지에서는 우클릭 허용 (개발자 도구 등에서 확인 가능)
            return true;
        });
        
        img.addEventListener('touchstart', function(e) {
            // 갤러리 이미지에서는 터치 이벤트 허용
            return true;
        }, { passive: true });
    });
    
    // 모달 내부에서는 멀티터치만 차단
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.addEventListener('touchstart', function(e) {
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        }, { passive: false });
    }
    
    // 맵 모달 내부에서도 모든 이벤트 허용
    const mapModal = document.getElementById('mapModal');
    if (mapModal) {
        mapModal.addEventListener('contextmenu', function(e) {
            return true;
        });
        
        mapModal.addEventListener('touchstart', function(e) {
            return true;
        }, { passive: true });
    }
});