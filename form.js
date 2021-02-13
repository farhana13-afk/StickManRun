class Form {

    constructor() {
      this.buttonF = createButton('F');
      this.buttonM = createButton('M');
      this.title = createElement('h1');
      this.introduction1 = createElement('h2');
      this.introduction2 = createElement('h2');
      this.introduction3 = createElement('h2');
      this.gender = createElement('h2');
      this.gotitF= createButton('Got It');
      this.gotitM= createButton('Got It');
    }
    hide(){
      this.introduction1.hide();
      this.gotitF.hide();
      this.gotitM.hide();
      this.buttonM.hide();
      this.buttonF.hide();
      this.gender.hide();
      this.introduction1.hide();
      this.introduction2.hide();
      this.introduction3.hide();
      this.title.hide();
    }
  
    display(){
      this.title.html("Stick Figure Run");
      this.title.position(width/2 - 50, 0);
  
      this.gender.html("Gender: ");
      this.gender.position(width/2 -150, height/2 -75);
      this.buttonF.position(width/2 -40, height/2 -50);
      this.buttonM.position(width/2+40, height/2 -50);
      


      this.buttonF.mousePressed(()=>{
        this.introduction1.html("Oh no, I got turned into a stick figure by my teacher. Collect the potions along the way.");
        this.introduction1.position(width/2-400, 300);
        this.introduction2.html("If you get the stars you will be transported into a room to perform a pattern and gain a friend or foe.");
        this.introduction2.position(width/2-520, 350);
        this.introduction3.html("Get a 30 potions to transform me back.");
        this.introduction3.position(width/2-170, 400);
        this.buttonM.hide();
        this.buttonF.hide();
        this.gender.hide();
        this.gotitF.position(width/2, height/2 -50);
      });
      
      this.buttonM.mousePressed(()=>{
        this.introduction1.html("Oh no, I got turned into a stick figure by my teacher. Collect the potions along the way.");
        this.introduction1.position(width/2-400, 300);
        this.introduction2.html("If you get the stars you will be transported into a room to perform a pattern and gain a friend or foe.");
        this.introduction2.position(width/2-520, 350);
        this.introduction3.html("Get a 30 potions to transform me back.");
        this.introduction3.position(width/2-170, 400);
        this.buttonM.hide();
        this.buttonF.hide();
        this.gender.hide();
        this.gotitM.position(width/2, height/2 -50);
      });

      this.gotitF.mousePressed(()=>{
        gameState = 1;
        this.gotitF.hide();
        this.gotitM.hide();
        this.introduction1.hide();
        this.introduction2.hide();
        this.introduction3.hide();
        this.title.hide();
      });

      this.gotitM.mousePressed(()=>{
        gameState = 9;
        this.gotitM.hide();
        this.gotitF.hide();
        this.introduction1.hide();
        this.introduction2.hide();
        this.introduction3.hide();
        this.title.hide();
      });
    }
  }
  