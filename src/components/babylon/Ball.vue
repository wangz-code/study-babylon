<template>
	<canvas id="renderCanvas"></canvas>
	<div class="space">
		<button @click="toggleSphere" class="btn btn-l btn-primary">添加/删除/球</button>
		<span>
			<label class="form-switch">
				<input type="checkbox" v-model="state.animation" />
				<i class="form-icon"></i> 动画
			</label>
		</span>
		<button @click="colorChange" class="btn btn-primary">换颜色</button>
		<button @click="textureChange" class="btn btn-primary">换材质</button>
		<button @click="meshChange" class="btn btn-primary">加Mesh</button>

		<button @click="locationChange('x')" class="btn btn-primary">+x</button>
		<button @click="locationChange('y')" class="btn btn-primary">+y</button>
		<button @click="locationChange('z')" class="btn btn-r btn-primary">+z</button>
	</div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";
var scene: BABYLON.Scene;
var interl: number;
const count = ref(0);

const state = reactive({
	animation: false,
});

watch(
	() => state.animation,
	(n) => {
		if (n) {
			interl = setInterval(() => {
				scene.getMeshByName("sphere")?.position.set(Math.random(), Math.random(), Math.random());
			}, 150);
		} else {
			clearInterval(interl);
		}
	}
);
// 球颜色
const colorChange = () => {
	const groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
	groundMaterial.diffuseColor = BABYLON.Color3.Random();
	const ground = scene.getMeshByName("ground");
	if (ground) ground.material = groundMaterial;
};
// 材质
const textureChange = () => {
	const groundMaterial = new BABYLON.StandardMaterial("Material", scene);
	groundMaterial.diffuseTexture = new BABYLON.Texture("https://khms0.google.com/kh/v=941?x=54509&y=26571&z=16", scene);
	const ground = scene.getMeshByName("ground");
	if (ground) ground.material = groundMaterial;
};

// 显示隐藏球
const toggleSphere = () => {
	const issphere = scene.getMeshByName("sphere");
	if (issphere) {
		scene.removeMesh(issphere);
		return;
	}

	// 球形 Our built-in 'sphere' shape.
	var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 2, segments: 32 }, scene);

	// Move the sphere upward 1/2 its height
	sphere.position.y = 0;
};

const locationChange = (type: "x" | "y" | "z") => {
	const sphere = scene.getMeshByName("sphere");
	if (sphere) sphere.position[type] += 0.2;
};

// 添加mesh 网
const meshChange = () => {
	BABYLON.SceneLoader.ImportMesh("", "/static/mesh/", "Yeti.gltf", scene, function (newMeshes) {
		console.log("newMeshes 加载完成 log==>", newMeshes);
		if (newMeshes) newMeshes[0].scaling = new BABYLON.Vector3(0.1, 0.1, 0.1);
	});
};
onMounted(() => {
	var canvas = document.getElementById("renderCanvas") as HTMLCanvasElement; // 得到canvas对象的引用
	var engine = new BABYLON.Engine(canvas, true); // 初始化 BABYLON 3D engine

	/******* Add the create scene function ******/
	var createScene = function () {
		// This creates a basic Babylon Scene object (non-mesh)
		var scene = new BABYLON.Scene(engine);

		// This creates and positions a free camera (non-mesh)

		var camera = new BABYLON.ArcRotateCamera("camera", BABYLON.Tools.ToRadians(90), BABYLON.Tools.ToRadians(65), 10, BABYLON.Vector3.Zero(), scene);
		camera.useAutoRotationBehavior = true;
		// This attaches the camera to the canvas
		camera.attachControl(canvas, true);

		// This creates a light, aiming 0,1,0 - to the sky (non-mesh)
		var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 4, 0), scene);

		// Default intensity is 1. Let's dim the light a small amount
		light.intensity = 0.7;

		// Our built-in 'ground' shape.
		var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, scene);

		return scene;
	};
	/******* End of the create scene function ******/

	scene = createScene(); //Call the createScene function

	// 最后一步调用engine的runRenderLoop方案，执行scene.render()，让我们的3d场景渲染起来
	engine.runRenderLoop(function () {
		scene.render();
	});

	// 监听浏览器改变大小的事件，通过调用engine.resize()来自适应窗口大小
	window.addEventListener("resize", function () {
		engine.resize();
	});
});
</script>

<style scoped>
#renderCanvas {
	width: 100%;
	height: calc(100vh - 100px);
	touch-action: none;
}
</style>
