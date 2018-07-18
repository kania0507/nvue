<template>
	<div class="main">		
		<ul v-if="posts && posts.length">			
			<li v-for="(post,index) in posts" >
				<h2>{{post.title['rendered']}}</h2>
				<p>{{post.content['rendered']}}</p>				
				<p class="rating" > 					
					
				RATE: 
					<ul class="list" :class="{ 'inactive': clicked[post.id] }"  > 
						<li @click="rate(star,index,post.id)" :class="{ 'active': clicked[post.id]  }" class="star"  v-for="star in maxStars" >
							<icon :name="star <= clicked[post.id] ? 'star' : 'star-o'"  />
						</li>	
					</ul>					
									
				</p>
				
			</li>		
		</ul>
		
		
		<ul v-if="errors && errors.length">
			<li v-for="error of errors">
				{{error.message}}
			</li>
		</ul>
		<p>{{ stars }}</p>
	</div>
</template>

<script>
import axios from 'axios';
import 'vue-awesome/icons/star'
import 'vue-awesome/icons/star-o'
import Icon from 'vue-awesome/components/Icon'

export default {
	name: 'Posts',	
	props: {
		grade: {
			type: Number,			
		},
		maxStars: {
			type: Number,
			default: 5
			}
	},
	data() {
		return {
			posts: [],
			errors: [],
			postid: [],
		
			stars: this.grade,
			clicked: []
			
		}
	},
  
	created() {
		axios.get('http://localhost/mywp/wp-json/wp/v2/posts/') //'https://swapi.co/api/planets/') 
		.then(response => {      
			this.posts = response.data;
			 
		})
		.catch(e => {
			this.errors.push(e)
		})
	},
  
	components: { Icon },	
	
	methods: { 
		rate(star,index,postid) { 			
			if (this.posts[index].id==postid ){ 		   							
					this.stars = star; //(this.stars === star) ? star - 1 : star;
					this.clicked[postid]=this.stars;							
					//console.log(this.clicked[postid]);					
			}
		} 
	}
}
</script>


<style scoped lang="scss">
.main {
	font-family: 'Lato', Helvetica, Arial, sans-serif;
	font-size: 12px;
}
.rating {    
    font-size: 14px;
    color: #aaa;
}
.list {
    padding: 0;
    list-style-type: none;
}
.star {
    display: inline-block;
    cursor: pointer;
}
.active {
    color: yellow;
}
.inactive {
	pointer-events: none;
	disabled:true;
}
</style>