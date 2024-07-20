# Visualización de Productos

Este proyecto es un reproductor de productos dinámico que muestra un carrusel de videos, imágenes y productos con transiciones animadas.

## Características

- Lectura de datos desde un archivo JSON.
- Carrusel de videos que se reproducen automáticamente en mute y en bucle.
- Carrusel de imágenes con cambio automático.
- Visualización de productos normales en grupos de 5, con cambios automáticos y cíclicos.
- Visualización de productos especiales, mostrando un producto a la vez, con cambios automáticos y cíclicos.
- Transiciones animadas con GSAP.
- Parámetros de configuración y duración de transiciones manejables desde el archivo JSON.

## Requisitos

- Servidor de desarrollo local (p.ej. Live Server para VSCode)

## Instalación

Clona este repositorio:

```bash
git clone https://github.com/holasoymax/ejercicio-senalizacion-max.git
```

## Configuración del JSON

El archivo data.json contiene la configuración y los datos de los productos. A continuación se describe su estructura:

```ag-0-1i37lvd10ag-1-1i37lvd10json
{
  "config": {
    "normal_product_duration": 5000,
    "special_product_duration": 10000,
    "image_carousel_duration": 10000,
    "fade_duration": 500
  },
  "products": {
    "normales": [
      {
        "product": "Pechuga con hueso - kg",
        "price": 129.0,
        "category": "carnes",
        "image": "carnes/pechuga_hueso.jpg"
      },
      ...
    ],
    "especiales": [
      {
        "product": "Milanesa pechuga - kg",
        "price": 197.15,
        "category": "carnes",
        "image": "carnes/milanesa_pechuga.jpg"
      },
      ...
    ]
  },
  "videos": {
    "video": ["vid1.mp4", "vid2.mp4"]
  },
  "images": ["imagenes/img3.jpg", "imagenes/img2.jpg", "imagenes/img1.jpg"]
}
```

### Explicación del JSON

El JSON está compuesto por varias secciones que configuran el comportamiento de la aplicación y definen los datos a mostrar.

1. **config:** Contiene parámetros de configuración que determinan la duración de los diferentes carruseles y transiciones.
   
   - `normal_product_duration`: Duración de la visualización de los productos normales en milisegundos.
   - `special_product_duration`: Duración de la visualización de los productos especiales en milisegundos.
   - `image_carousel_duration`: Duración de la visualización de cada imagen en el carrusel de imágenes en milisegundos.

2. **products:** Incluye dos categorías de productos, normales y especiales, cada uno con sus detalles específicos.
   
   - `normales`: Lista de productos normales, cada uno con los siguientes atributos:
     - `product`: Nombre del producto.
     - `price`: Precio del producto.
     - `category`: Categoría del producto.
     - `image`: Ruta de la imagen del producto.
   - `especiales`: Lista de productos especiales, con los mismos atributos que los productos normales.

3. **videos:** Lista de rutas de los videos que se reproducirán en el carrusel de videos.
   
   - `video`: Array de rutas de archivos de video.

4. **images:** Lista de rutas de las imágenes que se mostrarán en el carrusel de imágenes.

## Estructura del Archivo main.js

El archivo `main.js` contiene el código JavaScript necesario para cargar datos desde un archivo JSON y gestionar los diferentes carruseles (imágenes, videos y productos) utilizando la biblioteca GSAP para animaciones. El archivo se divide en las siguientes secciones:

1. **Función para cargar datos desde JSON:**
   
   - `fetchData`: Esta función carga y devuelve los datos desde el archivo `data.json`.

2. **Clases para manejar carruseles:**
   
   - `Carousel`: Clase base para manejar carruseles de imágenes.
   - `VideoCarousel`: Clase para manejar carruseles de videos.
   - `ProductCarousel`: Clase para manejar carruseles de productos normales.
   - `SpecialProductCarousel`: Clase para manejar carruseles de productos especiales.

3. **Inicio de carruseles después de cargar los datos del JSON:**
   
   - Inicialización de los carruseles después de cargar los datos del archivo JSON y configuración de cada carrusel.

### Explicación de las Clases y Métodos

#### Clase `Carousel`

- **Propiedades:**
  
  - `items`: Lista de elementos en el carrusel (imágenes).
  - `container`: Contenedor HTML donde se mostrarán las imágenes.
  - `duration`: Duración de cada imagen en el carrusel.

- **Métodos:**
  
  - `start()`: Inicia el carrusel llamando al método `changeItem`.
  - `changeItem()`: Cambia la imagen actual en el carrusel con una transición de fade-out y fade-in.

#### Clase `VideoCarousel`

- **Propiedades:**
  
  - `items`: Lista de elementos en el carrusel (videos).
  - `container`: Contenedor HTML donde se reproducirán los videos.

- **Métodos:**
  
  - `start()`: Inicia el carrusel llamando al método `changeItem`.
  - `changeItem()`: Cambia el video actual en el carrusel con una transición de fade-out y fade-in, y maneja la reproducción automática y el cambio al siguiente video al finalizar.

#### Clase `ProductCarousel`

- **Propiedades:**
  
  - `products`: Lista de productos normales.
  - `container`: Contenedor HTML donde se mostrarán los productos.
  - `duration`: Duración de cada grupo de productos en el carrusel.

- **Métodos:**
  
  - `start()`: Inicia el carrusel llamando al método `changeGroup` y establece un intervalo para el fade-out del grupo actual.
  - `fadeOutGroup()`: Aplica un efecto de fade-out en cascada a los productos actuales antes de cambiarlos.
  - `changeGroup()`: Cambia al siguiente grupo de productos con un efecto de fade-in en cascada.
  - `createProductElement()`: Crea un elemento HTML para un producto.

#### Clase `SpecialProductCarousel`

- **Propiedades:**
  
  - `products`: Lista de productos especiales.
  - `container`: Contenedor HTML donde se mostrarán los productos especiales.
  - `duration`: Duración de cada producto especial en el carrusel.

- **Métodos:**
  
  - `start()`: Inicia el carrusel llamando al método `changeProduct` y establece un intervalo para el fade-out del producto actual.
  - `fadeOutProduct()`: Aplica un efecto de fade-out al producto actual antes de cambiarlo.
  - `changeProduct()`: Cambia al siguiente producto especial con un efecto de fade-in.
  - `createProductElement()`: Crea un elemento HTML para un producto especial.

### Inicialización de los Carruseles

Después de cargar los datos del JSON, se inicializan los diferentes carruseles con las configuraciones especificadas en el archivo JSON.
