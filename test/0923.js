let p = new Promise((resolve, reject) => {
	setTimeout(() => resolve(1), 3000);
  // resolve(1)
})
.then(res => {
	// setTimeout(() => console.log('=>11', ), 4000);
  console.log('=>', 111)
})
.then(res => {
  // setTimeout(() => console.log('=>22', ), 3000);
   console.log('=>', 222)
})
.then(res => {
  // setTimeout(() => console.log('=>33', ), 2000);
   console.log('=>', 333)
	// return 4;
	//如果在这里加入return 语句有何不同？
})