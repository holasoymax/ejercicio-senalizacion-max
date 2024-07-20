// main.js

// Función para cargar los datos desde el archivo JSON
const fetchData = async () => {
    const response = await fetch('data.json');
    const data = await response.json();
    return data;
};

// Clase base para manejar los carruseles de imágenes y videos
class Carousel {
    constructor(items, container, duration) {
        this.items = items;
        this.container = container;
        this.duration = duration;
        this.currentIndex = 0;
    }

    start () {
        this.changeItem();
    }

    changeItem () {
        const currentItem = this.items[this.currentIndex];
        gsap.to(this.container, {
            opacity: 0, duration: 0.25, onComplete: () => {
                this.container.src = `assets/${currentItem.type}/${currentItem.src}`;
                this.container.onload = () => {
                    gsap.to(this.container, { opacity: 1, duration: 0.5 });
                    this.currentIndex = (this.currentIndex + 1) % this.items.length;
                    setTimeout(() => this.changeItem(), this.duration);
                };
            }
        });
    }
}

// Clase para manejar el carrusel de videos
class VideoCarousel {
    constructor(items, container) {
        this.items = items;
        this.container = container;
        this.currentIndex = 0;
    }

    start () {
        this.changeItem();
    }

    changeItem () {
        const currentItem = this.items[this.currentIndex];
        gsap.to(this.container, {
            opacity: 0, duration: 0.25, onComplete: () => {
                this.container.src = `assets/${currentItem.type}/${currentItem.src}`;
                this.container.load();
                this.container.loop = false; // Asegurarse de que el video no esté en loop
                this.container.muted = true;
                this.container.onloadeddata = () => {
                    gsap.to(this.container, { opacity: 1, duration: 0.5 });
                    this.container.play();
                };
                this.container.onended = () => {
                    console.log(`Ended ${currentItem.src}`);
                    this.currentIndex = (this.currentIndex + 1) % this.items.length;
                    this.changeItem();
                };
            }
        });
    }
}

// Clase para manejar el carrusel de productos normales
class ProductCarousel {
    constructor(products, container, duration) {
        this.products = products;
        this.container = container;
        this.duration = duration;
        this.currentIndex = 0;
    }

    start () {
        this.changeGroup();
        setInterval(() => this.fadeOutGroup(), this.duration - 500);
    }

    fadeOutGroup () {
        const groupProducts = this.container.querySelectorAll('.product');
        groupProducts.forEach((product, index) => {
            gsap.to(product, { opacity: 0, delay: index * 0.1, duration: 0.5 });
        });
        setTimeout(() => this.changeGroup(), 1000); // Asegura que el fade-out esté completo antes de cambiar
    }

    changeGroup () {
        const groupProducts = this.products.slice(this.currentIndex, this.currentIndex + 5);
        this.container.innerHTML = '';
        groupProducts.forEach((product, index) => {
            const productElement = this.createProductElement(product);
            this.container.appendChild(productElement);
            // Añadimos un efecto cascada con GSAP para fade-in
            gsap.fromTo(productElement, { opacity: 0 }, { opacity: 1, delay: index * 0.1, duration: 0.5 });
        });
        this.currentIndex = (this.currentIndex + 5) % this.products.length;
    }

    createProductElement (product) {
        const element = document.createElement('div');
        element.className = 'product';
        element.style.backgroundImage = `url(assets/images/${product.image})`;
        element.innerHTML = `
            <div class="product-gradient"></div>
            <div class="product-info">
                <div class="product-description">${product.product}</div>
                <div class="product-price"><span class="currency">$</span><span class="price">${product.price.toFixed(2).split('.')[0]}</span><sup>${product.price.toFixed(2).split('.')[1]}</sup></div>
            </div>
        `;
        return element;
    }
}

// Clase para manejar el carrusel de productos especiales
class SpecialProductCarousel {
    constructor(products, container, duration) {
        this.products = products;
        this.container = container;
        this.duration = duration;
        this.currentIndex = 0;
    }

    start () {
        this.changeProduct();
        setInterval(() => this.fadeOutProduct(), this.duration - 500);
    }

    fadeOutProduct () {
        gsap.to(this.container, { opacity: 0, duration: 0.5 });
        setTimeout(() => this.changeProduct(), 500);
    }

    changeProduct () {
        const product = this.products[this.currentIndex];
        this.container.style.backgroundImage = `url(assets/images/${product.image})`;
        this.container.innerHTML = `
            <div class="product-gradient"></div>
            <div class="product-info">
                <div class="product-description">${product.product}</div>
                <div class="product-price"><span class="currency">$</span><span class="price">${product.price.toFixed(2).split('.')[0]}</span><sup>${product.price.toFixed(2).split('.')[1]}</sup></div>
            </div>
        `;
        gsap.fromTo(this.container, { opacity: 0 }, { opacity: 1, duration: 0.5 });
        this.currentIndex = (this.currentIndex + 1) % this.products.length;
    }
}

// Iniciar carruseles después de cargar los datos del JSON
fetchData().then(data => {
    const config = data.config;

    const productCarousel = new ProductCarousel(data.products.normales, document.querySelector('.normal-products'), config.normal_product_duration);
    productCarousel.start();

    const specialProductCarousel = new SpecialProductCarousel(data.especiales, document.querySelector('#special-product'), config.special_product_duration);
    specialProductCarousel.start();

    const imageItems = data.images.map(image => ({ src: image, type: 'images', tag: 'img' }));
    const imageCarousel = new Carousel(imageItems, document.querySelector('#image-carousel img'), config.image_carousel_duration);
    imageCarousel.start();

    const videoItems = data.videos.video.map(video => ({ src: video, type: 'videos', tag: 'video' }));
    const videoCarousel = new VideoCarousel(videoItems, document.querySelector('#video-carousel video'));
    videoCarousel.start();
});
