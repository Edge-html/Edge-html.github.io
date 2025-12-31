let currentPage = 1;
let isStoryOpen = false;

// Photo captions for each moment
const photoCaptions = {
    1: "Happy Birthday ✨",
    2: "More donut dates to come",
    3: "Too more sine/movie dates",
    4: "ganduuuhhhhh",
    5: "To more gasto sa makapahappy satin",
    6: "More cutie pics",
    7: "To more jog/walking (weh HAHAHAH)",
    8: "More study session😄",
    9: "Night jogs huhuhu",
    10: "More kain sa labas and RAMEEENNNN",
    11: "RAMEEEEENNNN",
    12: "💑",
    13: "Beach date soon",
    14: "Pizza Date",
    15: "More of these"
};

// Image mapping for moments
const imageFiles = {
    1: "picture/16.jpg",
    2: "picture/17.jpg", 
    3: "picture/18.jpg",
    4: "picture/19.jpg",
    5: "picture/20.jpg",
    6: "picture/21.jpg",
    7: "picture/22.jpg",
    8: "picture/23.jpg",
    9: "picture/24.jpg",
    10: "picture/25.jpg",
    11: "picture/26.jpg",
    12: "picture/27.jpg",
    13: "picture/28.jpg",
    14: "picture/29.jpg",
    15: "picture/30.jpg"
};

function openStory() {
    const homePage = document.getElementById('page1');
    const storyContainer = document.getElementById('story-container');
    const homeBtn = document.getElementById('home-btn');
    
    homePage.classList.remove('active');
    homePage.classList.add('hidden');
    
    storyContainer.classList.remove('hidden');
    storyContainer.classList.add('active');
    
    homeBtn.classList.remove('home-btn-hidden');
    homeBtn.classList.add('home-btn-visible');
    
    isStoryOpen = true;
    
    // Initialize scroll animations
    setTimeout(() => {
        checkVisibility();
    }, 100);
}

function goToHome() {
    const homePage = document.getElementById('page1');
    const storyContainer = document.getElementById('story-container');
    const homeBtn = document.getElementById('home-btn');
    
    storyContainer.classList.remove('active');
    storyContainer.classList.add('hidden');
    
    homePage.classList.remove('hidden');
    homePage.classList.add('active');
    
    homeBtn.classList.remove('home-btn-visible');
    homeBtn.classList.add('home-btn-hidden');
    
    isStoryOpen = false;
    
    // Scroll to top of story container when leaving
    storyContainer.scrollTop = 0;
}

function openModal(imageNumber) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    
    // Clear previous content and add the actual image
    modalImage.innerHTML = '';
    
    const img = document.createElement('img');
    img.src = imageFiles[imageNumber];
    img.alt = `Moment ${imageNumber}`;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'contain';
    img.style.borderRadius = '4px';
    
    modalImage.appendChild(img);
    
    // Set the caption
    modalCaption.textContent = photoCaptions[imageNumber] || "A beautiful moment together...";
    
    // Show the modal
    modal.classList.add('show');
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('show');
}

function openQRModal() {
    const modal = document.getElementById('qrModal');
    modal.classList.add('show');
}

function closeQRModal() {
    const modal = document.getElementById('qrModal');
    modal.classList.remove('show');
}

// Scroll animation detection
function checkVisibility() {
    if (!isStoryOpen) return;
    
    const storyPages = document.querySelectorAll('.story-page');
    const scrollPosition = document.getElementById('story-container').scrollTop + window.innerHeight * 0.7;
    
    storyPages.forEach(page => {
        const pageTop = page.offsetTop;
        const pageHeight = page.offsetHeight;
        
        if (scrollPosition > pageTop && scrollPosition < pageTop + pageHeight) {
            page.classList.add('visible');
        }
    });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    // Close modals with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
            closeQRModal();
        }
    });
    
    // Close modals when clicking outside
    document.getElementById('imageModal').addEventListener('click', function(event) {
        if (event.target === this) {
            closeModal();
        }
    });
    
    document.getElementById('qrModal').addEventListener('click', function(event) {
        if (event.target === this) {
            closeQRModal();
        }
    });
    
    // Add scroll event listener for animations
    const storyContainer = document.getElementById('story-container');
    if (storyContainer) {
        storyContainer.addEventListener('scroll', checkVisibility);
    }
    
    // Make collage images clickable on page 5
    setTimeout(function() {
        const collageImages = document.querySelectorAll('.collage-img');
        
        collageImages.forEach((imgContainer, index) => {
            imgContainer.style.pointerEvents = 'auto';
            imgContainer.style.cursor = 'pointer';
            
            imgContainer.addEventListener('click', function() {
                const className = this.classList[1];
                const imageNumber = parseInt(className.replace('c-img', ''));
                
                if (imageNumber <= 15) {
                    openModal(imageNumber);
                } else if (imageNumber <= 30) {
                    // For images 16-30, use images 1-15 from modal
                    openModal(imageNumber - 15);
                } else {
                    // For images 31-32, create a generic modal
                    const modal = document.getElementById('imageModal');
                    const modalImage = document.getElementById('modalImage');
                    const modalCaption = document.getElementById('modalCaption');
                    
                    modalImage.innerHTML = '';
                    
                    const imgSrc = this.querySelector('img').src;
                    
                    const img = document.createElement('img');
                    img.src = imgSrc;
                    img.alt = `Memory ${imageNumber}`;
                    img.style.width = '100%';
                    img.style.height = '100%';
                    img.style.objectFit = 'contain';
                    img.style.borderRadius = '4px';
                    
                    modalImage.appendChild(img);
                    
                    modalCaption.textContent = `Our beautiful memory #${imageNumber} 💖`;
                    
                    modal.classList.add('show');
                }
            });
            
            imgContainer.addEventListener('mouseenter', function() {
                this.style.opacity = '1';
                this.style.transform = 'scale(1.1)';
                this.style.zIndex = '100';
                this.style.boxShadow = '0 15px 40px rgba(0,0,0,0.3)';
            });
            
            imgContainer.addEventListener('mouseleave', function() {
                this.style.opacity = '0.7';
                this.style.transform = '';
                this.style.zIndex = '';
                this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
            });
        });
    }, 1000);
});