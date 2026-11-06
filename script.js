class Particle {
  constructor(effect, index) {
    this.effect = effect;
    this.index = index;
    // this.radius = 15;
    // this.radius = Math.floor(Math.random() * 10 + 5);
    this.radius = 35;
    this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
    this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2);
    this.vx = (Math.random() * 1 - 0.5) * 0.7;
    this.vy = (Math.random() * 1 - 0.5) * 0.7;
    // this.vy = Math.random() * 4-2;
    this.pushX = 0;
    this.pushY = 0;
    this.friction = 0.5


    this.image = document.getElementById('stars_sprite');
    this.spriteWidth = 155;
    this.spriteHeight = 155;
    this.spriteModifier = Math.random() * 0.4 + 0.1;

    this.width = this.spriteWidth * this.spriteModifier;
    this.height = this.spriteHeight * this.spriteModifier;
    this.halfWidth = this.width * 0.5;
    this.halfHeight = this.height * 0.5;

    //  this.frameX = Math.floor(Math.random() * 3);
    // this.frameY = Math.floor(Math.random() * 3);
    this.frameX = Math.floor(Math.random() * 3);
    this.frameY = Math.floor(Math.random() * 4);

  }

  draw(context, totalTime) {
    // context.fillStyle = 'hsla(' + this.x + ', 78%, 64%, 1.00)'
    // context.fillStyle = 'hsla(' + this.x * 0.5 + ', 78%, 64%, 1.00)'
    // context.fillStyle = 'hsla(' + Math.random() * 360 + ', 78%, 64%, 1.00)' 
    
    // context.stroke()
    // context.font = "50px Arial";
    // context.fillText("Hello World",10,80)

    // context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x - this.halfWidth, this.y - this.halfHeight, this.width, this.height)
    //
    if (this.index % 2 == 0) {
      const blinkInterval = 0.1; // Раз в сколько секунд мигать
      let x = Math.floor((totalTime + this.index * 0.1) / blinkInterval);
      let h = Math.sin(x * 8 + this.index) + 1;
      h = h - Math.floor(x); // Псевдослучайное число от 0 до 1.
      context.fillStyle = 'hsla(' + h * 360 + ', 48%, 74%, 1.00)'
      // context.fillStyle = 'hsla(' + Math.random() * 360 + ', 78%, 64%, 1.00)'


      context.beginPath();
      context.arc(this.x, this.y, this.radius / 10, 0, Math.PI * 2);
      context.fill()
    }

    if (this.index % 19 == 0) {
      context.fillStyle = 'hsla(' + this.x * 0.5 + ', 28%, 66%, 1.00)'
      context.beginPath();
      // context.arc(this.x, this.y, this.radius / 2, 0, Math.PI * 2);
      context.fill()
      context.stroke()
      context.font = "30px Arial bold";
      context.fillStyle = 'rgba(65, 45, 45, 0.688)'
      context.fillText("70%", this.x, this.y)
      context.fillStyle = 'hsla(' + this.x * 0.5 + ', 28%, 66%, 1.00)'
      context.fillText("70%", this.x - 2, this.y + 2)
    }

  }

  update() {



    if (this.effect.mouse.pressed) {
      const dx = this.x - this.effect.mouse.x;
      const dy = this.y - this.effect.mouse.y;
      const distance = Math.hypot(dx, dy);

      const force = this.effect.mouse.radius / distance;
      if (distance < this.effect.mouse.radius) {
        const angle = Math.atan2(dy, dx);
        this.pushX += Math.cos(angle) * force;
        this.pushY += Math.sin(angle) * force;

      }
    }

    // console.log(this.effect.width, effect.width,)

    if (this.x < this.radius) {
      this.x = this.radius;
      this.vx *= -1;
    } else if (this.x > this.effect.width - this.radius) {
      this.x = this.effect.width - this.radius;
      this.vx *= -1;
    }

    if (this.y < this.radius) {
      this.y = this.radius;
      this.vy *= -1;
    } else if (this.y > this.effect.height - this.radius) {
      this.y = this.effect.height - this.radius;
      this.vy *= -1;
    }




    // this.x += this.vx;
    // if (this.x > this.effect.width - this.radius || this.x < this.radius) this.vx *= -1;

    // this.y += this.vy
    // if (this.y > this.effect.height - this.radius || this.y < this.radius) this.vy *= -1;



    // this.x += this.vx;
    // this.y += this.vy

    // this.x += this.pushX + this.vx;
    // this.y += this.pushY + this.vy

    this.x += (this.pushX *= this.friction) + this.vx;
    this.y += (this.pushY *= this.friction) + this.vy


  }

  reset() {
    this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
    this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2);
  }

}




class Effect {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.particles = [];
    this.namberOfParticles = 70;
    this.createParticles();


