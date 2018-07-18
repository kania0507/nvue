import Vue from 'vue'
import VueRouter from 'vue-router'
import Posts from './components/Posts.vue'
/*
const routes = [
	{ 
		path: '/posts', name: 'posts', template: 'Posts' 
	}   
];
*/

Vue.use(VueRouter);


const router = new VueRouter ({
   // routes, 
	mode: 'history'
});


new Vue({
	el: '#app',
	template: '<Posts :maxStars="5"   />',
	components: { Posts }
	
})