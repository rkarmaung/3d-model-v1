const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 15;
const renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
renderer.setClearColor(0xf0d98e, 1); //Background color;
renderer.setSize( 1920, 720 );
renderer.domElement.setAttribute("id", "Model");
document.body.insertBefore(renderer.domElement, document.body.firstChild);

const aLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(aLight);
const pLight = new THREE.PointLight(0xffffff, 2);
pLight.position.set(10,0,70);
scene.add(pLight);

let loader = new THREE.GLTFLoader();
let obj = null;

// Model THE mod

loader.load('/assets/gltf/scene.gltf', function(gltf){
    obj = gltf;
    obj.scene.scale.set(1,1.3,1);
    obj.scene.rotation.y = -0.64;
    scene.add(obj.scene);
});

function animate(e){
    requestAnimationFrame(animate);    
    if(obj){
        //left and right movement
        $(window).mousemove(function(e){
            obj.scene.rotation.y = -e.clientX / 600; 
            //console.log(obj.scene.rotation.y);
        })
        
        if(window.scrollY > 1){
            //the model view will change upon scrolling down
            if(window.scrollY >= 150){
                $('#Model').css({position: 'fixed', top: 300 + 'px'});
            } else{
                $('#Model').css({position: 'absolute', top: 50 + '%'});
            }

            //the model rotate around (front to back)
            $(window).scroll(function(){
                obj.scene.rotation.x = -window.scrollY / 1200 - 100;
            })
        } else {
            $(document).ready(function(){
                obj.scene.rotation.x =- 100;
            })
        }


        renderer.render(scene,camera);
    }
}

animate();