    let imageChain = [
      './img/sunlight/sunChains/perl1.png',
      './img/sunlight/sunChains/perl2.png',
      './img/sunlight/sunChains/perl3.png',
      './img/sunlight/sunChains/perl4.png',
      './img/sunlight/sunChains/chain1.png',
      './img/sunlight/sunChains/chain2.png',
      './img/sunlight/sunChains/chain3.png',
    ]
    this.imageChain = imageChain.map(src => {
      const img = new Image();
      img.src = src;
      //управляем масштабом


      return img;
    });


    this.mouse = {
      x: 0,
      y: 0,
      pressed: false,
      radius: 250,
    }

    window.addEventListener('resize', (e) => {
      // console.log(e.target.window.innerWidth);
      // console.log(canvas);
      // this.resize(e.target.window.innerWidth, e.target.window.innerHeight)
      this.resize(canvas.width, canvas.height)
    })

    window.addEventListener('mousemove', e => {
      // 
      if (this.mouse.pressed) {
        // this.x += this.vx;
        // this.y += this.vy
        const rect = canvas.getBoundingClientRect();
        this.mouse.x = e.x - rect.left;
        this.mouse.y = e.y - rect.top;
        // console.log(this.mouse.x , this.mouse.y)
      }

    });
    window.addEventListener('mousedown', e => {
      this.mouse.pressed = true;
      this.mouse.x = e.x;
      this.mouse.y = e.y;
    });
    window.addEventListener('mouseup', e => {
      this.mouse.pressed = false;

    });

  }
  createParticles() {
    for (let i = 0; i < this.namberOfParticles; i++) {
      this.particles.push(new Particle(this, i));





    }

  }
  handleParticles(context, totalTime) {
    this.connectParticles(context);
    this.particles.forEach(particle => {
      particle.draw(context, totalTime);
      particle.update();
    });


  }
  connectParticles(context) {
    const maxDistance = 100;
    for (let a = 0; a < this.particles.length; a++) {
      for (let b = a + 1; b < this.particles.length; b++) {
        const dx = this.particles[a].x - this.particles[b].x;
        const dy = this.particles[a].y - this.particles[b].y;
        const distance = Math.hypot(dx, dy);
        if (distance < maxDistance) {
          context.save();
          const opacity = 1 - distance / maxDistance;
          context.globalAlpha = opacity;
          context.beginPath();
          context.moveTo(this.particles[a].x, this.particles[a].y);
          context.lineTo(this.particles[b].x, this.particles[b].y);
          // context.stroke();


          //нормализация....

          context.beginPath();

          /*
          let normalAngle = (Math.PI * ((this.particles[b].x - this.particles[a].x)) / ((this.particles[b].y) - this.particles[a].y))
          context.translate(this.particles[a].x, this.particles[a].y,)
          context.rotate(-Math.atan(normalAngle) * 2)
          let chain = context.fillRect(6, 6, (this.particles[a].x - this.particles[b].x), 12)
          */
          let cos = (this.particles[b].x - this.particles[a].x) / distance;
          let angle = Math.acos(cos);
          if (this.particles[b].y - this.particles[a].y > 0) {
            angle = Math.PI * 2 - angle;
          }
          context.translate(this.particles[a].x, this.particles[a].y,)
          context.rotate(-angle)
          // let chain = context.fillRect(6, -6, distance - 6, 12)
          // this.imageChain[1].style.height='px'


          // let fe = Math.floor(Math.random(1)*5)
          // console.log(fe)

          // 1. вывод изображения
          // drawImage(image, x, y)stroke(
          
          // 2. изменение размера изображения
          // drawImage(image, x, y, width, height) 
          
          context.drawImage(this.imageChain[1], 0, 0, distance, 10)
          // 3. вырезание изображения и размещение его на холсте
          // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)


          context.stroke();
          context.restore();





        }


      }


    }

  }



  resize(width, height) {
    ctx.strokeStyle = 'rgba(65, 45, 45, 0.488)'
    this.canvas.width = width;
    this.canvas.height = height;
    this.width = width;
    this.height = height;
    // this.context.fillStyle = 'red'
    this.particles.forEach(particle => {
      particle.reset()
    })
  }
}






window.addEventListener('load', function () {
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');

  canvas.width = 1600;
  canvas.height = 120;

  ctx.strokeStyle = 'rgba(65, 45, 45, 0.488)'



  const effect = new Effect(canvas, ctx);

  let lastTime = 0;
  let totalTime = 0; // Время в секундах. Начиная с загрузки страницы.

  function animate(timeStamp) {
    const deltaTime = (timeStamp - lastTime) / 1000;
    lastTime = timeStamp;

    totalTime += deltaTime;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    effect.handleParticles(ctx, totalTime);


    requestAnimationFrame(animate);
  }

  animate(0);



})


// update(deltaTime) {

// if (this.totalTime > this.frameInterval) {
//     this.totalTime = 0
// } else { this.totalTime += deltaTime; }


// }







