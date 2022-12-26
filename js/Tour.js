AFRAME.registerComponent("tour", {
  schema: {
    state: { type: "string", default: "places-list" },
    selectedCard: { type: "string", default: "#card1" },
    zoomAspectRatio: { type: "number", default: 1 }
  },
  init: function() {
    this.placesContainer = this.el;
    this.cameraEl = document.querySelector("#camera");
    this.createPlace();
  },
  
  tick: function() {
    const { state } = this.el.getAttribute("tour");

    if (state === "view") {
      this.hideEl([this.placesContainer]);
      this.showView();
    }
  },
  hideEl: function(elList) {
    elList.map(el => {
      el.setAttribute("visible", false);
    });
  },
  showView: function() {
    const { selectedCard } = this.data;
    const skyEl = document.querySelector("#main-container");
    skyEl.setAttribute("material", {
      src: `./assets/360_images/${selectedCard}/place-0.jpg`,
      color: "#fff"
    });
  },
  createPlace: function() {
    const details = {
      garden: {
        position: { x: 20, y: -4.5, z: -5.5},
        rotation:{x: 0, y: -90, z: 0},
        src: "./assets/thumbnails/garden.png",
        title: "Garden",
        id: "garden"
      },
      main_gate: {
        position: { x: 4.6, y: -5.5, z: 25 },
        rotation: { x: 180, y: 0, z: 0},
        src: "./assets/thumbnails/main_gate.png",
        title: "Main Gate",
        id: "main_gate"
      },
      home: {

        position: { x: -9,y: 34, z: -100},
        rotation: { x: 0, y: 0, z: 0},
        src: "./assets/thumbnails/home.png",
        title: "My Home",
        id: "home"
      }

    };

    for ( var key in details) {
      const item = details[key];
      // Thumbnail Element
      const thumbnail = this.createThumbnail(item);
      // Title
      const title = this.createTitleEl(item);
      thumbNail.appendChild(title);
      this.placeContainer.appendChild(thumbnail);
    }
  
    
    const thumbNailsRef = [
      {
        id: "taj-mahal",
        title: "Taj Mahal",
        url: "./assets/thumbnails/taj_mahal.png"
      },
      {
        id: "budapest",
        title: "Budapest",
        url: "./assets/thumbnails/budapest.jpg"
      },

      {
        id: "eiffel-tower",
        title: "Eiffel Tower",
        url: "./assets/thumbnails/eiffel_tower.png"
      },
      {
        id: "new-york-city",
        title: "New York City",
        url: "./assets/thumbnails/new_york_city.png"
      }
    ];
    let prevoiusXPosition = -60;
    for (var item of thumbNailsRef) {
      const posX = prevoiusXPosition + 25;
      const posY = 10;
      const posZ = -40;
      const position = { x: posX, y: posY, z: posZ };
      prevoiusXPosition = posX;

      // Border Element
      const borderEl = this.createBorder(position, item.id);

      // Thubnail Element
      const thumbNail = this.createThumbNail(item);
      borderEl.appendChild(thumbNail);

      // Title Text Element
      const titleEl = this.createTitleEl(position, item);
      borderEl.appendChild(titleEl);

      this.placesContainer.appendChild(borderEl);
    }
  },
  createBorder: function(position, id) {
    const entityEl = document.createElement("a-entity");
    entityEl.setAttribute("id", id);
    entityEl.setAttribute("visible", true);
    entityEl.setAttribute("geometry", {
      primitive: "ring",
      radiusInner: 9,
      radiusOuter: 10
    });
    entityEl.setAttribute("position", position);
    entityEl.setAttribute("material", {
      color: "#0077CC",
      opacity: 1
    });
    entityEl.setAttribute("cursor-listener", {});
    return entityEl;
  },
  createThumbNail: function(item) {
    const entityEl = document.createElement("a-entity");
    const id = `place-${item.id}`;
    entityEl.setAttribute("visible", true);
    entityEl.setAttribute("id", id);
    entityEl.setAttribute("geometary", {
      primitive: "circle",
      radius:3
    });
    entityEl.setAttribute("position", item.position);
    entityEl.setAttribute("rotation", item.rotation);
    entityEl.setAttribute("material", {src: item.src, opacity:0.6 });
    entityEl.setAttribute("cursor-listener", {});
    return entityEl;
  
   
    
  },
