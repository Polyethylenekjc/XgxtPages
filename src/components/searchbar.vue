<template>
<div class="search">
	<input type="text" class="search_input" placeholder="请输入搜索词" v-model="search_input">
    <label class="search_btn" @click="search"  >搜索</label>
</div>
</template>

<script setup>
</script>

<style scoped>
.search {
  
  width: 594px;
  height: 50px;
  margin: 0 auto;
  position: absolute;
  padding: 0 0 0 0;
  top:5%;
  left: 30%;
}
.search_input {
  width: 520px;
  float: left;
  height: 28px;
  line-height: 28px;
  padding: 0 8px;
  border-radius: 0;
  border:2px solid #e5e5e5;
  border-top-left-radius: 900px; 
  border-bottom-left-radius: 900px; 
}
.search_btn {
  display: grid;
  width: 50px;
  height: 28px;
  float: right;
  margin-right: 0;
  border:2px solid #e5e5e5;
  cursor:pointer;
  text-align: center;
  border-top-right-radius: 9000px; 
  border-bottom-right-radius: 9000px;
  background-color: #e5e5e5;
}

</style>