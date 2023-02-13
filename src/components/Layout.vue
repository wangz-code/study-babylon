<!--
 * @Author: wangqz
 * @Date: 2023-02-12
 * @LastEditTime: 2023-02-12
 * @Description: content
-->
<script setup lang="ts">
import { reactive } from "vue";
import * as babylon from "./babylon";
const state = reactive({
	list: [] as string[],
	active: "Ball",
});

for (const item in babylon) {
	state.list.push(item);
}
// 选中
const activeMe = (item: any) => {
	state.active = item;
};
</script>

<template>
	<div class="container">
		<div class="columns">
			<div class="column col-2 col-md-12">
				<ul class="menu">
					<!-- menu header text -->
					<li class="divider" data-content="组件"></li>
					<!-- menu item standard -->
					<li class="menu-item" v-for="item in state.list" @click="activeMe(item)">
						<a :class="{ active: state.active == item }" href="#"> <i class="icon icon-link"></i> {{ item }}</a>
					</li>
					<li class="divider" data-content="其他"></li>
					<!-- menu item with badge -->
					<li class="menu-item">
						<a href="#"> <i class="icon icon-link"></i> Settings </a>
						<div class="menu-badge">
							<label class="label label-primary">2</label>
						</div>
					</li>

					<li class="menu-item">
						<a href="#">My profile</a>
						<div class="menu-badge">
							<label class="form-checkbox">
								<input type="checkbox" />
								<i class="form-icon"></i> Public
							</label>
						</div>
					</li>
				</ul>
			</div>
			<div class="column col-10 col-md-12">
				<div class="menu">
					<template v-for="item in babylon">
						<component v-if="item.__name == state.active" :is="item"></component>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="css" scoped>
.container {
	padding: 20px;
}
</style>
