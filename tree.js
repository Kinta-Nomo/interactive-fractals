
let a1 = 0.5;
let a2 = 0.5;
let lfactor2 = 0.5;
let lfactor1 = 0.5;

class Tree{
    constructor(){
        this.branches = [];
    }
}
Tree.prototype.show = function(){
    for (let branch of this.branches){
        branch.show();
    }
}

class Branch{
    constructor(root, bearing, l){

        this.root = root;
        
        this.bearing = bearing;
        this.l = l;

        this.tip = {
            x: this.root.x+(this.l * Math.cos(this.bearing)),
            y: this.root.y+(this.l * Math.sin(this.bearing))
        };
        
    }
}
Branch.prototype.show = function(){
    stroke(0);
    line(this.root.x, this.root.y,this.tip.x, this.tip.y);
}

function generateBranch(tree, root, l, angle, a1, a2, lfactor1, lfactor2, depth){
    if (depth>0){
        let newTree = new Branch(root, angle, l);
        tree.branches.push(newTree);
        generateBranch(tree, newTree.tip, l*lfactor1, angle+a1, a1, a2, lfactor1, lfactor2, depth-1);
        generateBranch(tree, newTree.tip, l*lfactor2, angle-a2, a1, a2, lfactor1, lfactor2, depth-1);
    }
}

let scene = [new Tree()];
generateBranch(scene[0], {x: 0, y:150}, 100,-Math.PI/2, a1, a2, lfactor1, lfactor2, 7);
// scene[0].branches.push(new Branch(230,230,Math.PI/2, 100))

function setup(){
    createCanvas(400, 400);
    strokeWeight(2);
    noFill();
}

function draw(){
    background(200);
    translate(200,200);
    for (let tree of scene){
        tree.show();
    }
    a1+=Math.random()*0.2 - 0.1
    a2+=Math.random()*0.2 - 0.1
    // lfactor1 = Math.sin(a1)*1;
    // lfactor2 = Math.sin(-a2)*1;
    scene[0].branches = [];
    generateBranch(scene[0], {x: 0, y:150}, 100,-Math.PI/2, a1, a2, lfactor1, lfactor2, 7);
}